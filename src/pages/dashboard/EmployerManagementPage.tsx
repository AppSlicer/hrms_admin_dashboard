import DashboardLayout from "@/layout/DashboardLayout";
import EmployeeManagementComponent from "@/components/tabs/EmployeeManagement";

export default function EmployerManagementPage() {
    return (
        <DashboardLayout>
            <EmployeeManagementComponent />
        </DashboardLayout>
    );
}
