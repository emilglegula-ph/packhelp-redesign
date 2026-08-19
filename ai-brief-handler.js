// Shared "AI brief" request logic — the actual Anthropic call plus response
// shaping, used by both server.js (local Express dev server, listens on
// :3001) and api/ai-brief.js (Vercel serverless function, deployed at
// /api/ai-brief on whatever domain the static pages themselves live on).
// Kept in one place so the two entry points never drift apart, the same
// reason editor-ai-vocabulary.js isn't duplicated between the v1/v2 rules
// files.
const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';

// editor_v1.html and editor_v2.html share one colour/font/Elements
// vocabulary (editor-ai-vocabulary.js) but have diverged onto separate
// flows with their own decision rules — editor-ai-brief-rules-v1.js
// (clarifying questions) / -v2.js (skip/pre-fill) — so tuning one flow's
// rules never risks the other's, and neither duplicates the shared
// vocabulary. Each of these three is also the same file each page's own
// offline fallback reads (as <script> globals there, merged into
// window.EDITOR_AI_BRIEF_RULES by a small shim — see each page's own
// comment on that); reusing them here as plain text means every flow's
// guidelines only ever live in one editable place. The model gets the
// vocabulary plus whichever flow's rules apply, verbatim (comments and
// all), not a summary of them.
const VOCAB_PATH = path.join(__dirname, 'editor-ai-vocabulary.js');
const RULES_PATHS = {
  v1: path.join(__dirname, 'editor-ai-brief-rules-v1.js'),
  v2: path.join(__dirname, 'editor-ai-brief-rules-v2.js')
};

function loadGuidelinesText(flow) {
  var rulesPath = RULES_PATHS[flow] || RULES_PATHS.v2;
  return fs.readFileSync(VOCAB_PATH, 'utf8') + '\n\n' + fs.readFileSync(rulesPath, 'utf8');
}

const RESPONSE_SCHEMA_NOTE = `Respond with ONLY a single JSON object, no markdown code fences, no prose before or after it, matching exactly this shape:
{
  "questions": { "question": string, "options": string[] }[],
  "skipInspirations": boolean,
  "colors": string[],
  "font": string | null,
  "elements": {
    "main-text"?: { "on": true, "value": string | null },
    "website"?: { "on": true, "value": string | null },
    "instagram"?: { "on": true, "value": string | null },
    "facebook"?: { "on": true, "value": string | null },
    "eco-badges"?: { "on": true, "value": null }
  }
}

Field notes:
- "questions": at most 4 clarifying questions, decided using the guidelines' QUESTION RULES section — check the brief against each of those 6 rules and ask about whatever actually matches (skip a rule entirely if the brief already covers it). If more than 4 rules match, pick the 4 most useful/specific ones for this brief. Empty array only if none of the 6 rules match.
- Each question's "options": 0-4 short, concrete quick-reply answers a user could tap instead of typing (e.g. ["Yes, I'll upload one", "No, generate one for me"]). The user can always type a custom answer instead, so leave "options" empty ([]) for questions that are genuinely open-ended (e.g. "what should the slogan say?") rather than forcing artificial choices. The "question" text itself must always read as a plain, natural question — never describe the option format inside it (that's what "options" is for).
- "colors": hex codes, lowercase, e.g. "#000000". Prefer the preset names/hexes from the guidelines' colors.names list when the brief's wording matches one; otherwise use your own best hex for whatever colour was described.
- "font": must be one of the exact option names from the guidelines' fonts.names list (the values, e.g. "Poppins", "IBM Plex Serif"), or null if none was implied.
- "elements": include ONLY the keys the brief actually earns (per the guidelines' elementsContent rules — main-text/website/instagram/facebook/eco-badges); omit a key entirely if the brief doesn't mention it. Do not include "logo" — that is handled separately, outside this schema.
- If "questions" is non-empty, still fill the other fields with your best provisional guess — they'll be revised once the user answers.`;

// Throws an Error with a `.status` of 400 for a caller-fixable bad request
// (both entry points below turn that into the matching HTTP status); any
// other error is an actual backend/API failure, left as a plain 500.
async function handleAiBriefRequest(body) {
  const { brief, attachmentKind, qaPairs, forceDecide, flow } = body || {};
  if (!brief || typeof brief !== 'string') {
    const err = new Error('brief is required');
    err.status = 400;
    throw err;
  }

  const systemPrompt = `You are the decision engine behind a packaging editor's "AI brief" step. A user describes the packaging design they want; you decide what clarifying question(s) to ask first (per the guidelines' QUESTION RULES, if present) and what to pre-fill once you have enough to work with.

Follow these hand-edited project guidelines — they are the source of truth and may be tuned over time, so always defer to what's written here over general instinct:

${loadGuidelinesText(flow)}

${RESPONSE_SCHEMA_NOTE}${forceDecide ? '\n\nAll clarifying questions have already been asked and answered (see the Q&A below) — you MUST return an empty "questions" array now and make your best final decision with what you have.' : ''}${flow !== 'v1' ? '\n\nNote: this particular flow never shows clarifying questions to the user, whatever you put in "questions" is discarded — always return an empty array there and put your best guess straight into the other fields instead.' : ''}`;

  const userLines = ['Brief: ' + brief];
  if (attachmentKind) userLines.push('The user also attached a "' + attachmentKind + '".');
  if (qaPairs && qaPairs.length) {
    userLines.push('Clarifying Q&A so far:');
    qaPairs.forEach(function (pair) {
      userLines.push('- Q: ' + pair.question + ' | A: ' + (pair.answer || '(skipped)'));
    });
  }

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    thinking: { type: 'disabled' },
    system: systemPrompt,
    messages: [{ role: 'user', content: userLines.join('\n') }]
  });

  const textBlock = (message.content || []).find(function (block) { return block.type === 'text'; });
  const raw = textBlock ? textBlock.text : '{}';
  if (process.env.DEBUG_AI_BRIEF) console.log('RAW MODEL RESPONSE:\n', raw);
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);

  var questions = Array.isArray(parsed.questions) ? parsed.questions.slice(0, 4) : [];
  questions = questions
    .filter(function (q) { return q && typeof q.question === 'string' && q.question.trim(); })
    .map(function (q) {
      return {
        question: q.question,
        options: Array.isArray(q.options) ? q.options.filter(function (o) { return typeof o === 'string' && o.trim(); }).slice(0, 4) : []
      };
    });

  return {
    questions: questions,
    skipInspirations: !!parsed.skipInspirations,
    colors: Array.isArray(parsed.colors) ? parsed.colors : [],
    font: parsed.font || null,
    elements: (parsed.elements && typeof parsed.elements === 'object') ? parsed.elements : {}
  };
}

module.exports = { handleAiBriefRequest };
