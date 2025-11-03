import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import {useState} from "react";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {EyeOff, LockIcon, Trash2} from "lucide-react";

export default function EmployeeManagement() {

    const [status, setStatus] = useState<string>();

    console.log("Console from the status -:- ",status);

    return (
        <div className={"w-full h-full p-6"}>
            {/* Header section */}
            <div className={"flex justify-between items-center"}>
                <h1 className={"text-3xl font-semibold"}>User Management</h1>
                <div className={"gap-2 flex z-20 bg-white"}>
                    <Button className={"bg-[#125BAC] text-white rounded-full cursor-pointer"}>Add Employer</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer"}>All User</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border rounded-xl bg-white p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b pb-2"}>Type of user</DropdownMenuLabel>
                            <DropdownMenuGroup className={""}>
                                <DropdownMenuItem onClick={() => setStatus("active")} className={"p-2 bg-green-100 rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold"}>Employee</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatus("in-active")} className={"p-2 bg-red-100 rounded-full text-center cursor-pointer hover:shadow-sm font-semibold"}>Employer</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* Table */}
            <Table totalPages={10} className={""}>
                {/* Table Heading*/}
                <TableRow
                    className={"bg-[#C7E2FF] h-[60px] border-0 font-semibold"}
                >
                    <TableRowCol>
                        <h3>SL</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Full Name</h3>
                    </TableRowCol>
                    <TableRowCol >
                        <h3>Role</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Designation</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Email</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Contact Number</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Company Name</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Status</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Action</h3>
                    </TableRowCol>
                </TableRow>
                {/* Table body or content */}
                <TableRow
                    className={"h-[60px] border rounded-none"}
                >
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("1")}
                        >
                            1
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("MD Sohidul Islam Ananto")}
                        >
                            MD Sohidul Islam Ananto
                        </h3>
                    </TableRowCol>
                    <TableRowCol >
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("MD Sohidul Islam Ananto")}
                        >
                            Employee
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("234234k234239ksdasdfasdfsadh")}
                        >
                            Manager
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("anontom90@gmail.com")}
                        >
                            anontom90@gmail.com
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("01383938337")}
                        >
                            018009393842
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("2113")}
                        >
                            HRMS Support
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#E6F4EB] text-black font-normal"}>Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-[80%] h-full flex justify-around items-center"}>
                            <LockIcon className={"cursor-pointer text-gray-500"} />
                            <EyeOff className={"cursor-pointer text-green-500"} />
                            <Trash2 className={"cursor-pointer text-red-500"} />
                        </div>
                    </TableRowCol>
                </TableRow>
                <TableRow
                    className={"h-[60px] border rounded-none"}
                >
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("1")}
                        >
                            2
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("MD Sohidul Islam Ananto")}
                        >
                            Juyal Kori
                        </h3>
                    </TableRowCol>
                    <TableRowCol >
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("MD Sohidul Islam Ananto")}
                        >
                            Employer
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("234234k234239ksdasdfasdfsadh")}
                        >
                            HR
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("anontom90@gmail.com")}
                        >
                            lsksf@gmail.com
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("01383938337")}
                        >
                            036273986
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("2113")}
                        >
                            Software Engineer
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#FF5900] bg-[#FEEEEE] text-black font-normal"}>In-Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-[80%] h-full flex justify-around items-center"}>
                            <LockIcon className={"cursor-pointer text-gray-500"} />
                            <EyeOff className={"cursor-pointer text-green-500"} />
                            <Trash2 className={"cursor-pointer text-red-500"} />
                        </div>
                    </TableRowCol>
                </TableRow>
            </Table>
        </div>
    )
}