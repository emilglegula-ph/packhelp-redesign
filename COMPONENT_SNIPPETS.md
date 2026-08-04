# Packhelp Redesign — Biblioteka snippetów

Gotowe, realne bloki HTML wycięte z istniejących stron (nie wymyślone od nowa).
Kopiuj stąd i adaptuj (podmień tekst/obrazki/linki) zamiast rekonstruować
markup z opisu w `PAGE_BUILDING_GUIDELINE.md` za każdym razem. Numeracja
sekcji odpowiada numeracji w guideline, żeby łatwo skakać między "kiedy
użyć" (guideline) a "jak to wygląda w kodzie" (tu).

CSS dla wszystkich poniższych klas już istnieje w `components.css` (atomy) —
nie kopiuj stylów, tylko strukturę HTML. Layout specyficzny dla sekcji na
danej stronie (grid, spacing) siedzi w `<style>` tej strony.

---

## 3. Atomy

### Duet przycisków CTA (pkt 5 guideline)
```html
<a href="packaging.html" class="btn-pill lg">Shop now<svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
<a href="get-a-quote.html" class="btn-pill lg secondary">Get a quote<svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
```
Rozmiary: `lg` (hero/CTA sekcje), `sm` (nav/karty produktów, np. `.btn-pill.secondary.sm`), `md` (formularze inline). Na ciemnym tle (`cta-section`) drugorzędny przycisk to `.btn-pill.lg.outline-light`, nigdy `.secondary`.

### `.section-badge` + H2 + subheading (wzorzec nagłówka sekcji, pkt 4)
```html
<span class="section-badge">Why Packhelp</span>
<h2 class="categories-heading">Whatever you make, we pack it.</h2>
<p class="categories-subheading">150+ packaging products across six families. Printed around your brand, at yours in days.</p>
```
Rytm: badge→H2 `space-1`–`space-3`, H2→subheading `space-4`–`space-6`, subheading→CTA/toolbar `space-6`. Rozmiar H2: **3rem kanonicznie** (sekcja "pełna" jak FAQ), 2rem tylko gdy sekcja ma ciężki toolbar/karuzelę pod spodem.

### Breadcrumb (zawsze bezpośrednio nad H1, pkt 4)
```html
<nav class="pkg-breadcrumb" id="pkgBreadcrumb">
  <a href="index.html">Packhelp</a>
  <span>/</span>
  <a href="#" data-key="root">Packaging</a>
</nav>
```
Odstępy: nav→breadcrumb `space-8`, breadcrumb→H1 `space-4` — patrz pkt 4 guideline dla dwóch wariantów (z/bez padded wrappera).

### `.toggle-switch` — przełącznik trybu (2-3 opcje)
```html
<div class="toggle-switch" id="toggleSwitch">
  <div class="toggle-indicator" id="toggleIndicator"></div>
  <button class="toggle-option active" data-target="categories">Categories</button>
  <button class="toggle-option" data-target="merchandise">Merchandise</button>
  <button class="toggle-option" data-target="industries">Industries</button>
</div>
```
JS liczy `offsetWidth/offsetLeft` żeby animować `.toggle-indicator` — nie hardkoduj szerokości. Segmentowany pełnoszerokościowy wariant (np. sample-packs Print/Size tabs) dodaje `flex:1 1 0` na `.toggle-option`.

### Pola formularza
```html
<!-- pill (search/newsletter, kontekst "lekki") -->
<input type="email" class="footer-newsletter-input" placeholder="Your email" required>

<!-- dimension input (bordered, numeryczny, z jednostką) -->
<label class="dimension-field">
  <span class="dimension-field-label">Width</span>
  <span class="dimension-input-wrap"><input type="number" class="dimension-input" id="dimWidth" value="8"><span class="dimension-unit">cm</span></span>
</label>
```

