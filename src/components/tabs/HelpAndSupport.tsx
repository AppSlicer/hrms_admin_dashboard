import { Button } from "@/components/ui/button.tsx";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
// import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import { copyToClipboard } from "@/lib/copyClipboard.ts";
import { useEffect, useState } from "react";
import { supportService } from "@/services/support.service";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store";
import { USER_ROLE_ENUM } from "@/enum/role.enum";
import { Loader2, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export default function HelpAndSupport() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [tickets, setTickets] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newTicket, setNewTicket] = useState({ subject: "", message: "" });
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    const isAdmin = user?.role === USER_ROLE_ENUM.SUPER_ADMIN || user?.role === USER_ROLE_ENUM.SUB_ADMIN;

    const fetchTickets = async () => {
        setIsLoading(true);
        try {
            const data = isAdmin 
                ? await supportService.getAllTickets() 
                : await supportService.getMyTickets();
            setTickets(data);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch tickets");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [isAdmin]);

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await supportService.createTicket(newTicket);
            toast.success("Support ticket created successfully");
            setNewTicket({ subject: "", message: "" });
            setIsAdding(false);
            fetchTickets();
        } catch (error: any) {
            toast.error(error.message || "Failed to create ticket");
        }
    };

    const handleStatusUpdate = async (id: string, nextStatus: string) => {
        if (!isAdmin) return;

        try {
            await supportService.updateTicketStatus(id, nextStatus);
            toast.success(`Status updated to ${nextStatus}`);
            fetchTickets();
            if (selectedTicket?.id === id) {
                setSelectedTicket({ ...selectedTicket, status: nextStatus });
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'RESOLVED': return 'border-[#008F37] bg-[#E6F4EB] text-black';
            case 'IN_PROGRESS': return 'border-orange-400 bg-orange-100 text-black';
            case 'CLOSED': return 'border-gray-400 bg-gray-100 text-black';
            default: return 'border-blue-400 bg-blue-50 text-black';
        }
    };

    return (
        <div className={"w-full h-full p-6 overflow-y-auto custom-scrollbar"}>
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold"}>Help & Support</h1>
                {!isAdmin && (
                    <Button 
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-[#125BAC] text-white rounded-full"
                    >
                        {isAdding ? "Cancel" : <><Plus size={18} className="mr-2" /> New Ticket</>}
                    </Button>
                )}
            </div>

            {isAdding && (
                <div className="mb-8 p-6 border rounded-2xl bg-white shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-xl font-bold mb-4">Create Support Ticket</h2>
                    <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Subject</Label>
                            <Input 
                                required
                                value={newTicket.subject}
                                onChange={e => setNewTicket({...newTicket, subject: e.target.value})}
                                placeholder="What issue are you facing?"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Message</Label>
                            <textarea 
                                required
                                className="w-full min-h-[120px] p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={newTicket.message}
                                onChange={e => setNewTicket({...newTicket, message: e.target.value})}
                                placeholder="Describe your problem in detail..."
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-[#125BAC] text-white rounded-full px-8">
                                Submit Ticket
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <Table totalPages={1}>
                <TableRow className={"bg-[#C7E2FF] h-[60px] border-0 font-semibold"}>
                    <TableRowCol><h3>SL</h3></TableRowCol>
                    <TableRowCol><h3>User</h3></TableRowCol>
                    <TableRowCol><h3>Subject</h3></TableRowCol>
                    <TableRowCol><h3>Status</h3></TableRowCol>
                    <TableRowCol><h3>Date</h3></TableRowCol>
                    <TableRowCol><h3>Action</h3></TableRowCol>
                </TableRow>

                {isLoading ? (
                    <TableRow className="h-[100px] border rounded-none">
                        <TableRowCol className="col-span-full text-center">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
                        </TableRowCol>
                    </TableRow>
                ) : tickets.length === 0 ? (
                    <TableRow className="h-[100px] border rounded-none">
                        <TableRowCol className="col-span-full text-center text-gray-500">No tickets found.</TableRowCol>
                    </TableRow>
                ) : (
                    tickets.map((ticket, index) => (
                        <TableRow key={ticket.id} className={"h-[60px] border rounded-none hover:bg-gray-50 transition-colors"}>
                            <TableRowCol><h3>{index + 1}</h3></TableRowCol>
                            <TableRowCol>
                                <h3 className="text-sm font-medium truncate" title={ticket.user?.email || user?.email}>
                                    {ticket.user?.email || user?.email}
                                </h3>
                            </TableRowCol>
                            <TableRowCol>
                                <h3 className="text-sm truncate cursor-pointer" onClick={() => copyToClipboard(ticket.subject)} title={ticket.message}>
                                    {ticket.subject}
                                </h3>
                            </TableRowCol>
                            <TableRowCol>
                                <div className={"w-full h-full flex justify-center items-center"}>
                                    {isAdmin ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button 
                                                    className={`border font-normal text-xs h-8 cursor-pointer hover:opacity-80 transition-opacity ${getStatusStyle(ticket.status)}`}
                                                >
                                                    {ticket.status}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="center" className="bg-white border rounded-xl shadow-lg p-1 z-[110]">
                                                {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
                                                    <DropdownMenuItem 
                                                        key={status}
                                                        onClick={() => handleStatusUpdate(ticket.id, status)}
                                                        className="px-4 py-2 text-xs font-semibold hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                                                    >
                                                        {status}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <div className={`border font-normal text-xs h-8 px-3 flex items-center rounded-md ${getStatusStyle(ticket.status)}`}>
                                            {ticket.status}
                                        </div>
                                    )}
                                </div>
                            </TableRowCol>
                            <TableRowCol>
                                <h3 className="text-xs">{new Date(ticket.createdAt).toLocaleDateString()}</h3>
                            </TableRowCol>
                            <TableRowCol>
                                <div className={"w-full h-full flex justify-center items-center"}>
                                    <Button 
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedTicket(ticket)}
                                        className="h-8 text-xs rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </TableRowCol>
                        </TableRow>
                    ))
                )}
            </Table>

            {/* Ticket Details Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] max-w-2xl w-full p-8 shadow-2xl relative border border-gray-100 overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#125BAC]/5 rounded-bl-[5rem] -z-0" />
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block ${
                                        selectedTicket.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 
                                        selectedTicket.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                        {selectedTicket.status}
                                    </span>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedTicket.subject}</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Submitted by <span className="font-semibold text-[#125BAC]">{selectedTicket.user?.email || user?.email}</span> on {new Date(selectedTicket.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setSelectedTicket(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="bg-gray-50/50 rounded-2xl p-6 mb-8 border border-gray-100 min-h-[150px]">
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {selectedTicket.message}
                                </p>
                            </div>

                            <div className="flex justify-between items-center gap-4">
                                {isAdmin && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="bg-[#125BAC] text-white rounded-full px-6 cursor-pointer">
                                                Update Status
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="bg-white border rounded-xl shadow-lg p-1 z-[110]">
                                            {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
                                                <DropdownMenuItem 
                                                    key={status}
                                                    onClick={() => handleStatusUpdate(selectedTicket.id, status)}
                                                    className="px-4 py-2 text-sm font-semibold hover:bg-blue-50 cursor-pointer rounded-lg"
                                                >
                                                    {status}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                                <Button 
                                    onClick={() => setSelectedTicket(null)}
                                    variant="outline" 
                                    className="rounded-full px-8 ml-auto border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
