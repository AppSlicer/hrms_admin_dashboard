import { type ReactNode, useEffect } from "react";
import Navbar from "@/components/section/Navbar.tsx";
import Sidebar from "@/components/section/Sidebar.tsx";
import { useLocation } from "react-router-dom";

export default function DashboardLayout ({ children }:{ children: ReactNode }) {
    const location = useLocation();

    useEffect(() => {
        const pathToTitle: Record<string, string> = {
            "/overview": "Overview",
            "/sub-admin-management": "Sub Admin Management",
            "/employer-management": "Employer Management",
            "/profits": "Profit",
            "/immigration-report": "Immigration Report",
            "/system-audit-logs": "System Audit Logs",
            "/subscription-management": "Subscription Management",
            "/terms-and-condition": "Terms & Condition",
            "/privacy-policy": "Privacy Policy",
            "/subscriber": "Subscriber",
            "/email-marketing": "Email Marketing",
            "/profile": "My Profile",
            "/help-and-support": "Help & Support",
            "/messages": "Messages",
            "/notifications": "Notifications",
            "/attendance-management": "Attendance Management",
            "/leave-management": "Leave Management",
            "/task-management": "Task Management",
            "/payslip-manager": "PaySlips Manager"
        };

        const title = pathToTitle[location.pathname] || "Dashboard";
        document.title = `${title} | HRM Firm`;
    }, [location.pathname]);

    return (
        <main className={"w-full h-screen flex flex-col overflow-hidden bg-background text-foreground"}>
            <Navbar />
            <div className={"w-full flex-1 flex overflow-hidden"}>
                <Sidebar />
                <div className={"flex-1 h-full overflow-auto bg-gray-50/30 dark:bg-black/20"}>{ children }</div>
            </div>
        </main>
    )
}