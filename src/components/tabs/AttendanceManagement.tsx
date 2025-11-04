import {Button} from "@/components/ui/button.tsx";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import ImageStatic from "/auth/google.png";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {ChevronDownIcon} from "lucide-react";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";

export default function AttendanceManagement() {

    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>( new Date( Date.now() ) );

    return (
        <div className={"w-full h-full p-6"}>
            {/* Header section */}
            <div className={"flex justify-between items-center"}>
                <h1 className={"text-3xl font-semibold"}>Attendance Management</h1>
                <div className={"grid gap-4"}>
                    <div className={"gap-2 flex z-20 items-center"}>
                        <Button className={"bg-[#125BAC] text-white rounded-full cursor-pointer"}>Request (200)</Button>
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
                    </div>
                    <div className={"w-full h-full gap-4 flex"}>
                        <Button className={"border bg-[#FEF3E6] px-4 h-[40px] text-black font-semibold text-xl"}>Total Employee <strong className={"text-[#F48201]"}>150</strong></Button>
                        <Button className={"border bg-[#FEF3E6] px-4 h-[40px] text-black font-semibold text-xl"}>Total Employee <strong className={"text-[#F48201]"}>150</strong></Button>
                        <Button className={"border bg-[#FEF3E6] px-4 h-[40px] text-black font-semibold text-xl"}>Total Employee <strong className={"text-[#F48201]"}>150</strong></Button>
                    </div>
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
                        <h3>ID Number</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Designation</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Presents</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Absence</h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3>Leave</h3>
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
                            Manager
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("01383938337")}
                        >
                            05
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("2113")}
                        >
                            15
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            06
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#E6F4EB] text-black font-normal"}>Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#008F37] text-black font-normal"}>View</Button>
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
                            234234k234239ksdasdfasdfsadh
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
                            05
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("2113")}
                        >
                            15
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            06
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#E6F4EB] text-black font-normal"}>Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#008F37] text-black font-normal"}>View</Button>
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
                            234234k234239ksdasdfasdfsadh
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
                            05
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("2113")}
                        >
                            15
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            06
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#E6F4EB] text-black font-normal"}>Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#008F37] text-black font-normal"}>View</Button>
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
                            234234k234239ksdasdfasdfsadh
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
                            05
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("2113")}
                        >
                            15
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <h3
                            className="text-sm max-w-[80px] truncate whitespace-nowrap overflow-hidden cursor-pointer"
                            title={"Click to copy on clipboard"}
                            onClick={() => copyToClipboard("stander")}
                        >
                            06
                        </h3>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#E6F4EB] text-black font-normal"}>Active</Button>
                        </div>
                    </TableRowCol>
                    <TableRowCol>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Button className={"border border-[#008F37] bg-[#008F37] text-black font-normal"}>View</Button>
                        </div>
                    </TableRowCol>
                </TableRow>
            </Table>
        </div>
    )
}