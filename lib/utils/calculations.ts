import { FinancialRecord, SummaryData, TrendData } from '../types';

export function calculateSummary(data: FinancialRecord[]): SummaryData {
  const total_revenue = data.reduce((sum, record) => sum + record.revenue, 0);
  const total_cost = data.reduce((sum, record) => sum + record.cost, 0);
  const total_profit = data.reduce((sum, record) => sum + record.profit, 0);
  const average_profit_margin = data.reduce((sum, record) => sum + record.profit_margin, 0) / data.length;

  return {
    total_revenue,
    total_cost,
    total_profit,
    average_profit_margin
  };
}

export function calculateTrends(data: FinancialRecord[]): TrendData {
  // Calculate YoY growth for the last year
  const currentYear = Math.max(...data.map(record => record.year));
  const previousYear = currentYear - 1;

  const currentYearData = data.filter(record => record.year === currentYear);
  const previousYearData = data.filter(record => record.year === previousYear);

  const currentRevenue = currentYearData.reduce((sum, record) => sum + record.revenue, 0);
  const previousRevenue = previousYearData.reduce((sum, record) => sum + record.revenue, 0);
  const revenue_growth = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

  const currentCost = currentYearData.reduce((sum, record) => sum + record.cost, 0);
  const previousCost = previousYearData.reduce((sum, record) => sum + record.cost, 0);
  const cost_growth = ((currentCost - previousCost) / previousCost) * 100;

  const currentProfit = currentYearData.reduce((sum, record) => sum + record.profit, 0);
  const previousProfit = previousYearData.reduce((sum, record) => sum + record.profit, 0);
  const profit_growth = ((currentProfit - previousProfit) / previousProfit) * 100;

  return {
    revenue_growth,
    cost_growth,
    profit_growth
  };
}