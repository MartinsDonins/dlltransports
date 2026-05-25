# DLL-Transports — Dizaina paraugi (4 varianti)

Šī ir publiska priekšskatījuma lapa, ko var nodot klientam. Konteinerā tiek apkalpoti **4 dizaina virzieni** (A, C, D, E), katrs ar 3 lapām: *Sākums · Pakalpojumi · Kontakti*.

## Lokāli (developer)

```powershell
# No repo saknes
docker build -t dlltransports-preview ./WEB
docker run --rm -p 8080:80 dlltransports-preview
# Atver http://localhost:8080
```

## Coolify (publiskā saite klientam)

1. Coolify → **New Resource** → **Docker (Dockerfile)**
2. Repo: `MartinsDonins/dlltransports`, branch: `main`
3. **Build context / Base directory**: `WEB`
4. **Dockerfile location**: `WEB/Dockerfile`
5. **Port**: `80`
6. Pievieno domēnu (piem. `dizains.dlltransports.lv` vai Coolify auto-domēnu) → Deploy
7. Pārsūti iegūto saiti klientam.

## Saturs

- `index.html` — variantu izvēles galvenā lapa (entry point)
- `variant-a/` — Classic Premium Industrial
- `variant-c/` — Heavy-industry Brutalist
- `variant-d/` — Dark-first / Signal Yellow
- `variant-e/` — Split-screen B2B/B2C

Pilna dizaina sistēmas dokumentācija un brifs: `README.md` (kopija no oriģinālā handoff).
