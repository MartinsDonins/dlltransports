# DLL-Transports — tulkošanas plāns (LV → EN / RU / DE)

DLL lapa ir publicēta LV valodā (site_id 6, https://dll.coredigify.com).
Šis ir plāns daudzvalodībai. Lapa: `translate_enabled: true`, plugin 0.5.1 (Polylang-aware).

## Kā tulkojas SATURS (svarīgi)

Dizaina lapas ir **custom HTML** (pushed caur wp_create_page). Tāpēc:
- **MCD Translate / .mo (gettext)** tulko tikai UI virknes — **NE** šo HTML saturu.
- HTML satura tulkošanai vajag **per-language lapas** (Polylang): katrai valodai sava lapas kopija ar pārtulkoto tekstu, sasaistīta kā oriģināla tulkojums.

**CSS un bildes ir valodu-neatkarīgas** — globālais CSS un media netiek dublēts. Tulko TIKAI tekstu.

## Valodas
- **LV** — default (jau publicēts: Sākums #24, Pakalpojumi #21, Kontakti #22)
- **EN, RU, DE** — jāizveido (3 lapas × 3 valodas = 9 lapas)

## Soļi (kad apstiprināts)

1. **Polylang**: pārliecināties, ka aktīvs un reģistrētas valodas LV/EN/RU/DE (+ URL shēma, parasti `/en/`, `/ru/`, `/de/`).
2. **Tulkot tekstu** katrai lapai (avots = `_wp-export/pages/*.html`). Saglabāt HTML struktūru, klases, `<svg>`, `src`, `href`.
3. **Saites pielāgot** valodai: piem. EN home `href="/en/"`, services `href="/en/services/"`, contact `href="/en/contact/"` (atkarīgs no Polylang slug shēmas).
4. **Publicēt** ar wp_create_page (`type:"page"`, `status:"publish"`) un sasaistīt kā Polylang tulkojumu oriģinālam.
5. **Front page** katrai valodai (Polylang) → attiecīgā "home" lapa.
6. **Valodu pārslēgs**: dizaina header pogas (LV/EN/RU/DE) pievienot īstas saites uz katras valodas versiju (vai aizstāt ar Polylang switcher). Aktīvo valodu iezīmēt ar `class="on"`.

## Ko TULKOT vs ATSTĀT

**Tulkot** (viss redzamais teksts):
- Header josla: "DISPATCH 24/7", "Pn–Pk · 08:00–18:00"
- Navigācija: Sākums, Pakalpojumi, Autoparks, Projekti, Kontakti
- Hero virsraksts/lede/pogas, hero-stats (Pieredze/Tehnika/Pakalpojumi/Reakcija + apraksti)
- USP (Punktualitāte/Kompetence/Kvalitāte + apraksti + "On-time rate" u.c.)
- 12 pakalpojumu nosaukumi + apraksti (grid + services lapas saraksts)
- Fleet tagi/specs, rasējumu virsraksti/specs, projekti, citāts, CTA, footer virsraksti
- Page-heads (breadcrumb, virsraksti, lede)
- Kontaktu forma: label, placeholder, select opcijas, pogas, "Atbildam 4h laikā…"
- Kontaktu info virsraksti + apraksti (Tālrunis/E-pasts/Bāze/Rekvizīti)

**ATSTĀT (nemainīt)**:
- Brenda nosaukums "DLL-Transports", tagline "Internationale Transport & Logistik" (jau DE)
- Tālrunis +371 29 242 181, e-pasts dlltransports@gmail.com
- Partneru nosaukumi (LATVENERGO, BMGS, UPB, SCHWENK, RB Rail, MERKS, LNK Group)
- Tehnikas modeļi (Goldhofer STN-L3, Faymonville MAX 100, Scania, MAN…)
- Reģ. Nr. 58503015451, adrese Emburga/LV-3851 (var lokalizēt valsts nosaukumu)
- Mērvienības (t, m³, m, h, km), © gads

## Piezīmes
- Placeholder-dati (98.4%, 12 480 h, partneri, atsauksme) — apstiprināt PIRMS tulkošanas, lai netulko datus, kas mainīsies (skat. galveno `_wp-export/README.md`).
- Latviešu/RU/DE diakritika UTF-8 — pārbaudīt, ka pareizi saglabājas (LV jau strādā).
- Kad gatavs tulkot — varu ģenerēt EN/RU/DE HTML no LV avota un publicēt ar to pašu MCP plūsmu.
