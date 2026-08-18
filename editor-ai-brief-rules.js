/**
 * THE RULES, IN PLAIN ENGLISH
 * ---------------------------
 * 1. If someone attaches a "reference design" image -> skip Step 2 [Inspirations].
 * 2. If someone describes exactly what it should look like and its vibe [AI's
 *    call] -> skip Step 2 [Inspirations].
 * 3. If someone attaches a "logo" -> on Step 3 [Brand], show that uploaded
 *    logo and put it on the design.
 * 4. If someone attaches or describes a font -> pre-fill it on Step 3 and
 *    put it on the design [Brand].
 * 5. If someone types or describes colors -> pre-fill them on Step 3 and
 *    put them on the design [Brand].
 * 6. If someone describes what they want on the packaging, or exact text ->
 *    pre-fill Step 4 [Elements].
 * 7. If the description does NOT mention one of the Step 4 [Elements] items,
 *    turn it off and remove it from the design (this rule does NOT apply to
 *    LOGO — logo is the only exception).
 *
 * Everything below is how those 7 rules turn into actual config.
 */

/**
 * Editor "AI brief" matching rules — editor.html's step-1 idea box runs the
 * brief typed there against this file to decide which guided steps to show,
 * skip, or pre-fill, before revealing them. This is a static prototype, not
 * a real model call: matching is plain keyword/regex heuristics, not actual
 * language understanding. Edit the lists below to tune what it catches —
 * editor.html re-reads this file (via <script src="editor-ai-brief-rules.js">
 * before its own logic) on every load, nothing here is cached anywhere else.
 *
 * Where each block is used, in editor.html:
 *   - skipInspirations   -> interpretBrief(), decides step2 (Inspirations)
 *   - colors.names       -> interpretBrief(), applies via selectPrintColorByHex()/applyExtractedColors()
 *   - fonts.names        -> interpretBrief(), applies via applyFontByName()
 *   - elementsContent    -> interpretBrief(), fills step4's "Main text" field
 *   - thinking           -> the "thinking" bubble shown before steps reveal
 */
