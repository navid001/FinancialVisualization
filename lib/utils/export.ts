import { FinancialRecord } from '../types';

export function exportToCSV(data: FinancialRecord[]): void {
  const headers = ['Date', 'Year', 'Month', 'Cost', 'Revenue', 'Profit', 'Profit Margin'];
  const csvContent = [
    headers.join(','),
    ...data.map(record => [
      record.date,
      record.year,
      record.month,
      record.cost,
      record.revenue,
      record.profit,
      record.profit_margin
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `financial_data_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}