# Stock AI Analyzer API

股票AI分析小程序的后端API，部署在 Vercel Serverless Functions 上。

## API 接口

### 健康检查
```
GET /api/health
```

### 股票信息
```
GET /api/stock/{symbol}/info
```

### 历史价格
```
GET /api/stock/{symbol}/history
```

### 财务数据
```
GET /api/stock/{symbol}/financials
```

### 新闻数据
```
GET /api/stock/{symbol}/news
```

### AI 分析
```
POST /api/analyze
Content-Type: application/json

{
  "symbol": "AAPL",
  "stockData": {...},
  "newsData": [...],
  "financials": {...},
  "role": "observer" | "bear" | "bull" | "manager"
}
```

## 部署步骤

1. 在 Vercel 注册账号（可用 GitHub 登录）
2. 创建新项目，导入此 GitHub 仓库
3. 添加环境变量 `OPENROUTER_API_KEY`
4. 点击 Deploy

## 环境变量

- `OPENROUTER_API_KEY`: OpenRouter API Key
