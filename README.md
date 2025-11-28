# 🎓 NIRF Peek - College Rankings & Analytics Platform

A comprehensive data visualization and analytics platform for exploring Indian college rankings based on NIRF (National Institutional Ranking Framework) data from 2017-2025.

## ✨ Features

### 📊 Dashboard View
- **Overview Statistics**: Total colleges, data points, years covered
- **Top Ranked Colleges**: View the highest-ranked institutions
- **Top Movers**: Colleges that have improved their rankings significantly
- **Most Stable**: Institutions with consistent performance
- **Declining Institutions**: Colleges that need attention
- **Interactive Search**: Real-time search with autocomplete

### 🔍 College Detail Pages
Each college has a comprehensive detail page featuring:
- **Current Rankings & Scores**: Latest rank, score, and performance indicators
- **Historical Performance**: Complete data table across all years
- **Trend Visualizations**:
  - Rank progression over time
  - Score progression charts
  - Score vs Perception comparison
  - Year-over-year rank changes
- **Similar Colleges**: Algorithm-based recommendations using rank proximity and score/volatility patterns
- **Performance Metrics**: Best rank, average score, volatility index

### 🎯 Explore & Filter Page
Advanced filtering capabilities:
- **Search**: Find colleges by name
- **Rank Range**: Filter by rank (1-100)
- **Score Range**: Filter by score (0-100)
- **Volatility Range**: Find stable or volatile institutions
- **Sort Options**: By rank, score, improvement, or volatility
- **Sort Order**: Ascending or descending
- **Real-time Results**: Instant filtering with result counts

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode, no `any` types)
- **Styling**: Tailwind CSS with custom dark theme
- **Charts**: Recharts (React charting library)
- **Data Parsing**: PapaParse (CSV parsing)
- **Icons**: Lucide React

## 🎨 Design

- **Dark Theme**: Eye-friendly dark background (#0a0a0f)
- **Pastel Color Palette**: 
  - Primary: Purple (#a78bfa)
  - Secondary: Indigo (#818cf8)
  - Accent: Various pastels (pink, blue, green, yellow, red)
- **Smooth Animations**: Hover effects and transitions
- **Responsive**: Mobile-first design approach

## 📁 Project Structure

```
/app
├── data/                          # Data files
│   └── master_nirf_cleaned_final.csv
├── frontend/                      # Next.js application
│   ├── app/                       # App router pages
│   │   ├── page.tsx              # Dashboard
│   │   ├── explore/page.tsx      # Filter/explore page
│   │   ├── college/[slug]/page.tsx  # College detail page
│   │   └── api/colleges/route.ts # API endpoint
│   ├── components/               # React components
│   │   ├── SearchBar.tsx
│   │   ├── StatCard.tsx
│   │   ├── CollegeCard.tsx
│   │   └── charts/               # Chart components
│   │       ├── TrendChart.tsx
│   │       ├── ComparisonChart.tsx
│   │       └── PerformanceChart.tsx
│   ├── lib/                      # Utilities & data processing
│   │   ├── types.ts              # TypeScript interfaces
│   │   ├── dataLoader.ts         # CSV data loading
│   │   └── dataUtils.ts          # Data processing & algorithms
│   └── public/                   # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📊 Data Overview

The dataset contains:
- **210 unique colleges**
- **801 data points** across 9 years (2017-2025)
- **Metrics tracked**:
  - Rank & rank changes
  - Overall score & score changes
  - Perception score
  - Volatility index
  - Perception gap

## 🧮 Algorithms & Features

### Similarity Algorithm
Colleges are matched based on:
1. **Rank Proximity**: ±20 ranks from target
2. **Score Similarity**: Weighted by absolute difference
3. **Volatility Patterns**: Stability comparison

Formula: `similarity = rankDiff * 0.5 + scoreDiff * 2 + volatilityDiff * 0.3`

### Trend Analysis
Colleges are classified as:
- **Improving**: Average recent rank > 5 positions better than older average
- **Declining**: Average recent rank > 5 positions worse than older average
- **Stable**: Within ±5 positions

### Performance Metrics
- **Best Rank**: All-time best ranking
- **Average Score**: Mean score across all years
- **Volatility**: Standard measure of ranking consistency
- **Total Years**: Number of years with data

## 🎯 Key Pages

### 1. Dashboard (/)
Landing page with overview statistics, top colleges, and quick insights

### 2. College Detail (/college/[slug])
Comprehensive analytics for individual colleges with interactive charts

### 3. Explore (/explore)
Advanced filtering interface for discovering colleges based on custom criteria

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
