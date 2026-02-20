import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";

export default function AuditLog() {

    const columns: Column<any>[] = [
        { header: "SL", flex: 0.5, render: (_, index) => <span className="text-sm font-bold">{index + 1}</span> },
        { header: "Timestamp", render: (item) => <span className="text-[10px] dark:text-gray-400 font-bold">{item.time}</span> },
        { header: "User", render: (item) => <span className="text-sm font-bold dark:text-gray-200">{item.user}</span> },
        { header: "Action", render: (item) => <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-[9px] font-black uppercase">{item.action}</span> },
        { header: "Details", flex: 1.5, render: (item) => <span className="text-xs dark:text-gray-400 truncate block px-2" title={item.details}>{item.details}</span> },
        { header: "IP Address", render: (item) => <span className="text-xs dark:text-gray-500 font-mono">{item.ip}</span> },
        { 
            header: "Status", 
            render: (item) => (
                <div className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-[9px] font-black uppercase">
                    {item.status}
                </div>
            )
        }
    ];

    const data = [
        { id: 1, time: "20 Feb 2026, 10:30 AM", user: "Admin_Jane", action: "Update_User", details: "Updated status for employer ID: 67158...", ip: "192.168.1.105", status: "Success" }
    ];

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>System Audit Logs</h1>
                <div className={"gap-2 flex z-20"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer dark:border-gray-800 dark:text-gray-300 dark:bg-card"}>Filter by Action</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200"}>Action Type</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem className={"cursor-pointer dark:text-gray-300"}>Create</DropdownMenuItem>
                                <DropdownMenuItem className={"cursor-pointer dark:text-gray-300"}>Delete</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <ReusableTable columns={columns} data={data} isLoading={false} />
        </div>
    )
}
