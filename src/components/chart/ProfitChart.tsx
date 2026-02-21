import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function ProfitChart({ data }: { data?: any[] }) {
    const themeMode = useSelector((state: RootState) => state.theme.mode);
    const isDark = themeMode === 'dark';

    const labels = data?.map(m => m.month) || Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);

    const profitData = {
        labels,
        datasets: [
            {
                label: "Profit",
                data: data?.map(m => m.profit) || labels.map(() => 0),
                borderColor: "rgba(168, 85, 247, 1)",
                backgroundColor: isDark ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.1)",
                fill: true,
                pointBackgroundColor: "rgba(168, 85, 247, 1)",
                pointBorderColor: isDark ? "#1f2937" : "#ffffff",
                pointHoverBackgroundColor: "#ffffff",
                pointHoverBorderColor: "rgba(168, 85, 247, 1)",
            }
        ]
    }

    const totalProfit = profitData.datasets[0].data.reduce((a, b) => a + b, 0);
    const totalRevenue = data?.reduce((sum, item) => sum + item.revenue, 0) || 0;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    color: isDark ? '#9ca3af' : '#6b7280',
                }
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
                backgroundColor: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                titleColor: isDark ? '#f3f4f6' : '#1f2937',
                bodyColor: isDark ? '#f3f4f6' : '#1f2937',
                borderColor: isDark ? '#374151' : '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
            },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    maxTicksLimit: 8,
                    color: isDark ? '#9ca3af' : '#6b7280',
                }
            },
            y: {
                grid: {
                    color: isDark ? 'rgba(255, 255, 255, 0.1)' : '#f3f4f6',
                    drawBorder: false,
                },
                ticks: {
                    color: isDark ? '#9ca3af' : '#6b7280',
                    callback: (value: any) => `£${value.toLocaleString()}`
                }
            }
        },
        elements: {
            point: {
                radius: 4,
                hoverRadius: 6,
                hoverBorderWidth: 2,
            },
            line: {
                tension: 0.4,
                borderWidth: 3,
            }
        },
    }

    return (
        <div className="bg-white dark:bg-card p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Profit Overview</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Monthly Performance</p>
                </div>
            </div>
            <div className="h-80">
                <Line data={profitData} options={chartOptions} />
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <p className="text-gray-600 dark:text-gray-400">Total Profit</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        £{totalProfit.toLocaleString()}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-gray-600 dark:text-gray-400">Profit Margin</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}%
                    </p>
                </div>
            </div>
        </div>
    )
}