# AI Dizaina Brief — DLL-Transports mājas lapa

> **Lietojums:** kopē šo dokumentu (vai konkrētas sadaļas) kā prompt
> jebkuram AI dizaina rīkam: **Midjourney**, **Figma AI**, **Framer AI**,
> **Lovable**, **v0**, **Wix AI**, **WordPress AI page builder** u.c.
>
> Detalizēta projekta info: sk. `DOCS/PROJEKTA_INFO.md`.

---

## 1. One-liner (īsākais brief)

> Modern, fast, lightweight WordPress website for **DLL-Transports** — a
> 20-year-old Latvian international freight & heavy-haul logistics company.
> Yellow + dark-grey corporate palette, bold sans-serif type, large fleet
> photography. Mobile-first, Lighthouse ≥ 90. Dual audience: **B2B** (request
> a quote) and **B2C** (modular-home delivery with indicative pricing).

---

## 2. Klients un pozicionējums

- **Uzņēmums:** SIA DLL-Transports — *Internationale Transport und Logistik*
- **Pieredze:** 20+ gadi
- **Ģeogrāfija:** Latvija, Baltija, visa ES
- **Galvenā vērtība:** *"Vienmēr gatavi veikt papildu kilometru klienta labā"*
- **Atslēgvārdi:** **PUNKTUALITĀTE · KOMPETENCE · KVALITĀTE**
- **Tonis:** profesionāls, uzticams, "smags-bet-precīzs" (heavy industry,
  bet ne lēts/lauku). Nevis korporatīvi sterils — drīzāk kā *premium
  industrial*.

---

## 3. Mērķauditorija un divi konversijas ceļi

| Segments | Kas viņi ir | Ko viņi meklē | CTA |
|---|---|---|---|
| **B2B (primārais)** | Ražotāji, būvfirmas, lauksaimnieki, log. koordinatori | Uzticams partneris regulāriem/lielgabarīta pārvadājumiem | **"Pieprasīt piedāvājumu"** forma |
| **B2C (jauns)** | Privātpersonas, kas pasūtījušas **moduļu māju** | Skaidra cena par piegādi + uzstādīšanu objektā | **"Aprēķināt piegādes cenu"** vai cenu paketes |

→ Dizainam **abi ceļi jāatpazīst pirmajā ekrānā** (split-hero vai divas
skaidras CTA pogas).

---

## 4. Vizuālā valoda

### Krāsas
- **Primārā:** dzeltenā (`#FFD200` / `#F5C518` rajons — DLL autoparka korp. krāsa)
- **Sekundārā:** tumši pelēka / antracīts (`#1E1E1E`, `#2C2C2C`)
- **Akcents:** oranžs brīdinājuma elementiem un bultām (`#FF8A00`)
- **Fons:** balts + ļoti gaiši pelēks (`#F7F7F7`) sadaļu nodalīšanai
- **Teksts:** tumši pelēks (NEVIS pilnīgi melns) `#222`

### Tipogrāfija
- Sans-serif, geometriska, ar spēcīgu kontrastu starp regular un bold
- Iesakāmie: **Inter**, **Manrope**, **Plus Jakarta Sans**, **DM Sans**
- Virsraksti — UPPERCASE / heavy weight, plašas atstarpes (kā piedāvājuma PDF)
- Pamatteksts — 16–18 px, augsta `line-height` (~1.6)

