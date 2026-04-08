export default function handler(req, res) {
  const { symbol } = req.query;
  const basePrice = Math.random() * 200 + 50;
  
  res.status(200).json({
    success: true,
    data: {
      symbol: symbol.toUpperCase(),
      name: `${symbol} Company`,
      currentPrice: basePrice,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      marketCap: `${(Math.random() * 2 + 0.1).toFixed(2)}T`,
      volume: `${(Math.random() * 50 + 5).toFixed(1)}M`,
      weekHigh52: basePrice * 1.2,
      weekLow52: basePrice * 0.8,
      peRatio: Math.random() * 30 + 10,
      pbRatio: Math.random() * 5 + 1,
    }
  });
}
