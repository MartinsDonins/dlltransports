# DLL-Transports — Web dizaina varianti (handoff pakotne)

> Pakotne **Claude Code aģentam** vai izstrādātājam: 4 web dizaina varianti SIA DLL-Transports mājas lapai, kopā ar instrukcijām, kā tos pievienot Git repozitorijam `MartinsDonins/dlltransports`.

---

## ⚡ TL;DR — kā šo dabūt uz Git (Claude Code soļi)

> **Aģentam:** veic šos soļus secīgi. Komandas izpildi terminālī, *NEPUSH* tieši uz `main` — izveido `design-samples` branch.

```bash
# 1. Klonē repo (ja vēl nav)
git clone https://github.com/MartinsDonins/dlltransports.git
cd dlltransports

# 2. Pārliecinies, ka esi uz main un viss aktuāls
git checkout main
git pull origin main

# 3. Izveido jaunu branch dizaina paraugiem
git checkout -b design-samples

# 4. Izveido mērķa mapi
mkdir -p DOCS/Dizaina_paraugi

# 5. Pārkopē šī handoff pakotnes saturu uz mērķa mapi
#    (pārkopē visu, IZŅEMOT pašu README-CC.md — tas ir aģentam, ne repo)
#    Komanda jāpielāgo atkarībā no kur tiek izvilkts ZIP arhīvs.
cp -r ~/Downloads/design_handoff_dll_transports/index.html DOCS/Dizaina_paraugi/
cp -r ~/Downloads/design_handoff_dll_transports/variant-a DOCS/Dizaina_paraugi/
cp -r ~/Downloads/design_handoff_dll_transports/variant-c DOCS/Dizaina_paraugi/
cp -r ~/Downloads/design_handoff_dll_transports/variant-d DOCS/Dizaina_paraugi/
cp -r ~/Downloads/design_handoff_dll_transports/variant-e DOCS/Dizaina_paraugi/
cp -r ~/Downloads/design_handoff_dll_transports/tweaks-panel.jsx DOCS/Dizaina_paraugi/
cp -r ~/Downloads/design_handoff_dll_transports/assets DOCS/Dizaina_paraugi/
cp ~/Downloads/design_handoff_dll_transports/README.md DOCS/Dizaina_paraugi/

# 6. Pievieno, commit'o, push'o
git add DOCS/Dizaina_paraugi/
git commit -m "docs: pievienoti 4 web dizaina paraugi (A · C · D · E)

- Variant A — Classic Premium Industrial (PDF stils)
- Variant C — Heavy-industry Brutalist (monospace, grid)
- Variant D — Dark-first ar dzelteno kā signāla krāsu
- Variant E — Split-screen B2B/B2C
Katrs ar 3 lapām: Sākums · Pakalpojumi · Kontakti.
Pieejams arī Tweaks panelis krāsu/fontu maiņai."
git push -u origin design-samples

# 7. Izveido Pull Request (vai paziņo lietotājam)
gh pr create --base main --head design-samples \
  --title "Web dizaina paraugi — 4 varianti" \
  --body "Pievienoti 4 web dizaina virzieni mapē DOCS/Dizaina_paraugi/. Atver index.html, lai aplūkotu visus 4 variantus."
```

**Ja nav `gh` CLI:** izveido PR manuāli, atverot saiti, ko `git push` izvada (`https://github.com/MartinsDonins/dlltransports/pull/new/design-samples`).

> Pirms commit'ot — paskaties caur failiem, ka nekas izskatās salauzts. Pārbaudi, ka relatīvie ceļi joprojām strādā (skat. **"Ceļu validācija"** zemāk).

---

## Par šo pakotni

Pakotnē ir **4 dizaina varianti** uzņēmuma DLL-Transports jaunajai mājas lapai. Tie ir izveidoti pēc tā paša repozitorija brīfa (`DOCS/AI_DIZAINA_BRIEF.md`) — domāti kā **vizuāli paraugi**, nevis kā gatavs WordPress kods.

Šis ir **statisks HTML/CSS prototips**, nevis ražošanas kods. Reālo implementāciju paredzēts veikt WordPress (Bricks Builder / Breakdance / GeneratePress + GenerateBlocks), izmantojot šo dizainu kā vizuālo atskaiti.

### Fidelity līmenis
**High-fidelity** — krāsas, tipogrāfija, atstarpes un layout ir gatavi atskaitei. Daži saturi (atsauksmes, projektu kartiņas, partneru logo) ir placeholder'i saskaņā ar brīfu §7.

---

## 4 varianti

Variantu atlase tika veidota tā, lai parādītu plašu amplitūdu — no droša/klasiska līdz drosmīgam/diferencētam. Klients var izvēlēties vienu, vai sajaukt elementus.

