import { Button } from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import { copyToClipboard } from "@/lib/copyClipboard.ts";
import { EyeOff, LockIcon } from "lucide-react";

export default function Subscriber() {
    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            {/* Header section */}
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
                                <DropdownMenuItem onClick={() => {}} className="cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800">Employee</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {}} className="cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800">Employer</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer dark:border-gray-800 dark:text-gray-300 dark:bg-card"}>Active</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200"}>Status</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => {}} className="cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800">Active</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {}} className="cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800">Expired</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Table */}
            <Table totalPages={10}>
                {/* Table Heading */}
                <TableRow className={"bg-[#C7E2FF] dark:bg-blue-900/30 h-[60px] border-b border-gray-200 dark:border-gray-800 font-semibold"}>
                    <TableRowCol><h3 className="dark:text-white">SL</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Image</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Full Name</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Email</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Contact</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Plan Name</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Price</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Start Date</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">End Date</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Status</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Action</h3></TableRowCol>
                </TableRow>

                {/* Table Body */}
                <TableRow className={"h-[60px] border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"}>
                    <TableRowCol><h3 className="text-sm dark:text-gray-300 cursor-pointer" onClick={() => copyToClipboard("1")}>1</h3></TableRowCol>
                    <TableRowCol>
                        <div className={"w-[30px] h-[30px] rounded-full overflow-hidden border border-gray-200 dark:border-gray-700"}>
                            <ImageWithSkeleton src={ImageStatic} />
                        </div>
                    </TableRowCol>
                    <TableRowCol><h3 className="text-sm truncate dark:text-gray-300 cursor-pointer" onClick={() => copyToClipboard("Sohidul Islam")}>Sohidul Islam</h3></TableRowCol>
                    <TableRowCol><h3 className="text-sm truncate dark:text-gray-300 cursor-pointer" onClick={() => copyToClipboard("user@example.com")}>user@example.com</h3></TableRowCol>
                    <TableRowCol><h3 className="text-sm dark:text-gray-400">0123456789</h3></TableRowCol>
                    <TableRowCol><h3 className="text-sm dark:text-gray-300">Basic Plan</h3></TableRowCol>
                    <TableRowCol><h3 className="text-sm font-bold text-green-600 dark:text-green-400">$239</h3></TableRowCol>
                    <TableRowCol><h3 className="text-sm dark:text-gray-400">01 Jan 2026</h3></TableRowCol>
                    <TableRowCol><h3 className="text-sm dark:text-gray-400">01 Jan 2027</h3></TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#E6F4EB] text-black font-normal text-xs h-8"}>Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-[70px] h-full flex justify-around items-center"}>
                            <LockIcon className={"cursor-pointer text-orange-500 dark:text-orange-400 hover:scale-110 transition-transform"} size={18} />
                            <EyeOff className={"cursor-pointer text-green-500 dark:text-green-400 hover:scale-110 transition-transform"} size={18} />
                        </div>
                    </TableRowCol>
                </TableRow>
            </Table>
        </div>
    );
}
