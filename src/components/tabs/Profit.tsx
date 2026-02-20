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
import {Trash2, LockIcon} from "lucide-react";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";

export default function ProfitManagement() {

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
        { header: "Sub Admin", render: (item) => <span className="text-sm font-bold dark:text-gray-200">{item.name}</span> },
        { header: "Sub Admin ID", render: (item) => <span className="text-[10px] dark:text-gray-400 cursor-pointer" onClick={() => copyToClipboard(item.id)}>{item.id.slice(0, 10)}...</span> },
        { header: "Email", flex: 1.2, render: (item) => <span className="text-sm dark:text-gray-300 truncate px-2 block">{item.email}</span> },
        { header: "Contact", render: (item) => <span className="text-xs dark:text-gray-400">{item.contact}</span> },
        { header: "Profit", render: (item) => <span className="text-sm font-bold text-green-600 dark:text-green-400">{item.profit}</span> },
        { header: "Plan", render: (item) => <span className="text-xs dark:text-gray-300">{item.plan}</span> },
        { 
            header: "Status", 
            render: (item) => (
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status}
                </div>
            )
        },
        { 
            header: "Action", 
            render: () => (
                <div className="flex gap-3">
                    <LockIcon className="cursor-pointer text-orange-500 dark:text-orange-400" size={16} />
                    <Trash2 className="cursor-pointer text-red-500 dark:text-red-400" size={16} />
                </div>
            )
        }
    ];

    const data = [
        { id: "234234k234239", name: "MD Sohidul Islam", email: "anontom90@gmail.com", contact: "018009393842", profit: "$1,239", plan: "Standard", status: "Active" },
        { id: "234kasdhfkjah", name: "Sajiduj jaman", email: "asdfasdf@gmail.com", contact: "0998287267", profit: "$123", plan: "Premium", status: "Active" }
    ];

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Total Profit: $50,000</h1>
                <div className={"gap-2 flex z-20"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer dark:border-gray-800 dark:text-gray-300 dark:bg-card"}>Targeted Month</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200"}>Month</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem className={"p-2 border border-gray-100 dark:border-gray-800 rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold dark:text-gray-300 dark:hover:bg-gray-800"}>January</DropdownMenuItem>
                                <DropdownMenuItem className={"p-2 border border-gray-100 dark:border-gray-800 rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold dark:text-gray-300 dark:hover:bg-gray-800"}>February</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <ReusableTable columns={columns} data={data} isLoading={false} />
        </div>
    )
}