| Variants | Stils | Kad piemērots |
|---|---|---|
| **A — Classic Premium Industrial** | Gaišs fons, dzeltenas bultas, plašs grids, lielas autoparka bildes. Vistuvākais piedāvājumu PDF stilam. | Drošs, neriska variants. Lielāko B2B klientu komforta zona. |
| **C — Heavy-industry Brutalist** | Grida fons, monospace, lieli skaitļi, terminal-like UI. Uzņēmums kā precīzi mērāma sistēma. | Konkurences diferenciācija. Spēcīgs ražotājiem, kuri novērtē tehnisku precizitāti. |
| **D — Dark-first / Signal Yellow** | Antracīta fons, dzeltenais kā signāla krāsa, kinematogrāfiskas bildes ar dark overlay. | Premium pozicionējums. Reklāmas materiāliem un emocionālai ietekmei. |
| **E — Split-screen B2B/B2C** | 50/50 sadalījums no hero ekrāna — B2B (gaišs) pa kreisi, B2C/moduļu māja (tumšs, ar cenu paketēm) pa labi. | Skaidri uzrunā abas auditorijas vienlaicīgi. Risina brīfa §3 prasību par diviem konversijas ceļiem. |

Katrs variants iekļauj 3 lapas (Sākums, Pakalpojumi, Kontakti) un katrā ir **Tweaks panelis** krāsu/fontu/blīvuma maiņai (paslēpts pēc noklusējuma; pieejams labajā apakšstūrī, kad ielādēts iframe ar `__activate_edit_mode` ziņojumu — Anthropic dizaina rīka iezīme; reālā implementācijā nav vajadzīga).

---

## Failu struktūra

```
DOCS/Dizaina_paraugi/
├── README.md                      ← šis fails
├── index.html                     ← variantu izvēles lapa (atver vispirms)
├── tweaks-panel.jsx               ← kopīga komponente (var izņemt produkcijā)
├── assets/
│   ├── logo-white.png             ← DLL logo uz balta fona
│   └── logo-320.png               ← DLL logo 320×132 (header variants)
├── variant-a/
│   ├── home.html
│   ├── services.html
│   ├── contact.html
│   ├── styles.css
│   └── tweaks.jsx
├── variant-c/
│   ├── home.html · services.html · contact.html
│   ├── styles.css · tweaks.jsx
├── variant-d/
│   ├── home.html · services.html · contact.html
│   ├── styles.css · tweaks.jsx
└── variant-e/
    ├── home.html · services.html · contact.html
    ├── styles.css · tweaks.jsx
```

### Ceļu validācija
Kad pārkopē uz `DOCS/Dizaina_paraugi/`:
- `index.html` saites uz `variant-a/home.html` u.c. — **STRĀDĀ** (relatīvi)
- `variant-*/home.html` saites uz `../tweaks-panel.jsx` — **STRĀDĀ** (vienu līmeni augšup)
- `index.html` neielādē nekādus asetus no `assets/` (tikai Google Fonts CDN un inline SVG previews) — **OK**
- Logo asseti `assets/` šobrīd **netiek izmantoti** HTML failos (visās variantās logo ir SVG/text-based). Atstāj mapi referencei.

**Pārbaudi pēc kopēšanas:** atver `DOCS/Dizaina_paraugi/index.html` pārlūkā lokāli — ja visas 4 kartes parādās un to klikšķi atver attiecīgo variantu, viss kārtībā.

---

## Dizaina sistēma

### Krāsas (no brīfa §4)

| Tokens | Vērtība | Lietojums |
|---|---|---|
| `--yellow` | `#FFD200` | Primārā zīmola krāsa (autoparka korp.) |
| `--yellow-deep` | `#F5C518` | Yellow hover state |
| `--orange` | `#FF8A00` / `#FF7A00` | Akcents brīdinājumiem, bultām |
| `--ink` | `#0B0B0B` / `#161616` | Galvenais teksts, tumšais fons |
| `--ink-2` | `#1F1F1F` / `#2C2C2C` | Sekundārais tumšais |
| `--mute` | `#6B6B6B` | Mutēts teksts, labels |
| `--bg` (light) | `#FFFFFF` / `#F4F2EE` / `#F8F6F1` | Fons (atkarīgs no varianta) |
| `--bg` (dark) | `#0A0A0A` / `#0E0E0E` | Tumšo variantu fons |

### Tipogrāfija
- **Display:** Space Grotesk · Plus Jakarta Sans · Manrope (700–800 weight, tight letter-spacing -0.03 līdz -0.05)
- **Body:** Manrope · DM Sans (400–500)
- **Mono:** JetBrains Mono (eyebrows, kods, datu etiķetes)
- Visās lapās: virsraksti ir UPPERCASE/heavy. Atstarpes plašas (1.4–1.6 line-height).

### Spacing
- Sekciju vertikālā atstarpe: 80–120px
- Karšu padding: 24–48px
- Border-radius: 0 (variant A, C — taisni) līdz 18–24px (D, E — mīkstāki)

