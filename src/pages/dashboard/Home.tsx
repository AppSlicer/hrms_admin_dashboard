import DashboardLayout from "@/layout/DashboardLayout.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "@/redux/stores/store.ts";
import OverViewTab from "@/components/tabs/Overview.tsx";
import {admin, subAdmin} from "@/enum/tab.enum.ts";
import SubAdminManagement from "@/components/tabs/SubAdminManagement.tsx";
import EmployeeManagement from "@/components/tabs/EmployeeManagement.tsx";
import Profits from "@/components/tabs/Profit.tsx";
import HrmcAuditReport from "@/components/tabs/HrmcAuditReport.tsx";
import AuditLog from "@/components/tabs/AuditLog.tsx";
import SubscriptionManagement from "@/components/tabs/SubscriptionManagement.tsx";
import TermsAndCondition from "@/components/tabs/TermsAndCondition.tsx";
import PrivacyPolicies from "@/components/tabs/PrivacyPolicy.tsx";
import ProfileTabs from "@/components/tabs/ProfileTab.tsx";
import HelpAndSupport from "@/components/tabs/HelpAndSupport.tsx";
import UserManagement from "@/components/tabs/UserManagement.tsx";
import AttendanceManagement from "@/components/tabs/AttendanceManagement.tsx";
import LeaveManagement from "@/components/tabs/LeaveManagement.tsx";
import TaskManagement from "@/components/tabs/TaskManagement.tsx";
import PaySlip from "@/components/tabs/PaySlip.tsx";
import NotAvailable from "@/components/tabs/NotAvailable.tsx";
import Subscriber from "@/components/tabs/Subscriber";
import EmailMarketing from "@/components/tabs/EmailMarketing";

export default function HomePage () {

    const { tab } = useSelector( (state: RootState) => state.tab );

    return (
        <DashboardLayout>
            {
                tab == admin[0].title ? (
                    <OverViewTab />
                ) :
                tab == admin[1].title ? (
                    <SubAdminManagement />
                ) :
                tab == admin[2].title ? (
                    <EmployeeManagement />
                ) :
                tab == admin[3].title ? (
                    <Profits />
                ) :
                tab == admin[4].title ? (
                    <HrmcAuditReport />
                ) :
                tab == admin[5].title ? (
                    <AuditLog />
                ) :
                tab == admin[6].title ? (
                    <SubscriptionManagement />
                ) :
                tab == admin[7].title ? (
                    <TermsAndCondition />
                ) :
                tab == admin[8].title ? (
                    <PrivacyPolicies />
                ) :
                tab == admin[9].title ? (
                    <Subscriber />
                ) :
                tab == admin[10].title ? (
                    <EmailMarketing />
                ) :
                tab == admin[11].title ? (
                    <ProfileTabs />
                ) :
                tab == admin[12].title ? (
                    <HelpAndSupport />
                ) :
                tab == subAdmin[1].title ? (
                    <EmployeeManagement />
                ) :
                tab == subAdmin[2].title ? (
                    <AttendanceManagement />
                ) :
                tab == subAdmin[3].title ? (
                    <LeaveManagement />
                ) :
                tab == subAdmin[4].title ? (
                    <TaskManagement />
                ) :
                tab == subAdmin[5].title ? (
                    <PaySlip />
                ) :
                tab == subAdmin[9].title ? (
                    <ProfileTabs />
                ) :
                tab == subAdmin[10].title ? (
                    <HelpAndSupport />
                ) : ( <NotAvailable /> )
            }
        </DashboardLayout>
    );
}