### Grafiskie elementi
- **Dzeltenas "bultu" formas** — vadošais dekoratīvais motīvs (jau eksistē
  brand'ā, sk. piedāvājuma PDF). Iebūvēt sekciju pārejās, hover-statēs, CTA.
- **Lielas, "kinematogrāfiskas" foto bildes** — autoparks reālā darba vidē
  (nevis stock). Pieejami ~687 MB oriģinālu `DOCS/Bildes/` (MAN, SCANIA,
  GOLDHOFER, DOLL, JCB, MAN TGE, PILOTS, TRAILER).
- Ikonas — outline-stila, vienmērīgi (Lucide / Heroicons / Tabler)
- Bez stock-fotogrāfijām, bez ilustrētiem cilvēciņiem, bez 3D rendera

### Logo
- Pieejams `DOCS/Logo faili/`: vektors `DLL.ai` + PNG varianti (uz balta,
  pelēka, transparent foniem) + 320×132 px header variants

---

## 5. Galvenās sadaļas un info-arhitektūra

```
SĀKUMS
  ├─ Hero (split-CTA: B2B "Pieprasīt piedāvājumu" + B2C "Moduļu māju piegāde")
  ├─ 3 USP (Punktualitāte · Kompetence · Kvalitāte) ar skaitļiem (20+ gadi, 10+ vienības, …)
  ├─ Pakalpojumu grid (12 sadaļas ar ikonām)
  ├─ Autoparka katalogs (GOLDHOFER, MAX 100, DOLL, MAN, SCANIA, JCB, NISSAN)
  ├─ Realizētie projekti (3 izceltie case-study)
  ├─ Sadarbības partneru logo siena
  ├─ Klientu atsauksmes (carousel)
  └─ CTA josla + kontakti
PAR MUMS · PAKALPOJUMI (12) · TEHNIKAS VIENĪBAS · PROJEKTI · PARTNERI
ATSAUKSMES · KONTAKTI · PIEPRASĪT PIEDĀVĀJUMU
```

**Pakalpojumu saraksts (12):**
1. Treilera pārvadājumi
2. Starptautiskie un vietējie kravu pārvadājumi
3. Lielgabarīta kravu pārvadājumi
4. Kravu pārvadājumi ar manipulatoru
5. Ceļamkrāna un autoceltņa pakalpojumi
6. Ekspress piegāde
7. Atkritumu apsaimniekošana un konteineru pārvadājumi
8. Būvtehnikas pakalpojumi
9. Mašīnu un tehnikas transportēšana
10. Pavadošais transports
11. Noliktavu pakalpojumi
12. **Moduļu māju piegāde** *(jauns B2C virziens)*

---

## 6. Tehniskās prasības (svarīgi AI builder izvēlei)

- **CMS:** WordPress (klients pārvalda saturu pats)
- **Veiktspēja:** **Lighthouse mobile ≥ 90** (Performance + SEO + A11y)
- **Page size:** ielādes mērķis < 1 MB pirmajai lapai (bez video)
- **Attēli:** WebP/AVIF, `loading="lazy"`, `srcset` responsīvi
- **Mobile-first:** breakpoint pirmais — 360 px ekrāns
- **Bez smagiem builder'iem:** **NĒ Elementor Pro ar 100+ widget'iem**,
  **NĒ Divi**. Drīzāk **Bricks Builder**, **Breakdance**, **GeneratePress
  + GenerateBlocks**, vai pat klasiskā Gutenberg + custom block teme.
- **SEO:** semantiska HTML struktūra (H1→H6), schema.org LocalBusiness +
  Service, OpenGraph, sitemap.xml
- **Forma:** spam-aizsardzība (hCaptcha/Cloudflare Turnstile, nevis reCAPTCHA)
- **Sākotnējās valodas:** LV; multilingual-ready (EN/RU/DE pievienojami vēlāk)
- **Hostings:** ātrs (LiteSpeed/Nginx + Redis object cache)

---

## 7. Saturs, kas JĀIZVEIDO dizainerim (placeholder OK)

> Šie elementi šobrīd **nav** klienta materiālos, izmanto placeholder'us:

- **Sadarbības partneru logo** (~6–12 logo siena)
- **Klientu atsauksmes** (3–6 citāti ar autora vārdu/uzņēmumu)
- **Realizēto projektu kartiņas** (3–6, ar bildi + 1 teikuma aprakstu)
- **Moduļu māju cenu paketes** (piem., 3 paketes: līdz 50 km / 200 km /
  pielāgota)

---

## 8. Saturs, kas JAU EKSISTĒ (var izmantot uzreiz)

- **Pilni pakalpojumu apraksti (visiem 11 + moduļu māju TODO):**
  `DOCS/Apraksti/Mājas lapas sadaļu teksti.odt`
  (kopija: skat. `DOCS/PROJEKTA_INFO.md` §5)
- **Autoparka tehniskie dati (izmēri, celtspēja):**
  `DOCS/PROJEKTA_INFO.md` §6
- **Autoparka oriģinālfoto:** `DOCS/Bildes/`
- **Logo varianti:** `DOCS/Logo faili/`
- **Misija, vīzija, vērtības:** `DOCS/PROJEKTA_INFO.md` §1
- **Kontakti, rekvizīti:** `DOCS/PROJEKTA_INFO.md` §1

---

## 9. Atskaites punkti (kas ir un kas nav)

- **Esošā lapa (NEKOPĒT — pārveidot):** https://www.dlltransports.lv/
- **Brand atskaites materiāls (kā jaunajai jāizskatās stilistiski):**
  `DOCS/Piedāvājumu faili/WEB_Kravu pārvadājumu piedāvājmus_061023.pdf`
  → dzeltens + bultu motīvi + tīrs grid + lielas autoparka bildes

### IZVAIRĪTIES NO
- Stock-foto cilvēkiem biroju krēslos
- Pārmērīgas animācijas (parallax kalnos, AOS uz visa)
- Hamburger menu desktopā (vietas pietiek)
- Garām, nelasāmām pirmā ekrāna virsrakstu freida
- Pilnekrāna video hero (lēna ielāde)
- "Mūsdienīgs gradients" — drīzāk solid yellow + foto

---

## 10. Veiksmes kritēriji (pirms nodošanas)

- [ ] Pirmais ekrāns mobilajā ielādējas < 2 s 4G tīklā
- [ ] Lighthouse mobile: Perf ≥ 90, SEO ≥ 95, A11y ≥ 95
- [ ] Abi konversijas ceļi (B2B + B2C) sasniedzami 1 klikšķī no sākuma
- [ ] Visi 12 pakalpojumi ar pilniem aprakstiem un savu URL
- [ ] Pieprasījuma forma iesniedz uz dlltransports@gmail.com
- [ ] Tel. nr. +371 29242181 sticky uz mobilā
- [ ] Konteksts (logo, krāsas, foto) atbilst brand'am
