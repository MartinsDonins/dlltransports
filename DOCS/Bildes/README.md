# DOCS/Bildes/ — original fleet photography

This folder contains the **original, full-resolution photography** of the DLL Transports fleet
(MAN, SCANIA, GOLDHOFER, DOLL, JCB, MAN TGE, TRAILER, PILOTS).

**This folder is intentionally `.gitignore`-d.** The originals stay on the local workstation
because they are large (~687 MB total, some folders >300 MB) and are *source material*, not
web assets.

## For the web build

When the WordPress / page builder work begins, pick the best shots per category, run them
through web optimization (target ~150–250 KB, max 1920 px wide, WebP/AVIF where possible),
and commit the optimized versions to a separate folder, e.g.:

```
assets/web/fleet/<category>/<slug>.webp
```

That `assets/web/` folder **should be committed** so the AI design builder can reference real
imagery while building layouts.

## Categories (originals on disk)

- `DOLL/` — DOLL trailers
- `GOLDHOFER/` — Goldhofer heavy-haul trailers
- `JCB/` — JCB machinery
- `MAN/` — MAN tractor units
- `MAN TGE/` — MAN TGE vans
- `PILOTS/` — pilot / escort vehicles
- `SCANIA/` — Scania tractor units
- `TRAILER/` — generic trailer shots
