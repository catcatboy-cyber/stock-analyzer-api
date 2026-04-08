export default function handler(req, res) {
  res.status(200).json({
    success: true,
    data: {
      revenue: Math.random() * 100 + 20,
      revenueGrowth: (Math.random() - 0.3) * 40,
      profitMargin: Math.random() * 20 + 5,
      debtToEquity: Math.random() * 1.5,
      currentRatio: Math.random() * 2 + 0.5,
      roe: Math.random() * 25 + 5,
    }
  });
}
