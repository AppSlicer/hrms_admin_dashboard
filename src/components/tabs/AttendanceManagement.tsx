import {Button} from "@/components/ui/button.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {ChevronDownIcon} from "lucide-react";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import ReusableTable, { Column } from "@/components/ui/ReusableTable";

export default function AttendanceManagement() {
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>( new Date() );

    const columns: Column<any>[] = [
        { header: "SL", flex: 0.5, render: (_, index) => <span className="text-sm font-bold">{index + 1}</span> },
        { 
            header: "Image", 
            flex: 0.5, 
            render: () => (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                    <ImageWithSkeleton src={ImageStatic} />
                </div>
            ) 
        },
        { header: "Full Name", render: (item) => <span className="text-sm font-bold dark:text-gray-200 truncate block px-2">{item.name}</span> },
        { header: "ID Number", render: (item) => <span className="text-[10px] dark:text-gray-400" onClick={() => copyToClipboard(item.id)}>{item.id.slice(0, 10)}...</span> },
        { header: "Designation", render: (item) => <span className="text-xs dark:text-gray-300">{item.role}</span> },
        { header: "Presents", flex: 0.7, render: (item) => <span className="text-sm font-bold text-green-600">{item.presents}</span> },
        { header: "Absence", flex: 0.7, render: (item) => <span className="text-sm font-bold text-red-500">{item.absence}</span> },
        { header: "Leave", flex: 0.7, render: (item) => <span className="text-sm font-bold text-orange-500">{item.leave}</span> },
        { 
            header: "Status", 
            render: (item) => (
                <div className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                    {item.status}
                </div>
            )
        },
        { 
            header: "Action", 
            render: () => <Button variant="outline" className="h-7 text-[10px] font-bold px-4 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400">View</Button>
        }
    ];

    const data = [
        { id: "234234k234239", name: "MD Sohidul Islam", role: "Manager", presents: "05", absence: "15", leave: "06", status: "Active" },
        { id: "234kasdhfkjah", name: "Shakir Ahmed", role: "Developer", presents: "20", absence: "02", leave: "01", status: "Active" }
    ];

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            {/* Header section */}
            <div className={"flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8"}>
                <div>
                    <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Attendance Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track and monitor employee presence.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <div className="flex gap-2 items-center">
                        <Button className="bg-[#125BAC] dark:bg-blue-600 text-white rounded-full h-11 px-6 font-bold">Request (200)</Button>
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
                            <h4 className="text-lg font-black text-gray-900 dark:text-white">150</h4>
                        </div>
                        <div className="bg-[#E6F4EB] dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 px-4 py-2 rounded-xl shrink-0">
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Present</p>
                            <h4 className="text-lg font-black text-green-700 dark:text-green-400">142</h4>
                        </div>
                        <div className="bg-[#FEEEEE] dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 px-4 py-2 rounded-xl shrink-0">
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Absent</p>
                            <h4 className="text-lg font-black text-red-700 dark:text-red-400">08</h4>
                        </div>
                    </div>
                </div>
            </div>

            <ReusableTable columns={columns} data={data} isLoading={false} />
        </div>
    )
}
