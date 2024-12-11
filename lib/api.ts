import { FinancialRecord, SummaryData, TrendData } from './types';
import { financialData } from './data/mockData';
import { calculateSummary, calculateTrends } from './utils/calculations';

export async function fetchFinancialData(): Promise<FinancialRecord[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return financialData;
}

export async function fetchSummary(): Promise<SummaryData> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return calculateSummary(financialData);
}

export async function fetchTrends(): Promise<TrendData> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return calculateTrends(financialData);
}