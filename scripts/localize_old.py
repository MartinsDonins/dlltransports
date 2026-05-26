"""
Localize WEB/OLD: download every external asset referenced by HTML/CSS/JS
files into WEB/OLD/_ext/<host>/<path>, then rewrite each file so its
references point at the local copy. Blocked third-party trackers/social
embeds are neutralized (rewritten to about:blank).

Run from repo root:
    python scripts/localize_old.py
"""

from __future__ import annotations

import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urlparse, unquote

SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

ROOT = Path(__file__).resolve().parents[1] / "WEB" / "OLD"
EXT_DIR = ROOT / "_ext"

# Hosts whose resources we want to mirror locally.
ASSET_HOSTS = {
    "irp.cdn-website.com",
    "lirp.cdn-website.com",
    "irp-cdn.multiscreensite.com",
    "static.cdn-website.com",
    "dd-cdn.multiscreensite.com",
    "dp-cdn.multiscreensite.com",
    "rtc.multiscreensite.com",
    "app.multiscreenstore.com",
    "static-cdn.dwhitelabel.com",
    "sourcemaps-lambda.dwhitelabel.com",
    "vjs.zencdn.net",
    "s3.amazonaws.com",
}

# Hosts whose resources are neutralized (trackers, third-party embeds).
BLOCK_HOSTS = {
    "www.googletagmanager.com",
    "www.google-analytics.com",
    "www.google.com",
    "tools.google.com",
    "support.google.com",
    "www.facebook.com",
    "connect.facebook.net",
    "twitter.com",
    "platform.twitter.com",
    "geocoder.api.here.com",
}

URL_RE = re.compile(r"https?://[^\s\"'>)<]+", re.IGNORECASE)

UA = "Mozilla/5.0 (compatible; LegacySiteBackup/1.0)"


def is_text_file(p: Path) -> bool:
    return p.suffix.lower() in {".html", ".htm", ".css", ".js", ".svg"}


def collect_urls() -> set[str]:
    urls: set[str] = set()
    for f in ROOT.rglob("*"):
        if not f.is_file() or not is_text_file(f):
            continue
        if EXT_DIR in f.parents:
            continue
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        for m in URL_RE.finditer(text):
            url = m.group(0).rstrip(".,;:)")
            urls.add(url)
    return urls


def local_path_for(url: str) -> Path:
    p = urlparse(url)
    rel = unquote(p.path.lstrip("/")) or "index"
    if p.query:
        # Encode query into filename so distinct variants don't collide.
        safe_q = re.sub(r"[^A-Za-z0-9._-]+", "_", p.query)[:80]
        rel = f"{rel}__q_{safe_q}"
    return EXT_DIR / p.netloc / rel


def download_one(url: str) -> tuple[str, str]:
    target = local_path_for(url)
    if target.exists() and target.stat().st_size > 0:
        return url, "skip"
    target.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30, context=SSL_CTX) as r:
            data = r.read()
        target.write_bytes(data)
        return url, f"ok {len(data)}b"
    except urllib.error.HTTPError as e:
        return url, f"http {e.code}"
    except Exception as e:
        return url, f"err {type(e).__name__}: {e}"


def download_assets(urls: set[str]) -> dict[str, str]:
    to_get = sorted(u for u in urls if urlparse(u).netloc in ASSET_HOSTS)
    results: dict[str, str] = {}
    print(f"[download] {len(to_get)} unique asset URLs from {len(ASSET_HOSTS)} hosts")
    started = time.time()
    with ThreadPoolExecutor(max_workers=12) as pool:
        futures = {pool.submit(download_one, u): u for u in to_get}
        done = 0
        for fut in as_completed(futures):
            url, status = fut.result()
            results[url] = status
            done += 1
            if done % 50 == 0 or done == len(to_get):
                print(f"  {done}/{len(to_get)}  ({time.time()-started:.1f}s)")
    return results


