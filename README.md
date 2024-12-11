# Financial Dashboard

A comprehensive financial analytics dashboard built with Next.js and TypeScript, featuring interactive charts and detailed financial metrics visualization.

## Features

- 📊 Interactive Charts
  - Line chart for monthly trends
  - Bar chart for year-over-year comparisons
  - Area chart for profit margins
  - Custom tooltips with detailed information

- 📱 Responsive Design
  - Mobile-friendly layout
  - Adaptive grid system
  - Optimized for all screen sizes

- 🎯 Key Features
  - Date range filtering
  - Metric toggles (revenue/cost/profit)
  - Export functionality
  - Print-friendly views
  - Real-time data updates

- 📈 Analysis Tools
  - Trend indicators
  - YoY comparisons
  - Seasonal pattern highlighting
  - Performance metrics

## Tech Stack

- Next.js 13
- TypeScript
- Tailwind CSS
- Recharts
- Shadcn/UI
- Date-fns
- Lucide Icons

## Getting Started

1. Clone the repository:
```bash
git clone [https://github.com/navid001/FinancialVisualization.git]
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── charts/      # Chart components
│   │   └── metrics/     # Metric components
│   └── ui/              # UI components
├── lib/                  # Utility functions and types
│   ├── data/           # Mock data
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
└── styles/              # Global styles
```

## Features in Detail

### Charts
- **Trend Chart**: Visualizes monthly financial trends
- **Profit Margin Chart**: Shows profit margin changes over time
- **Year Comparison Chart**: Compares yearly financial performance

### Metrics
- Total Revenue
- Total Cost
- Total Profit
- Average Profit Margin

### Data Management
- Date range filtering
- CSV export functionality
- Print-optimized views

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.