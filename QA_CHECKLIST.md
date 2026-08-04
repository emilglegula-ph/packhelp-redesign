# Packhelp Redesign — QA checklist przed "gotowe"

Lista do przejścia po zbudowaniu/edycji strony, zanim ją pokażę jako
skończoną. Nie jest to lista rzeczy do *opisania* — każdy punkt wymaga
faktycznego sprawdzenia (devtools/resize/klik), nie tylko przeczytania kodu.
Zbudowana na bazie realnych błędów już złapanych w tym repo (patrz
`PAGE_BUILDING_GUIDELINE.md` pkt 8 i `CLAUDE.md`), żeby się nie powtórzyły.

---

## 1. Breakpointy — resize okna, nie zgadywanie

Sprawdź stronę realnie w każdej z tych szerokości (nie tylko czytaj media
query w CSS):
- **700px** — kolumny/gridy stackują się pionowo.
- **900px/901px** — pełna nawigacja i `.sticky-bar` znikają całkowicie (brak
  mobile-zamiennika w obecnym prototypie — to oczekiwane, nie błąd), znika
  też `.build-box-dots` jeśli strona to konfigurator.
- **1100px/1200px** — gridy produktowe/dwukolumnowe redukują liczbę kolumn.

## 2. Nawigacja i stopka

- Właściwy wariant wybrany (pełna vs uproszczona) — patrz `CLAUDE.md`, decyzja
  wg tego, czy strona ma zachęcać do eksploracji czy dokończyć jedno zadanie.
- Placeholder(y) + `<script src="nav-header.js"></script>` obecne, **żadnego**
  inline-skopiowanego markupu nawigacji.
- Każdy link w nawigacji ma realny `href` — nie martwy `<button>` bez akcji
  (dokładnie ten błąd był już raz naprawiany, patrz pkt 8 guideline).
- Jeśli strona ma pełną nawigację: scrolluj i sprawdź, że `.sticky-bar` wjeżdża
  (`.is-pinned`) i że klik w logo/linki na stickym pasku faktycznie działa —
  nie tylko wygląda (pułapka pointer-events opisana w `CLAUDE.md`).
- Stopka obecna wszędzie poza `build-your-box.html` (celowo bez stopki).

## 3. Reveal (fade-in on scroll)

- Nagłówek strony (H1+subheading) i każda sekcja, która ma się wjeżdżać,
  mają klasę `.reveal` i realnie animują się przy scrollu — nie tylko są
  widoczne od razu.
- Jeśli strona nie miała wcześniej systemu reveal (żadnego `.reveal` w CSS
  ani `IntersectionObserver` w JS) — dodaj go w całości, nie zakładaj że
  "pewnie już jest" (błąd popełniony na `sample-packs.html`).

## 4. `.scroll-carousel`

Dla każdej karuzeli na stronie:
- Struktura dokładnie `.scroll-carousel > .scroll-carousel-nav.prev + <track>
  + .scroll-carousel-nav.next` — inaczej wspólny JS (`checkOverflow`/
  `updateNavState`) jej nie obsłuży.
- Strzałki **nie pokazują się**, gdy treści jest mniej niż mieści się w
  viewporcie (`.has-overflow` musi być fałszywe → brak strzałek).
- Strzałka `prev` znika na starcie scrolla, `next` znika na końcu — przetestuj
  realnym scrollem w obie strony, nie samym `has-overflow`.
- Jeśli karty mają podpis pod zdjęciem (nie tylko samo zdjęcie): `top`
  strzałek nadpisany na połowę wysokości **samego zdjęcia**, nie całej karty
  (patrz wzór w `PAGE_BUILDING_GUIDELINE.md` pkt 1.2) — inaczej strzałki
  wiszą za nisko.

## 5. Breadcrumb i header strony

- Breadcrumb (jeśli strona go ma — katalogowe/produktowe, nie marketingowe/
  flow) jest pierwszym dzieckiem `<main>`/`.container`, bezpośrednio nad H1.
- Zmierz realną pozycję (`getBoundingClientRect()` linku w breadcrumbie, nie
  samego `<nav>`) — odstęp nav→breadcrumb `space-8`, breadcrumb→H1 `space-4`.
  Sprawdź, czy poziomy padding nie jest zdublowany (breadcrumb + padded
  wrapper naraz) — objaw: breadcrumb wjeżdża głębiej niż treść pod nim.

## 6. Tokeny — brak wartości "na oko"

- Każdy spacing to wartość ze skali `--space-*` (4px grid) — grep po nowych
  `margin`/`padding`/`gap` w dodanym CSS i sprawdź, że żadna liczba nie jest
  spoza `1,2,3,4,5,6,7,8,10,12,14,16,20,24,32,40` (×4px).
- Każdy promień to jeden z `--radius-sm/md/lg/xl/2xl/full` — nie wolny
  `border-radius: 12px` wymyślony na miejscu.
- Brak `#000000` (tekst = `--color-text-primary`/rich-blue), brak nowego
  koloru nasyconego poza `--color-accent` (chyba że explicit zgoda — patrz
  reguła "dopytaj" w `CLAUDE.md`).

## 7. Zdjęcia/wideo, nie ikony

