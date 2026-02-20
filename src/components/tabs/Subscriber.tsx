import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {EyeOff, LockIcon} from "lucide-react";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";

export default function Subscriber() {

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
        { header: "Email", flex: 1.2, render: (item) => <span className="text-sm dark:text-gray-300 truncate px-2 block">{item.email}</span> },
        { header: "Contact", render: (item) => <span className="text-xs dark:text-gray-400">{item.contact}</span> },
        { header: "Plan", render: (item) => <span className="text-sm dark:text-gray-300">{item.plan}</span> },
        { header: "Price", render: (item) => <span className="text-sm font-bold text-[#125BAC] dark:text-blue-400">{item.price}</span> },
        { header: "Start Date", render: (item) => <span className="text-[10px] dark:text-gray-500 font-bold">{item.start}</span> },
        { header: "End Date", render: (item) => <span className="text-[10px] dark:text-red-400 font-bold">{item.end}</span> },
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
            render: () => (
                <div className="flex gap-3">
                    <LockIcon className="cursor-pointer text-orange-500 dark:text-orange-400" size={16} />
                    <EyeOff className="cursor-pointer text-green-500 dark:text-green-400" size={16} />
                </div>
            )
        }
    ];

    const data = [
        { id: 1, name: "MD Sohidul Islam", email: "anontom90@gmail.com", contact: "016000232423", plan: "Basic Plan", price: "$239", start: "01 Jan 2026", end: "02 Feb 2048", status: "Active" }
    ];

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Subscriber</h1>
                <div className={"gap-2 flex z-20"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer dark:border-gray-800 dark:text-gray-300 dark:bg-card"}>Employer</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200"}>Role</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem className={"cursor-pointer dark:text-gray-300"}>Employee</DropdownMenuItem>
                                <DropdownMenuItem className={"cursor-pointer dark:text-gray-300"}>Employer</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <ReusableTable columns={columns} data={data} isLoading={false} />
        </div>
    );
}
