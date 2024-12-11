"use client";

import { useEffect, useState } from "react";
import { MetricsGrid } from "@/components/dashboard/metrics/MetricsGrid";
import { TrendChart } from "@/components/dashboard/charts/TrendChart";
import { ProfitMarginChart } from "@/components/dashboard/charts/ProfitMarginChart";
import { YearComparisonChart } from "@/components/dashboard/charts/YearComparisonChart";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { fetchFinancialData, fetchSummary, fetchTrends } from "@/lib/api";
import {
    FinancialRecord,
    SummaryData,
    TrendData,
    DateRange,
} from "@/lib/types";
import { Card } from "@/components/ui/card";
import { exportToCSV } from "@/lib/utils/export";
import { addMonths, startOfMonth, endOfMonth } from "date-fns";

export default function Dashboard() {
    const [financialData, setFinancialData] = useState<FinancialRecord[]>([]);
    const [filteredData, setFilteredData] = useState<FinancialRecord[]>([]);
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [trends, setTrends] = useState<TrendData | null>(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange>({
        start: startOfMonth(new Date(2019, 0, 1)),
        end: endOfMonth(new Date()),
    });
    const [metrics, setMetrics] = useState({
        revenue: true,
        cost: true,
        profit: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [financialData, summary, trends] = await Promise.all([
                    fetchFinancialData(),
                    fetchSummary(),
                    fetchTrends(),
                ]);
                setFinancialData(financialData);
                setFilteredData(financialData);
                setSummary(summary);
                setTrends(trends);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (dateRange.start && dateRange.end && financialData.length > 0) {
            const filtered = financialData.filter((record) => {
                const recordDate = new Date(record.date);
                return (
                    recordDate >= dateRange.start && recordDate <= dateRange.end
                );
            });
            setFilteredData(filtered);
        }
    }, [dateRange, financialData]);

    const handleMetricToggle = (metric: string) => {
        setMetrics((prev) => ({
            ...prev,
            [metric]: !prev[metric as keyof typeof prev],
        }));
    };

    const handleExport = () => {
        exportToCSV(filteredData);
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Financial Dashboard
                    </h2>
                    <div className="flex items-center space-x-2">
                        <DateRangePicker
                            date={dateRange}
                            onSelect={setDateRange}
                        />
                    </div>
                </div>

                {summary && <MetricsGrid summary={summary} trends={trends} />}

                <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
                    <div className="lg:col-span-5">
                        <TrendChart
                            data={filteredData}
                            title="Financial Performance"
                            metrics={metrics}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <Sidebar
                            metrics={metrics}
                            onMetricToggle={handleMetricToggle}
                            onExport={handleExport}
                            onPrint={handlePrint}
                        />
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
                    <ProfitMarginChart data={filteredData} />
                    <YearComparisonChart data={filteredData} />
                </div>

                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Analysis Insights
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {trends && (
                            <>
                                <div>
                                    <h4 className="font-medium mb-2">
                                        Revenue Growth
                                    </h4>
                                    <p
                                        className={`text-lg ${
                                            trends.revenue_growth >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {trends.revenue_growth >= 0 ? "↑" : "↓"}{" "}
                                        {Math.abs(
                                            trends.revenue_growth
                                        ).toFixed(1)}
                                        %
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">
                                        Cost Efficiency
                                    </h4>
                                    <p
                                        className={`text-lg ${
                                            trends.cost_growth <= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {trends.cost_growth <= 0 ? "↓" : "↑"}{" "}
                                        {Math.abs(trends.cost_growth).toFixed(
                                            1
                                        )}
                                        %
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">
                                        Profit Growth
                                    </h4>
                                    <p
                                        className={`text-lg ${
                                            trends.profit_growth >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {trends.profit_growth >= 0 ? "↑" : "↓"}{" "}
                                        {Math.abs(trends.profit_growth).toFixed(
                                            1
                                        )}
                                        %
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
