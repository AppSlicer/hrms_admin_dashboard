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
import ReusableTable, { Column } from "@/components/ui/ReusableTable";

export default function HrmcAuditReport() {

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
        { header: "Name", render: (item) => <span className="text-sm font-bold dark:text-gray-200 truncate block px-2">{item.name}</span> },
        { header: "ID", render: (item) => <span className="text-[10px] dark:text-gray-400" onClick={() => copyToClipboard(item.id)}>{item.id.slice(0, 10)}...</span> },
        { header: "Email", flex: 1.2, render: (item) => <span className="text-sm dark:text-gray-300 truncate px-2 block">{item.email}</span> },
        { header: "Contact", render: (item) => <span className="text-xs dark:text-gray-400">{item.contact}</span> },
        { header: "Address", render: (item) => <span className="text-[10px] dark:text-gray-400 truncate block px-2">{item.address}</span> },
        { header: "Subscription", render: (item) => <span className="text-xs dark:text-gray-300">{item.plan}</span> },
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
            render: () => <Button className="text-white bg-green-600 dark:bg-green-700 h-7 text-[10px] font-bold px-4 rounded-md transition-all active:scale-95">View</Button>
        }
    ];

    const data = [
        { id: "234234k234239", name: "MD Sohidul Islam", email: "anontom90@gmail.com", contact: "018009393842", address: "Dhaka, BD", plan: "Standard", status: "Active" }
    ];

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Immigration Report</h1>
                <div className={"gap-2 flex z-20"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer dark:border-gray-800 dark:text-gray-300 dark:bg-card"}>Filter by Role</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200"}>User Role</DropdownMenuLabel>
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
    )
}
