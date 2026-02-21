import StatCard from "@/components/ui/StatCard.tsx";
import RevenueChart from "@/components/chart/RevenueChart.tsx";
import ProfitChart from "@/components/chart/ProfitChart.tsx";
import {Twitter} from "lucide-react";
import GaugeChart from "@/components/chart/GaugeChart.tsx";
import {useEffect, useState} from "react";
import {dashboardService} from "@/services/dashboard.service.ts";
import {toast} from "sonner";
import Loader from "@/components/ui/Loader.tsx";

export default function OverviewTab() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await dashboardService.getAdminOverview();
                // apiRequest returns data.data directly and throws on !response.ok
                setData(data);
            } catch (error: any) {
                toast.error(error.message || "An error occurred while fetching dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!data) {
        return <div className="p-8 text-center text-gray-500">No dashboard data available</div>;
    }

    const stats = data.stats;
    const subAdminEarnings = data.subAdminEarnings;
    const employersData = data.employersData;

    return (
        <div className="space-y-6 p-4 md:p-6 lg:p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard title="Total Sub Admin" value={stats?.totalSubAdmins ?? stats?.totalSubAdmin ?? 0} />
                <StatCard title="Total Employer" value={stats?.totalEmployers ?? 0} />
                <StatCard title="Total Employee" value={stats?.totalEmployees ?? 0} />
                <StatCard title="Total Revenue" value={Number(stats?.totalRevenue) || 0} />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <RevenueChart data={data.revenueAnalytics} />
                <ProfitChart data={data.revenueAnalytics} />
            </div>

            {/* Additional Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-card h-[265px] overflow-hidden shadow-lg p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className={"flex items-center justify-between border-b dark:border-gray-800 text-xl font-semibold mb-2 pb-2 text-gray-900 dark:text-white"}>
                        <h4 className={""}>Total Company</h4>
                        <h4 className={""}>{stats?.totalEmployers ?? 0}</h4>
                    </div>
                    <div className={"flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2"}>
                        <h2>Company Name</h2>
                        <h2>Employee</h2>
                    </div>
                    <div className="overflow-y-auto h-[160px] custom-scrollbar pr-2">
                        {employersData?.map((item: any, i: number) => (
                            <div key={i} className={"flex items-center justify-between mt-2 font-semibold text-gray-700 dark:text-gray-300"}>
                                <div className={"flex gap-2 items-center"}>
                                    <Twitter size={16} className="text-blue-400" />
                                    <h3 className="text-sm">{item.companyName}</h3>
                                </div>
                                <h3 className="text-sm">{item.employeeCount}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-card h-[265px] overflow-hidden shadow-lg p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className={"flex items-center justify-between border-b dark:border-gray-800 text-xl font-semibold mb-2 pb-2 text-gray-900 dark:text-white"}>
                        <h4 className={""}>Total Sub Admin</h4>
                        <h4 className={""}>{stats?.totalSubAdmins ?? 0}</h4>
                    </div>
                    <div className={"flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2"}>
                        <h2>Sub Admin</h2>
                        <h2>Company</h2>
                    </div>
                    <div className="overflow-y-auto h-[160px] custom-scrollbar pr-2">
                        {subAdminEarnings?.map((item: any, i: number) => (
                            <div key={i} className={"flex items-center justify-between mt-2 font-semibold text-gray-700 dark:text-gray-300"}>
                                <div className={"flex gap-2 items-center"}>
                                    <Twitter size={16} className="text-blue-400" />
                                    <h3 className="text-sm">{item.name}</h3>
                                </div>
                                <h3 className="text-sm">{item.employerCount}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-card h-[265px] overflow-hidden shadow-lg p-6 rounded-xl border border-gray-100 dark:border-gray-800 flex justify-center relative">
                    <h3 className={"absolute z-10 text-xl font-semibold top-2 text-gray-900 dark:text-white"}>Sub Admin Earning</h3>
                    <GaugeChart value={subAdminEarnings?.reduce((sum: number, item: any) => sum + item.earning, 0) || 0} max={stats?.totalRevenue || 100} label="Revenue" />
                </div>
            </div>
        </div>
    );
}