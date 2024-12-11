export interface FinancialRecord {
  date: string;
  year: number;
  month: number;
  cost: number;
  revenue: number;
  profit: number;
  profit_margin: number;
}

export interface SummaryData {
  total_revenue: number;
  total_cost: number;
  total_profit: number;
  average_profit_margin: number;
}

export interface TrendData {
  revenue_growth: number;
  cost_growth: number;
  profit_growth: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}