/**
 * Shared AI vocabulary — colors/fonts/Elements definitions used identically
 * by editor_v1.html AND editor_v2.html (both interpretBrief()'s local
 * keyword/regex fallback and, via server.js's loadGuidelinesText(), the
 * real AI backend). This is *not* decision logic — it doesn't say when to
 * skip a step or ask a question, only what the exact preset names/hexes/
 * option strings/keyword patterns are, so both flows extract and apply the
 * same values the same way. Each flow's own decision rules live in their
 * own file instead — editor-ai-brief-rules-v1.js (clarifying-question
 * rules) / editor-ai-brief-rules-v2.js (skip/pre-fill rules) — loaded
 * alongside this one and merged into window.EDITOR_AI_BRIEF_RULES by a
 * small shim right after both script tags on each page.
 */
window.EDITOR_AI_VOCABULARY = {

  // Name/synonym -> hex. Each hex MUST be one of the 8 preset swatches in
  // #colorSwatches for selectPrintColorByHex() to visibly select it;
  // anything else typed as a literal #hex code in the brief is still
  // picked up separately (see interpretBrief()'s own #rrggbb regex) and
  // added as an extracted swatch.
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

  // Brief keyword/synonym -> exact option name from the Font dropdown
  // (#fontDropdownMenu).
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

  // Step 4 [Elements]. `mainTextTriggerPhrases` is how "Main text"'s value
  // gets recognized (whatever follows one of these phrases, up to the next
  // sentence boundary — a quoted phrase always counts too, phrase or not,
  // see interpretBrief()). `elements` covers every other item: a
  // `keywords` hit means the brief mentions it at all; an optional
  // `valuePattern` extracts the actual value typed (Website/Instagram/
  // Facebook only — Eco badges is checkbox-only, no value to extract).
  elementsContent: {
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
        keywords: ['eco badge', 'eco-friendly badge', 'sustainability badge', 'recyclable', 'eco-friendly', 'sustainable']
      }
    }
  },

  // The "thinking" bubble shown after the user's message, before the next
  // step/question/concepts reveal — standing in for real inference
  // latency. Plays through these messages in order, one at a time, in the
  // same bubble (first one always "Reading your brief…") — `stepMs` is how
  // long each one stays up before the next replaces it. `generatingMessages`
  // is editor_v1.html's own second set, used instead of `messages` while
  // the *design* itself is being generated (after clarifying questions,
  // right before the concepts screen) rather than while the brief is
  // first being read — editor_v2.html has no such second phase, so it
  // only ever reads `messages`.
  thinking: {
    stepMs: 1400,
    messages: [
      'Reading your brief…',
      'Matching your style…',
      'Setting up your design…'
    ],
    generatingMessages: [
      'Generating your design…',
      'Laying out your concepts…',
      'Almost ready…'
    ]
  }
};
