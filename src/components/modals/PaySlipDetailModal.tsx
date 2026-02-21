import { X, Building2, User, Calendar, DollarSign, FileText, Briefcase, Mail, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton";

interface PaySlipDetailModalProps {
    payslip: any;
    onClose: () => void;
}

const defaultAvatar = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string | null | undefined }) {
    return (
        <div className="flex items-start gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <Icon size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{value || "N/A"}</p>
            </div>
        </div>
    );
}

export default function PaySlipDetailModal({ payslip, onClose }: PaySlipDetailModalProps) {
    const formatDate = (d: string | null | undefined) =>
        d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "N/A";

    const formatCurrency = (v: string | number | null | undefined) => {
        if (v == null || v === "") return "N/A";
        const num = typeof v === "string" ? parseFloat(v) : v;
        return isNaN(num) ? String(v) : `${num.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`;
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center bg-[#125BAC] text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <Receipt size={22} />
                        <div>
                            <h2 className="text-xl font-bold">Pay Slip Details</h2>
                            <p className="text-blue-100 text-xs mt-0.5">Full payslip breakdown</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">

                    {/* Employee & Employer Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800">

                        {/* Employee Info */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <User size={14} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Employee</h3>
                            </div>

                            {/* Avatar + Name */}
                            <div className="flex items-center gap-4 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl">
                                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-200 dark:ring-blue-800 shrink-0">
                                    <ImageWithSkeleton
                                        key={payslip.employeeProfileImage}
                                        src={payslip.employeeProfileImage || defaultAvatar}
                                        fallbackSrc={defaultAvatar}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900 dark:text-white truncate">
                                        {payslip.employeeName || "Unknown Employee"}
                                    </p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{payslip.designation}</p>
                                    <p className="text-[10px] text-gray-400 font-mono truncate">{payslip.employeeId?.split('-')[0]}...</p>
                                </div>
                            </div>

                            <div className="space-y-0">
                                <InfoRow icon={Mail} label="Email" value={payslip.employeeEmail} />
                                <InfoRow icon={Briefcase} label="Department" value={payslip.jobCategory} />
                                <InfoRow icon={Briefcase} label="Designation" value={payslip.designation} />
                            </div>
                        </div>

                        {/* Employer Info */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <Building2 size={14} className="text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Employer</h3>
                            </div>

                            <div className="flex items-center gap-4 p-3 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl">
                                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-purple-200 dark:ring-purple-800 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                    <Building2 size={24} className="text-purple-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900 dark:text-white truncate">
                                        {payslip.employerName || "Company"}
                                    </p>
                                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Employer</p>
                                </div>
                            </div>

                            <div className="space-y-0">
                                <InfoRow icon={Mail} label="Email" value={payslip.employerEmail} />
                                <InfoRow icon={Calendar} label="Transaction Date" value={formatDate(payslip.transactionDate)} />
                                <InfoRow icon={Calendar} label="Issued On" value={formatDate(payslip.createdAt)} />
                            </div>
                        </div>
                    </div>

                    {/* Salary Breakdown */}
                    <div className="mx-6 mb-6 mt-2 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                            <DollarSign size={14} className="text-green-600" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Salary Breakdown</h3>
                        </div>

                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            <div className="flex justify-between items-center px-5 py-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Basic Salary</span>
                                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{formatCurrency(payslip.basicSalary)}</span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Allowances</span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">+{formatCurrency(payslip.allowances)}</span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Deductions</span>
                                <span className="text-sm font-bold text-red-500 dark:text-red-400">-{formatCurrency(payslip.deductions)}</span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-4 bg-green-50 dark:bg-green-900/20">
                                <span className="text-base font-bold text-gray-800 dark:text-gray-100">Net / Total Amount</span>
                                <span className="text-xl font-black text-green-600 dark:text-green-400">
                                    {formatCurrency(payslip.netSalary || payslip.amount)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {payslip.description && (
                        <div className="mx-6 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={13} className="text-gray-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Notes / Description</span>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 italic">
                                "{payslip.description}"
                            </div>
                        </div>
                    )}

                    {/* Pay Slip Image */}
                    {payslip.image && (
                        <div className="mx-6 mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <FileText size={13} className="text-gray-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pay Slip Document</span>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                <img
                                    src={payslip.image}
                                    alt="Pay slip document"
                                    className="w-full object-contain max-h-64"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            </div>
                            <Button
                                variant="outline"
                                className="w-full mt-3 h-10 rounded-xl text-blue-600 border-blue-200 hover:bg-blue-50 font-bold text-xs"
                                onClick={() => window.open(payslip.image, '_blank')}
                            >
                                Open Full Image
                            </Button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-5 border-t dark:border-gray-800 flex justify-end bg-gray-50 dark:bg-gray-900/50 shrink-0">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="rounded-xl px-8 font-bold h-11 border-gray-300 dark:border-gray-700"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
