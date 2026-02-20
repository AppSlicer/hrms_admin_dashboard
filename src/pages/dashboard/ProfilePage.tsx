import DashboardLayout from "@/layout/DashboardLayout";
import ProfileTabs from "@/components/tabs/ProfileTab";

export default function ProfilePage() {
    return (
        <DashboardLayout>
            <ProfileTabs />
        </DashboardLayout>
    );
}
