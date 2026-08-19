/**
 * QUESTION RULES, IN PLAIN ENGLISH
 * --------------------------------
 * editor_v1.html's own decision rules — when to ask which of the up to 4
 * clarifying questions (Figma node 6988:13274), before generating concepts
 * (Figma node 6988:13409). Nothing else lives in this file — the shared
 * colour/font/Elements vocabulary both editor_v1.html and editor_v2.html
 * extract against lives in editor-ai-vocabulary.js instead, loaded
 * alongside this file (see editor_v1.html's own <script> tags and the
 * merge shim right after them). editor_v2.html has no question rules at
 * all (its own flow never asks any) — its skip/pre-fill decision rules
 * live in editor-ai-brief-rules-v2.js instead.
 *
 * 1. Mentions a graphic/asset/logo but doesn't attach one -> ALWAYS ask
 *    whether they want to upload their own or have one generated; if
 *    upload, ask them to attach it. Never skip this because the mention
 *    was brief or informal — "with our logo on it" with nothing attached
 *    still matches just as much as a detailed description would.
 * 2. Mentions ANY text element — a slogan, tagline, dedication message,
 *    website address, Instagram handle, Facebook page, or any other
 *    on-package text — without giving its exact value -> ALWAYS ask for
 *    the value, one question per distinct element mentioned this way.
 *    Never skip this because the brief only implied wanting text rather
 *    than stating it outright — "I want a slogan on it" with no slogan
 *    text given still matches, exactly like "I want it to say X" wouldn't
 *    (that one already has its value).
 * 3. Mentions a text element but doesn't give a font -> ask for the font.
 * 4. Describes a color in words at all — a named color (e.g. "blue",
 *    "forest green") or just a mood/vibe — without giving an exact hex
 *    code -> ALWAYS ask for the exact value, never silently resolve the
 *    word to a preset hex on its own.
 * 5. Doesn't mention a logo at all -> ask if they want one.
 * 6. Doesn't mention colors at all -> ask about colors.
 *
 * At most 4 questions total get asked, even if more than 4 rules match —
 * pick the 4 most useful/specific ones for this particular brief, BUT
 * rules 1 (asset-not-attached) and 2 (text-element-no-value) are never
 * among the ones dropped: every mentioned logo/asset that isn't attached,
 * and every mentioned text element that's missing its value, gets asked
 * about, no exceptions. If keeping all of those already fills all 4
 * slots, drop font/color/no-logo-mentioned questions first, in that
 * order, before ever leaving a mentioned logo or text element unasked.
 */
window.EDITOR_AI_QUESTION_RULES = {
  maxQuestions: 4,
  rules: [
    {
      id: 'asset-not-attached',
      trigger: "The brief mentions a graphic, asset, or logo but none was attached to the message. This ALWAYS matches whenever a logo/asset is mentioned without one being attached, however brief or informal the mention — \"with our logo\" counts just as much as a detailed description of it.",
      ask: "Whether they want to upload their own asset/logo or have one generated for them; if they'll upload, ask them to attach it.",
      priority: "always-ask — never drop this rule to stay within the 4-question cap; drop font/color/no-logo-mentioned questions first instead (see this file's own top comment)."
    },
    {
      id: 'text-element-no-value',
      trigger: "The brief mentions any text element — a slogan, a tagline, a dedication message, a website address, an Instagram handle, a Facebook page, or any other on-package text — without giving its exact value. This ALWAYS matches whenever such a text element is mentioned but its exact wording isn't spelled out, and matches once PER distinct element mentioned this way — a brief mentioning both a slogan and a website, neither with an exact value given, produces two separate matches, one for each.",
      ask: "What the exact value should be — one plain, short question per missing element (e.g. \"What should the slogan say?\", \"What's your website address?\", \"What's your Instagram handle?\"), never combined into a single question covering more than one element.",
      priority: "always-ask — never drop this rule to stay within the 4-question cap; drop font/color/no-logo-mentioned questions first instead (see this file's own top comment)."
    },
    {
      id: 'text-element-no-font',
      trigger: "The brief mentions a text element but doesn't say what font to use.",
      ask: "What font they'd like for it — the \"question\" text itself stays a plain, short question (e.g. \"What font would you like for the dedication text?\"). Build \"options\" as exactly 3 entries: two real font names matched to the brief's style, each one EXACTLY one of these strings verbatim (case-sensitive, nothing outside this list) — \"Poppins\", \"Lora\", \"Inter\", \"Bebas Neue\", \"Google Sans\", \"Archivo Black\", \"IBM Plex Serif\" — then a third and final entry that MUST be the literal string \"Choose another or upload\" verbatim (the app matches that exact string to open a full font picker/upload modal, so it must be exactly that, never reworded)."
    },
    {
      id: 'color-no-exact-value',
      trigger: "The brief describes a color in words at all — a named color (\"blue\", \"forest green\", ...) or just a mood/vibe — without an exact hex value. This ALWAYS matches whenever a color is only described in words; a plain color name is not \"exact\" on its own, only a real hex code is — always ask, never resolve a word to a hex silently.",
      ask: "What the exact color should be — the \"question\" text itself stays a plain, short question (e.g. \"What exact shade of blue would you like?\"), it must NOT describe the option format below; that description belongs only in \"options\", never in the question text. Build \"options\" as exactly 3 entries: two real hex codes (e.g. \"#003A8C\") that are actual SHADES of whatever color/mood the brief described (two different shades of that same color, not two unrelated colors) — hex strings only, never color names, since the app shows a color swatch next to each option and can only do that from a real hex string — then a third and final entry that MUST be the literal string \"Choose or type HEX\" verbatim (not \"I'll pick my own\", not \"I'll type it\", not any other phrasing — the app matches that exact string to open a color picker, and silently drops this whole feature if it's missing or reworded)."
    },
    {
      id: 'no-logo-mentioned',
      trigger: "The brief doesn't mention a logo at all.",
      ask: "Whether they'd like a logo on the design. Do NOT offer to generate one. \"options\" must be exactly these two, verbatim, in this order: \"Upload logo\" (the app matches that exact string to reveal an upload field — picking a file there puts it on the design) and \"No logo\" (the app matches that exact string to remove the logo from the design entirely — never reword either one, e.g. not \"No logo needed\"/\"Add a logo\"/anything generate-related)."
    },
    {
      id: 'no-colors-mentioned',
      trigger: "The brief doesn't mention colors at all.",
      ask: "What colors they'd like. Exact same rules as color-no-exact-value above, both for the question text (plain, no format description inside it) and \"options\" (2 real hex-shade options, then \"Choose or type HEX\" verbatim as the final entry) — except here there's no described color/mood to base the two hex shades on, so pick two colors that suit the rest of the brief instead."
    }
  ]
};
