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
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import {copyToClipboard} from "@/lib/copyClipboard.ts";

export default function AuditLog() {

    const [status, setStatus] = useState<string>("");

    console.log("Console from the status -:- ",status);

    return (
        <div className={"w-full h-full p-6"}>
            {/* Header section */}
            <div className={"flex justify-between items-center"}>
                <h1 className={"text-3xl font-semibold"}>HRMC Audit Report</h1>
                <div className={"gap-2 flex z-20"}>
                    {/*<Button className={"bg-[#125BAC] text-white rounded-full cursor-pointer"}>Add Sub Admin</Button>*/}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer"}>Filter by Role</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border rounded-xl bg-white p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b pb-2"}>User Role</DropdownMenuLabel>
                            <DropdownMenuGroup className={""}>
                                <DropdownMenuItem onClick={() => setStatus("active")} className={"p-2 border rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold"}>Employee</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatus("in-active")} className={"p-2 border rounded-full text-center cursor-pointer hover:shadow-sm font-semibold"}>Employer</DropdownMenuItem>
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
                        <h3>Image</h3>
                    </TableRowCol>
                    <TableRowCol >
                        <h3>Name</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>ID</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Email</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Contact Number</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Address</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Subscription</h3>
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
                        <div className={"w-[30px] h-[30px] rounded-full overflow-hidden"}>
                            <ImageWithSkeleton src={ImageStatic} />
                        </div>
                    </TableRowCol>
                    <TableRowCol >
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("MD Sohidul Islam Ananto")}
                        >
                            MD Sohidul Islam Ananto
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("234234k234239ksdasdfasdfsadh")}
                        >
                            234234k234239ksdasdfasdfsadh
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
                            onClick={() => copyToClipboard("dhaka")}
                        >
                            Dhaka
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            stander
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#E6F4EB] text-black font-normal"}>Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-around items-center"}>
                            <Button className={"text-white bg-green-600 cursor-pointer"}>View</Button>
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
                        <div className={"w-[30px] h-[30px] rounded-full overflow-hidden"}>
                            <ImageWithSkeleton src={ImageStatic} />
                        </div>
                    </TableRowCol>
                    <TableRowCol >
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("MD Sohidul Islam Ananto")}
                        >
                            Sajiduj jaman
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("234234k234239ksdasdfasdfsadh")}
                        >
                            234kasdhfkjahsdkf
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("anontom90@gmail.com")}
                        >
                            asdfasdf@gmail.com
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("01383938337")}
                        >
                            0998287267
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("Uganda")}
                        >
                            Uganda
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            premium
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#FF5900] bg-[#FEEEEE] text-black font-normal"}>In-Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-around items-center"}>
                            <Button className={"text-white bg-green-600 cursor-pointer"}>View</Button>
                        </div>
                    </TableRowCol>
                </TableRow>
            </Table>
        </div>
    )
}