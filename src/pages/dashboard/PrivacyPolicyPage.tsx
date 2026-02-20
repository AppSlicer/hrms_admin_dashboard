import DashboardLayout from "@/layout/DashboardLayout";
import SystemPolicyPage from "@/components/tabs/SystemPolicyPage";

export default function PrivacyPolicyPage() {
    return (
        <DashboardLayout>
            <SystemPolicyPage type="privacy" />
        </DashboardLayout>
    );
}
