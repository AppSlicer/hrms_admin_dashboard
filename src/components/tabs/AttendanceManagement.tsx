import {Button} from "@/components/ui/button.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {ChevronDownIcon, Search} from "lucide-react";
import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";
import {dashboardService} from "@/services/dashboard.service.ts";
import {toast} from "sonner";
import AttendanceDetailsModal from "@/components/modals/AttendanceDetailsModal";
import {useSelector} from "react-redux";
import type {RootState} from "@/redux/stores/store.ts";

export default function AttendanceManagement() {
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>( new Date() );
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const [selectedAttendance, setSelectedAttendance] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stats, setStats] = useState({
        totalStaff: 0,
        presentToday: 0,
        absentToday: 0
    });
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true
    });

    const fetchAttendances = async () => {
        setLoading(true);
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await dashboardService.getAdminAttendances({
                page: pagination.page,
                size: pagination.size,
                search: searchQuery,
                date: formattedDate
            });
            setData(response.content);
            setStats(response.stats);
            setPagination(prev => ({
                ...prev,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                first: response.first,
                last: response.last
            }));
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch attendances");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendances();
    }, [date, pagination.page, pagination.size, searchQuery]);

    const columns: Column<any>[] = [
// ... (columns unchanged) ...
        { header: "SL", flex: 0.5, render: (_, index) => <span className="text-sm font-bold">{pagination.page * pagination.size + index + 1}</span> },
        { 
            header: "Image", 
            flex: 0.5, 
            render: (item) => (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                    <ImageWithSkeleton src={item.employee?.profileImage || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="} />
                </div>
            ) 
        },
        { 
            header: "Full Name", 
            render: (item) => (
                <div className="px-2">
                    <span className="text-sm font-bold dark:text-gray-200 truncate block">{item.employee?.name}</span>
                    <span className="text-[10px] text-gray-500 block">{item.employee?.email}</span>
                </div>
            ) 
        },
        { 
            header: "Employer", 
            render: (item) => <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{item.employee?.companyName}</span> 
        },
        { 
            header: "Check In", 
            render: (item) => <span className="text-xs dark:text-gray-300">{item.checkInTime ? new Date(item.checkInTime).toLocaleTimeString() : 'N/A'}</span> 
        },
        { 
            header: "Check Out", 
            render: (item) => <span className="text-xs dark:text-gray-300">{item.checkOutTime ? new Date(item.checkOutTime).toLocaleTimeString() : '--:--'}</span> 
        },
        { 
            header: "Work Hours", 
            render: (item) => <span className="text-xs font-bold">{item.totalWorkMinutes ? (item.totalWorkMinutes / 60).toFixed(2) + 'h' : '--'}</span> 
        },
        { 
            header: "Status", 
            render: (item) => (
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold text-center ${
                    item.status === 'CHECKED_OUT' ? 'bg-green-100 text-green-700' : 
                    item.status === 'CHECKED_IN' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                    {item.status}
                </div>
            )
        },
        { 
            header: "Approval", 
            render: (item) => (
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold text-center ${
                    item.approvalStatus === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                    item.approvalStatus === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}>
                    {item.approvalStatus}
                </div>
            )
        },
        { 
            header: "Action", 
            render: (item) => (
                <Button 
                    onClick={() => {
                        setSelectedAttendance(item);
                        setIsModalOpen(true);
                    }}
                    variant="outline" 
                    className="h-7 text-[10px] font-bold px-4 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50"
                >
                    View
                </Button>
            )
        }
    ];

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            {/* Header section */}
            <div className={"flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8"}>
                <div>
                    <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Attendance Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track and monitor employee presence across employers.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <div className="flex gap-2 items-center">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="h-11 w-48 justify-between font-bold rounded-xl dark:border-gray-800 dark:text-gray-300">
                                    {date ? date.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon size={16} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 border-gray-200 dark:border-gray-800" align="end">
                                <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d!); setOpen(false); }} />
                            </PopoverContent>
                        </Popover>
                    </div>
                    
                    <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0">
                        <div className="bg-[#FEF3E6] dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 px-4 py-2 rounded-xl shrink-0">
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total Staff</p>
                            <h4 className="text-lg font-black text-gray-900 dark:text-white">{stats.totalStaff}</h4>
                        </div>
                        <div className="bg-[#E6F4EB] dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 px-4 py-2 rounded-xl shrink-0">
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Present</p>
                            <h4 className="text-lg font-black text-green-700 dark:text-green-400">{stats.presentToday}</h4>
                        </div>
                        <div className="bg-[#FEEEEE] dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 px-4 py-2 rounded-xl shrink-0">
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Absent</p>
                            <h4 className="text-lg font-black text-red-700 dark:text-red-400">{stats.absentToday}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <ReusableTable 
                columns={columns} 
                data={data} 
                isLoading={loading} 
            />
            
            {isModalOpen && selectedAttendance && (
                <AttendanceDetailsModal 
                    attendance={selectedAttendance} 
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedAttendance(null);
                    }}
                    onUpdate={fetchAttendances}
                />
            )}
            
            <div className="flex justify-between items-center mt-4 px-2">
                <p className="text-sm text-gray-500">
                    Showing {data.length} of {pagination.totalElements} records
                </p>
                <div className="flex gap-2">
                    <Button 
                        disabled={pagination.first || loading} 
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                        variant="outline" 
                        className="h-9 rounded-lg"
                    >
                        Previous
                    </Button>
                    <Button 
                        disabled={pagination.last || loading} 
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                        variant="outline" 
                        className="h-9 rounded-lg"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
