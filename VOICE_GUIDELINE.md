# Packhelp Redesign — Voice & copy guideline

Zasady tonu i wzorce tekstu wyciągnięte z realnego copy na `index.html`,
`packaging.html`, `build-your-box.html`, `deals.html`, `contact.html`,
`case-studies.html` — nie wymyślone od zera. Cel: nowa strona/sekcja dostaje
tekst brzmiący jak reszta serwisu, nawet gdy piszę go sam (bo nie ma
odpowiednika na packhelp.co.uk, patrz `CLAUDE.md`).

**Kolejność przy pisaniu nowego tekstu:** 1) szukaj realnego tekstu na
packhelp.co.uk (patrz `SITEMAP.md`) i adaptuj, 2) jeśli nie ma — pisz
oryginalnie, trzymając się reguł niżej.

---

## 1. Ton w jednym zdaniu

Rzeczowy i konkretny, nie hype'owy. Sprzedaje faktami i liczbami, nie
przymiotnikami. Zero wykrzykników w całym serwisie — sprawdzone: żaden
nagłówek, subheading ani CTA nie używa `!`. Pewność siebie brzmi przez
zwięzłość zdania, nie przez ton głosu.

- **Rób:** *"150+ packaging products across six families."*, *"A 25% drop in
  packaging costs."*
- **Nie rób:** "Amazing packaging that will blow your mind!", "The best
  solution ever!"

## 2. Zdania i fragmenty, nie akapity

Nagłówki i opisy kart to często **fragmenty bez czasownika**, nie pełne
zdania — szczególnie w opisach kart/kafli:
> "Hoodies and tees people wear on weekends." / "Bottles and mugs that stay
> on the desk." / "From tote to commuter." / "The desk, upgraded."

Konkretny obraz > ogólna cecha. "Bottles and mugs that stay on the desk" (obraz
sytuacji) zamiast "High-quality drinkware for your office" (ogólnik).

Zdania łączone myślnikiem (—) dla kontrastu/pointy, nie przecinkiem:
> "Everything your brand ships — made simple."
> "150+ packaging products across six families. Printed around your brand, at
> yours in days."

## 3. Zawsze sentence case, nigdy Title Case

Nagłówki, przyciski, etykiety — pierwsza litera zdania wielka, reszta mała
(poza nazwami własnymi). Sprawdzone w całym serwisie, bez wyjątków:
`Shop now`, `Get a quote`, `See all packaging`, `Everything your brand ships
— made simple.`, nie `Shop Now` / `See All Packaging`.

## 4. CTA — czasownik + konkretny obiekt, nie ogólnik

Zawsze `[czasownik akcji] + [rzecz, do której prowadzi]`, nigdy samo "Click
here"/"Submit"/"Learn more" bez kontekstu obok (wyjątek: "Learn more" pojawia
się, ale jako drugorzędny link przy już-nazwanym temacie obok, nie samotnie).

**Zaobserwowany słownik czasowników wg intencji** — trzymaj się go zamiast
wymyślać synonimy:
| Intencja | Czasownik | Przykład |
|---|---|---|
| Transakcja/zakup | Shop, Order, Add | "Shop now", "Order now", "Add to cart" |
| Eksploracja katalogu | Explore, See all | "Explore products", "See all packaging" |
| Wycena/kontakt handlowy | Get, Start, Find | "Get a quote", "Start the brief", "Find your ideal solution" |
| Konfigurator | Open, Customize, Build | "Open the editor", "Customize design", "Build your box" |
| Kontakt bezpośredni | Call, Chat, Send, Email | "Call us", "Start chat", "Send an email" |
| Rezygnacja z opcji (drugorzędne, muted) | Skip | "Skip design for now" |

"See all X" (nie "View all X" / "Browse all X") to utrwalony wzorzec dla
CTA prowadzącego do pełnego katalogu z sekcji-wycinka.

## 5. Liczby jako dowód, nie ozdoba

Każda sekcja, która "sprzedaje" skalę/ofertę, ma przy sobie konkretną liczbę
— nie zamiast opisu, tylko obok niego:
> "150+ packaging products across six families."
> "130+ products, curated so you never scroll through 2,500 pens."
> "125 300 companies" (hero, trust bar)
> "A 25% drop in packaging costs" (case study headline)

Przy pisaniu nowej sekcji z ofertą/case study — jeśli nie masz prawdziwej
liczby, nie zmyślaj jej (patrz też reguła "brak asseta = brak fallbacku" w
`PAGE_BUILDING_GUIDELINE.md` pkt 5.2.1, ten sam duch: lepiej pominąć niż
zmyślić).

## 6. Zwracanie się do czytelnika: "you/your", firma jako "we"

Konsekwentne "you/your" dla klienta, "we" dla Packhelp — nigdy trzecia osoba
("customers can..."). Kontrakcje są normalne i oczekiwane (*What's*, *It's*,
*don't*) — to nie jest formalny/korporacyjny rejestr:
> "Don't miss out – get 15% off your first order when you join the
> newsletter."
> "What's the difference between biodegradable and compostable?"

## 7. Nagłówki-wartości: [twierdzenie] + [dla kogo/po co]

Powtarzający się szkielet nagłówka sekcji (H2) i FAQ-pytań:
> "One partner for your entire packaging range"
> "Whatever you make, we pack it."
> "The world's easiest way to design custom packaging."

FAQ questions są zadane **z perspektywy klienta, pierwszoosobowo**, nie jako
neutralny temat:
> "Can I get a custom quote for large volumes?" (nie: "Custom quotes for
> large volumes")
> "How do I repeat a previous order?"

## 8. Wzorzec "rozpychanego zdania" (final-cta / statement)

Duże nagłówki czasem rozdzielają zdanie zdjęciem wstawionym w środku, nie na
końcu — literacki, nie tylko dekoracyjny zabieg (patrz też pułapka ze spacją,
`COMPONENT_SNIPPETS.md`):
> "Everything in the box. And the ⟨img⟩ box."
> "The world's easiest way to design ⟨img⟩ custom packaging. Paper, size
> ⟨img⟩ brand colour..."

Używaj tego wzorca tylko w final-cta-section/statement-section — nie
nadużywaj go w zwykłych sekcjach z tekstowym CTA.

## 9. Opisy techniczne (konfigurator, karty materiałów) — jedno zdanie, konkret + korzyść

Krótkie opisy opcji w `build-your-box.html` łączą **co to jest** z **efektem
wizualnym/funkcjonalnym**, jedno zdanie, bez żargonu:
> "A cut-out window in the box wall, usually filled with film, to display the
> product inside."
> "A soft, non-reflective finish for a subtle, premium look."
> "Natural brown board with a rustic look and sturdy strength."

Struktura: *[co to jest], [efekt/kiedy używać]* — nie definicja słownikowa,
tylko praktyczne "po co mi to".

## 10. Czego unikać

- Wykrzykników i pytań retorycznych w nagłówkach ("Ready to get started?!").
- Title Case w przyciskach/nagłówkach.
- Pustych CTA bez obiektu ("Click here", "Submit", samotne "Learn more").
- Przymiotnikowego hype'u bez liczby/faktu za nim ("industry-leading",
  "world-class", "unparalleled") — jeśli chcesz pochwalić skalę/jakość, daj
  liczbę albo konkretny obraz (patrz pkt 2 i 5).
- Trzeciej osoby przy zwracaniu się do klienta.