def rewrite_files(asset_urls: set[str]) -> tuple[int, int]:
    files_changed = 0
    replacements = 0
    for f in ROOT.rglob("*"):
        if not f.is_file() or not is_text_file(f):
            continue
        if EXT_DIR in f.parents:
            continue
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        # Relative prefix from this file to EXT_DIR.
        rel_to_ext = os.path.relpath(EXT_DIR, f.parent).replace(os.sep, "/")
        local_count = 0

        def repl(m: re.Match) -> str:
            nonlocal local_count
            url = m.group(0)
            tail = ""
            while url and url[-1] in ".,;:)":
                tail = url[-1] + tail
                url = url[:-1]
            p = urlparse(url)
            if p.netloc in BLOCK_HOSTS:
                local_count += 1
                return "about:blank" + tail
            if p.netloc in ASSET_HOSTS and url in asset_urls:
                # Build local path matching local_path_for
                rel = unquote(p.path.lstrip("/")) or "index"
                if p.query:
                    safe_q = re.sub(r"[^A-Za-z0-9._-]+", "_", p.query)[:80]
                    rel = f"{rel}__q_{safe_q}"
                local_count += 1
                return f"{rel_to_ext}/{p.netloc}/{rel}" + tail
            return url + tail

        new_text = URL_RE.sub(repl, text)
        if new_text != text:
            f.write_text(new_text, encoding="utf-8")
            files_changed += 1
            replacements += local_count
    return files_changed, replacements


def main() -> int:
    if not ROOT.is_dir():
        print(f"ERROR: {ROOT} not found", file=sys.stderr)
        return 1
    print(f"[scan] {ROOT}")
    urls = collect_urls()
    print(f"[scan] found {len(urls)} unique external URLs")

    results = download_assets(urls)
    ok_urls = {u for u, v in results.items() if v.startswith("ok") or v == "skip"}
    fail = len(results) - len(ok_urls)
    print(f"[download] {len(ok_urls)} ok/skip · {fail} failed")
    if fail:
        sample = [(u, v) for u, v in results.items() if not (v.startswith("ok") or v == "skip")][:5]
        for u, v in sample:
            print(f"  FAIL {v}  {u}")

    files_changed, replacements = rewrite_files(ok_urls)
    print(f"[rewrite] {replacements} URL replacements across {files_changed} files")

    # Neutralization pass: any remaining external resource URLs (failed
    # downloads, hosts we didn't list) get replaced so the page makes
    # ZERO outgoing requests once loaded.
    PIXEL_GIF = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    BLANK = "about:blank"
    EXTERNAL_RE = re.compile(r"https?://(?!www\.dlltransports\.lv)[^\s\"'>)<]+", re.IGNORECASE)
    # Patterns where we should neutralize the URL (resource references, not hyperlinks).
    CSS_URL_RE = re.compile(r"url\((['\"]?)(https?://[^)'\"<>]+)\1\)", re.IGNORECASE)
    ATTR_RE = re.compile(
        r"""(?P<attr>(?:src|data-src|srcset|poster|action|formaction|background|cite|data|usemap|longdesc|profile|manifest))\s*=\s*(?P<q>['"])(?P<url>https?://[^'"<>]+)(?P=q)""",
        re.IGNORECASE,
    )

    neut_files = 0
    neut_count = 0
    for f in ROOT.rglob("*"):
        if not f.is_file() or not is_text_file(f):
            continue
        if EXT_DIR in f.parents:
            continue
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        orig = text

        def css_repl(m: re.Match) -> str:
            return f"url({PIXEL_GIF})"

        def attr_repl(m: re.Match) -> str:
            return f"{m.group('attr')}={m.group('q')}{PIXEL_GIF if m.group('attr').lower() in {'src','data-src','srcset','poster','background'} else BLANK}{m.group('q')}"

        text = CSS_URL_RE.sub(css_repl, text)
        text = ATTR_RE.sub(attr_repl, text)

        if text != orig:
            f.write_text(text, encoding="utf-8")
            neut_files += 1
            neut_count += sum(1 for _ in EXTERNAL_RE.finditer(orig)) - sum(1 for _ in EXTERNAL_RE.finditer(text))

    print(f"[neutralize] {neut_count} stray external URLs neutralized across {neut_files} files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
