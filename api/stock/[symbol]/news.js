export default function handler(req, res) {
  const { symbol } = req.query;
  const newsItems = [
    {
      id: 1,
      title: `${symbol} 发布最新季度财报，营收超预期`,
      source: "财经网",
      time: "2小时前",
      sentiment: "positive",
      summary: "公司Q3营收同比增长25%，净利润率提升至15%"
    },
    {
      id: 2,
      title: `分析师上调 ${symbol} 目标价至200美元`,
      source: "华尔街见闻",
      time: "5小时前",
      sentiment: "positive",
      summary: "多家投行看好公司未来发展前景"
    },
    {
      id: 3,
      title: `${symbol} 宣布新的股票回购计划`,
      source: "彭博社",
      time: "1天前",
      sentiment: "positive",
      summary: "公司计划回购价值50亿美元的股票"
    },
    {
      id: 4,
      title: `${symbol} 面临行业竞争加剧挑战`,
      source: "路透社",
      time: "1天前",
      sentiment: "negative",
      summary: "新兴竞争对手推出类似产品，市场份额受到威胁"
    },
    {
      id: 5,
      title: `${symbol} 与合作伙伴签署战略合作协议`,
      source: "TechCrunch",
      time: "2天前",
      sentiment: "positive",
      summary: "双方将在AI和云计算领域展开深度合作"
    }
  ];

  res.status(200).json({
    success: true,
    data: newsItems
  });
}
