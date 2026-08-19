/**
 * THE RULES, IN PLAIN ENGLISH
 * ---------------------------
 * editor_v2.html's own decision rules — when to skip Step 2 [Inspirations]
 * and how Step 4 [Elements] items get switched on/off. Nothing else lives
 * in this file — the shared colour/font/Elements vocabulary both
 * editor_v2.html and editor_v1.html extract against lives in
 * editor-ai-vocabulary.js instead, loaded alongside this file (see
 * editor_v2.html's own <script> tags and the merge shim right after them).
 * editor_v1.html has diverged onto its own flow (clarifying questions,
 * then a concepts screen — none of this) with its own rules file instead,
 * editor-ai-brief-rules-v1.js.
 *
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
 * Rules 3-6 (attach/describe logo/font/colors/content -> pre-fill) don't
 * need config of their own beyond the shared vocabulary — interpretBrief()
 * and the AI backend apply them directly using editor-ai-vocabulary.js's
 * colors/fonts/elementsContent lists. Only rules 2 and 7 need their own
 * data, below.
 */
window.EDITOR_AI_BRIEF_RULES_V2 = {

  // Step 2 [Inspirations] is skipped when EITHER condition below is met.
  skipInspirations: {
    // Rule 1: "attaches a reference design image" — the idea box's attach
    // menu has both "Add reference design" and "Upload image"; both count.
    onImageAttached: true,

    // Rule 2: "describes exactly what it should look like and its vibe
    // [AI's call]" — no real AI in interpretBrief()'s local fallback, so
    // this is approximated as "the brief uses enough distinct look/style
    // words to count as a precise description". Each word/phrase below
    // counts once even if it appears multiple times; `threshold` is how
    // many DISTINCT hits are required.
    vibeKeywords: [
      'minimalist', 'minimal', 'bold', 'playful', 'elegant', 'vintage',
      'retro', 'modern', 'colorful', 'colourful', 'monochrome', 'pastel',
      'luxury', 'luxurious', 'clean', 'rustic', 'handdrawn', 'hand-drawn',
      'geometric', 'organic', 'futuristic', 'whimsical', 'earthy',
      'vibe', 'style', 'aesthetic', 'mood', 'look and feel'
    ],
    threshold: 2
  },

  // Rule 7: every step-4 [Elements] item the brief DOESN'T earn gets
  // switched OFF (and comes off the live design too, wherever it has a
  // spot on it) rather than left at whatever its own default happened to
  // be — the brief describes what the packaging SHOULD carry, not a list
  // of extras layered on top of the defaults. `exemptKeys` is what this
  // does NOT apply to: Logo is the only one, since it's governed entirely
  // by its own attachment logic (skipInspirations / the "logo" attach kind
  // above), never by whether the brief happens to say the word "logo".
  elementsContent: {
    turnOffUnmentioned: true,
    exemptKeys: ['logo']
  }
};
