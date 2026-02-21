import {Button} from "@/components/ui/button.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import {ChevronDownIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";
import { leaveService } from "@/services/leave.service";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store.ts";
import LeaveDetailsModal from "@/components/modals/LeaveDetailsModal";

export default function LeaveManagement() {
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>( new Date() );
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const [selectedLeave, setSelectedLeave] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });

    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true
    });

    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const response = await leaveService.getAdminLeaveRequests({
                page: pagination.page,
                size: pagination.size,
                search: searchQuery,
                // Optional: add date filtering if needed by the backend
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
            toast.error(error.message || "Failed to fetch leave requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [pagination.page, pagination.size, searchQuery]);

    const columns: Column<any>[] = [
        { header: "SL", flex: 0.5, render: (_, index) => <span className="text-sm font-bold">{pagination.page * pagination.size + index + 1}</span> },
        { 
            header: "Image", 
            flex: 0.5, 
            render: (item) => (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                    <ImageWithSkeleton src={item.employeeProfileImage || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="} />
                </div>
            ) 
        },
        { 
            header: "Full Name", 
            render: (item) => (
                <div className="px-2">
                    <span className="text-sm font-bold dark:text-gray-200 truncate block">{item.employeeName}</span>
                    <span className="text-[10px] text-gray-500 block">{item.employeeEmail}</span>
                </div>
            ) 
        },
        // { 
        //     header: "Designation", 
        //     render: (item) => <span className="text-xs dark:text-gray-300">{item.designation}</span> 
        // },
        { 
            header: "Type", 
            render: (item) => <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{item.leaveType}</span> 
        },
        { 
            header: "Dates", 
            render: (item) => (
                <div className="text-[10px] font-medium">
                    <div>{item.startDate}</div>
                    <div className="text-gray-400">to</div>
                    <div>{item.endDate}</div>
                </div>
            ) 
        },
        { 
            header: "Days", 
            flex: 0.5,
            render: (item) => <span className="text-sm font-bold">{item.totalDays}</span> 
        },
        { 
            header: "Status", 
            render: (item) => (
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold text-center ${
                    item.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                    item.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}>
                    {item.status}
                </div>
            )
        },
        { 
            header: "Action", 
            render: (item) => (
                <Button 
                    onClick={() => {
                        setSelectedLeave(item);
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
                    <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Leave Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Review and manage employee leave requests across employers.</p>
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
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Pending</p>
                            <h4 className="text-lg font-black text-gray-900 dark:text-white">{stats.pending}</h4>
                        </div>
                        <div className="bg-[#E6F4EB] dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 px-4 py-2 rounded-xl shrink-0">
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Approved</p>
                            <h4 className="text-lg font-black text-green-700 dark:text-green-400">{stats.approved}</h4>
                        </div>
                        <div className="bg-[#FEEEEE] dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 px-4 py-2 rounded-xl shrink-0">
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Rejected</p>
                            <h4 className="text-lg font-black text-red-700 dark:text-red-400">{stats.rejected}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <ReusableTable columns={columns} data={data} isLoading={loading} />

            {isModalOpen && selectedLeave && (
                <LeaveDetailsModal 
                    leave={selectedLeave} 
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedLeave(null);
                    }}
                    onUpdate={fetchLeaves}
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
    )
}