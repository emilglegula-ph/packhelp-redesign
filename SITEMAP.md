# Packhelp Redesign — Sitemap

Ten dokument mapuje strony tego repo na realną strukturę **packhelp.co.uk**
(stan na 2026-07-31, wyciągnięte z live nawigacji/megamenu/stopki). Cel: gdy
dostaję prompt o nową stronę, sprawdzam tu, czy ma odpowiednik na żywym
sajcie (→ adaptuję realne copy/strukturę) czy jest to koncepcja specyficzna
dla redesignu (→ wymyślam sam, zgodnie z `CLAUDE.md`).

Status: **Built** (istnieje w repo) / **Planned** (jest na live sajcie, nie
zbudowane jeszcze) / **New concept** (istnieje w repo, ale nie ma
bezpośredniego odpowiednika na packhelp.co.uk — redesign świadomie
konsoliduje/upraszcza).

---

## 1. Zbudowane strony i ich odpowiedniki na live sajcie

| Plik w repo | Live URL / odpowiednik | Uwagi |
|---|---|---|
| `index.html` | `/` | Strona główna |
| `packaging.html` | `/packaging/` | Katalog/shop kategorii opakowań |
| `sample-packs.html` | `/packaging/samples/`, `/app/sample-packs/` | Wybór próbek, cart-flow |
| `deals.html` | `/deals/` | Karuzela/strona promocji |
| `case-studies.html` | `/case-studies/` | Lista case studies |
| `case-study-hemp-juice.html` | `/case-study/hemp-juice-dietary-supplement-packaging/` | Pojedynczy case study |
| `case-study-oase.html` | `/inspiration/oase-hair-vitamins/` | Pojedynczy case study |
| `contact.html` | `/contact/` | Kontakt |
| `get-a-quote.html` | `/packhelp-brief-v2/` | "Brief"/wycena — na live sajcie to formularz brief, nie osobny "get a quote" |
| `build-your-box.html` | — | **New concept**, patrz sekcja 3 |
| `industries.html` | `/packaging/?industry=X` (filtr, nie osobna strona) | **New concept**, patrz sekcja 3 |
| `press.html` | `/press/` | Press kit, wzmianki medialne wg lat, fakty firmowe (zbudowane 2026-07-31, copy zaadaptowane z live strony) |
| `impressum.html` | `/impressum/` | Dane firmy, adres, kontakt, godziny pracy — proste karty label/value, bez zdjęć (zbudowane 2026-07-31, copy zaadaptowane z live strony) |

## 2. Planned — realne strony/sekcje z packhelp.co.uk, jeszcze nie zbudowane

Uporządkowane wg głównego menu. Gdy dostanę prompt pasujący do jednej z tych
pozycji, traktuję to jako "ma żywy odpowiednik" — szukam realnego copy na
podanym URL zamiast wymyślać od zera.

### Packaging (katalog, `/packaging/...`)
- Boxes: Mailer Boxes, Shipping Boxes, Product Boxes (Folding Cartons, Rigid
  Boxes) — `/packaging/boxes/...`
- Packaging Tubes: Tube Boxes, Mailing Tubes — `/packaging/packaging-tubes/...`
- Mailing Bags: Poly Mailers, Paper Mailing Bags — `/packaging/mailers/...`
- Product Bags: Zip Lock Bags, Drawstring Bags — `/packaging/product-bags/...`
- Carrier Bags: Paper Bags, Cotton Carrier Bags — `/packaging/bags/...`
- Accessories: Tissue & Wrapping Paper, Fillers, Tapes, Labels, Stickers,
  Other — `/packaging/packaging-accessories/...`
- Pouches — `/packaging/packaging-pouches/`
- Envelopes: Cardboard, Padded — `/packaging/envelopes/...`
- Food Packaging: Pizza Boxes, Cups and Cup Accessories —
  `/packaging/food-packaging/...`
- Containers: Bottles, Jars — `/packaging/containers/...`
- Bundles/Sets — `/packaging/sets/`

### Merchandise (`/merchandise/...`) — cała gałąź jeszcze nie zbudowana w repo
- Clothing (T-shirts, Hoodies, Sweatshirts, Jackets, Shirts, Fleece, Vests,
  Headwear)
- Office Supplies (Pens, Notebooks)
- Travel Accessories (Sunglasses, Towels)
- Tech Accessories (Powerbanks)
- Drinkware (Bottles, Tumblers, Mugs)
- Home Accessories (Candles)
- Bags (Tote Bags, Backpacks, Sports Bags, Laptop Pouches)
- Merchandise Packaging, Sets
- Named bundles: Onboarding Workday Starter Pack, Event Gift Pack, Onboarding
  Essentials Pack (`/b/<slug>/custom/`)

### Solutions / platforma (`/...`)
- Small and Medium Companies — `/small-medium-companies/`
- Large Companies — `/large-companies/`
- Marketplaces — `/marketplaces/`
- 3PL & Fulfillments — `/3pl-fullfilment/`
- Design Services — `/design-services/`
- Sourcing Services — `/sourcing-services/`
- Warehousing Services — `/warehousing-services/`
- Flexible Payments — `/payments/`

### Inne planned
- Packaging Ideas / Inspirations — `/packaging-ideas/`
- Design Showcase / Packaging Templates — `/design-showcase/`
- Blog — `/blog/`
- Help Center — `/help/` (+ podstrony typu return policy)
- Sustainability Hub — `/sustainability-2/`, Progress Reports, Supply Chain,
  Eco Badge
- Wholesale Packaging — `/large-companies/` (alias)
- Sign In — `/auth/login/`
- Pozostałe case studies: Kuyichi, Psi Bufet, Your KAYA, Fluus, XLASH
- Prawne: Terms of Service, Privacy Policy, Whistleblowing Policy

## 3. New concept — strony redesignu bez odpowiednika na live sajcie

- **`build-your-box.html`** — dedykowany, pełnoekranowy konfigurator z 3D
  preview. Live sajt robi customizację inline na stronie produktu (overlay),
  nie jako osobny multi-step flow. To świadoma decyzja redesignu, nie błąd
  mapowania — nie szukaj dla tej strony "oryginału" do adaptacji.
- **`industries.html`** — live sajt nie ma osobnej strony "industries", tylko
  filtruje katalog przez `?industry=X` (Apparel & Fashion, E-commerce,
  Electronics, Food & Drinks, Gifting, Health & Beauty, Home & Décor, HR,
  Marketing & PR, Retail). Redesign konsoliduje to w dedykowany hub — przy
  rozbudowie tej strony trzymaj się tej listy branż jako źródła prawdy dla
  nazw/kolejności.

## 4. Jak z tego korzystać przy nowym prompcie

1. Sprawdź, czy proszona strona/sekcja pasuje do wiersza w sekcji 1 (już
   zbudowana — edytuj, nie duplikuj) albo sekcji 2 (Planned — ma żywy
   odpowiednik, więc najpierw sprawdź treść pod podanym URL-em na
   packhelp.co.uk i adaptuj).
2. Jeśli nic nie pasuje — to nowa koncepcja jak w sekcji 3. Wymyśl copy sam
   (ton: sekcja 2.4 `PAGE_BUILDING_GUIDELINE.md`), zbuduj z komponentów z
   `COMPONENT_SNIPPETS.md`, i dopisz wiersz do tego pliku, żeby mapa
   zostawała aktualna.
