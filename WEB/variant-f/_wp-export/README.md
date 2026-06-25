# DLL-Transports — Variant F → WordPress (statiskā fāze)

Materiāli dizaina pārlikšanai uz DLL WordPress lapu caur **coredigify-wp** pluginu (MCP).
Mērķis šajā fāzē: ātri publicēt dizainu klienta apstiprinājumam. Redaktora arhitektūra
(block theme / custom bloki) — vēlāka fāze, kad dizains apstiprināts.

> Statusa lēmumi: **statisks vispirms** · **atkārtoti lietojama sistēma** (DLL = 1. piemērs) ·
> redaktora modelis vēl jāizlemj.

---

## 📁 Saturs

```
_wp-export/
├─ README.md                  ← šis fails (publicēšanas plāns)
├─ css/dll-variant-f.css      ← VISS CSS, scoped zem .dllf, ar @import fontiem
└─ pages/
   ├─ home.html               ← Sākums   (ietin <div class="dllf">)
   ├─ services.html           ← Pakalpojumi
   └─ contact.html            ← Kontakti (forma = DEMO)
```

Avots: `WEB/variant-f/{home,services,contact}.html` + `styles.css`.

---

## 🧩 Kā tas strādā

1. **CSS** ielādē 1× globāli ar `wp_set_css` (theme-independent → strādā neatkarīgi no tēmas/Divi).
   Viss ir scoped zem `.dllf`, tāpēc **nesabojā** WP tēmu, admin vai Divi.
2. **Katra lapa** = HTML no `pages/*.html`, ievietots caur `wp_create_page` / `wp_update_page`.
   Saturs jau ietīts `<div class="dllf">…</div>`.
3. **Fonti** (Manrope + JetBrains Mono) ielādējas caur `@import` CSS augšā — nekas papildus nav jādara.
4. **Lapas template**: izmanto **blank / full-width canvas** (Divi: builder OFF + blank template),
   lai dizains iet edge-to-edge un tēmas header/footer netraucē (dizainam ir SAVS header+footer).

---

## 🖼️ Bilžu karte (augšupielādēt ar `wp_upload_media`)

Pēc augšupielādes WP atdod katras bildes URL. HTML failos ir žetons `{{MEDIA}}/faila-nosaukums.jpg`.
Aizvieto `{{MEDIA}}` ar augšupielādēto bilžu **bāzes URL** (parasti `/wp-content/uploads/YYYY/MM`),
vai katru `{{MEDIA}}/x.jpg` ar konkrēto media URL.

Avota mape: `WEB/variant-f/img/`

| Fails | Lietots | Kur |
|---|---|---|
| hero.jpg | ✅ | home — hero fons |
| fleet-goldhofer.jpg | ✅ | home — autoparks + projekts /01 |
| fleet-scania.jpg | ✅ | home — autoparks |
| fleet-max100.jpg | ✅ | home — autoparks |
| fleet-doll.jpg | ✅ | home — autoparks |
| fleet-trailer.jpg | ✅ | home — autoparks |
| fleet-man.jpg | ✅ | home — autoparks + projekts /02 |
| karjera.jpg | ✅ | home — projekts /03 |
| ras-goldhofer.jpg | ✅ | home — rasējumi |
| ras-max100.jpg | ✅ | home — rasējumi |
| ras-doll.jpg | ✅ | home — rasējumi |
| ras-mega.jpg | ✅ | home — rasējumi |
| tilts.jpg | ✅ | home — foto josla |
| fleet-tenta.jpg | ✅ | home — autoparks (JAUNS: tenta vilcēji) |
| fleet-mantge.jpg | ✅ | home — autoparks (JAUNS: MAN TGE busiņš) |
| proj-1.jpg / proj-2.jpg / proj-3.jpg | ✅ | home — realizētie projekti (reālās bildes) |
| ras-treileris.jpg | ❌ | NETIEK lietots variant-f |

> Reālās bildes ņemtas no `DOCS/Reklāma - Mājas lapas redizains/` (autoparks/projekti), pārmērogotas uz ~1200–1400 px.

> Optimizācija: `hero.jpg` (~360 KB) un fleet/karjera/tilts (~110–260 KB) — pirms produkcijas
> ieteicams pārkonvertēt uz WebP/AVIF un saspiest. Rasējumi jau mazi.

---

## 🔗 Iekšējās saites (jau pārliktas uz WP ceļiem)

HTML jau lieto šos slug'us — **pielāgo, ja WP lapām būs citi**:

| Dizains | WP ceļš |
|---|---|
| home.html | `/` |
| services.html | `/pakalpojumi/` |
| contact.html | `/kontakti/` |
| `#fleet`, `#drawings`, `#projects` | enkuri uz home (`/#fleet` no citām lapām) |
| `?aud=b2b` / `?aud=b2c` | saglabāti (kontaktu forma) |

---

## 🚀 Publicēšanas secība (MCP)

> Precīzos tool-parametrus ielādēšu izpildes brīdī. Augsta līmeņa plāns:

