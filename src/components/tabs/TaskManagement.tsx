import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import {ChevronDownIcon, EyeOff, LockIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";

export default function TaskManagement() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

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
        { header: "Employee ID", render: (item) => <span className="text-xs dark:text-gray-400">{item.empId}</span> },
        { header: "Designation", render: (item) => <span className="text-xs dark:text-gray-300">{item.role}</span> },
        { header: "Total Task", flex: 0.8, render: (item) => <span className="text-sm font-bold text-blue-600">{item.total}</span> },
        { header: "Completed", flex: 0.8, render: (item) => <span className="text-sm font-bold text-green-600">{item.completed}</span> },
        { header: "Cancelled", flex: 0.8, render: (item) => <span className="text-sm font-bold text-red-500">{item.cancelled}</span> },
        { 
            header: "Action", 
            render: () => (
                <div className="flex gap-3">
                    <LockIcon className="cursor-pointer text-orange-500 dark:text-orange-400" size={16} />
                    <EyeOff className="cursor-pointer text-green-500 dark:text-green-400" size={16} />
                </div>
            )
        }
    ];

    const data = [
        { id: 1, name: "Sumit Sah", empId: "12312", role: "HR", total: "93", completed: "23", cancelled: "43" },
        { id: 2, name: "Anisur Rahman", empId: "12315", role: "Manager", total: "45", completed: "40", cancelled: "02" }
    ];

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            {/* Header section */}
            <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"}>
                <div>
                    <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Task & Rota</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage daily tasks and roster assignments.</p>
                </div>
                
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

            <ReusableTable columns={columns} data={data} isLoading={false} />
        </div>
    )
}
