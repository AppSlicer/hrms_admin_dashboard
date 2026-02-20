import StatCard from "@/components/ui/StatCard.tsx";
import RevenueChart from "@/components/chart/RevenueChart.tsx";
import ProfitChart from "@/components/chart/ProfitChart.tsx";
import {Twitter} from "lucide-react";
import GaugeChart from "@/components/chart/GaugeChart.tsx";

export default function OverviewTab() {
    const stats = {
        totalSubAdmin: 10,
        totalEmployer: 15,
        totalEmployee: 1232,
        totalRevenue: 123,
    };

    return (
        <div className="space-y-6 p-4 md:p-6 lg:p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard title="Total Sub Admin" value={stats.totalSubAdmin} />
                <StatCard title="Total Employer" value={stats.totalEmployer} />
                <StatCard title="Total Employee" value={stats.totalEmployee} />
                <StatCard title="Total Revenue" value={stats.totalRevenue} />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <RevenueChart />
                <ProfitChart />
            </div>

            {/* Additional Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white h-[265px] overflow-hidden shadow-lg p-6 rounded-xl border">
                    <div className={"flex items-center justify-between border-b text-xl font-semibold mb-2 pb-2"}>
                        <h4 className={""}>Total Company</h4>
                        <h4 className={""}>1000</h4>
                    </div>
                    <div className={"flex items-center justify-between"}>
                        <h2>Company Name</h2>
                        <h2>Employee</h2>
                    </div>
                    <div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white h-[265px] overflow-hidden shadow-lg p-6 rounded-xl border">
                    <div className={"flex items-center justify-between border-b text-xl font-semibold mb-2 pb-2"}>
                        <h4 className={""}>Total Sub Admin</h4>
                        <h4 className={""}>1000</h4>
                    </div>
                    <div className={"flex items-center justify-between"}>
                        <h2>Sub Admin</h2>
                        <h2>Company</h2>
                    </div>
                    <div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                        <div className={"flex items-center justify-between mt-2 font-semibold"}>
                            <div className={"flex gap-2"}>
                                <Twitter />
                                <h3>Amariko Co.</h3>
                            </div>
                            <h3>1233</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white h-[265px] overflow-hidden shadow-lg p-6 rounded-xl border flex justify-center relative">
                    <h3 className={"absolute z-10 text-xl font-semibold top-2"}>Sub Admin Earning</h3>
                    <GaugeChart value={20} max={100} label="Revenue" />
                </div>
            </div>
        </div>
    );
}