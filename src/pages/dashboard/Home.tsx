import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

/**
 * HomePage now acts as a redirector.
 * Since we moved to page-based routing, any access to "/" 
 * will redirect to "/overview" or the specific tab in search params.
 */
export default function HomePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab");

    useEffect(() => {
        const pathToTitle: Record<string, string> = {
            "Overview": "/overview",
            "Sub Admin Management": "/sub-admin-management",
            "Employer Management": "/employer-management",
            "Profit": "/profits",
            "Immigration Report": "/immigration-report",
            "System Audit Logs": "/system-audit-logs",
            "Subscription Management": "/subscription-management",
            "Terms & Condition": "/terms-and-condition",
            "Privacy Policy": "/privacy-policy",
            "Subscriber": "/subscriber",
            "Email Marketing": "/email-marketing",
            "My Profile": "/profile",
            "Help & Support": "/help-and-support",
            "Messages": "/messages",
            "Notifications": "/notifications",
            "Attendance Management": "/attendance-management",
            "Leave Management": "/leave-management",
            "Task Management": "/task-management",
            "PaySlips Manager": "/payslip-manager"
        };

        if (tab && pathToTitle[tab]) {
            navigate(pathToTitle[tab], { replace: true });
        } else {
            navigate("/overview", { replace: true });
        }
    }, [tab, navigate]);

    return null; // Component only handles redirection
}