window.EDITOR_AI_BRIEF_RULES = {

  // Step 2 [Inspirations] is skipped when EITHER condition below is met.
  skipInspirations: {
    // "Jeżeli ktoś załączy 'reference design' w postaci obrazka" — the
    // idea box's attach menu has both "Add reference design" and "Upload
    // image"; both count as an attached reference image for this rule.
    onImageAttached: true,

    // "Jeżeli ktoś opisze dokładnie wygląd i vibe [do decyzji AI]" — no
    // real AI here, so this is approximated as "the brief uses enough
    // distinct look/style words to count as a precise description".
    // Each word/phrase below counts once even if it appears multiple
    // times; `threshold` is how many DISTINCT hits are required.
    vibeKeywords: [
      'minimalist', 'minimal', 'bold', 'playful', 'elegant', 'vintage',
      'retro', 'modern', 'colorful', 'colourful', 'monochrome', 'pastel',
      'luxury', 'luxurious', 'clean', 'rustic', 'handdrawn', 'hand-drawn',
      'geometric', 'organic', 'futuristic', 'whimsical', 'earthy',
      'vibe', 'style', 'aesthetic', 'mood', 'look and feel'
    ],
    threshold: 2
  },

  // "Jeżeli ktoś wpisze lub opisze kolory" — name/synonym -> hex. Each hex
  // MUST be one of the 8 preset swatches in #colorSwatches (editor.html)
  // for selectPrintColorByHex() to visibly select it; anything else typed
  // as a literal #hex code in the brief is still picked up separately (see
  // interpretBrief()'s own #rrggbb regex) and added as an extracted swatch.
  colors: {
    names: {
      black: '#000000', charcoal: '#000000',
      grey: '#5e5e5e', gray: '#5e5e5e', silver: '#5e5e5e',
      brown: '#412d0b', 'dark brown': '#412d0b', chocolate: '#412d0b',
      gold: '#745308', golden: '#745308', mustard: '#745308', yellow: '#745308',
      blue: '#003a8c', navy: '#003a8c', 'navy blue': '#003a8c',
      purple: '#39159c', violet: '#39159c', lilac: '#39159c',
      red: '#a12820', crimson: '#a12820', burgundy: '#a12820',
      green: '#087416', emerald: '#087416', forest: '#087416', 'forest green': '#087416'
    }
  },

  // "Jeżeli ktoś załączy lub opisze font" — brief keyword/synonym -> exact
  // option name from the Font dropdown (#fontDropdownMenu in editor.html).
  fonts: {
    names: {
      poppins: 'Poppins',
      lora: 'Lora',
      inter: 'Inter',
      'bebas neue': 'Bebas Neue', bebas: 'Bebas Neue',
      'google sans': 'Google Sans',
      'archivo black': 'Archivo Black',
      'ibm plex serif': 'IBM Plex Serif',
      // Descriptive synonyms, mapped to the closest built-in option.
      serif: 'IBM Plex Serif',
      'sans serif': 'Inter', 'sans-serif': 'Inter',
      'bold display': 'Archivo Black', display: 'Archivo Black', condensed: 'Bebas Neue',
      handwritten: 'Lora', script: 'Lora'
    }
  },

  // "Jeżeli ktoś opisze co chce mieć na opakowaniu lub jaką dokładnie
  // treść" — this covers every item on step 4 [Elements] (data-elem on
  // editor.html's #elementsList), not just the copy. mainText works like
  // the other rule blocks above (word/phrase list -> a value); the
  // `elements` map below covers Logo/Website/Instagram/Facebook/Eco
  // badges: a `keywords` hit switches that item ON on step 4, and (for
  // Website/Instagram/Facebook) an optional `valuePattern` match extracts
  // the actual value typed in the brief to pre-fill that item's own
  // field instead of leaving its default placeholder. Website/Main
  // text/Logo also show live on the design itself the moment they're
  // switched on (see ELEM_PREVIEW_TARGETS in editor.html) — Instagram/
  // Facebook/Eco badges don't have a spot on the packaging design in this
  // prototype yet, so switching them on only affects step 4 itself.
  elementsContent: {
    // Every step-4 [Elements] item the brief DOESN'T earn gets switched
    // OFF (and comes off the live design too, wherever it has a spot on
    // it — see ELEM_PREVIEW_TARGETS in editor.html) rather than being
    // left at whatever its own default happened to be — the brief
    // describes what the packaging SHOULD carry, not a list of extras
    // layered on top of the defaults. `exemptKeys` lists what this does
    // NOT apply to: Logo is the only one, since it's governed entirely by
    // its own attachment logic (see skipInspirations / the "logo" attach
    // kind above), never by whether the brief happens to say the word
    // "logo". This whole rule only runs for an actual submitted brief —
    // "Skip brief & guide me step-by-step" bypasses interpretation
    // entirely, so it never touches any of this.
    turnOffUnmentioned: true,
    exemptKeys: ['logo'],

    // Whatever follows one of these phrases (up to the next sentence
    // boundary) becomes step 4's "Main text" value. A quoted phrase
    // ("...") is always picked up too, phrase or not — see interpretBrief().
    mainTextTriggerPhrases: [
      'saying', 'that says', 'with the text', 'with the words',
      'text saying', 'tagline:', 'text:', 'that reads', 'reading'
    ],

    elements: {
      website: {
        keywords: ['website', 'web address', 'homepage', 'landing page', 'our site'],
        // A bare domain (mybrand.com, www.mybrand.co) is treated as its
        // own signal too — see interpretBrief() — since people often just
        // type the address without ever saying the word "website".
        valuePattern: /\b((?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.(?:com|net|org|co|io|shop|store|design|studio|de|pl|uk|eu)(?:\/[^\s,]*)?)\b/i
      },
      instagram: {
        keywords: ['instagram', 'insta', 'ig handle', 'ig:'],
        // Only extracted when a keyword above already matched (see
        // interpretBrief()) — a bare "@handle" alone is too easily
        // confused with an email address's "@domain" half.
        valuePattern: /(?:instagram\.com\/|@)([a-z0-9_.]{2,30})/i
      },
      facebook: {
        keywords: ['facebook', 'fb page'],
        valuePattern: /facebook\.com\/([a-z0-9_.]{2,50})/i
      },
      'eco-badges': {
        // Checkbox-only — no field to pre-fill, so no valuePattern.
        keywords: ['eco badge', 'eco-friendly badge', 'sustainability badge', 'recyclable', 'eco-friendly', 'sustainable']
      }
    }
  },

  // The "thinking" bubble shown after the user's message, before the
  // matched steps reveal — standing in for real inference latency. Plays
  // through these messages in order, one at a time, in the same bubble
  // (first one always "Reading your brief…") — `stepMs` is how long each
  // one stays up before the next replaces it; total wait before the
  // matched step reveals is stepMs * messages.length.
  thinking: {
    stepMs: 1400,
    messages: [
      'Reading your brief…',
      'Matching your style…',
      'Setting up your design…'
    ]
  }
};
