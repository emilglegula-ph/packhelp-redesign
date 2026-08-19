// Vercel serverless function — deployed at /api/ai-brief on whatever
// domain the static pages themselves are served from, so editor_v1.html/
// editor_v2.html's same-origin fetch (see the AI_API_URL fallback in each
// page's own script) reaches this with no CORS setup needed. Shares its
// actual request logic with server.js's local-dev Express route via
// ai-brief-handler.js — see that file's own comment for why — so tuning
// the prompt/response shaping only ever happens in one place.
const { handleAiBriefRequest } = require('../ai-brief-handler');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const result = await handleAiBriefRequest(req.body);
    res.status(200).json(result);
  } catch (err) {
    if (err.status === 400) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.error('AI brief request failed:', err);
    res.status(500).json({ error: 'AI request failed' });
  }
};
