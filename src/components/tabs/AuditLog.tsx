import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import {copyToClipboard} from "@/lib/copyClipboard.ts";

export default function AuditLog() {

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            {/* Header section */}
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>System Audit Logs</h1>
                <div className={"gap-2 flex z-20"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer dark:border-gray-800 dark:text-gray-300 dark:bg-card"}>Filter by Action</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200"}>Action Type</DropdownMenuLabel>
                            <DropdownMenuGroup className={""}>
                                <DropdownMenuItem className={"p-2 border border-gray-100 dark:border-gray-800 rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold dark:text-gray-300 dark:hover:bg-gray-800"}>Create</DropdownMenuItem>
                                <DropdownMenuItem className={"p-2 border border-gray-100 dark:border-gray-800 rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold dark:text-gray-300 dark:hover:bg-gray-800"}>Delete</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* Table */}
            <Table totalPages={10} className={""}>
                {/* Table Heading*/}
                <TableRow
                    className={"bg-[#C7E2FF] dark:bg-blue-900/30 h-[60px] border-b border-gray-200 dark:border-gray-800 font-semibold"}
                >
                    <TableRowCol><h3 className="dark:text-white">SL</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Timestamp</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">User</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Action</h3></TableRowCol>
                    <TableRowCol className="flex-[1.5]"><h3 className="dark:text-white">Details</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">IP Address</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Status</h3></TableRowCol>
                </TableRow>
                
                {/* Row 1 */}
                <TableRow
                    className={"h-[60px] border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"}
                >
                    <TableRowCol>
                        <h3 className="text-sm dark:text-gray-300 cursor-pointer" onClick={() => copyToClipboard("1")}>1</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3 className="text-xs dark:text-gray-400">20 Feb 2026, 10:30 AM</h3>
                    </TableRowCol>
                    <TableRowCol >
                        <h3 className="text-sm truncate dark:text-gray-300">Admin_Jane</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-[10px] font-bold uppercase">Update_User</span>
                    </TableRowCol>
                    <TableRowCol className="flex-[1.5]">
                        <h3 className="text-sm truncate dark:text-gray-300">Updated status for employer ID: 67158...</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3 className="text-sm dark:text-gray-400">192.168.1.105</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <div className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-[10px] font-bold uppercase">Success</div>
                        </div>
                    </TableRowCol>
                </TableRow>
            </Table>
        </div>
    )
}
