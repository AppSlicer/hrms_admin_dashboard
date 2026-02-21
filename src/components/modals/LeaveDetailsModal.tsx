import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { X, Calendar, FileText, User, Briefcase } from "lucide-react";
import { leaveService } from "@/services/leave.service";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface LeaveDetailsModalProps {
    leave: any;
    onClose: () => void;
    onUpdate: () => void;
}

export default function LeaveDetailsModal({ leave, onClose, onUpdate }: LeaveDetailsModalProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [showRejectInput, setShowRejectInput] = useState(false);

    const handleApprove = async () => {
        setIsUpdating(true);
        try {
            await leaveService.adminApproveLeave(leave.id);
            toast.success("Leave request approved successfully");
            onUpdate();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Failed to approve leave request");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleReject = async () => {
        if (!rejectionReason) {
            toast.error("Please provide a reason for rejection");
            return;
        }
        setIsUpdating(true);
        try {
            await leaveService.adminRejectLeave(leave.id, rejectionReason);
            toast.success("Leave request rejected successfully");
            onUpdate();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Failed to reject leave request");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center bg-[#125BAC] text-white">
                    <div>
                        <h2 className="text-xl font-bold">Leave Request Details</h2>
                        <p className="text-blue-100 text-xs mt-1">Reviewing request from {leave.employeeName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {/* Employee Info Card */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border dark:border-gray-800 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <User size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 dark:text-white">{leave.employeeName}</h3>
                            <p className="text-sm text-gray-500">{leave.employeeEmail}</p>
                            <div className="flex gap-4 mt-2">
                                <span className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    <Briefcase size={12} /> {leave.designation}
                                </span>
                                <span className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    <FileText size={12} /> {leave.jobCategory}
                                </span>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                            leave.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                            leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                            {leave.status}
                        </div>
                    </div>

                    {/* Leave Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <Label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Leave Type</Label>
                                <p className="text-sm font-bold mt-1 text-blue-600">{leave.leaveType || leave.customLeaveType?.name}</p>
                            </div>
                            <div className="flex gap-8">
                                <div>
                                    <Label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Start Date</Label>
                                    <p className="text-sm font-bold mt-1 flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" />
                                        {leave.startDate}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">End Date</Label>
                                    <p className="text-sm font-bold mt-1 flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" />
                                        {leave.endDate}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Total Duration</Label>
                                <p className="text-sm font-bold mt-1">{leave.totalDays} Days</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Reason for Leave</Label>
                                <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border dark:border-gray-800 text-sm italic text-gray-700 dark:text-gray-300 min-h-[80px]">
                                    "{leave.reason || 'No reason provided'}"
                                </div>
                            </div>
                        </div>
                    </div>

                    {leave.status === 'REJECTED' && leave.rejectionReason && (
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                            <Label className="text-[10px] uppercase text-red-500 font-bold tracking-wider">Rejection Reason</Label>
                            <p className="text-sm mt-1 text-red-700 dark:text-red-400 font-medium">{leave.rejectionReason}</p>
                        </div>
                    )}

                    {leave.status === 'PENDING' && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 space-y-4 mt-4">
                            <h3 className="font-bold text-blue-900 dark:text-blue-300">Management Action</h3>
                            
                            {!showRejectInput ? (
                                <div className="flex gap-3">
                                    <Button 
                                        onClick={handleApprove} 
                                        disabled={isUpdating}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-11 rounded-xl"
                                    >
                                        Approve Request
                                    </Button>
                                    <Button 
                                        onClick={() => setShowRejectInput(true)} 
                                        disabled={isUpdating}
                                        variant="outline"
                                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 font-bold h-11 rounded-xl"
                                    >
                                        Reject Request
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Label className="text-xs font-bold text-gray-600">Please provide a reason for rejection:</Label>
                                    <Input 
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        placeholder="Enter reason..."
                                        className="bg-white dark:bg-gray-900"
                                    />
                                    <div className="flex gap-2">
                                        <Button 
                                            onClick={handleReject}
                                            disabled={isUpdating || !rejectionReason}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
                                        >
                                            Confirm Rejection
                                        </Button>
                                        <Button 
                                            onClick={() => setShowRejectInput(false)}
                                            variant="ghost"
                                            className="px-4"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900/50">
                    <Button variant="outline" onClick={onClose} disabled={isUpdating} className="rounded-xl px-6 font-bold h-11 border-gray-300 dark:border-gray-700">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}