### Radio / checkbox filtry (z opcjonalnym podglądem zdjęcia)
```html
<!-- single-select -->
<label class="filter-radio"><input type="radio" name="customisation" data-any checked><span class="radio-dot"></span>Any</label>
<label class="filter-radio" data-preview-img="industies-fashion.png"><input type="radio" name="industry"><span class="radio-dot"></span>Apparel &amp; Fashion</label>

<!-- multi-select -->
<label class="filter-checkbox"><input type="checkbox"><span class="checkbox-box"></span>Small</label>
<label class="filter-checkbox" data-preview-img="https://cdn-pim.packhelp.com/assets/.../89199....png"><input type="checkbox"><span class="checkbox-box"></span>Magnetic</label>

<!-- panel wrapper (dropdown z przyciskiem-pigułką) -->
<div class="filter-pill-wrap">
  <button class="filter-pill" aria-expanded="false">
    Industry
    <span class="filter-count" hidden><span class="filter-count-num">0</span><svg class="filter-count-clear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </button>
  <div class="filter-panel">
    <p class="filter-panel-title">Industry</p>
    <div class="filter-panel-options"><!-- .filter-radio / .filter-checkbox rows --></div>
    <div class="filter-preview"><img src="..." alt=""></div> <!-- opcjonalne, tylko gdy zdjęcie pomaga -->
  </div>
</div>
```
Listy >~10 pozycji: dodaj `.filter-panel-scroll` (`max-height:320px`) do `.filter-panel`.

### Floating pill-bar (sticky-summary — wzorzec z pkt 3 tabeli atomów)
```html
<div class="build-box-sticky-summary" id="stickySummaryBar">
  <div class="build-box-sticky-summary-group">
    <span class="build-box-sticky-summary-label">Delivery</span>
    <span class="build-box-sticky-summary-value underline">20-28 April</span>
  </div>
  <div class="build-box-sticky-summary-right">
    <div class="build-box-sticky-summary-group build-box-sticky-summary-price-group">
      <span class="build-box-sticky-summary-label">Netto / 30 pieces</span>
      <span class="build-box-sticky-summary-price">€45.00</span>
    </div>
    <a href="#" class="btn-pill lg">Add to cart</a>
  </div>
</div>
```
**Warunek konieczny (patrz pkt 3 guideline):** musi faktycznie nakładać się na scrollowaną treść (`position: fixed`/`absolute` w relative wrapperze) — sam styl blur+przezroczystość bez overlayu nie robi nic.

### "Trybik" ustawień strony (site-settings-btn/panel — Compact mode, Grid mode itp.)
```html
<button id="siteSettingsBtn" class="site-settings-btn" aria-label="Site settings">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65..."/></svg>
</button>
<div id="siteSettingsPanel" class="site-settings-panel">
  <p class="site-settings-title">Page customization</p>
  <div class="site-settings-row">
    <div>
      <p class="site-settings-label">Compact</p>
      <p class="site-settings-desc">Collapse steps into a tight accordion list</p>
    </div>
    <label class="site-toggle"><!-- checkbox switch --></label>
  </div>
</div>
```

---

### Linkowany wiersz listy z hover-reveal strzałką (zewnętrzne źródła, np. wzmianki prasowe)

Wzorzec z `press.html` — lista pozycji bez zdjęcia (patrz checklista `.media-card`
niżej: brak realnego zdjęcia = lista tekstowa, nie karta), gdzie **cały wiersz jest
linkiem na zewnątrz**. Strzałka siedzi na końcu wiersza, schowana domyślnie i wjeżdża
na hover dokładnie jak `.btn-arrow` (`width`/`opacity` 0→1) — ten sam mikro-ruch co w
przyciskach, tylko przeniesiony na skalę całego wiersza zamiast przycisku.

```html
<ul class="press-mention-list"> <!-- list-style:none, border-top -->
  <li>
    <a class="press-mention-row" href="https://realny-adres-artykulu" target="_blank" rel="noopener">
      <span class="press-mention-source">Nazwa źródła</span>
      <span class="press-mention-desc">Jednozdaniowy, sparafrazowany opis tematu — nie cytat nagłówka.</span>
      <span class="press-mention-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg></span>
    </a>
  </li>
  <!-- kolejne .press-mention-row -->
</ul>
```
`.press-mention-row` to `display:grid; grid-template-columns: 220px 1fr auto;` —
trzecia kolumna (`auto`) to zawsze strzałka. `.press-mention-arrow` ma `width:0;
opacity:0` domyślnie, `.press-mention-row:hover .press-mention-arrow` ustawia
`width:16px; opacity:1` (ten sam czas/easing co `.btn-arrow` w `components.css`).

