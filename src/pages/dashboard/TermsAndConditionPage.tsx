import DashboardLayout from "@/layout/DashboardLayout";
import SystemPolicyPage from "@/components/tabs/SystemPolicyPage";

export default function TermsAndConditionPage() {
    return (
        <DashboardLayout>
            <SystemPolicyPage type="terms" />
        </DashboardLayout>
    );
}
