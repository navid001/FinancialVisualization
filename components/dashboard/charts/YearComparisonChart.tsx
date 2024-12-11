'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialRecord } from "@/lib/types";
import { CustomTooltip } from "./CustomTooltip";

interface YearComparisonChartProps {
  data: FinancialRecord[];
}

export function YearComparisonChart({ data }: YearComparisonChartProps) {
  const yearlyData = data.reduce((acc, record) => {
    const year = record.year;
    if (!acc[year]) {
      acc[year] = { year, revenue: 0, cost: 0, profit: 0 };
    }
    acc[year].revenue += record.revenue;
    acc[year].cost += record.cost;
    acc[year].profit += record.profit;
    return acc;
  }, {} as Record<number, { year: number; revenue: number; cost: number; profit: number; }>);

  const chartData = Object.values(yearlyData);

  return (
    <Card className="col-span-7">
      <CardHeader>
        <CardTitle>Year-over-Year Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar name="Revenue" dataKey="revenue" fill="hsl(var(--chart-1))" />
              <Bar name="Cost" dataKey="cost" fill="hsl(var(--chart-2))" />
              <Bar name="Profit" dataKey="profit" fill="hsl(var(--chart-3))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}