- Każdy kluczowy element sprzedażowy (hero, karty kategorii/produktów,
  sekcje branżowe) ma prawdziwe zdjęcie/wideo, nie placeholder-ikonę ani
  wektor.
- Brakujący asset = pusty/szary kafel (`image: null`), **nigdy** podstawione
  zdjęcie z innej kategorii tylko żeby nie wyglądało pusto.
- Zdjęcia kwadratowe/zbliżone, zaokrąglone (`--radius-md`/`lg`), poza
  prawdziwie pełnoekranowymi wyjątkami (hero, marquee).

## 8. Copy

- Sprawdzone wg `VOICE_GUIDELINE.md`: sentence case, brak wykrzykników, CTA =
  czasownik+obiekt konkretny, brak przymiotnikowego hype'u bez liczby/faktu
  za nim.
- Jeśli strona ma odpowiednik na packhelp.co.uk (patrz `SITEMAP.md`) —
  copy faktycznie zaadaptowane z realnej treści, nie zmyślone mimo że
  dostępne.
- Jeśli adaptowana treść linkuje na zewnątrz (wzmianki prasowe, źródła,
  cytowania) — każdy taki link ma **prawdziwy `href`**, nie `#`. Grep po
  `href="#"` w nowej treści i sprawdź każde trafienie: albo to celowy
  placeholder (np. brak jeszcze pliku do pobrania — wtedy OK), albo brakujący
  prawdziwy URL, który trzeba dociągnąć (błąd złapany 2026-07-31 na
  `press.html`, patrz `CLAUDE.md`).

## 9. Nowy komponent — zanim uznasz go za "swój"

- Sprawdź, czy podobny kształt już istnieje w `COMPONENT_SNIPPETS.md` /
  `components.css` (media-card, floating pill-bar, itd.) zamiast tworzyć
  nowy wariant pod inną nazwą.
- Jeśli komponent pojawia się teraz **trzeci raz** na różnych stronach pod
  różnymi page-specific nazwami — kandydat do awansu do `components.css`
  (próg opisany w `PAGE_BUILDING_GUIDELINE.md` pkt 3).

## 10. Wizualna weryfikacja końcowa

- Otwórz stronę faktycznie w przeglądarce (nie tylko czytaj kod) i przejrzyj
  ją całą, sekcja po sekcji, na szerokości desktop i przy jednym z
  breakpointów z pkt 1 — literówki, złamane obrazki, nachodzące elementy
  łapie się wzrokiem, nie diffem.
- Dla poprawek pixel-level (spacing, wyrównanie) zweryfikuj wizualnie *ten
  konkretny* fragment po zmianie, nie całą stronę pobieżnie — łatwo naprawić
  jedno miejsce i nie zauważyć, że sąsiednie się rozjechało.
- **Jeśli w danej sesji nie ma dostępnego narzędzia do zrzutów ekranu**
  (`chromium-cli`/playwright niedostępne) — nie pomijaj tego punktu po cichu.
  Zrób zamiast tego: (1) statyczną kontrolę strukturalną — każda użyta klasa
  CSS ma definicję, tagi zbalansowane, brak nowych wartości spoza skali
  tokenów (skrypt python/grep, patrz pkt 6); (2) `open`/serwuj stronę lokalnie
  i **jawnie powiedz użytkownikowi**, że wizualnej weryfikacji nie zrobiłeś
  sam i prosisz o rzut oka — nie deklaruj "wygląda dobrze" bez pokrycia.

## 12. Edycje masowe (regex/skrypty na wielu podobnych blokach)

- Gdy powtarzasz tę samą zmianę w wielu podobnych fragmentach (np. dopisanie
  elementu do każdego wiersza listy) skryptem/regexem zamiast pojedynczych
  `Edit`, **scopuj wzorzec do unikalnego kontekstu danego komponentu** (np.
  do jego pełnego, specyficznego znacznika otwierającego), nie do
  generycznego fragmentu typu `</a></li>`, który pasuje też gdzie indziej na
  stronie (np. w stopce). Ogólny fragment złapie więcej trafień niż
  zamierzone.
- **Zawsze porównaj liczbę dopasowań z oczekiwaną** przed zapisaniem pliku
  (np. `re.subn` zwraca liczbę podstawień — jeśli nie zgadza się z liczbą
  elementów, które faktycznie chciałeś zmienić, to sygnał błędu, nie
  przypadek do zignorowania). Błąd złapany 2026-07-31 na `press.html`:
  regex na `</a></li>` miał trafić w 31 wierszy z wzmiankami prasowymi, a
  trafił w 55 — 24 nadmiarowe podstawienia wylądowały w linkach stopki,
  zanim zostały zauważone i cofnięte przy grepowaniu wyniku.

## 11. Aktualizacja dokumentacji, jeśli strona jest nowa

- Dopisz wiersz w `SITEMAP.md` (sekcja 1 lub 3, zależnie czy to Planned czy
  New concept) — inaczej mapa zaczyna kłamać.
- Jeśli powstał nowy, wielokrotnego użytku wzorzec — dopisz go do
  `COMPONENT_SNIPPETS.md`, żeby następna strona mogła go skopiować zamiast
  odtwarzać od zera.
