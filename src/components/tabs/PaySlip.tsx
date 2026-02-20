import {Button} from "@/components/ui/button.tsx";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {ChevronDownIcon, Edit, EyeOff, LockIcon} from "lucide-react";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";

export default function PaySlip() {

    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>( new Date( Date.now() ) );

    return (
        <div className={"w-full h-full p-6"}>
            {/* Header section */}
            <div className={"flex justify-between items-center"}>
                <h1 className={"text-3xl font-semibold"}>Pay Slip</h1>
                    <div className={"gap-2 flex z-20 items-center"}>
                        <Button className={"bg-green-700 text-white rounded-full cursor-pointer"}>Download</Button>
                        <Button className={"bg-[#125BAC] text-white rounded-full cursor-pointer"}>Upload Pay Slip</Button>
                        <div className="flex flex-col gap-3 w-full h-full">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-48 justify-between font-normal"
                                    >
                                        {date ? date.toLocaleDateString() : "Select date"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setDate(date!)
                                            setOpen(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={"cursor-pointer"}>All User</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 border bg-white rounded-xl p-4 mr-8 mt-4" align="start">
                                <DropdownMenuLabel className={"font-semibold border-b pb-2"}>Users type</DropdownMenuLabel>
                                <DropdownMenuGroup className={""}>
                                    <DropdownMenuItem className={"p-2 border rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold"}>Employer</DropdownMenuItem>
                                    <DropdownMenuItem className={"p-2 border rounded-full text-center cursor-pointer hover:shadow-sm font-semibold"}>Employee</DropdownMenuItem>
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
                        <h3>Id</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Designation</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Email</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Phone Number</h3>
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
                            Johan Smith
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("a23rqawedf")}
                        >
                            asdf23423
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("anontom90@gmail.com")}
                        >
                            Manager
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("01383938337")}
                        >
                            user@mail.com
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("2113")}
                        >
                            234231324123123
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-[70%] h-full flex justify-around items-center"}>
                            <LockIcon className={"cursor-pointer text-red-500"} />
                            <EyeOff className={"cursor-pointer text-green-500"} />
                            <Edit className={"cursor-pointer text-gray-500"} />
                        </div>
                    </TableRowCol>
                </TableRow>
            </Table>
        </div>
    )
}