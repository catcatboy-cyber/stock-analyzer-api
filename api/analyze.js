import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://stock-analyzer.vercel.app',
    'X-Title': 'Stock AI Analyzer'
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { symbol, stockData, newsData, role, financials } = req.body;

  if (!symbol || !role) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const rolePrompts = {
    observer: `你是一位资深的市场观察员。请基于以下股票数据，客观分析当前市场状况，重点关注技术面和市场情绪。

股票: ${symbol}
当前价格: ${stockData?.currentPrice || 'N/A'}
涨跌幅: ${stockData?.changePercent?.toFixed(2) || 'N/A'}%
市值: ${stockData?.marketCap || 'N/A'}
成交量: ${stockData?.volume || 'N/A'}

近期新闻:
${newsData?.map(n => `- ${n.title} (${n.sentiment})`).join('\n') || '暂无新闻'}

请提供:
1. 技术面简要分析
2. 市场情绪判断
3. 关键观察点
4. 风险提示

请用中文回答，控制在200字以内。`,

    bear: `你是一位谨慎的空头研究员。请基于以下股票数据，从看空角度分析该股票的风险和潜在下跌因素。

股票: ${symbol}
当前价格: ${stockData?.currentPrice || 'N/A'}
市盈率: ${stockData?.peRatio?.toFixed(2) || 'N/A'}
市净率: ${stockData?.pbRatio?.toFixed(2) || 'N/A'}

财务数据:
- 营收增长率: ${financials?.revenueGrowth?.toFixed(2) || 'N/A'}%
- 利润率: ${financials?.profitMargin?.toFixed(2) || 'N/A'}%
- 负债权益比: ${financials?.debtToEquity?.toFixed(2) || 'N/A'}
- ROE: ${financials?.roe?.toFixed(2) || 'N/A'}%

近期新闻:
${newsData?.map(n => `- ${n.title} (${n.sentiment})`).join('\n') || '暂无新闻'}

请提供:
1. 主要看空理由（至少3点）
2. 潜在风险因素
3. 目标价区间（看空）
4. 止损建议

请用中文回答，控制在250字以内，语气要专业客观。`,

    bull: `你是一位乐观的投研分析师。请基于以下股票数据，从看多角度分析该股票的投资价值和上涨潜力。

股票: ${symbol}
当前价格: ${stockData?.currentPrice || 'N/A'}
市盈率: ${stockData?.peRatio?.toFixed(2) || 'N/A'}
市净率: ${stockData?.pbRatio?.toFixed(2) || 'N/A'}

财务数据:
- 营收增长率: ${financials?.revenueGrowth?.toFixed(2) || 'N/A'}%
- 利润率: ${financials?.profitMargin?.toFixed(2) || 'N/A'}%
- 负债权益比: ${financials?.debtToEquity?.toFixed(2) || 'N/A'}
- ROE: ${financials?.roe?.toFixed(2) || 'N/A'}%

近期新闻:
${newsData?.map(n => `- ${n.title} (${n.sentiment})`).join('\n') || '暂无新闻'}

请提供:
1. 主要看多理由（至少3点）
2. 增长催化剂
3. 目标价区间（看多）
4. 买入建议

请用中文回答，控制在250字以内，语气要专业客观。`,

    manager: `你是一位资深的投资经理，需要综合各方观点做出最终投资决策。请基于以下信息给出综合分析和操作建议。

股票: ${symbol}
当前价格: ${stockData?.currentPrice || 'N/A'}
涨跌幅: ${stockData?.changePercent?.toFixed(2) || 'N/A'}%
市值: ${stockData?.marketCap || 'N/A'}

财务健康度:
- 营收增长率: ${financials?.revenueGrowth?.toFixed(2) || 'N/A'}%
- 利润率: ${financials?.profitMargin?.toFixed(2) || 'N/A'}%
- ROE: ${financials?.roe?.toFixed(2) || 'N/A'}%

近期新闻情绪: ${newsData?.filter(n => n.sentiment === 'positive').length || 0} 正面 / ${newsData?.filter(n => n.sentiment === 'negative').length || 0} 负面

请综合多方观点，提供:
1. 投资决策建议（强烈买入/买入/持有/卖出/强烈卖出）
2. 核心理由（综合多空观点）
3. 操作建议（仓位、入场点、止损点）
4. 持有周期建议

请用中文回答，控制在300字以内，语气要权威专业。`
  };

  const prompt = rolePrompts[role];
  if (!prompt) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemma-4-31b-it',
      messages: [
        {
          role: 'system',
          content: '你是一位专业的股票分析师，擅长提供客观、专业的投资分析建议。请用中文回答，内容简洁有力。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const analysis = completion.choices[0]?.message?.content || '分析生成失败';

    res.status(200).json({
      success: true,
      data: {
        role,
        analysis,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({
      error: 'AI analysis failed',
      message: error.message
    });
  }
}
