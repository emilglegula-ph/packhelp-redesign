# Packhelp Redesign — Guideline budowania stron

Ten dokument opisuje, jakich sekcji i komponentów używać, w jakim kontekście, jak je ze
sobą parować i jakie odstępy stosować między nimi. Powstał na podstawie analizy stron:
`index.html` (strona główna), `build-your-box.html` (konfigurator produktu),
`packaging.html` (katalog/shop kategorii), `sample-packs.html` (wybór próbek / cart-flow,
patrz pkt 5.5) i `deals.html` (karuzela promocji, patrz pkt 1.2).

Cel: żeby przyszłe strony można było opisywać słownie ("zrób mi hero + sekcję FAQ +
duży dark CTA na końcu"), a decyzje o tym, jakiego komponentu użyć, jakiego wariantu
przycisku, jakiego odstępu — podejmowały się na podstawie tego dokumentu, a nie od
nowa za każdym razem.

Fundamenty tokenów (`tokens.css`, `base.css`) i decyzje architektoniczne (dlaczego CSS
jest w repo, a nie osobnym pakietem) są już opisane w pamięci projektu — tu skupiam się
na warstwie wyżej: **kiedy używać czego**.

Dla warstwy "jak to wygląda w kodzie" (gotowy, wycięty z realnych stron markup do
kopiowania) patrz [`COMPONENT_SNIPPETS.md`](COMPONENT_SNIPPETS.md) — numeracja sekcji
tam odpowiada numeracji tutaj. Dla mapy stron (co już zbudowane, co ma odpowiednik na
packhelp.co.uk, co jest nową koncepcją redesignu) patrz [`SITEMAP.md`](SITEMAP.md).

---

## 1. Fundamenty, które trzeba znać

- **Kontener:** `.container { max-width: 1280px; margin: 0 auto; }`. Domyślnie każda
  sekcja mieści się w kontenerze. Sekcja jest *full-bleed* (100vw), gdy ma świadomie
  inny cel wizualny (patrz pkt. 1.1).
- **Skala odstępów** (`--space-*`, grid 4px, wolimy 8px): `1`=4px, `2`=8px, `3`=12px,
  `4`=16px, `5`=20px, `6`=24px, `7`=28px, `8`=32px, `10`=40px, `12`=48px, `14`=56px,
  `16`=64px, `20`=80px, `24`=96px, `32`=128px, `40`=160px. **Nigdy nie wpisuj wartości
  spoza tej skali** (jeden wyjątek do naprawienia: `style="margin-top: 2rem"` inline w
  statement-section na stronie głównej — twardy `2rem` zamiast `var(--space-8)`, relikt
  do ujednolicenia przy okazji).
- **Promienie:** `sm`=8px (inputy, drobne elementy), `md`=16px (karty/zdjęcia), `lg`=20px
  (duże panele np. 3D preview), `xl`=24px, `2xl`=32px, `full`=pigułka.
- **Breakpointy używane konsekwentnie w całym projekcie:** `700px` (mobile, kolumny →
  stack), `900px`/`901px` (tablet — tu znika desktopowa nawigacja i sticky-bar),
  `1100px`/`1200px` (redukcja liczby kolumn w gridach produktowych / gridach
  dwukolumnowych).

### 1.1 Full-bleed z treścią wyrównaną do kontenera

Wzorzec używany za każdym razem, gdy sekcja ma poziomą karuzelę/scroll, która ma
"wyciekać" do prawdziwej krawędzi ekranu, a tekst nad nią ma zostać wyrównany do
1280px-owego kontenera:

```css
width: 100vw;
left: 50%;
transform: translateX(-50%);
```
a nagłówek/treść wewnątrz:
```css
padding-left: calc((100vw - min(100vw, var(--max-w))) / 2 + 2rem);
```

Użyj tego wzorca za każdym razem, gdy proszę o **sekcję z poziomą karuzelą kart**
(kategorie, use-case'y, dowolna galeria kart do przewijania). Nie używaj go dla sekcji
statycznych bez scrolla — tam wystarczy zwykły `.container`.

### 1.2 `.scroll-carousel` — komponent poziomego przewijania

Pojawia się 5× w całym projekcie (2× categories na HP, cta-tiles na HP, pkg-tiles na
Shopie, i koncepcyjnie ten sam mechanizm w thumb-strip). To **flex + `overflow-x:auto`**,
nie CSS grid — kolumny się nie przeliczają na breakpointach, tylko scrolluje się w bok.
Elementy:
- strzałki `.scroll-carousel-nav.prev/.next` — okrągłe 40×40px, `display:none` domyślnie,
  pokazują się tylko gdy JS wykryje `.has-overflow` (czyli gdy treści faktycznie jest
  więcej niż mieści się w viewporcie — nie pokazuj strzałek "na wszelki wypadek").
- opcjonalne gradientowe maski na krawędziach (`.scroll-fade`, 140px szerokości) — użyte
  na Shopie w pasku podkategorii, nieużyte na HP w categories-section.

**Kiedy używać:** dowolna pozioma lista kart/miniatur, gdzie liczba elementów może się
różnić i nie chcemy zmuszać jej do zawijania w wiersze. **Kiedy NIE używać:** siatka
produktów o stałej, przewidywalnej liczbie kolumn — tam prawdziwy CSS grid
(`.product-grid`, patrz pkt. 6.4).

**Pozycja strzałek, gdy karty mają podpis pod spodem:** domyślnie `.scroll-carousel-nav`
jest `top: 50%` względem `.scroll-carousel` — ale jeśli karty w środku to zdjęcie +
tytuł/opis pod nim (`.category-item`, `.deals-carousel-item`), `.scroll-carousel`
rozciąga się na wysokość **całego** elementu łącznie z tekstem, więc 50% wypadnie za
nisko, częściowo na podpisie. Napraw to nadpisując `top` na sztywną wartość równą
**połowie wysokości samego zdjęcia** (nie całej karty), przez selektor scope'owany do tej
konkretnej sekcji — np. `.categories-section .scroll-carousel-nav { top: 160px; }` (160 =
połowa 320px `.category-thumb`) albo `.deals-carousel .scroll-carousel-nav { top: 200px;
}` (200 = połowa 400px `.deals-carousel-card`). Gdy karty w karuzeli nie mają podpisu pod
spodem (np. `.cta-tiles`) — zwykłe `top: 50%` wystarcza, nic nie trzeba nadpisywać.

**Strzałki znikają na krańcach scrolla, nie tylko chowają się "na wszelki wypadek":**
poza samym `.has-overflow` (cały pasek strzałek renderuje się tylko, gdy treść faktycznie
nie mieści się w widocznym obszarze), każda strzałka osobno dostaje `disabled` w zależności
od aktualnej pozycji scrolla — `prev` gdy `scrollLeft === 0` (jesteś na początku, nie ma
dokąd się cofnąć), `next` gdy `scrollLeft` osiągnie maksimum (jesteś na końcu, nie ma dokąd
przewinąć dalej). Wyłączona strzałka kurczy się do zera (`transform: scale(0); opacity: 0`)
zamiast po prostu wyszarzeć — więc efektywnie znika, a nie tylko traci klikalność. To
liczone na bieżąco przy każdym scrollu (`updateNavState`), więc obie strzałki są widoczne
tylko "w środku" trasy, nigdy na jej krańcu. Ten sam JS (`checkOverflow`/`updateNavState`)
obsługuje już wszystkie karuzele na stronie niezależnie — nowa karuzela dostaje to za darmo,
o ile ma poprawną strukturę `.scroll-carousel > .scroll-carousel-nav.prev + <track> +
.scroll-carousel-nav.next`.

**Przycisk CTA na karcie w karuzeli jest opcjonalny — nie każda karta go potrzebuje.**
Gdy jest potrzebny, są dwa wzorce do wyboru zależnie od kontekstu, ale żaden nie jest
obowiązkowy — część kart w karuzeli może w ogóle nie mieć przycisku, jeśli cała karta jest
klikalna albo CTA nie ma sensu (np. karta czysto informacyjna):
- **Hover-reveal nad zdjęciem** (`.product-card-btn` na Shopie): przycisk leży
  `position: absolute` na dole zdjęcia, domyślnie `opacity: 0` +
  `transform: translateY(100%)`, wjeżdża na hover karty. Używaj w gęstych siatkach
  produktowych (kilkanaście+ kart naraz) — przycisk nie zaśmieca layoutu, dopóki
  użytkownik faktycznie nie celuje w konkretną kartę.
- **Zawsze widoczny, pod podpisem** (`.deals-carousel-btn` na `deals.html`): zwykły
  `.btn-pill.sm.secondary` w normalnym flow, `margin-top` pod `.deals-carousel-desc`.
  Używaj w rzadszych, "promocyjnych" karuzelach (kilka kart, każda to osobna oferta/
  wiadomość) — tam CTA ma być czytelne od razu, bez zależności od hover (który i tak nie
  istnieje na dotyku/mobile).

Wybór wzorca (albo brak przycisku w ogóle) to decyzja per-sekcja, nie sztywna reguła —
oceń gęstość kart i to, czy karta ma jedną jasną akcję, czy jest raczej nawigacyjna/
poglądowa.

---

## 2. Kierunek wizualny (look & feel)

Zanim wybierzesz komponent — kilka zasad, które dotyczą *każdego* elementu na stronie,
niezależnie od sekcji. To one sprawiają, że strona "wygląda spójnie", nawet gdy sekcje
się różnią.

**W jednym zdaniu:** dużo bieli, prawie żadnego koloru poza jednym akcentem, wszystko
zaokrąglone, a treść niosą wyłącznie zdjęcia/wideo i typografia — nie ikony, nie
ilustracje, nie dekoracyjne kształty.

### 2.1 Paleta — biel jako tło domyślne, kolor tylko punktowo

- Tło strony i tło "surface" to to samo: **biel** (`--color-bg-page`/`--color-bg-surface`
  = `#FFFFFF`). Jedyne odstępstwo od bieli to bardzo jasny szary (`--color-bg-muted`
  `#F8F8F8` / hover `#F2F2F2`) — używany do placeholderów zdjęć, inputów, teł kart, nigdy
  jako "kolorowa sekcja".
- **Cała strona ma dokładnie jedną sekcję z ciemnym/kolorowym tłem** — `cta-section` na
  HP (`--color-bg-inverse`, prawie czarny granat). To jest świadomy, pojedynczy kontrast
  wizualny na całej stronie, nie wzorzec do powielania. Jeśli proszę o "kolejną ciemną
  sekcję" — dopytaj, czy naprawdę chcemy złamać tę zasadę, bo cały efekt polega na tym,
  że taka sekcja jest jedna.
- Tekst nie jest czystą czernią — `--color-text-primary` to `--rich-blue` (`#00061A`,
  prawie czarny, lekko granatowy). Nie używaj `#000000`.
- Jedyny nasycony, powtarzalny kolor to niebieski akcentu (`--color-accent` `#2757FF`) —
  zarezerwowany dla interakcji (CTA, linki, focus ring, aktywne stany togglów/filtrów).
  Żółty (`--color-bg-notice`) i czerwony (`--color-danger`) istnieją w tokenach, ale
  pojawiają się punktowo (pojedynczy callout/błąd), nigdy jako element dekoracyjny albo
  akcent drugiej sekcji.

### 2.2 Zaokrąglenia — praktycznie zero ostrych rogów

Promień pojawia się dosłownie wszędzie, od najmniejszych do największych elementów:
`--radius-sm` (8px) na polach formularzy i drobnych badge'ach, `--radius-md`/`lg` (16–20px)
na zdjęciach, kartach i panelach, `--radius-xl`/`2xl` (24–32px) na dużych blokach (np.
panel podglądu 3D), `--radius-full` na wszystkim co pigułkowe (przyciski, toggle,
filtry, badge). W całym projekcie praktycznie nie ma prostokątów z ostrym rogiem — jeśli
projektujesz nowy element (kartę, panel, pole), **domyślnym pytaniem powinno być "jaki
promień", nie "czy w ogóle promień"**.

**Panele wizualne w layoutach dwukolumnowych (split-screen)** — np. prawa kolumna ze
zdjęciem/placeholderem w flow typu Get a Quote (`get-a-quote.html`): panel dostaje
jednolity padding po wszystkich stronach (`--space-6` = 24px) i jest owinięty w osobny
wrapper z `--radius-2xl` + `overflow: hidden`, żeby zaokrąglić rogi zdjęcia/gradientu/
karty w środku. Taki panel **nigdy nie dotyka krawędzi okna przeglądarki** — to nie jest
full-bleed w rozumieniu pkt. 2.5 (tam wyjątek dotyczy tylko naprawdę pełnoekranowych
elementów, np. hero na stronie głównej, marquee). Jeśli kolumna ma treść nakładkową
(gradient + karta z tekstem, jak trust-card w Get a Quote), gradient i karta żyją
wewnątrz tego zaokrąglonego wrappera, nie bezpośrednio na `<aside>`/kontenerze z
paddingiem.

### 2.3 Cienie i obramowania — subtelne, dwie różne role

Cień i obrys pełnią w tym projekcie dwie wyraźnie różne role — nie mieszaj ich:
- **Stan "aktywny/wybrany" na karcie** (np. wybrana opcja w konfiguratorze): bardzo
  delikatny `box-shadow: 0 0 0 1px var(--color-border-default), 0 4px 12px rgba(0,0,0,.05)`
  — to prawie niewidoczne uniesienie, nie mocny cień ani gruby kolorowy obrys.
- **Elementy "pływające nad treścią"** (dropdown filtrów, mega-menu, panele wysuwane):
  wyraźnie mocniejszy cień, rzędu `0 8px 30px rgba(0,0,0,.12)` do `0 8px 32px
  rgba(0,0,0,.18)` — to sygnalizuje "ten element unosi się nad stroną", więc używaj
  takiego cienia tylko dla overlayów/popoverów, nigdy dla kart w normalnym przepływie
  strony (inaczej wszystko zacznie wyglądać jak "unoszące się", tracąc kontrast).
- **Separatory** to zawsze cienka 1px linia w `rgba(0,0,0,.07–.15)` albo
  `--color-border-default`/`hover` — nigdy pełny szary blok czy gruba kreska.

### 2.4 Typografia — jeden font, ciasny tracking, im większy tekst tym ciaśniejszy

- Jeden font w całym projekcie: **ABC Favorit (variable)** — brak drugiego,
  "dekoracyjnego" fontu na nagłówki. Hierarchia buduje się wagą i rozmiarem, nie zmianą
  kroju.
- Domyślny `letter-spacing: -0.02em` na niemal całym tekście (przyciski, etykiety,
  opisy kart, nawigacja) — to nadaje zwarty, "premium" charakter i jest w praktyce
  ustawieniem bazowym, nie wyjątkiem.
- Duże, "hero-owe" nagłówki (H1 hero, running-text w statement-section, H2 w
  final-cta-section) idą dalej: `-0.05em` do `-0.06em`. **Reguła:** im większy rozmiar
  tekstu, tym ciaśniejszy tracking — nie zostawiaj domyślnego odstępu liter przy dużych
  nagłówkach display.

### 2.5 Zdjęcia i wideo jako główny nośnik treści — nie ikony, nie ilustracje

To jest chyba najważniejsza zasada stylu: **layout niosą fotografia/wideo produktu i
typografia, nie system ikon czy ilustracji wektorowych.**
- Hero, statement-section (bento tiles), karty kategorii, karty materiałów, karty
  produktów, sekcje branżowe/onboardingowe — wszystkie kluczowe momenty strony pokazują
  **prawdziwe zdjęcie lub wideo** opakowania/produktu, nie ikonę czy grafikę wektorową.
- Ikony pojawiają się tylko punktowo i funkcjonalnie: `construction-grid`/`closure`
  (szybkie rozpoznanie kształtu konstrukcji), strzałki nawigacji, chevron akordeonu,
  ikona koszyka/wyszukiwarki. Nigdy jako główny element komunikujący ofertę — do tego
  zawsze zdjęcie.
- Zdjęcia niemal zawsze **kwadratowe** (`aspect-ratio: 1/1`) albo zbliżone (np. 162:104
  w kartach materiału), zawsze z zaokrąglonymi rogami (`--radius-md` lub `lg`) — nigdy
  ostre rogi poza prawdziwie pełnoekranowymi elementami (hero visual, marquee).
- **Reguła przy projektowaniu nowej sekcji:** jeśli sekcja ma "sprzedać" jakąś cechę
  produktu/ofertę, domyślnym pytaniem jest "jakie zdjęcie/wideo tu wstawić", nie "jaką
  ikonę narysować".

### 2.6 Biel i przestrzeń jako tło dla powyższego

Duże piony między sekcjami (do `space-40` = 160px, patrz pkt. 7) i oszczędne użycie
koloru sprawiają, że jedynymi elementami przyciągającymi wzrok są **zdjęcia i pojedynczy
niebieski akcent CTA** — wszystko inne (tło, tekst, obrysy) jest celowo wyciszone, żeby
nie konkurować o uwagę. Przy dodawaniu nowego elementu pytaj, czy to zdjęcie/CTA
faktycznie potrzebuje wybić się kolorem, czy wystarczy mu przestrzeń wokół.

---

## 3. Atomy współdzielone (`components.css`)

| Komponent | Warianty | Kiedy użyć |
|---|---|---|
| `.btn-pill` | domyślny (primary, niebieski) | Główna akcja CTA na jasnym tle. |
| `.btn-pill.sm` | mały (32px) | Nawigacja, sticky-bar, karty produktów ("More info"). |
| `.btn-pill.md` | średni (40px) | Formularze/inline akcje obok inputa (np. "Sign up" w footer newsletter). |
| `.btn-pill.lg` | duży (48px) | Hero, sekcje CTA, final-cta — główny rozmiar dla "dużych" wezwań do akcji. |
| `.btn-pill.secondary` | obrys/transparent, tekst ciemny | Drugorzędna akcja **na jasnym tle**, zawsze w parze z primary (patrz pkt. 4). |
| `.btn-pill.outline-light` | obrys biały, tekst biały | Drugorzędna akcja **tylko na ciemnym/kolorowym tle** (używane wyłącznie w `cta-section`). Nie mieszać z `.secondary` — `.secondary` na ciemnym tle byłby nieczytelny. |
| `.btn-arrow` (hover) | strzałka wysuwająca się z prawej na `:hover` | Domyślny mikro-ruch na `.btn-pill` — dodawaj, gdy przycisk prowadzi "dalej" (nie na przyciskach typu "Sign up"/formularze). |
| `.section-badge` | mały pill z etykietą sekcji (np. "Why Packhelp") | Poprzedza H2 w sekcjach z własnym nagłówkiem (patrz pkt. 4). Domyślnie zawsze widoczny (dev-panel toggle usunięty 2026-07-31). |
| `.nav-badge-new` | mały pill "New" | Oznaczanie nowych pozycji w nawigacji (np. "Merchandise New"). Nie używać poza nawigacją. |
| `.icon-btn` | ikona 20×20, bez tła | Koszyk, akcje ikonowe w topbarze. |
| `.search-wrap` | pigułka z ikoną + input | Wyszukiwarka w topbarze/sticky-bar. |
| `.toggle-switch` | 2-3 opcje, pigułka z przesuwanym wskaźnikiem | Przełączanie kontekstu treści bez przeładowania (branża/kategoria, 3D/2D, Open/Close, External size/Product size). Zawsze JS liczy `offsetWidth/offsetLeft`, żeby animować wskaźnik — nie hardkoduj szerokości. |
| pole tekstowe bordered (`.password-gate-input`, wzorzec) | obrys 1px, `radius-sm` | Formularze standardowe (nie pigułkowe). |
| pole tekstowe pill (`.footer-newsletter-input`, `.search-wrap input`) | tło muted, `radius-full` | Newsletter, search — konteksty "lekkie", nie formalne formularze. |
| **floating pill-bar** (wzorzec `.sticky-bar` pinned) | `background: rgba(255,255,255,.80)`, `backdrop-filter: blur(8px)` (+ `-webkit-`), `border-radius: var(--radius-full)`, cień `0 1px 2px rgba(0,0,0,.08)`, padding **równy na wszystkich bokach** (np. `var(--space-2)` — nie asymetryczny top/bottom vs left/right) | Każdy pasek, który "unosi się" nad przewijaną treścią: `.sticky-bar` (HP), `.build-box-sticky-summary` (konfigurator, wjeżdża z dołu), `.quote-footer-bar` (Get a Quote). **3. wystąpienie tego samego stylu — kandydat do wydzielenia do `components.css`** (patrz próg w pamięci projektu: atom graduuje po powtórzeniu na >1 stronie). **Warunek konieczny:** element musi faktycznie **nakładać się** na przewijaną treść — `position: fixed` (viewport) albo `position: absolute` we wrapperze z `position: relative` i paddingiem-bottom na scrollowanym kontenerze, żeby treść realnie przesuwała się pod spodem. Sam styl (blur+przezroczystość) bez tego overlayu jest bez znaczenia — tło i tak jest jednolite, więc blur nic nie pokazuje (błąd popełniony przy pierwszym podejściu do `.quote-footer-bar`: wyglądał "stylistycznie" dobrze, ale siedział w normalnym flow pod scrollem, więc blur nie miał czego rozmazywać). |

---

### 3.1 `.media-card` — karta z wizualem prowadzącym gdzieś dalej

Powtarzający się kształt karty na całej stronie: **wizual (zdjęcie/wideo) + tytuł +
opcjonalny opis + opcjonalny CTA**, gdzie zdjęcie *jest* treścią (patrz pkt. 2.5), nie
dekoracją. Wypromowany do `components.css` jako `.media-card-visual/-title/-desc/-cta`
(+ `-badge`) po tym, jak ten sam kształt pojawił się pod trzema różnymi, page-specific
nazwami — `.deals-carousel-card` (`deals.html`), `.category-item`/`.category-thumb`
(`index.html`), `.cs-grid-item` (`case-studies.html`) — i po raz czwarty jako
`.related-card` na `contact.html`, co przekroczyło próg z pkt. 3 (3. wystąpienie =
kandydat do `components.css`). Nowe użycia mają celować w te współdzielone klasy, nie w
kolejną własną nazwę/wariant.

**Struktura — zagnieżdżenie, nie płaska lista slotów:**
```
.media-card                 (cała karta — <a> jeśli klikalna w całości, <div> jeśli CTA jest osobnym linkiem)
  .media-card-visual         (zdjęcie/wideo — kwadrat lub zbliżony, zaokrąglone rogi)
    .media-card-badge        (RZADKI wyjątek — patrz niżej; leży NA zdjęciu, jest jego dzieckiem)
  .media-card-title           (siostra .media-card-visual, nie jej dziecko — POD zdjęciem)
  .media-card-desc            (opcjonalna, jedna linijka — sprzedażowe zdanie ALBO meta typu "5 min read", ta sama rola wizualna)
  .media-card-cta             (opcjonalny osobny przycisk — pomiń, jeśli cała karta jest linkiem)
```
Praktyczny test przy dodawaniu czegoś nowego: jeśli ma leżeć *na fotografii* → dziecko
`.media-card-visual`. Jeśli ma leżeć *pod fotografią*, jako osobna linia tekstu → siostra
`.media-card-visual`.

**`.media-card-badge` jest domyślnie wyłączony — to nie jest slot do swobodnego użycia.**
Dziś jedynym uzasadnionym użytkownikiem jest Deals (kod promocyjny + %), gdzie wycentrowany
overlay ma sens kompozycyjnie. Nie dodawaj go do nowych kart tylko dlatego, że komponent na
to pozwala — wycentrowany badge na zdjęciu produktu w większości przypadków po prostu
zasłoni to, co miało być widoczne. Dodaj go tylko gdy ktoś wprost prosi o coś w rodzaju
promo/etykiety, i tylko jeśli realnie nie zakrywa produktu.

**Kontener to osobna decyzja, nie część komponentu:** `.scroll-carousel` (pkt. 1.2) gdy
elementów jest dużo/do przewijania, zwykły statyczny CSS grid gdy zestaw jest mały i
skończony (np. 3 kafle jak w Related links na `contact.html`). Karta wygląda identycznie w
obu kontenerach.

**Checklist rozpoznawania — kiedy sięgać po `.media-card`, a kiedy po zwykłą listę
tekstowych linków (jak kolumny w stopce, `.footer-col`):**
1. Czy każda pozycja to konkretna "rzecz" rozpoznawalna po zdjęciu (produkt, deal,
   artykuł, kategoria)? Jeśli nie (np. "Terms of service", "Privacy policy") → zwykła
   lista linków tekstowych, nie `.media-card`.
2. Czy istnieje (albo sensownie mogłoby istnieć) prawdziwe zdjęcie/wideo per pozycja?
   Jeśli trzeba by zmyślać placeholder, bo nie ma czego pokazać — to znak, że jednak
   powinna być lista tekstowa (błąd popełniony na `contact.html`: gradientowe
   placeholdery-blob dla Help/Impressum/Press, gdzie nie było prawdziwych zdjęć).
3. Ile pozycji i jak mają być przeglądane? → decyduje wybór kontenera, patrz wyżej.
4. Osobny CTA czy cała karta jako link? Oceń per użycie, brak sztywnej reguły.
(Badge **nie** jest punktem tej checklisty — to osobny, rzadki wyjątek opisany wyżej, nie
domyślna opcja do rozważenia przy każdej nowej karcie.)

**Przykład zastosowania checklisty — "sekcja z najczęściej sprzedawanymi produktami":**
(1) produkty = rzeczy rozpoznawalne po zdjęciu → `.media-card`; (2) realne zdjęcia
istnieją w CDN → visual = prawdziwe foto, bez badge; (3) dużo pozycji → `.scroll-carousel`
jak `.category-item` na HP, mało (3-4) → statyczny rząd bez scrolla; (4) prawdopodobnie
cała karta jako link, jak `.category-item`, chyba że ktoś wprost poprosi o osobny
przycisk.

**Status:** wypromowane do `components.css` (`.media-card-visual/-title/-desc/-cta/-badge`).
`deals.html`, `index.html` (obie sekcje categories, w tym oba generatory JS per-tab),
`case-studies.html` i `contact.html` używają już wspólnych klas dla title/desc/CTA/badge —
page-specific klasy (`.deals-carousel-card`, `.category-thumb`, `.cs-grid-thumb`,
`.related-card-visual`) zostały obok, tylko dla sizingu (wysokość/aspect-ratio) i
per-page hover-zoom, który celowo nie jest częścią współdzielonej reguły (Deals go nie
ma, HP i case-studies mają, każde swoim mechanizmem — `::before` vs `<img>`).

---

## 4. Wzorzec nagłówka sekcji: badge + H2 + subheading (+ CTA)

Powtarza się w: FAQ, categories ×2 (HP), final-cta (HP), warianty w cta-section (ciemna
odmiana z `<p>` zamiast `<h2>`) i w `pkg-title-row` (Shop, bez badge'a, bo to H1
kategorii, nie H2 sekcji).

**Struktura:**
```
.section-badge          (opcjonalny label, np. "Why Packhelp")
h2                       (nagłówek sekcji)
p.subheading             (opcjonalny opis, 1-2 zdania)
[CTA row | toolbar]      (opcjonalne przyciski lub toggle+CTA drugorzędne)
```

**Rytm wewnętrzny:** badge → H2: `space-1`–`space-3` (bardzo blisko); H2 → subheading:
`space-4`–`space-6`; subheading → CTA/toolbar: `space-6`.

**Niespójność do rozstrzygnięcia przy nowych sekcjach:** na HP `.faq-heading` ma
`font-size: 3rem`, a `.categories-heading` (ten sam poziom hierarchii) ma `2rem`. Dla
nowych sekcji **przyjmij 3rem jako kanoniczny rozmiar H2** dla sekcji "pełnej" (jak FAQ),
a 2rem tylko gdy sekcja ma dodatkowo ciężki wizualnie toolbar/karuzelę pod spodem
(categories) i trzeba zostawić więcej wagi wizualnej dla treści niżej.

**Breadcrumb — zawsze bezpośrednio nad H1, nigdy jako osobna sekcja z własnym
paddingiem.** To wzorzec **strony**, nie sekcji (więc nie ma badge/H2 — sam pasek
`Packhelp / Kategoria / ...`). Renderuj go jako pierwsze dziecko wewnątrz `<main>`, tuż
przed blokiem H1+subheading. Używaj na każdej stronie katalogowej/produktowej, która ma
realną hierarchię (Packhelp / Packaging / Boxes) — obecnie: `packaging.html`,
`industries.html`, `deals.html`, `sample-packs.html`. Pomiń na stronach marketingowych bez
hierarchii (HP) i na uproszczonych flow (`get-a-quote.html`).

**Kanoniczny odstęp — sprawdzony co do piksela na wszystkich czterech stronach
powyżej:** nav → breadcrumb = `space-8` (32px), breadcrumb → H1 = `space-4` (16px). To
jedyne dwie liczby, które mają się zgadzać — **sposób ich osiągnięcia zależy od tego, czy
strona owija treść w padded `<main>`:**
- **Bez padded wrappera** (breadcrumb jest bezpośrednim dzieckiem `.container`, tak jak na
  `packaging.html`/`industries.html`): breadcrumb sam sobie deklaruje i top, i poziomy
  padding — `padding: var(--space-8) var(--space-8) 0`.
- **Z padded wrapperem** (`<main class="X-page">` ma już własny poziomy padding, tak jak
  `.deals-page`/`.samples-page`): breadcrumb **nie dubluje** poziomego paddingu — dziedziczy
  go z wrappera. Top-odstęp może wtedy siedzieć albo na samym wrapperze (`deals.html` —
  `.deals-page` ma `padding-top: space-8`, `.deals-breadcrumb` nie ma własnego), albo na
  breadcrumbie, jeśli wrapper z jakiegoś innego powodu musi mieć `padding-top: 0`
  (`sample-packs.html` — `.samples-page` zostaje przy `0` żeby nie zaburzyć własnego rytmu
  marquee/stopki, więc to `.samples-breadcrumb` dostaje `padding-top: space-8`). Gap
  breadcrumb→H1 (16px) w obu wypadkach idzie jako `margin-bottom` na samym breadcrumbie, nie
  jako `margin-top` na H1.
- **Pułapka:** jeśli dublujesz poziomy padding (breadcrumb ma własny `padding-left/right`
  ORAZ siedzi w padded wrapperze), breadcrumb wizualnie "wjedzie" głębiej niż reszta treści
  strony pod nim — sprawdzaj to porównując rzeczywistą pozycję linku w breadcrumbie (nie
  samego `<nav>`, bo jego padding jest wewnątrz jego własnego boxa i nie przesuwa
  `getBoundingClientRect()`), a treści niżej.

**Header strony (H1 + subheading) zawsze dostaje `.reveal`** — ten sam wjazd co reszta
reveal-owanych sekcji na stronie: `opacity: 0; transform: translateY(-16px);
transition: opacity 0.8s ease, transform 0.8s ease;`, a `.reveal.is-visible` zeruje
transform i ustawia `opacity: 1`. Klasę `is-visible` dokłada wspólny
`IntersectionObserver` (próg `0.1`–`0.15`, obserwuje wszystkie `.reveal` na stronie,
`unobserve` po pierwszym zadziałaniu — animacja jest jednorazowa, nie odtwarza się przy
ponownym scrollu). Rób to niezależnie od tego, czy strona używa reveal gdziekolwiek
indziej. `sample-packs.html` przed tą poprawką w ogóle nie miał systemu reveal (ani CSS,
ani `IntersectionObserver`) — trzeba było dodać go w całości tylko po to, żeby nagłówek
wjeżdżał tak samo jak na `packaging.html`/`industries.html`/`deals.html`. Traktuj to jako
stały wymóg dla każdej nowej strony z H1, nie opcję.

---

## 5. Duet przycisków "Shop now (primary) / Get a quote (secondary)"

Dosłownie identyczny markup powtórzony 3× na HP: hero, FAQ, final-cta-section. To
**kanoniczna para CTA dla stron marketingowych** — traktuj ją jako nazwany komponent:

- Primary (`.btn-pill.lg`): akcja transakcyjna, prowadzi do zakupu/konfiguratora.
- Secondary (`.btn-pill.lg.secondary`): akcja niższego zaangażowania (wycena, kontakt).
- Używaj tej pary za każdym razem, gdy proszę o "hero" albo "zamknięcie strony"
  (closer/final CTA) na stronie marketingowej. **Nie** używaj jej w konfiguratorze czy
  na Shopie — tam CTA są kontekstowe (Add to cart, More info, Customize design).

Na ciemnym tle (`cta-section`) odpowiednikiem jest para
`.btn-pill.lg` (primary, z awatarami) + `.btn-pill.lg.outline-light` — ten sam podział
ról primary/secondary, inny wariant kolorystyczny dopasowany do tła.

---

## 6. Katalog sekcji według kontekstu strony

### 5.1 Elementy wspólne dla każdej strony (nav + footer)

Każda strona (poza konfiguratorem, który nie ma stopki) zaczyna się od tego samego
zestawu i kończy tym samym zestawem:

1. **`.announcement-bar`** — opcjonalny cienki pasek promocyjny nad nawigacją. Dodawaj
   tylko gdy jest realna, czasowa promocja do zakomunikowania — nie jako stały element.
2. **Nawigacja to jeden komponent, dwa warianty — zawsze `nav-header.js`, nigdy
   budowana od nowa inline.** Nowa strona nie dostaje własnego, ręcznie sklejonego
   headera — dostaje placeholder(y) + `<script src="nav-header.js"></script>`, a
   markup/style edytuje się wyłącznie w `nav-header.js` i `components.css`
   (sekcja "Top nav"). Kopiowanie nawigacji z powrotem inline do strony odtworzy
   dokładnie ten problem driftu, który ten plik naprawił (patrz pkt 8).
   - **Wariant pełny** — `.nav-row1` (logo, sign-in, flaga kraju, koszyk) +
     `nav.topbar` (linki + `.nav-megamenu` na hover + CTA para sm) + `.sticky-bar`
     (pkt 3 niżej). Placeholdery: `#ph-sticky-bar` + `#ph-nav-wrapper`. Używany na
     `index.html`, `packaging.html`, `build-your-box.html` — stron
     marketingowych/katalogowych, gdzie pełna nawigacja ma sens. **Wyjątek:**
     `sample-packs.html` też ma wariant pełny mimo że jest stroną cart-flow (Michal
     wybrał to świadomie, nadpisując domyślną regułę niżej) — jeśli budujesz kolejną
     stronę cart-flow, dopytaj zamiast zakładać automatycznie wariant uproszczony.
   - **Wariant uproszczony** — samo wycentrowane logo, bez linków/megamenu/koszyka
     (`.quote-topbar`). Placeholder: `#ph-nav-simple`. Używany na stronach typu
     "flow"/zadaniowych, gdzie nawigacja ma **nie rozpraszać** (np.
     `get-a-quote.html`).
   - **Który wybrać dla nowej strony:** strona ma zachęcać do eksploracji katalogu/
     oferty → wariant pełny. Strona to pojedyncze zadanie do dokończenia (checkout,
     formularz, krótki flow) → wariant uproszczony.
3. **`.sticky-bar`** — pojawia się (fade-in + `.is-pinned`) dopiero po przewinięciu poza
   `.nav-row1`. Zawiera skróconą nawigację, search i duplikat CTA. Znika całkowicie pod
   900px (brak zamiennika mobile w obecnym prototypie — świadoma lub czeka na
   uzupełnienie, nie kopiuj tego jako wzorca docelowego bez zastanowienia).
4. **`.site-footer`** — logo + newsletter + badge (FSC/ESG) po lewej, 3 grupy linków +
   kolumna "Connect" po prawej, osobny pasek `.footer-bottom` (copyright + godziny) pod
   separatorem. Zawsze ten sam na każdej stronie, poza `build-your-box.html`, która
   **celowo nie ma stopki** (strona zadaniowa, użytkownik ma dokończyć konfigurację, nie
   wychodzić w linki).
5. **Strony na wariancie uproszczonym** (np. `get-a-quote.html` — tylko logo
   wyśrodkowane, bez linków/koszyka/sign-in, patrz pkt 2): `.quote-topbar` i tak
   dostaje `height: var(--space-16)` (4rem/64px), **dokładnie tyle co `.nav-row1`**
   w wariancie pełnym — nie wpisuj dowolnej wysokości "na oko" (np. `72px`) tylko
   dlatego, że w danym momencie w barze nie ma nic poza logo. Wysokość topbara jest
   stała niezależnie od wariantu.

Odstęp: 64px (`space-16`) między ostatnią sekcją treści a stopką, niezależnie od strony
(potwierdzone i na HP, i na Shopie).

### 5.2 Strona marketingowa / landing (wzorzec: `index.html`)

Kolejność sekcji i ich rola:

| # | Sekcja | Rola | Full-bleed? | `reveal` (fade-in on scroll)? |
|---|---|---|---|---|
| 1 | **Hero** | Pierwsze wrażenie: nagłówek + CTA para + wizual produktu rotujący | tak (ale grid wewnętrzny ograniczony do ~1216px) | nie (above the fold) |
| 2 | **Thumb-strip** | Szybki skrót kategorii/branż z togglem, "dogrywka" zaraz po hero | nie | tak |
| 3 | **FAQ** | Zaufanie + odpowiedzi na obiekcje, 2 kolumny (badge+H2+CTA / akordeon) | nie | tak |
| 4 | **Categories ×2** | Przegląd oferty w 2 wariantach (packaging / merch), karuzela | tak | tak |
| 5 | **Marquee** | Czysto dekoracyjny, rytmiczny przerywnik między dwoma "ciężkimi" sekcjami | tak | nie (ma własną ciągłą animację) |
| 6 | **Statement** | Duży cytat/zdanie + bento-grid kafli pokazujących funkcje edytora | nie (ale `max-width:80%`, asymetrycznie) | tak |
| 7 | **CTA-section** (dark) | Duży, "sprzedażowy" blok: USP-y, dwie CTA, karuzela dowodów społecznych/demo | tak (karta wewnątrz, prawie edge-to-edge) | tak |
| 8 | **Final-CTA** | Wyśrodkowane zamknięcie strony, ten sam duet przycisków co hero | nie | tak |

**Hero ma warianty** sterowane klasą na `<body>` (w prototypie to dev-toggle, docelowo
to powinien być świadomy wybór przy tworzeniu strony):
- domyślny: split lewo-tekst / prawo-wizual,
- `hero-centered`: bez wizualu, wyśrodkowany, większy H1 (4.5rem) — **to jest ten sam
  layout co final-cta-section**. Traktuj `hero-centered` i `final-cta` jako jeden
  wzorzec komponentu ("Centered heading block") używany raz na górze, raz na dole.
- `short-hero`: niższy wizual (460px) — używaj, gdy treść hero jest krótka i pełna
  wysokość wizualu wygląda pusto.

**Kiedy sięgać po którą sekcję** (dla przyszłych opisów słownych):
- "chcę pokazać różne kategorie/oferty do przewijania" → **categories-section** (pełny
  wzorzec: badge+H2+subheading+toolbar z togglem+CTA secondary "See all X" + karuzela).
- "chcę rozwiać wątpliwości/pokazać FAQ" → **faq-section** (2 kolumny, lewo zawsze
  badge+H2+CTA para, prawo zawsze akordeon).
- "chcę pokazać funkcje/możliwości produktu w bardziej wizualny sposób" →
  **statement-section** (bento tiles z obrazem/wideo w tle, nie kartami tekstowymi).
- "chcę mocny, sprzedażowy blok z dowodami społecznymi" → **cta-section** (ciemna karta,
  jedyne miejsce na `outline-light`, jedyne miejsce na testimonial slider).
- "chcę zamknąć stronę" → **final-cta-section** (zawsze wyśrodkowana, zawsze ten sam
  duet przycisków co hero). **Nagłówek zawsze dostaje `.final-deco-square`** — pigułkę
  ze zdjęciem (tło `background-image`), schowaną (`width:0`) dopóki sekcja nie stanie
  się `.is-visible` (ten sam `.reveal`/`IntersectionObserver`, patrz pkt 4), po czym
  wjeżdża jako obrócone (-8deg) zdjęcie 64×64px wstawione w środku zdania, rozpychając
  otaczające słowa — wzorzec z `index.html` ("Everything in the box. And the [zdjęcie]
  box."), teraz obowiązkowy dla **każdej** final-cta-section, nie tylko HP. Wstaw span
  między dwa słowa nagłówka, które da się sensownie rozdzielić (np. "similar ⟨img⟩ to"),
  z dosłownymi spacjami po obu stronach w HTML. Zdjęcie w tle dobierz z realnych
  assetów danej strony (na HP to cykl 5 zdjęć przez `@keyframes`, na stronach z jednym
  bohaterem/produktem wystarczy jedno statyczne zdjęcie tego produktu/case study).
  **Pułapka, w którą łatwo wpaść (błąd popełniony 2026-07-30 na
  `case-study-oase.html`/`case-studies.html`):** całkowity odstęp lewo-prawo od zdjęcia
  do sąsiednich słów to margines `.final-deco-square` (`--space-2`, 8px) **PLUS**
  dosłowna spacja w tekście HTML — obie części razem, tak jak w oryginale na HP
  (`the <span class="final-deco-square"></span> box`, nie `the<span
  class="final-deco-square"></span>box`). Sam margines bez spacji w markupie daje
  wyraźnie mniejszy odstęp niż na HP — zawsze sprawdzaj HTML pod kątem literalnej
  spacji po obu stronach `<span>`, nie tylko CSS.
- "chcę czysto dekoracyjny przerywnik rytmu" → **marquee-section** (tylko tekst
  powtarzany w pętli, zero treści informacyjnej).

### 5.2.1 Dane per-tab w thumb-strip i categories-section (HP)

Trzy miejsca na HP mają toggle przełączający siatkę kafli przez JS: thumb-strip po
hero (`Categories`/`Merchandise`/`Industries`), categories-section niżej
(`E-commerce`/`Health & Beauty`/`Food & Drinks`/`Apparel & Fashion`) i "Kits & branded
merch" (`HR`/`Marketing & PR`/`Events`).

**Każdy tab ma własną, niezależną listę kategorii** — `{ title, desc, image }` w
categories-section/Kits (albo `{ label, image }` bez `desc` w thumb-strip). Nie
zakładaj wspólnej listy kategorii współdzielonej między tabami przez indeks tablicy
(`items[i]` + `images[tab][i]`) — to był pierwotny wzorzec i został świadomie
zarzucony (2026-07-29/30), bo różne branże/działy mają różne zestawy kategorii, różnej
długości i w różnej kolejności (np. Health & Beauty ma 4 kategorie, Food & Drinks 5,
Apparel & Fashion 7 — każda zdefiniowana explicite w obiekcie tabów, bez wspólnego
`sharedItems`).

**Domyślny/aktywny tab renderuje się przy starcie ze statycznego HTML w sekcji**, nie z
JS (JS dopisuje siatkę dopiero przy kliknięciu w toggle). Zmieniając listę kategorii
domyślnego taba (`categories` w thumb-strip, `ecommerce` w categories-section, `hr` w
Kits & branded merch) **zaktualizuj oba miejsca** — statyczny markup i odpowiadający
wpis w JS-owym obiekcie tabów — inaczej pierwsze wejście na stronę i przełączenie tabów
tam i z powrotem pokażą różną zawartość.

**Konwencja folderów assetów per branża/segment:**
- `assets/custom-packaging/<industry>/<industry>-<category-slug>.<ext>` — zdjęcia dla
  tabów E-commerce/Health & Beauty/Food & Drinks/Apparel & Fashion w categories-section
  (np. `assets/custom-packaging/apparel/apparel-mailing-bags.png`).
- `assets/main-segment/<packaging|merchandise|industries>/<segment>-<category-slug>.<ext>`
  — zdjęcia dla thumb-strip pod hero. Pliki bywają przenoszone/reorganizowane między
  podfolderami przez użytkownika w trakcie pracy — zawsze zweryfikuj rzeczywistą
  ścieżkę (`find`/`ls`) zamiast ufać ścieżce użytej poprzednio w kodzie.
- `assets/merch/<hr|restaurants|events>/<segment>-<category-slug>.<ext>` — zdjęcia dla
  "Kits & branded merch". Uwaga: klucze tabów w JS to `hr`/`marketing`/`events`, ale
  folder dla `marketing` nazywa się `restaurants` (dziedziczone z wcześniejszej wersji
  sekcji) — nazwa folderu ≠ nazwa taba, zawsze sprawdzaj w JS które `gearTabs.<klucz>`
  odpowiada któremu przyciskowi.

**Brakujący asset = kafel bez zdjęcia, nigdy placeholder/fallback z innej kategorii.**
Gdy kategoria nie ma jeszcze zdjęcia, zostaw `image: null` (albo pomiń klucz `image`
w obiekcie `{ label }`) — inline `--thumb-img` się wtedy nie renderuje i kafel zostaje
jednolicie szary z CSS. Nie podstawiaj przypadkowego zdjęcia z innej kategorii/folderu
tylko po to, żeby kafel nie wyglądał na pusty — to jawna instrukcja tego projektu,
powtarzana konsekwentnie przy każdym batchu zdjęć (E-commerce, Health & Beauty, Food &
Drinks, Apparel & Fashion, Industries, Kits & branded merch).

### 5.3 Strona konfiguratora produktu (wzorzec: `build-your-box.html`)

Zupełnie inny szkielet niż landing — **brak stopki**, dwukolumnowy layout na całą
wysokość strony:

```
.build-box-page { display:grid; grid-template-columns: minmax(0,1400px) 480px; }
```
- **Lewa kolumna (elastyczna, do 1400px): podgląd 3D/2D** (`.build-box-visual`) — sticky,
  wypełnia wysokość viewportu, zawiera prawdziwy model CSS-3D (izometryczny,
  `rotateX(-35.264deg) rotateY(-45deg)`, przeciągany myszą), linie wymiarowe reagujące
  na focus inputów, toolbar (3D/2D toggle, zoom, Open/Close toggle).
- **Prawa kolumna (stała 480px): stos kroków konfiguracji** — 9 sekcji
  `.build-box-step`, każda **96px padding góra+dół** (to jest odstęp między krokami —
  nie licz go jako margin, tylko jako padding samej sekcji).

**Anatomia jednego kroku** (powtarzalna dla wszystkich 9):
```
h3.build-box-field-label     (tytuł pytania, np. "Choose your material")
p.build-box-field-desc       (1 zdanie kontekstu)
[opcje — jeden z 4 wzorców niżej]
```

**Sześć wzorców wyboru opcji — który wybrać, zależy od typu decyzji:**

| Wzorzec | Wygląd | Kiedy użyć | Gdzie już użyty |
|---|---|---|---|
| `.box-type-grid` | pionowa lista pełnej szerokości, miniatura 88×88 + tytuł + opis | Wybór **z opisem** wymagającym wyjaśnienia (nie sama nazwa wystarczy) | Box type, Windows, Print coverage/Finish, Quantity |
| `.construction-grid` | kwadratowe kafle 100×100, ikona + podpis, wrap w rzędy | Wybór **wizualny/ikonowy** bez potrzeby opisu, dużo opcji obok siebie | Construction, Closure |
| `.material-card-grid` | prawdziwy CSS grid 2 kolumny, zdjęcie 162:104 + tytuł + opis | Wybór, gdzie **zdjęcie materiału/wykończenia** jest kluczowe dla decyzji | Material, Customization |
| `.dimension-grid` | 3-kolumnowy grid pól numerycznych z jednostką | **Tylko** dla wprowadzania wymiarów/liczb, nie dla wyboru z listy | Size |
| `.toggle-switch` | pigułka 2-3 opcje | Przełącznik **trybu**, nie wybór z listy opcji (np. "podaj wymiary zewnętrzne" vs "podaj wymiary produktu") | Size mode, 3D/2D, Open/Close |
| `.quantity-card` (rozszerzenie `.box-type-grid`) | jak box-type-grid + cena jednostkowa/total po prawej, "Choose other value" rozwija panel | **Tylko** krok ilości/ceny | Quantity |

**Reguła wyboru:** jeśli opcja wymaga zdjęcia żeby ją zrozumieć → `material-card-grid`.
Jeśli wystarczy ikona/kształt → `construction-grid`. Jeśli trzeba dodać zdanie
wyjaśnienia → `box-type-grid`. Nie wymyślaj nowego wzorca na kolejny krok — te cztery
pokrywają wszystkie dotychczasowe przypadki.

**Elementy poza krokami:**
- **`.build-box-dots`** — pionowa nawigacja z kropkami po prawej stronie ekranu,
  aktywna wg tego, który krok jest w centralnym pasie viewportu (nie standardowy
  `scrollIntoView`, tylko custom eased scroll). Znika pod 900px.
- **`.build-box-sticky-summary`** (dolny pasek) — pojawia się dopiero po minięciu
  nagłówka, znika przy checkout. Zawsze pokazuje aktualną cenę + `.btn-pill.lg` "Add to
  cart". Znika pod 900px.
- **`.build-box-checkout`** — ostatni blok (nie jest krokiem numerowanym), z
  dostawą/terminami po lewej i sumą ceny po prawej, dwa CTA na dole (primary "Customize
  design" + secondary muted "Skip design for now").
- **Compact mode (accordion)** — alternatywny tryb wyświetlania kroków jako akordeon
  (jeden rozwinięty naraz, reszta zwinięta z widocznym podsumowaniem wyboru). Włącz ten
  wariant, gdy krok ma być **domyślnie zwięzły** (np. długa lista kroków na wolniejszym
  łączu/mobile), nie jako alternatywę estetyczną bez powodu.

### 5.4 Strona katalogowa / listing kategorii (wzorzec: `packaging.html`)

Kolejność sekcji, wszystkie w `.container` (1280px, nie full-bleed poza nawigacją/
stopką):

| # | Sekcja | Rola |
|---|---|---|
| 1 | `.pkg-breadcrumb` | Ścieżka nawigacji (Packhelp / Packaging / ...) |
| 2 | `.pkg-title-row` | H1 kategorii + opis przycinany (`.clamped` + "Show more") |
| 3 | `.pkg-tiles-section` | Pozioma karuzela podkategorii (zdjęcie kwadrat + podpis, wzorzec `.scroll-carousel`) |
| 4 | `.pkg-filters-bar` | Filtry (chipy + dropdown) + sortowanie |
| 5 | `.pkg-products` | Właściwa siatka produktów (prawdziwy CSS grid, 4→3→2 kolumny) |
| 6 | `.pkg-seo` | Tekst SEO, zwężony do połowy szerokości kontenera, przygaszony wizualnie |

**`.pkg-tiles-section` vs `.pkg-products` — nie mylić dwóch wzorców karty:**
- Kafel podkategorii (`.thumb-item`): zdjęcie kwadrat + podpis pod spodem, stała
  szerokość 112px, w poziomym scrollu — **to nawigacja**, nie oferta do kupienia.
- Karta produktu (`.product-card`): zdjęcie kwadrat + `.product-card-moq` (badge z
  minimalnym nakładem) + nazwa + cena "From £X.XX" + `.btn-pill.sm` "More info"
  ujawniany na hover — **to oferta**, w prawdziwym gridzie kolumnowym.
- Dodatkowo w gridzie produktów mogą się pojawiać **`.promo-card`** — czysto tekstowe
  "wciśnięte" komórki (np. "Save up to 20% with Packhelp Wallet") bez zdjęcia, żeby
  przerwać monotonię siatki. Używaj oszczędnie (2 na ~20 produktów w istniejącym
  wzorcu), nigdy jako pierwsza/ostatnia karta.

**Filtry (`.pkg-filters-bar`):** dwa warianty kontrolek w dropdown-panelu —
`.filter-radio` (single-select, tam gdzie wybór jest wykluczający, np. rozmiar) i
`.filter-checkbox` (multi-select, np. branża). Dla list dłuższych niż ~10 pozycji dodaj
`.filter-panel-scroll` (`max-height:320px`). Jeśli opcja ma sens ze zdjęciem
poglądowym (np. typ opakowania) — dodaj `.filter-preview` (podgląd 160×160px z boku
panelu na hover).

**`.pkg-seo`:** mimo nazwy w CSS to **nie akordeon** — wszystkie bloki są zawsze w pełni
rozwinięte, jednokolumnowe, zawężone do połowy szerokości kontenera. Trzymaj ten wzorzec
(nie dodawaj przypadkowo toggle/collapse — to świadomie stonowany, zawsze-widoczny blok
tekstowy na końcu strony kategorii).

### 5.5 Strona wyboru próbek / cart-flow (wzorzec: `sample-packs.html`)

Odtwarza realny cart Packhelp (packhelp.co.uk/app/sample-packs) w stylistyce reszty
redesignu, w `.container` (nie full-bleed poza nav/marquee/stopką, tak jak
`packaging.html`). Layout: `.samples-grid` — dwie kolumny, lewo lista grup produktów w
akordeonie, prawo **sticky** karta podsumowania (`.samples-summary-card`, ten sam typ
komponentu co `.build-box-sticky-summary`/`.build-box-checkout` na konfiguratorze —
zawsze widoczna cena/CTA obok długiej, przewijanej listy wyboru).

**Grupa produktu = akordeon nagłówek + ciało:**
- Nagłówek (`.sample-group-header`): avatar 80×80 (`.sample-group-thumb`, placeholder
  szary dopóki nie ma prawdziwego zdjęcia) + tytuł + licznik wybranych
  (`.sample-group-count`, ukryty dopóki `n === 0`) + chevron. Odstęp nad i pod tym
  rzędem musi być **równy** (padding avatara = padding ciała akordeonu po otwarciu, oba
  `--space-4`) — nie kopiuj `--space-5` do jednego z nich "bo tak było", to jest
  świadomie dopasowana wartość.
- Ciało: **segmentowany pill-tab** Print Sample / Size Sample — to jest wariant
  `.toggle-switch` (pkt 6.3, tabela wierszy wyboru trybu) rozciągnięty na pełną
  szerokość (`flex:1 1 0` na opcjach) zamiast domyślnego "hug content". Grupy bez
  wariantów (np. Wine Product Box) po prostu pomijają tabs i renderują listę wprost —
  nie twórz atrapy z jedną zakładką.
- Pod tabs: `.sample-row-list` — wiersze z checkboxem (`.filter-checkbox`-owy wzorzec
  z `packaging.html`, przeklejony bo jeszcze nie awansowany do `components.css`), limit
  8 zaznaczeń pilnowany w JS (pozostałe disablowane, nie ukrywane).

**Tryb Grid (przełącznik w `.site-settings-btn`, ten sam wzorzec "trybik w prawym
dolnym rogu" co Compact mode na `build-your-box.html`, pkt 5.3):** zamienia
`.sample-row-list` z pionowej listy w 3-kolumnowy grid kart zdjęciowych — checkbox
przenosi się z końca wiersza na overlay w rogu zdjęcia. Włączany klasą `body.grid-mode`.
**Pułapka specyficzności, jeśli dodajesz kolejny wariant trybu:** selektor w stylu
`body.grid-mode .sample-row-list` ma wyższą specyficzność niż `.sample-tab-panel[hidden]
{ display:none }`, więc bez `:not([hidden])` w selektorze trybu, ukryta zakładka i tak
się pokaże w nowym trybie.

**Podgląd na hover (avatar → większe zdjęcie):** renderowany jako **jeden wspólny
element wpięty w `<body>`** (`.hover-preview`), pozycjonowany przez
`getBoundingClientRect()` w JS przy `mouseenter`, a nie jako element zagnieżdżony
wewnątrz avatara. Zagnieżdżony wariant wygląda dobrze dopóki nie trzeba przewinąć/
otworzyć czegoś nadrzędnego z `overflow:hidden` (tu: zaokrąglona karta grupy +
kontener akordeonu z animacją zwijania) — wtedy podgląd się przycina. Jeśli gdziekolwiek
indziej potrzebny będzie hover-preview większy niż jego kontener (np. rozszerzenie
`.filter-preview` na katalogu), rozważ ten sam wzorzec zamiast zagnieżdżania.

**Akordeon zwijany przez `max-height` + `overflow:hidden` (transition), NIE przez
sztuczkę `grid-template-rows: 0fr`** (używaną w `.faq-item` na `index.html`). Ta
sztuczka zawodzi, gdy pierwsze dziecko zwijanej treści to nie-tekstowy flex/grid z
własnym borderem/paddingiem (tu: pasek segmentowanych tabs) — automatyczny minimalny
rozmiar grid itemu i tak nie pozwala mu spaść do zera. Zanim użyjesz `0fr` gdzie indziej,
zweryfikuj realną wysokość zwiniętego stanu w devtoolsach zamiast zakładać, że zadziała.

---

## 7. Rytm odstępów między sekcjami — reguła ogólna

Odstęp między sekcjami nie jest stałą liczbą — zależy od tego, czy sekcja **zaczyna nowy
temat własnym nagłówkiem** czy **kontynuuje** poprzedni flow wizualny:

- **Sekcja z własnym badge+H2+subheading** (FAQ, categories, final-cta na HP) →
  `padding-top: var(--space-40)` = **10rem/160px** przed nią.
- **Sekcja kontynuacyjna, bez nagłówka-etykiety** (thumb-strip po hero, statement po
  marquee, cta-section po statement) → mały `padding-top: var(--space-8)` = **2rem/32px**
  lub mniej.
- **Efektywny odstęp** (suma padding-bottom poprzedniej + padding-top następnej) na HP
  oscyluje między **~8rem** (sekcje kontynuacyjne) a **~12rem** (przed sekcją z
  nagłówkiem) — traktuj to jako dwie "prędkości" rytmu strony, nie jedną stałą wartość.
- Na Shopie (bez dużych nagłówków sekcji, gęściejszy układ) odstępy są mniejsze i
  bardziej jednolite: breadcrumb→title 0, title→tiles 40px, tiles→filters 48px,
  filters→products 48px, products→seo 64px, **seo→footer 128px** (największy odstęp na
  stronie — oddziela treść od stopki, symetryczny z regułą "64px przed stopką"
  powtórzoną też na HP).
- W konfiguratorze rytm jest inny w naturze — nie ma "sekcji" w sensie marketingowym,
  tylko stały krok **96px padding** na każdy `.build-box-step` z obu stron (czyli
  ~192px łącznie między środkami dwóch sąsiednich kroków).

**Praktyczna reguła do stosowania przy nowej sekcji:** zapytaj siebie "czy ta sekcja
wprowadza nowy temat z własnym badge'em i nagłówkiem, czy kontynuuje poprzedni wątek
wizualny bez przerwy?" — pierwsza dostaje `space-40` z góry, druga `space-8` lub mniej.

---

## 8. Znane niespójności prototypu (nie kopiuj bezrefleksyjnie)

- `.faq-heading` (3rem) vs `.categories-heading` (2rem) — ten sam poziom hierarchii
  (H2 sekcji), różny rozmiar. Patrz rekomendacja w pkt. 4.
- **[Naprawione]** `.section-badge` był domyślnie `display:none`, odkrywany tylko
  przez dev-panel ustawień (toggle "Custom packaging badge"). Teraz zawsze widoczny —
  toggle usunięty z panelu razem z "Show captions" (2026-07-31), oba stały się
  domyślnym, stałym zachowaniem strony.
- Jedno miejsce z twardym `style="margin-top: 2rem"` zamiast tokenu — w
  `statement-section` na HP.
- `#siteContent`/`.container` w `index.html` nie mają jawnie domkniętego `</div>` przed
  stopką (wizualnie nieszkodliwe, ale porządkować przy przepisywaniu na komponenty).
- `.categories-grid` nazwą sugeruje CSS grid, a jest flex + overflow-x — nie kieruj się
  nazwą klasy przy kopiowaniu wzorca, tylko rzeczywistym mechanizmem (patrz pkt. 1.2).
- **[Naprawione]** `.site-footer`'s szara linia-dywider ma być full-bleed (pełna
  szerokość viewportu, nie szerokość `.container`) na każdej stronie — kanoniczny
  wzorzec to `.site-footer { position: relative; }` + `.site-footer::before { content:"";
  position:absolute; top:0; left:50%; width:100vw; transform:translateX(-50%);
  border-top:1px solid var(--color-border-default); }`, NIE `border-top` bezpośrednio
  na `.site-footer` (to renderuje się ograniczone do szerokości `.container`, bo footer
  sam w sobie nie jest full-bleed). `press.html` i `impressum.html` miały tę drugą,
  błędną wersję — naprawione 2026-07-31. Kopiuj dywider zawsze z już poprawnej strony
  (np. `contact.html`), nigdy z gołego `border-top`.
- **[Naprawione]** Nawigacja/topbar potrafiła dryfować między stronami — kopiowana
  ręcznie w 4 miejscach (w tym uproszczony header na `get-a-quote.html`), m.in.
  przycisk "Get a quote" był na `packaging.html` i `build-your-box.html` martwym
  `<button>` bez `href` zamiast linku do `get-a-quote.html`. Naprawione przez
  wydzielenie do jednego komponentu `nav-header.js` z dwoma wariantami — pełnym i
  uproszczonym (patrz pkt 5.1.2). Nawigacja jest teraz jednym źródłem prawdy: nigdy
  nie buduj jej od nowa ani nie kopiuj markupu z powrotem inline do strony.
- **Pułapka audytu "gdzie jest używany ten plik":** obrócone dekoracyjne kafle
  (`.deco-square`, `.final-deco-square`, `.hero-deco-square`, `.deal-deco-square`)
  trzymają swoje zdjęcia w `@keyframes` (`background-image: url(...)` per klatka) albo
  w inline `style="--deco-img:url('...')"` — **nie** w `<img src>`. Zwykłe szukanie
  "czy ten plik jest gdzieś użyty" po `<img>`/`src=` je pomija i fałszywie oznacza jako
  martwe. Błąd złapany 2026-07-31: reorganizacja assetów skasowała pliki root-level,
  a te 4 komponenty (na `index.html` i `deals.html`) zostały z odwołaniami do
  nieistniejących ścieżek, bo audyt sprawdzał tylko `<img>`. Przy każdym audycie użycia
  assetów grepuj też `url(` i `--.*-img:`, nie tylko `src=`.
- Powtórzony wzorzec "baner z CTA do pomocy/kontaktu" — muted rounded card, flex
  `space-between`, tekst (tytuł 1.25rem/500 + opis muted) po lewej, para przycisków
  (patrz pkt 5) po prawej, kolapsuje do kolumny na 700px. Istnieje jako
  `.press-kit-card` (`press.html`) i `.impressum-kit-card` (`impressum.html`) —
  bajt-w-bajt ten sam CSS, inny prefiks klasy. To już 2. wystąpienie (próg promocji do
  `components.css` to 3., patrz pkt 3) — następna strona, która potrzebuje takiego
  bannera, powinna dostać wspólną klasę zamiast trzeciej kopii pod nową nazwą.

---

## 9. Skrócona ściągawka "opisuję → dostaję"

| Mówię... | Dostaję |
|---|---|
| "Zrób hero" | Split layout: H1+subheading+CTA para (Shop now/Get a quote) lewo, rotujący wizual prawo. Warianty: `hero-centered` (bez wizualu, do prostszych stron), `short-hero` (krótszy wizual). |
| "Sekcja z ofertą do przewijania w bok" | `categories-section`: full-bleed, badge+H2+subheading+toolbar(toggle+CTA secondary "See all X")+`.scroll-carousel`. |
| "Sekcja FAQ / obiekcje" | `faq-section`: 2 kolumny, lewo badge+H2+CTA para, prawo akordeon 5 pytań. |
| "Pokaż funkcje produktu wizualnie" | `statement-section`: cytat/zdanie + bento-grid kafli obraz/wideo. |
| "Mocny sprzedażowy blok z social proof" | `cta-section`: ciemna karta, USP lista, CTA para (primary+outline-light), karuzela dowodów/demo/testimonial. |
| "Zamknij stronę" | `final-cta-section`: wyśrodkowane, ten sam duet CTA co hero, nagłówek zawsze z `.final-deco-square` (obrócone zdjęcie wjeżdżające na reveal, rozpychające słowa). |
| "Przerywnik rytmu, czysto dekoracyjny" | `marquee-section`: scrollujący tekst w pętli, zero treści informacyjnej. |
| "Krok konfiguratora z wyborem opcji" | Wybierz jeden z 4 wzorców wg pkt. 6.3 w zależności od tego, czy potrzebne jest zdjęcie, opis, czy sama ikona. |
| "Strona katalogu/kategorii produktów" | breadcrumb → title-row → tiles karuzela podkategorii → filters bar → product grid (z okazjonalnymi `.promo-card`) → pkg-seo. |
| "Filtr w katalogu" | `.filter-radio` gdy wykluczający się wybór, `.filter-checkbox` gdy wielokrotny, dodaj `.filter-preview` gdy pomaga zdjęcie poglądowe. |
| "Strona wyboru próbek / cart z listą do zaznaczenia" | Wzorzec `sample-packs.html` (pkt 5.5): dwie kolumny (akordeon grup + sticky summary card), segmentowany `.toggle-switch` na pełną szerokość dla podkategorii wariantów, opcjonalny tryb Grid przez `.site-settings-btn`. |
| "Sekcja linkująca do kilku produktów/podstron" (np. "pokaż najczęściej sprzedawane produkty", "dodaj sekcję linkującą do X, Y, Z") | `.media-card` (pkt 3.1) — ale najpierw sprawdź checklistę: jeśli pozycje mają realne zdjęcia → karty w `.scroll-carousel` (dużo pozycji) albo statycznym gridzie (mało); jeśli to strony bez sensownego zdjęcia (np. regulaminy, polityki) → zwykła tekstowa lista linków, nie karty. Bez badge, chyba że ktoś wprost o niego poprosi. |
