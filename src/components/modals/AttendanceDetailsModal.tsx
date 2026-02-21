import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { X, Clock, Coffee, PauseCircle } from "lucide-react";
import { dashboardService } from "@/services/dashboard.service";
import { toast } from "sonner";

interface AttendanceDetailsModalProps {
    attendance: any;
    onClose: () => void;
    onUpdate: () => void;
}

export default function AttendanceDetailsModal({ attendance, onClose, onUpdate }: AttendanceDetailsModalProps) {
    const [approvalStatus, setApprovalStatus] = useState(attendance.approvalStatus);
    const [adminNote, setAdminNote] = useState(attendance.adminNote || "");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            await dashboardService.updateAdminAttendanceStatus(attendance._id, {
                approvalStatus,
                adminNote
            });
            toast.success("Attendance status updated successfully");
            onUpdate();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Failed to update attendance status");
        } finally {
            setIsUpdating(false);
        }
    };

    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center bg-[#125BAC] text-white">
                    <div>
                        <h2 className="text-xl font-bold">{attendance.employee?.name}'s Attendance</h2>
                        <p className="text-blue-100 text-xs mt-1">{attendance.employee?.companyName} • {new Date(attendance.date).toLocaleDateString()}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-800">
                            <Label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Check In</Label>
                            <p className="text-sm font-bold mt-1 flex items-center gap-2">
                                <Clock size={14} className="text-blue-500" />
                                {attendance.checkInTime ? formatTime(attendance.checkInTime) : 'N/A'}
                            </p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-800">
                            <Label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Check Out</Label>
                            <p className="text-sm font-bold mt-1 flex items-center gap-2">
                                <Clock size={14} className="text-orange-500" />
                                {attendance.checkOutTime ? formatTime(attendance.checkOutTime) : '--:--'}
                            </p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-800">
                            <Label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Work Time</Label>
                            <p className="text-sm font-bold mt-1">
                                {attendance.totalWorkMinutes ? (attendance.totalWorkMinutes / 60).toFixed(2) + 'h' : '--'}
                            </p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-800">
                            <Label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Status</Label>
                            <p className="text-sm font-bold mt-1 text-blue-600 uppercase">{attendance.status}</p>
                        </div>
                    </div>

                    {/* Break Records */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold">
                            <Coffee size={18} className="text-green-500" />
                            <h3>Break Records</h3>
                        </div>
                        <div className="border dark:border-gray-800 rounded-xl overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 text-xs">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">Start</th>
                                        <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">End</th>
                                        <th className="px-4 py-2 text-right font-bold uppercase tracking-wider">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-gray-800">
                                    {attendance.breakRecords?.map((br: any, i: number) => (
                                        <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50">
                                            <td className="px-4 py-3">{formatTime(br.startTime)}</td>
                                            <td className="px-4 py-3">{br.endTime ? formatTime(br.endTime) : 'Running...'}</td>
                                            <td className="px-4 py-3 text-right font-semibold">{br.duration ? br.duration + 'm' : '--'}</td>
                                        </tr>
                                    ))}
                                    {(!attendance.breakRecords || attendance.breakRecords.length === 0) && (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-6 text-center text-gray-400 italic">No break records found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pause Records */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold">
                            <PauseCircle size={18} className="text-orange-500" />
                            <h3>Pause Records</h3>
                        </div>
                        <div className="border dark:border-gray-800 rounded-xl overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 text-xs">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">Reason</th>
                                        <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">Start</th>
                                        <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">End</th>
                                        <th className="px-4 py-2 text-right font-bold uppercase tracking-wider">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-gray-800">
                                    {attendance.pauseRecords?.map((pr: any, i: number) => (
                                        <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50">
                                            <td className="px-4 py-3 font-medium">{pr.reason || 'No Reason'}</td>
                                            <td className="px-4 py-3">{formatTime(pr.startTime)}</td>
                                            <td className="px-4 py-3">{pr.endTime ? formatTime(pr.endTime) : 'Running...'}</td>
                                            <td className="px-4 py-3 text-right font-semibold">{pr.duration ? pr.duration + 'm' : '--'}</td>
                                        </tr>
                                    ))}
                                    {(!attendance.pauseRecords || attendance.pauseRecords.length === 0) && (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-6 text-center text-gray-400 italic">No pause records found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Update Section */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 space-y-4">
                        <h3 className="font-bold text-blue-900 dark:text-blue-300">Management Action</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Approval Status</Label>
                                <div className="flex gap-2">
                                    {['PENDING', 'APPROVED', 'REJECTED'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setApprovalStatus(status)}
                                            className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                                                approvalStatus === status 
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                                                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Admin Note</Label>
                                <Input 
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                    placeholder="Add a note..." 
                                    className="bg-white dark:bg-gray-900 rounded-lg h-10 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900/50">
                    <Button variant="outline" onClick={onClose} disabled={isUpdating} className="rounded-xl px-6 font-bold h-11 border-gray-300 dark:border-gray-700">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} disabled={isUpdating} className="rounded-xl px-10 font-bold h-11 bg-[#125BAC] hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20">
                        {isUpdating ? "Updating..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
