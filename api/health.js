export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    ai: process.env.OPENROUTER_API_KEY ? 'enabled' : 'disabled',
    model: 'google/gemma-4-31b-it',
    timestamp: new Date().toISOString()
  });
}
