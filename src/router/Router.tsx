import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {lazy, Suspense} from "react";
import Loader from "../components/ui/Loader.tsx";

// Lazy Imports
const SignIn = lazy( () => import("../pages/auth/SignIn.tsx"));
const SignUpPage = lazy( () => import("../pages/auth/SignUp.tsx"));
const ForgotPasswordPage = lazy( () => import("../pages/auth/ForgotPassword.tsx"));
const VerifyEmailPage = lazy( () => import("../pages/auth/VerifyEmail.tsx"));
const CreateNewPasswordPage = lazy( () => import("../pages/auth/CreateNewPassword.tsx"));
const ResetPasswordPage = lazy( () => import("../pages/auth/ResetPasswordPage.tsx"));
const NotFoundPage = lazy( () => import("../pages/not-found/NotFoundPage.tsx"));
const ProtectedRoute = lazy( () => import("./ProtectedRoute.tsx"));

// Dashboard Pages
const OverviewPage = lazy(() => import("../pages/dashboard/OverviewPage.tsx"));
const SubAdminManagementPage = lazy(() => import("../pages/dashboard/SubAdminManagementPage.tsx"));
const EmployerManagementPage = lazy(() => import("../pages/dashboard/EmployerManagementPage.tsx"));
const ProfitsPage = lazy(() => import("../pages/dashboard/ProfitsPage.tsx"));
const HrmcAuditReportPage = lazy(() => import("../pages/dashboard/HrmcAuditReportPage.tsx"));
const AuditLogPage = lazy(() => import("../pages/dashboard/AuditLogPage.tsx"));
const SubscriptionManagementPage = lazy(() => import("../pages/dashboard/SubscriptionManagementPage.tsx"));
const TermsAndConditionPage = lazy(() => import("../pages/dashboard/TermsAndConditionPage.tsx"));
const PrivacyPolicyPage = lazy(() => import("../pages/dashboard/PrivacyPolicyPage.tsx"));
const SubscriberPage = lazy(() => import("../pages/dashboard/SubscriberPage.tsx"));
const EmailMarketingPage = lazy(() => import("../pages/dashboard/EmailMarketingPage.tsx"));
const ProfilePage = lazy(() => import("../pages/dashboard/ProfilePage.tsx"));
const HelpAndSupportPage = lazy(() => import("../pages/dashboard/HelpAndSupportPage.tsx"));
const MessagesPage = lazy(() => import("../pages/dashboard/MessagesPage.tsx"));
const NotificationsPage = lazy(() => import("../pages/dashboard/NotificationsPage.tsx"));
const AttendanceManagementPage = lazy(() => import("../pages/dashboard/AttendanceManagementPage.tsx"));
const LeaveManagementPage = lazy(() => import("../pages/dashboard/LeaveManagementPage.tsx"));
const TaskManagementPage = lazy(() => import("../pages/dashboard/TaskManagementPage.tsx"));
const PaySlipPage = lazy(() => import("../pages/dashboard/PaySlipPage.tsx"));

export default function RouterElement () {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Auth Routes */}
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/verify-email" element={<VerifyEmailPage />} />
                    <Route path="/create-new-password" element={<CreateNewPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />

                    {/* Dashboard Routes */}
                    <Route element={<ProtectedRoute />} >
                        <Route path="/" element={<Navigate to="/overview" replace />} />
                        <Route path="/overview" element={<OverviewPage />} />
                        <Route path="/sub-admin-management" element={<SubAdminManagementPage />} />
                        <Route path="/employer-management" element={<EmployerManagementPage />} />
                        <Route path="/profits" element={<ProfitsPage />} />
                        <Route path="/immigration-report" element={<HrmcAuditReportPage />} />
                        <Route path="/system-audit-logs" element={<AuditLogPage />} />
                        <Route path="/subscription-management" element={<SubscriptionManagementPage />} />
                        <Route path="/terms-and-condition" element={<TermsAndConditionPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="/subscriber" element={<SubscriberPage />} />
                        <Route path="/email-marketing" element={<EmailMarketingPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/help-and-support" element={<HelpAndSupportPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/attendance-management" element={<AttendanceManagementPage />} />
                        <Route path="/leave-management" element={<LeaveManagementPage />} />
                        <Route path="/task-management" element={<TaskManagementPage />} />
                        <Route path="/payslip-manager" element={<PaySlipPage />} />
                    </Route>

                    {/* Not Found */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </Router>
    )
}