1. `wp_upload_media` — augšupielādēt 13 bildes no `img/`. Pierakstīt atdotos URL.
2. `pages/*.html` — `{{MEDIA}}` → media bāzes URL.
3. `wp_set_css` — ielikt `css/dll-variant-f.css` saturu (theme-independent).
4. `wp_create_page` ×3 — Sākums / Pakalpojumi / Kontakti (blank template, Divi builder OFF).
5. `wp_set_front_page` — Sākums kā front page.
6. `wp_menu_upsert` — (neobligāti) primārā izvēlne; dizainam ir savs header, tāpēc tēmas izvēlne var nebūt vajadzīga.

---

## ⚠️ Jārisina pirms produkcijas (nav statiskās fāzes blokētāji)

### Forma & JS (contact.html)
- Forma ir **DEMO** (`onsubmit → alert`). Aizvietot ar īstu: WPForms / coredigify plugina forma /
  e-pasta sūtīšana. B2B/B2C toggle + `?aud=b2c` JS — WP parasti izņem inline `<script>` no satura,
  tāpēc pievienot caur tēmu/plugin vai aizstāt ar īsto formu.

### Valodu pārslēgs (LV/EN/RU/DE)
- Pogas ir **vizuālas, neaktīvas**. Reālai daudzvalodībai — Polylang (coredigify-wp jau Polylang-aware).

### `<script>` un SVG saglabāšana
- Pārliecināties, ka publicēšanas ceļš nesanitizē inline SVG ikonas un stilus
  (coredigify-wp push parasti saglabā raw HTML — pārbaudīt pēc 1. lapas).

### Sticky header
- `.site-head` ir `position:sticky`. Ja tēmas content-wrapper'im ir `overflow:hidden`, sticky nestrādās
  → izmantot full-width/blank template (skat. augstāk).

---

## 🟢 SATURA AUDITS — stāvoklis (2026-06-25)

Salīdzināts ar klienta avota tekstiem (`DOCS/Reklāma - Mājas lapas redizains/`).
Izdomātie dati nomainīti pret reāliem / noņemti; saturs aizvietots ar klienta tekstiem.

**✅ IZLABOTS (visās 3 lapās + WP eksportā + i18n):**
- Adrese: Brocēnu nov. → **„Vēzīši", Emburga, Cieceres pag., Saldus nov., LV-3851**
- Darba laiks: 08:00 → **09:00–18:00** (Se–Sv slēgts)
- E-pasts: gmail → **info@dlltransports.lv**
- Hero: "kopš 2004" → **kopš 2009**; "12 pakalpojumi" → **11**
- USP kartes: izdomātā statistika (98.4% / 12 480 h / 0.3% / €1 M) → **reāli vērtību apraksti**
- Pakalpojumi: **MAX 100 noņemts** (klients: nav tādas mašīnas); **Moduļu mājas noņemtas** (nav avota sarakstā)
- Konteineri: 8/20/35 → **16/22/35 m³**; Noliktava: "2400 m²" → **noma 10/20/30 m²**
- Krāni: "līdz 80 t" → **MAN/SCANIA autoceltņi ar reāliem datiem (JIB līdz 26 m)**
- Services apraksti: aizvietoti ar **klienta tekstiem**
- Kontakti: pilns saraksts (3 personas), **2 bankas** (Swedbank + Luminor), Waze/Google Maps saites

**🟡 VĒL VAJAG NO KLIENTA (nevarēja aizpildīt no avota):**
- **home — partneri**: LATVENERGO/BMGS/UPB/SCHWENK/RB Rail/MERKS/LNK — *izdomāti nosaukumi, vēl lapā.* Vajag reālu partneru sarakstu vai noņemt (juridisks risks).
- **home — atsauksme**: "Lielgabarīts uz Norvēģiju 4 nedēļās…" — *izdomāta, vēl lapā.* Vajag reālu vai noņemt.
- **home — projekti** (3 apraksti) un **hero "4h reakcija"** — apstiprināt vai aizstāt.
- **info@dlltransports.lv** — apstiprināt, ka šāds e-pasts/alias eksistē.
- **i18n vārdnīca**: jaunie LV pakalpojumu teksti **vēl nav iztulkoti** EN/RU/DE — `i18n-dict.cjs` jāpapildina, citādi šie fragmenti rādās latviski.
- **Bildes**: fleet/rasējumi vēl lieto vecos failus (t.sk. fleet-max100.jpg). Jāizvēlas reālās bildes no `DOCS/.../Bildes/` pa vienībām.

**JAUNAS VIENĪBAS no klienta "nepieciešamās izmaiņas" (vēl jāpievieno):**
- MAN TGE (pelēkais busiņš, ekspress, 3 EPAL) · Vilcēji ar tenta piekabēm
- Krānu celtspējas diagrammas ar/bez JIB (MAN + SCANIA)

> Globālais CLAUDE.md aizliedz "fake data" produkcijā — atlikušie 🟡 punkti jāatrisina pirms go-live.

---

## ➡️ Nākamā fāze (kad dizains apstiprināts)

Pārveidot sekcijas par **atkārtoti lietojamu sistēmu**:
- Viegla custom **block theme** (theme.json: krāsas/fonti/atstarpes) — bez page builder.
- Sekcijas → **block patterns** (vai custom bloki) → klients labo native WP redaktorā.
- coredigify-wp plugins = dizaina tokeni + header/footer + deploy/sync + dizaina "lock".
- DLL = pirmais klients; bāze pārlietojama nākamajiem.
