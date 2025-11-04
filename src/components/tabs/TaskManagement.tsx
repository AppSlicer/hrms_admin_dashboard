import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {ChevronDownIcon, EyeOff, LockIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";

export default function TaskManagement() {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    return (
        <div className={"w-full h-full p-6"}>
            {/* Header section */}
            <div className={"flex w-full justify-between items-center"}>
                <h1 className={"text-3xl font-semibold"}>Task & Rota Management</h1>
                <div className="flex flex-col gap-3">
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
                        <h3>Employee ID</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Designation</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Total Task</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Complete Task</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Cancel Task</h3>
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
                            Sumit sah
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("12312")}
                        >
                            12312
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("anontom90@gmail.com")}
                        >
                            HR
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("234")}
                        >
                            93
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("23")}
                        >
                            23
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            43
                        </h3>
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
    )
}