import {
    Banknote,
    Calendar1,
    CalendarDays,
    CalendarMinus,
    CardSimIcon,
    ChartNetwork,
    ClipboardPlus,
    CreditCard,
    LucideLayoutDashboard,
    Mail,
    MessageCircleQuestionMark,
    ReceiptText,
    Siren,
    TrainFrontTunnel,
    UserRound,
    UsersRound,
} from "lucide-react";

export const admin = [
    { icon: LucideLayoutDashboard, title: "Overview" },
    { icon: TrainFrontTunnel, title: "Sub Admin Management" },
    { icon: UserRound, title: "Employer Management" },
    { icon: ChartNetwork, title: "Profit" },
    { icon: ClipboardPlus, title: "Immigration Report" },
    { icon: UsersRound, title: "System Audit Logs" },
    { icon: CreditCard, title: "Subscription Management" },
    { icon: ReceiptText, title: "Terms & Condition" },
    { icon: Siren, title: "Privacy Policy" },
    { icon: CardSimIcon, title: "Subscriber" },
    { icon: Mail, title: "Email Marketing" },
    { icon: UserRound, title: "My Profile" },
    { icon: MessageCircleQuestionMark, title: "Help & Support" },
] as const;

export const subAdmin = [
    { icon: LucideLayoutDashboard, title: "Overview" },
    { icon: UsersRound, title: "Employer Management" },
    { icon: Calendar1, title: "Attendance Management" },
    { icon: CalendarMinus, title: "Leave Management" },
    { icon: CalendarDays, title: "Task Management" },
    { icon: Banknote, title: "PaySlips Manager" },
    { icon: CreditCard, title: "Subscription Management" },
    { icon: ReceiptText, title: "Terms & Condition" },
    { icon: Siren, title: "Privacy Policy" },
    { icon: UserRound, title: "My Profile" },
    { icon: MessageCircleQuestionMark, title: "Help & Support" },
] as const;

export const employer = [
    { icon: LucideLayoutDashboard, title: "Overview" },
    { icon: UsersRound, title: "Employee Management" },
    { icon: Calendar1, title: "Attendance Management" },
    { icon: CalendarMinus, title: "Leave Management" },
    { icon: CalendarDays, title: "Task Management" },
    { icon: Banknote, title: "PaySlips Manager" },
    { icon: UserRound, title: "My Profile" },
    { icon: MessageCircleQuestionMark, title: "Help & Support" },
] as const;

export const employee = [
    { icon: LucideLayoutDashboard, title: "Overview" },
    { icon: Calendar1, title: "Attendance" },
    { icon: CalendarMinus, title: "Leave" },
    { icon: CalendarDays, title: "Tasks" },
    { icon: Banknote, title: "My PaySlips" },
    { icon: UserRound, title: "My Profile" },
    { icon: MessageCircleQuestionMark, title: "Help & Support" },
] as const;

// Extract all possible titles
export type AdminTabTitle = typeof admin[number]["title"];
export type SubAdminTabTitle = typeof subAdmin[number]["title"];
export type EmployerTabTitle = typeof employer[number]["title"];
export type EmployeeTabTitle = typeof employee[number]["title"];

// Combine both into one type
export type AllTabTitles = AdminTabTitle | SubAdminTabTitle | EmployerTabTitle | EmployeeTabTitle;
