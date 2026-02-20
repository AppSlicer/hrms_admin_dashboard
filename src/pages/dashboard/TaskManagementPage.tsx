import DashboardLayout from "@/layout/DashboardLayout";
import TaskManagementComponent from "@/components/tabs/TaskManagement";

export default function TaskManagementPage() {
    return (
        <DashboardLayout>
            <TaskManagementComponent />
        </DashboardLayout>
    );
}
