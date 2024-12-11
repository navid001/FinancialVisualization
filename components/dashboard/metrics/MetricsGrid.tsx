'use client';

import { MetricCard } from './MetricCard';
import { SummaryData, TrendData } from '@/lib/types';

interface MetricsGridProps {
  summary: SummaryData;
  trends?: TrendData | null;
}

export function MetricsGrid({ summary, trends }: MetricsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Revenue"
        value={`$${summary.total_revenue.toLocaleString()}`}
        change={trends?.revenue_growth}
      />
      <MetricCard
        title="Total Cost"
        value={`$${summary.total_cost.toLocaleString()}`}
        change={-trends?.cost_growth!}
      />
      <MetricCard
        title="Total Profit"
        value={`$${summary.total_profit.toLocaleString()}`}
        change={trends?.profit_growth}
      />
      <MetricCard
        title="Avg. Profit Margin"
        value={`${summary.average_profit_margin.toFixed(2)}%`}
      />
    </div>
  );
}