**Zawsze prawdziwy `href`, nigdy `#`.** Jeśli adaptujesz listę z realnej strony
packhelp.co.uk, dociągnij faktyczne URL-e źródeł (patrz `CLAUDE.md`, "Linki
wychodzące przy adaptowanej treści") — dopiero wtedy dodawaj strzałkę-afordancję,
bo ona obiecuje użytkownikowi, że coś realnie otworzy.

---

## 3.1 `.media-card` — karta z wizualem (produkt/deal/artykuł/kategoria)

**Zawsze zagnieżdżenie: visual → title/desc/cta jako SIOSTRY, nie dzieci.**

Statyczny grid (mało pozycji, np. Related links na `contact.html`):
```html
<div class="related-card">
  <div class="related-card-visual related-card-visual--1 media-card-visual">
    <!-- zdjęcie/dekoracja -->
  </div>
  <h3 class="media-card-title">Help</h3>
  <p class="media-card-desc">Guides, FAQs and answers to common questions about your order.</p>
  <a href="#" class="btn-pill sm secondary media-card-cta">Visit help center</a>
</div>
```
W karuzeli (categories-section na HP), `<div class="category-item">` zamiast `.related-card`, ale te same współdzielone klasy title/desc:
```html
<div class="category-item">
  <div class="category-thumb media-card-visual" style="--thumb-img:url('onboarding-apparel.png')"></div>
  <h3 class="media-card-title">Clothing</h3>
  <p class="media-card-desc">Hoodies and tees people wear on weekends.</p>
</div>
```
**`.media-card-badge` NIE jest domyślnym slotem** — dodawaj tylko gdy wprost proszę o promo/etykietę i realnie nie zasłania produktu (patrz pkt 3.1 guideline).

### `.scroll-carousel` — kontener poziomego przewijania (pkt 1.2)
```html
<div class="scroll-carousel">
  <button class="scroll-carousel-nav prev" type="button" aria-label="Przewiń w lewo">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>
  </button>
  <div class="categories-grid"><!-- .media-card / .category-item / .thumb-item po kolei --></div>
  <button class="scroll-carousel-nav next" type="button" aria-label="Przewiń w prawo">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
  </button>
</div>
```
JS (`checkOverflow`/`updateNavState`, już na stronie) obsługuje strzałki automatycznie, o ile struktura to dokładnie `.scroll-carousel > .scroll-carousel-nav.prev + <track> + .scroll-carousel-nav.next`. Opcjonalne gradientowe maski na krawędziach: `<div class="scroll-fade left"></div>` / `right` wewnątrz `.scroll-carousel`, obok toru.

Kafel-nawigacja (podkategoria, nie oferta) — `.thumb-item`, stała szerokość 112px:
```html
<a class="thumb-item" href="#" data-key="boxes">
  <div class="thumb-photo" style="--thumb-img:url('793725-pre-printed-mailer-box.avif')"></div>
  <span class="thumb-caption">Boxes</span>
</a>
```

---

## 5.2 Sekcje strony marketingowej (`index.html`)

### Hero
```html
<section class="hero">
  <div class="hero-grid">
    <div class="hero-left">
      <h1 class="headline">Custom <span class="hero-deco-square"></span> packaging, made to measure. And everything <span class="hero-deco-square"></span> inside it.</h1>
      <div class="cta-row">
        <div class="hero-cta-buttons">
          <a href="packaging.html" class="btn-pill lg">Shop now<svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
          <a href="get-a-quote.html" class="btn-pill lg secondary">Get a quote<svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
          <a href="build-your-box.html" class="hero-inline-link">or Build your box</a>
        </div>
        <div class="hero-logos-static">
          <span class="hero-logos-label">Trusted by 125 300 companies</span>
          <img src="logotypes/logo-backmarket.svg" alt="Back Market">
          <!-- ...więcej logo -->
        </div>
      </div>
    </div>
    <!-- wariant domyślny: prawa kolumna z rotującym wizualem produktu -->
  </div>
</section>
```
Warianty (klasa na `<body>` lub na `.hero`): `hero-centered` (bez wizualu, wyśrodkowany H1 4.5rem — ten sam layout co final-cta-section), `short-hero` (wizual 460px zamiast pełnej wysokości).

### `faq-section`
```html
<section class="faq-section reveal">
  <div class="faq-grid">
    <div class="faq-text">
      <span class="section-badge">Why Packhelp</span>
      <h2 class="faq-heading">Everything your brand ships — made simple.</h2>
      <div class="faq-cta-row">
        <!-- duet przycisków, patrz pkt 3 wyżej -->
      </div>
    </div>
    <div class="faq-accordions">
      <div class="faq-item">
        <button class="faq-question">One partner for your entire packaging range<svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>
        <div class="faq-answer"><div class="faq-answer-inner"><p>Odpowiedź...</p></div></div>
      </div>
      <!-- kolejne .faq-item, docelowo 5 pytań -->
    </div>
  </div>
</section>
```
JS: `.faq-question` klik toggluje `.open` na rodzicu `.faq-item`. Zwijanie na `.faq-item` idzie przez `grid-template-rows: 0fr` — **nie kopiuj tej sztuczki**, gdzie pierwsze dziecko zwijanej treści to nie-tekstowy flex/grid z własnym borderem (tam użyj `max-height` + `overflow:hidden`, patrz `.sample-group-body` w pkt 5.5 guideline).

### `categories-section` (pełny wzorzec: badge+H2+subheading+toolbar+karuzela)
```html
<section class="categories-section reveal">
  <span class="section-badge">Custom packaging</span>
  <h2 class="categories-heading">Whatever you make, we pack it.</h2>
  <p class="categories-subheading">150+ packaging products across six families. Printed around your brand, at yours in days.</p>

  <div class="section-toolbar">
    <div class="toggle-switch" id="industryToggleSwitch">
      <div class="toggle-indicator" id="industryToggleIndicator"></div>
      <button class="toggle-option active" data-target="ecommerce">E-commerce</button>
      <button class="toggle-option" data-target="health">Health &amp; Beauty</button>
    </div>
    <button class="btn-pill secondary sm">See all packaging<svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
  </div>

  <!-- .scroll-carousel z .category-item / .media-card wewnątrz, patrz pkt 3.1 -->
</section>
```
**Dane per-tab:** każdy tab ma własną, niezależną listę `{ title, desc, image }` — NIE współdzieloną tablicę indeksowaną. Domyślny tab renderuje się statycznie w HTML, JS dopisuje resztę dopiero na klik. Patrz pkt 5.2.1 guideline dla konwencji folderów assetów i reguły "brak asseta = szary kafel, nigdy fallback z innej kategorii".

### `marquee-section` (czysto dekoracyjny przerywnik)
```html
<section class="marquee-section">
  <div class="marquee-outer">
    <div class="marquee-track">
      <div class="marquee-content">
        <span class="marquee-item"><span class="marquee-phrase"><span class="marquee-text-light">Minutes away from</span> <span class="marquee-text">perfect packaging</span></span><svg class="marquee-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg></span>
        <!-- powtórz frazę ~6x dla ciągłości pętli -->
      </div>
      <div class="marquee-content" aria-hidden="true">
        <!-- DOKŁADNA kopia powyższego bloku — druga kopia dla bezszwowej pętli CSS -->
      </div>
    </div>
  </div>
</section>
```

### `statement-section` (bento tiles obraz/wideo w tle)
```html
<section class="statement-section reveal">
  <p class="statement">Zdanie z <span class="deco-square" style="--deco-img:url('...')"></span> wstawionymi zdjęciami w środku tekstu.</p>
  <a href="build-your-box.html" class="btn-pill lg">Open the editor<svg class="btn-arrow" ...>...</svg></a>

  <div class="statement-grid reveal">
    <div class="statement-row">
      <div class="statement-tile statement-tile-a">
        <div class="statement-tile-text">
          <h3 class="statement-tile-title">Your branding</h3>
          <p class="statement-tile-desc">Customize colours, patterns and shapes</p>
        </div>
        <div class="statement-tile-media"><img class="statement-tile-image" src="..." alt=""></div>
      </div>
      <!-- statement-tile-b obok, potem statement-row-reverse z tile-c/tile-d -->
    </div>
  </div>
</section>
```
4 kafle w 2 rzędach (drugi rząd `.statement-row-reverse`), każdy z własnym, ręcznie dopracowanym `-media` (obraz/wideo/nakładki) — nie próbuj tego uogólniać do jednego wspólnego wzorca medii, każdy kafel ma inny, bo pokazuje inną funkcję edytora.

### `cta-section` (jedyna ciemna sekcja na stronie — pkt 2.1)
```html
<section class="cta-section reveal">
  <div class="cta-card">
    <div class="cta-blob cta-blob-1"></div>
    <div class="cta-blob cta-blob-2"></div>
    <div class="cta-blob cta-blob-3"></div>
    <div class="cta-grain"></div>

    <div class="cta-content">
      <span class="section-badge">At any scale</span>
      <p class="cta-text">Zdanie sprzedażowe...</p>

      <ul class="cta-usps">
        <li><svg class="cta-usp-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>High volumes</li>
        <!-- kolejne USP -->
      </ul>

      <div class="cta-buttons">
        <button class="btn-pill lg">
          <span class="cta-avatars"><span class="cta-avatar"><img src="expert-01.png" alt=""></span></span>
          Book an expert consultation
          <svg class="btn-arrow" ...>...</svg>
        </button>
        <a href="get-a-quote.html" class="btn-pill lg outline-light">Get a quote<svg class="btn-arrow" ...>...</svg></a>
      </div>

      <!-- .scroll-carousel z .cta-tiles wewnątrz: cta-tile-video (video bg + tytuł), cta-tile-gradient (testimonial slider z .cta-tile-slides/.cta-tile-slider-dots) -->
    </div>
  </div>
</section>
```
Jedyne miejsce z `outline-light` i testimonial sliderem. Nie powielaj tej ciemnej karty na innej stronie bez wyraźnej prośby (patrz pkt 2.1 guideline).

### `final-cta-section` (zamknięcie strony)
```html
<section class="final-cta-section reveal">
  <h2 class="final-cta-heading">Everything in the box.<br>And the <span class="final-deco-square"></span> box.</h2>
  <p class="final-cta-subheading">The box, the bag, the bottle, the hoodie. Made to measure, ready when you are.</p>
  <div class="final-cta-buttons">
    <!-- duet przycisków, patrz pkt 3 wyżej -->
  </div>
</section>
```
**`.final-deco-square`** — literalna spacja w HTML po obu stronach `<span>` OBOK marginesu z CSS (patrz pułapka opisana w pkt 5.2 guideline — bez spacji odstęp jest wyraźnie za mały).

### `.site-footer`
```html
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-left">
      <a href="#" class="footer-logo" aria-label="Packhelp"><img src="logo-packhelp.1iheyVke.svg" alt="Packhelp"></a>
      <p class="footer-newsletter-copy">Don't miss out – get 15% off your first order when you join the newsletter.</p>
      <form class="footer-newsletter">
        <input type="email" class="footer-newsletter-input" placeholder="Your email" required>
        <button type="submit" class="btn-pill md footer-newsletter-btn">Sign up</button>
      </form>
      <div class="footer-badges">
        <span class="footer-badge"><img src="https://zapakuj.to/_astro/fsc-badge.CT_C2C6x.svg" alt="FSC certified"></span>
        <span class="footer-badge"><img src="https://zapakuj.to/_astro/esg-badge-yellow-black.C3wtyeOu.svg" alt="ESG badge"></span>
      </div>
    </div>
    <div class="footer-links">
      <div class="footer-col-group">
        <div class="footer-col">
          <p class="footer-col-title">Contact &amp; Help</p>
          <ul><li><a href="#">Contact us</a></li><!-- ... --></ul>
        </div>
      </div>
      <div class="footer-col"><p class="footer-col-title">Connect</p><ul><!-- social links --></ul></div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <span>Copyright Packhelp 2025</span>
      <span>Business Hours Monday - Friday 8:00-15:00</span>
    </div>
  </div>
</footer>
```
3 grupy linków + Connect po prawej — patrz pkt 5.1 guideline dla dokładnego podziału kolumn. **Brak na `build-your-box.html`** (strona zadaniowa, celowo bez stopki).

---

## 5.4 Strona katalogowa (`packaging.html`)

```html
<nav class="pkg-breadcrumb" id="pkgBreadcrumb"><!-- patrz "Breadcrumb" wyżej --></nav>

<section class="pkg-title-row reveal">
  <div class="pkg-title-copy">
    <h1 class="pkg-title" id="pkgTitle">Packaging</h1>
    <div class="pkg-desc-row" id="pkgDescRow">
      <p class="pkg-subtitle clamped" id="pkgSubtitleText">150+ packaging products across boxes, bags, tubes and more — printed with your brand, in days.</p>
      <button class="pkg-desc-toggle" id="pkgDescToggle" hidden>Show more</button>
    </div>
  </div>
</section>

<section class="pkg-tiles-section reveal">
  <!-- .scroll-carousel z .thumb-item, patrz "scroll-carousel" wyżej -->
</section>

<section class="pkg-filters-bar reveal">
  <div class="filter-pills"><!-- .filter-pill-wrap × N, patrz "Radio/checkbox filtry" wyżej --></div>
  <div class="sort-pill-wrap">
    <button class="filter-pill sort-pill" id="sortBtn" aria-expanded="false">
      <span id="sortLabel">Most popular</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="sort-menu" id="sortMenu">
      <button class="sort-option active" data-sort="popular">Most popular</button>
      <button class="sort-option" data-sort="az">Alphabetically A–Z</button>
    </div>
  </div>
  <div class="active-filter-pills" id="activeFilterPills"></div>
</section>

<section class="pkg-products reveal">
  <div class="product-grid" id="pkgProductGrid">
    <div class="product-card">
      <div class="product-card-media">
        <span class="product-card-moq">25 minimum</span>
        <a href="#" class="btn-pill sm product-card-btn">More info</a>
      </div>
      <div class="product-card-info">
        <h3 class="product-card-name">Mailer Box</h3>
        <p class="product-card-customisation">Custom</p>
      </div>
    </div>
    <!-- .promo-card wciśnięty co ~10 produktów, patrz niżej -->
  </div>
</section>

<section class="pkg-seo reveal">
  <div class="pkg-seo-inner">
    <div class="pkg-seo-text">
      <div class="pkg-seo-block">
        <h3 class="pkg-seo-heading">Custom Packaging for Your Brand</h3>
        <p class="pkg-seo-paragraph">Tekst SEO...</p>
      </div>
      <!-- kolejne .pkg-seo-block, zawsze w pełni rozwinięte, NIE akordeon -->
    </div>
  </div>
</section>
```

`.promo-card` (czysto tekstowa przerywka w gridzie produktów, bez zdjęcia):
```html
<div class="promo-card">
  <p class="promo-card-eyebrow">Save up to 20% with Packhelp Wallet</p>
  <p class="promo-card-text">Earn cashback with every order and pay less on your next purchases.</p>
</div>
```
Używaj oszczędnie (~2 na 20 produktów), nigdy jako pierwsza/ostatnia karta.

---

## 5.3 Strona konfiguratora (`build-your-box.html`)

Anatomia jednego kroku (accordion header + content), powtarzalna dla wszystkich kroków — numer w `.build-box-accordion-badge` musi zgadzać się z kolejnością:
```html
<section class="build-box-step" id="stepBoxType">
  <button class="build-box-accordion-header" type="button">
    <span class="build-box-accordion-badge">1</span>
    <span class="build-box-accordion-title">Box Type<span class="build-box-accordion-value"></span></span>
    <svg class="build-box-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </button>
  <div class="build-box-step-content">
    <h3 class="build-box-field-label">Box Type</h3>
    <p class="build-box-field-desc">Choose the base format that fits your product</p>
    <!-- jeden z 4 wzorców opcji poniżej -->
  </div>
</section>
```

### `.box-type-grid` — wybór z opisem
```html
<div class="box-type-grid">
  <button class="box-type-card active" data-box-type="folding">
    <span class="box-type-card-thumb"><img src="build/folding-box.png" alt=""></span>
    <span class="box-type-card-text">
      <span class="box-type-card-label">Folding Box</span>
      <span class="box-type-card-desc">Flat-packed box that folds from one die-cut sheet.</span>
    </span>
  </button>
  <!-- kolejne .box-type-card -->
</div>
```

### `.construction-grid` — wybór wizualny/ikonowy, bez opisu
```html
<div class="construction-grid">
  <button class="construction-card active" data-construction="classic">
    <img src="build/classic.svg" alt="">
    <span>Classic</span>
  </button>
  <!-- kolejne .construction-card -->
</div>
```

### `.material-card-grid` — wybór, gdzie zdjęcie materiału jest kluczowe
```html
<div class="material-card-grid">
  <button class="material-card active" data-material="kraft">
    <span class="material-card-image"><img src="build/material-kraft.png" alt=""></span>
    <span class="material-card-text">
      <span class="material-card-label">Kraft</span>
      <span class="material-card-desc">Natural brown board with a rustic look and sturdy strength.</span>
    </span>
  </button>
  <!-- kolejne .material-card -->
</div>
```

### `.dimension-grid` — wyłącznie liczby/wymiary
```html
<div class="toggle-switch" id="sizeToggleSwitch">
  <div class="toggle-indicator" id="sizeToggleIndicator"></div>
  <button class="toggle-option active">External size</button>
  <button class="toggle-option">Size of my product</button>
</div>
<div class="dimension-grid">
  <label class="dimension-field">
    <span class="dimension-field-label">Width</span>
    <span class="dimension-input-wrap"><input type="number" class="dimension-input" id="dimWidth" value="8"><span class="dimension-unit">cm</span></span>
  </label>
  <!-- Length, Height -->
</div>
```

### `.quantity-card` — wyłącznie krok ilości/ceny (rozszerza `.box-type-grid`)
```html
<div class="box-type-grid">
  <button class="box-type-card no-thumb quantity-card active">
    <span class="quantity-card-qty">30</span>
    <span class="quantity-card-prices">
      <span class="quantity-card-unit">£1.50/piece</span>
      <span class="quantity-card-total">£45.00</span>
    </span>
  </button>
  <!-- kolejne .quantity-card -->
</div>
```

### Elementy poza krokami
```html
<!-- pionowa nawigacja kropkowa, znika <900px -->
<nav class="build-box-dots" id="stepDots" aria-label="Configuration steps">
  <button class="build-box-dot active" data-target="stepBoxType" aria-label="Box type"></button>
  <!-- jeden .build-box-dot per krok -->
</nav>

<!-- dolny floating summary bar, patrz "Floating pill-bar" w sekcji atomów -->

<!-- blok checkout, ostatni, nie numerowany jako krok -->
<div class="build-box-checkout" id="stepCheckout">
  <div class="build-box-checkout-card">
    <div class="build-box-checkout-top">
      <div class="build-box-checkout-delivery">
        <p class="build-box-checkout-delivery-label">Delivery to: <span class="build-box-checkout-location">Norway, 05-800</span></p>
        <ul class="build-box-checkout-dates">
          <li>20 April <span class="build-box-checkout-date-price">Free</span></li>
        </ul>
      </div>
      <div class="build-box-checkout-price">
        <p class="build-box-checkout-price-label">Netto / 30 pieces</p>
        <p class="build-box-checkout-price-value">€45.00</p>
      </div>
    </div>
    <a href="#" class="btn-pill lg">Customize design</a>
    <button class="btn-pill lg muted">Skip design for now</button>
  </div>
</div>
```

---

## Nawigacja i stopka — nie kopiuj stąd

Nav (`.nav-row1`, `.sticky-bar`, `.quote-topbar`) **nigdy nie jest kopiowana inline** — każda strona dostaje tylko placeholder + `<script src="nav-header.js"></script>`, patrz `CLAUDE.md`. Markup nawigacji edytuje się wyłącznie w `nav-header.js`.
