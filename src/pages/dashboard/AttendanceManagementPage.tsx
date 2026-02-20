import DashboardLayout from "@/layout/DashboardLayout";
import AttendanceManagementComponent from "@/components/tabs/AttendanceManagement";

export default function AttendanceManagementPage() {
    return (
        <DashboardLayout>
            <AttendanceManagementComponent />
        </DashboardLayout>
    );
}
