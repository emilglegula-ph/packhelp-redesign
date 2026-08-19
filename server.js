// Local backend for editor_v1.html's and editor_v2.html's "AI brief" step
// 1 — each sends its own `flow: 'v1' | 'v2'` so this picks the right
// guidelines file (see ai-brief-handler.js's own RULES_PATHS). Both pages
// are otherwise static prototypes with no build tooling and no server —
// this is the one exception, added specifically so the Anthropic API key
// never has to live in client-side code. Run with `npm install && npm
// start` (needs a real key in .env — see .env.example); each page's own
// script talks to POST /api/ai-brief over plain fetch() and falls back to
// its local keyword/regex heuristic if this isn't running.
//
// This is the local-dev entry point only — the same request logic
// (ai-brief-handler.js) is also wrapped as a Vercel serverless function in
// api/ai-brief.js for production, so a deployed build needs no separate
// server process at all; see that file's own comment.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { handleAiBriefRequest } = require('./ai-brief-handler');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/ai-brief', async (req, res) => {
  try {
    const result = await handleAiBriefRequest(req.body);
    res.json(result);
  } catch (err) {
    if (err.status === 400) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.error('AI brief request failed:', err);
    res.status(500).json({ error: 'AI request failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log('AI brief server listening on http://localhost:' + PORT);
});
