import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {EyeOff, LockIcon} from "lucide-react";

export default function Subscriber() {

    return (
        <div className={"w-full h-full p-6"}>
            {/* Header section */}
            <div className={"flex justify-between items-center"}>
                <h1 className={"text-3xl font-semibold"}>Subscriber</h1>
                <div className={"gap-2 flex z-20"}>
                    {/* <Button className={"bg-[#125BAC] text-white rounded-full cursor-pointer"}>Add Sub Admin</Button> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer"}>Employer</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border rounded-xl bg-white p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b pb-2"}>Role</DropdownMenuLabel>
                            <DropdownMenuGroup className={""}>
                                <DropdownMenuItem className={"p-2 bg-green-100 rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold"}>Employee</DropdownMenuItem>
                                <DropdownMenuItem className={"p-2 bg-red-100 rounded-full text-center cursor-pointer hover:shadow-sm font-semibold"}>Employer</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer"}>Active</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border rounded-xl bg-white p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b pb-2"}>Status</DropdownMenuLabel>
                            <DropdownMenuGroup className={""}>
                                <DropdownMenuItem className={"p-2 bg-green-100 rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold"}>Active</DropdownMenuItem>
                                <DropdownMenuItem className={"p-2 bg-red-100 rounded-full text-center cursor-pointer hover:shadow-sm font-semibold"}>Expired</DropdownMenuItem>
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
                        <h3>Full Name</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Email</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Contact Number</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Plan Name</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Price</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Start Date</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>End Date</h3>
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
                            anontom90@gmail.com
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("anontom90@gmail.com")}
                        >
                            016000232423423
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("01383938337")}
                        >
                            Basic Plan
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("2113")}
                        >
                            $239
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            01 jan 2026
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            02 feb 2048
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#E6F4EB] text-black font-normal"}>Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-[70px] h-full flex justify-around items-center"}>
                            <LockIcon className={"cursor-pointer text-red-500"} />
                            <EyeOff className={"cursor-pointer text-green-500"} />
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
                            anontom90@gmail.com
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("anontom90@gmail.com")}
                        >
                            016000232423423
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("01383938337")}
                        >
                            Free Plan
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("2113")}
                        >
                            $239
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            01 jan 2026
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            02 feb 2048
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#E6F4EB] text-black font-normal"}>Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-[70px] h-full flex justify-around items-center"}>
                            <LockIcon className={"cursor-pointer text-red-500"} />
                            <EyeOff className={"cursor-pointer text-green-500"} />
                        </div>
                    </TableRowCol>
                </TableRow>
            </Table>
        </div>
    );
}
