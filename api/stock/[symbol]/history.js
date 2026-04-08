export default function handler(req, res) {
  const { symbol } = req.query;
  const prices = [];
  let currentPrice = 150;
  
  for (let i = 30; i >= 0; i--) {
    const change = (Math.random() - 0.48) * 5;
    currentPrice += change;
    prices.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      open: currentPrice - Math.random() * 2,
      high: currentPrice + Math.random() * 3,
      low: currentPrice - Math.random() * 3,
      close: currentPrice,
      volume: Math.floor(Math.random() * 10000000 + 5000000),
    });
  }
  
  res.status(200).json({ success: true, data: prices });
}
