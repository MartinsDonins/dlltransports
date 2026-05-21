# dlltransports

Working files for the **DLL Transports** website project — a WordPress-based corporate site
for a heavy-haul transport company (MAN, SCANIA, GOLDHOFER, DOLL fleet).

This repo is the *source-of-truth working directory* used together with Claude Code as a
design / build assistant.

## Repo layout

```
DOCS/
├─ Apraksti/             # Site copy (sections, headings, body text) — committed
├─ Logo faili/           # Brand logos (PNG/GIF web-ready) — committed
│                        #   note: large .ai source files are .gitignored
├─ Bildes/               # Original fleet photography — NOT committed (see README inside)
└─ Piedāvājumu faili/    # Original offer PDFs — NOT committed (see README inside)
```

Web-optimized assets (compressed images, brochure PDFs) will land under `assets/web/` once
the build phase begins, and **those** are committed so the design builder can use them in
real layouts.

## Next steps

- [ ] Pick the hero / category images per fleet brand, optimize to WebP (≤250 KB), commit to `assets/web/fleet/`
- [ ] Compress the portfolio PDF (target <5 MB) and commit to `assets/web/brochures/`
- [ ] Scaffold the WordPress theme / block layout
