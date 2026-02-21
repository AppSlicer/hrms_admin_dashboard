import {Button} from "@/components/ui/button.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import {ChevronDownIcon, Trash2, Calendar as CalendarIcon, Eye} from "lucide-react";
import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";
import { dashboardService } from "@/services/dashboard.service";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store.ts";
import PaySlipUploadModal from "@/components/modals/PaySlipUploadModal";
import PaySlipDetailModal from "@/components/modals/PaySlipDetailModal";

export default function PaySlip() {
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>( new Date() );
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState<any>(null);
    
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true
    });

    const fetchPaySlips = async () => {
        setLoading(true);
        try {
            const response = await dashboardService.getAdminPaySlips({
                page: pagination.page,
                size: pagination.size,
                search: searchQuery,
                sortBy: 'createdAt',
                sortDirection: 'desc'
            });
            
            setData(response.content);
            setPagination(prev => ({
                ...prev,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                first: response.first,
                last: response.last
            }));
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch pay slips");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaySlips();
    }, [pagination.page, pagination.size, searchQuery]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this pay slip?")) return;
        
        try {
            await dashboardService.deleteAdminPaySlip(id);
            toast.success("Pay slip deleted successfully");
            fetchPaySlips();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete pay slip");
        }
    };

    const columns: Column<any>[] = [
        { header: "SL", flex: 0.5, render: (_, index) => <span className="text-sm font-bold">{pagination.page * pagination.size + index + 1}</span> },
        { 
            header: "Image", 
            flex: 0.5, 
            render: (item) => (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                    <ImageWithSkeleton src={item.image || "https://placehold.co/100x100?text=PS"} />
                </div>
            ) 
        },
        { 
            header: "Full Name", 
            render: (item) => (
                <div className="px-2">
                    <span className="text-sm font-bold dark:text-gray-200 truncate block">{item.employeeName}</span>
                </div>
            ) 
        },
        { 
            header: "Employee ID", 
            render: (item) => <span className="text-xs text-gray-500 font-mono">{item.employeeId.split('-')[0]}...</span> 
        },
        // { 
        //     header: "Job Category", 
        //     render: (item) => <span className="text-xs dark:text-gray-300">{item.jobCategory}</span> 
        // },
        { 
            header: "Amount", 
            render: (item) => <span className="text-sm font-black text-green-600 dark:text-green-400">{parseFloat(item.amount).toLocaleString()}</span> 
        },
        { 
            header: "Date", 
            render: (item) => (
                <div className="text-[10px] font-medium flex items-center gap-1">
                    <CalendarIcon size={12} className="text-gray-400" />
                    {item.transactionDate ? new Date(item.transactionDate).toLocaleDateString() : 'N/A'}
                </div>
            ) 
        },
        {
            header: "Action",
            render: (item) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => setSelectedPayslip(item)}
                        title="View details"
                    >
                        <Eye size={14} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            {/* Header section */}
            <div className={"flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8"}>
                <div>
                    <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>PaySlips Manager</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage and upload employee pay slips.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <Button 
                        onClick={() => setIsUploadModalOpen(true)}
                        className="bg-[#125BAC] dark:bg-blue-600 text-white rounded-full h-11 px-8 font-bold shadow-lg shadow-blue-900/20"
                    >
                        Upload Pay Slip
                    </Button>
                    
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
                </div>
            </div>

            <ReusableTable columns={columns} data={data} isLoading={loading} />

            {isUploadModalOpen && (
                <PaySlipUploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onUpdate={fetchPaySlips}
                />
            )}

            {selectedPayslip && (
                <PaySlipDetailModal
                    payslip={selectedPayslip}
                    onClose={() => setSelectedPayslip(null)}
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