### Komponentes, kas atkārtojas
- **Header** ar utility bar (telefons, e-pasts, valodu slēdzis LV/EN/RU/DE), primary nav, CTA poga
- **Hero** ar 2 CTA pogām (B2B "Pieprasīt piedāvājumu" + B2C "Moduļu māju piegāde / aprēķināt")
- **3 USP** karti (Punktualitāte · Kompetence · Kvalitāte)
- **12 pakalpojumi** ar ikonām un specifikāciju datiem (12. — moduļu māja — atzīmēts kā JAUNS / B2C)
- **Autoparks** ar lielām foto kartēm (MAN TGS, Scania R 580, Goldhofer STN-L3, DOLL Vario Plus, JCB JS220, Faymonville MAX 100, MAN TGE × 3)
- **3 projektu case-studies** (placeholder saturs)
- **Sadarbības partneru logo siena** (placeholder text)
- **3 klientu atsauksmes** (placeholder citāti)
- **CTA banner + footer** ar rekvizītiem

### Bildes
**Šobrīd visās variantās tiek izmantotas Unsplash placeholder bildes** (truck/logistics/crane). Reālajā implementācijā **jāaizvieto** ar oriģinālajām no `DOCS/Bildes/` (687 MB, repo ir tikai README — bildes lokāli pie klienta).

Lietotās Unsplash URL-veidnes:
```
https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=1600&q=80
```
Foto ID, kas tiek izmantoti:
- `1601584115197-04ecc0da31d7` — autoparka heavy hauler
- `1494412651409-8963ce7935a7` — semi truck šosejā
- `1530124566582-a618bc2615dc` — krāns
- `1541888946425-d81bb19240f5` — heavy lift
- `1591768793355-74d04bb6608f` — JCB
- `1556761175-5973dc0f32e7` — Faymonville/MAX 100
- `1568605114967-8130f3a36994` — moduļu māja

---

## Brīfa kritēriji — kas izpildīts

- [x] Visi 12 pakalpojumi ar saviem ID (`#s01` līdz `#s12`)
- [x] B2B + B2C konversijas ceļi pieejami no hero
- [x] Tel. `+371 29 242 181` un e-pasts `dlltransports@gmail.com` redzami galvenē un footerī
- [x] LV/EN/RU/DE valodu slēdzis (placeholder, savieno tikai ar LV)
- [x] Krāsas un fonti atbilst brīfam §4
- [x] Dzeltenā kā vadošais motīvs, bultas un "smags-bet-precīzs" tonis
- [x] Mobile-responsive (visi varianti — `@media (max-width:1000px)`)

- [ ] **Reālas autoparka bildes** — placeholder Unsplash, jāaizvieto
- [ ] **Reāli partneru logo** — placeholder ar uzņēmuma nosaukumiem
- [ ] **Reālas atsauksmes ar autora vārdu/uzņēmumu**
- [ ] **Moduļu māju cenu paketes** — pašreiz placeholder cenas (€1 290 / €1 890 / pielāgota); jāprecizē ar klientu
- [ ] **WordPress implementācija** (Bricks/Breakdance/Gutenberg)
- [ ] **Pieprasījuma forma uz `dlltransports@gmail.com`** — pašreiz `onsubmit` rāda demo `alert()`
- [ ] **hCaptcha vai Turnstile** spam-aizsardzībai (brīfa §6)

---

## Ieteikumi nākamajiem soļiem (Claude Code aģentam)

1. **Pēc commit'a, atveriet PR** ar 4 screenshots (pa vienam katram variantam — atver `home.html` pārlūkā un ekrānuzņem).
2. **Klients izvēlas vienu variantu** (vai pasaka, ko sajaukt).
3. **Bilžu piegāde** — saskaņot ar klientu, kā piekļūt 687 MB `DOCS/Bildes/` (ja nav repo, varbūt Drive/Dropbox).
4. **WordPress staging** — uzstādīt Bricks Builder vai GeneratePress un sākt translēt izvēlēto variantu uz reālajiem blokiem.
5. **SEO/A11y/Performance** — `Lighthouse mobile ≥ 90` mērķis (brīfa §6). Šajā dizainā nav ievērojamu blokējumu.

---

## Atskaites uz repo

- **Pilns brīfs:** `DOCS/AI_DIZAINA_BRIEF.md` (oriģinālais avots)
- **Plašāka info:** `DOCS/PROJEKTA_INFO.md`
- **Logo:** `DOCS/Logo faili/` (jau repo)
- **Bildes:** `DOCS/Bildes/` (lokāli, ne repo)

---

_Sagatavots ar Claude (Anthropic). 4 varianti par bāzi vairāk variācijām — kad būs zināms izvēlētais virziens, var radīt papildu lapas tādā pašā stilā._
