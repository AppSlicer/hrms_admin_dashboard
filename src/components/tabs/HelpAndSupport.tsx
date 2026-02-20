import { Button } from "@/components/ui/button.tsx";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
import { copyToClipboard } from "@/lib/copyClipboard.ts";
import { useEffect, useState } from "react";
import { supportService } from "@/services/support.service";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store";
import { USER_ROLE_ENUM } from "@/enum/role.enum";
import { Loader2, Plus, X, Reply, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Tooltip from "@/components/ui/Tooltip";
import { io } from "socket.io-client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export default function HelpAndSupport() {
    const { user } = useSelector((state: RootState) => state.auth);
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const [tickets, setTickets] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newTicket, setNewTicket] = useState({ subject: "", message: "" });
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [adminReply, setAdminReply] = useState("");
    const [isReplying, setIsReplying] = useState(false);

    const isAdmin = user?.role === USER_ROLE_ENUM.SUPER_ADMIN || user?.role === USER_ROLE_ENUM.SUB_ADMIN;

    // Filtered data based on global search
    const filteredTickets = tickets.filter(ticket => 
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ticket.user?.email && ticket.user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

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

        // WebSocket for Real-time Admin Toasts
        const socket = io("http://localhost:8080");
        
        socket.on("new-support-ticket", (data) => {
            const { ticket, targetSubAdminId } = data;
            
            // Logic: Super Admin sees all. Sub Admin sees only if targeted.
            const shouldNotify = 
                user?.role === USER_ROLE_ENUM.SUPER_ADMIN || 
                (user?.role === USER_ROLE_ENUM.SUB_ADMIN && user?.id === targetSubAdminId);

            if (shouldNotify) {
                toast.info(`New Support Request: ${ticket.subject}`, {
                    description: `From: ${ticket.user?.email || 'A user'}`,
                    action: {
                        label: "View",
                        onClick: () => {
                            setSelectedTicket(ticket);
                            fetchTickets();
                        }
                    }
                });
                fetchTickets(); // Refresh list
            }
        });

        return () => { socket.disconnect(); };
    }, [isAdmin, user?.id, user?.role]);

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

    const handleReply = async () => {
        if (!adminReply.trim()) return;
        setIsReplying(true);
        try {
            await supportService.replyToTicket(selectedTicket.id, adminReply);
            toast.success("Reply sent successfully");
            setAdminReply("");
            fetchTickets();
            // Update local modal state
            setSelectedTicket({
                ...selectedTicket,
                adminReply: adminReply,
                repliedAt: new Date(),
                status: 'RESOLVED'
            });
        } catch (error: any) {
            toast.error(error.message || "Failed to send reply");
        } finally {
            setIsReplying(false);
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
        <div className={"w-full h-full p-6 overflow-y-auto custom-scrollbar bg-transparent"}>
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Help & Support</h1>
                {!isAdmin && (
                    <Button 
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-[#125BAC] dark:bg-blue-600 text-white rounded-full"
                    >
                        {isAdding ? "Cancel" : <><Plus size={18} className="mr-2" /> New Ticket</>}
                    </Button>
                )}
            </div>

            {isAdding && (
                <div className="mb-8 p-6 border rounded-2xl bg-white dark:bg-card border-gray-100 dark:border-gray-800 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create Support Ticket</h2>
                    <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Subject</Label>
                            <Input 
                                required
                                value={newTicket.subject}
                                onChange={e => setNewTicket({...newTicket, subject: e.target.value})}
                                placeholder="What issue are you facing?"
                                className="dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Message</Label>
                            <textarea 
                                required
                                className="w-full min-h-[120px] p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={newTicket.message}
                                onChange={e => setNewTicket({...newTicket, message: e.target.value})}
                                placeholder="Describe your problem in detail..."
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-[#125BAC] dark:bg-blue-600 text-white rounded-full px-8">
                                Submit Ticket
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <Table totalPages={1}>
                <TableRow className={"bg-[#C7E2FF] dark:bg-blue-900/30 h-[60px] border-0 font-semibold"}>
                    <TableRowCol className="flex-[0.5]"><h3 className="dark:text-white">SL</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">User</h3></TableRowCol>
                    <TableRowCol className="flex-[1.5]"><h3 className="dark:text-white">Subject</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Status</h3></TableRowCol>
                    <TableRowCol className="flex-[0.8]"><h3 className="dark:text-white">Date</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Action</h3></TableRowCol>
                </TableRow>

                {isLoading ? (
                    <TableRow className="h-[100px] border rounded-none">
                        <TableRowCol className="col-span-full text-center">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
                        </TableRowCol>
                    </TableRow>
                ) : filteredTickets.length === 0 ? (
                    <TableRow className="h-[100px] border rounded-none">
                        <TableRowCol className="col-span-full text-center text-gray-500 dark:text-gray-400">No tickets found.</TableRowCol>
                    </TableRow>
                ) : (
                    filteredTickets.map((ticket, index) => (
                        <TableRow key={ticket.id} className={"h-[60px] border rounded-none hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"}>
                            <TableRowCol className="flex-[0.5]"><h3>{index + 1}</h3></TableRowCol>
                            <TableRowCol>
                                <Tooltip content={ticket.user?.email || user?.email || ""}>
                                    <h3 className="text-sm font-medium truncate px-2 dark:text-gray-300">
                                        {ticket.user?.email || user?.email}
                                    </h3>
                                </Tooltip>
                            </TableRowCol>
                            <TableRowCol className="flex-[1.5]">
                                <Tooltip content={ticket.subject}>
                                    <h3 className="text-sm truncate cursor-pointer px-2 dark:text-gray-300" onClick={() => copyToClipboard(ticket.subject)}>
                                        {ticket.subject}
                                    </h3>
                                </Tooltip>
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
                                            <DropdownMenuContent align="center" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-1 z-[110]">
                                                {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
                                                    <DropdownMenuItem 
                                                        key={status}
                                                        onClick={() => handleStatusUpdate(ticket.id, status)}
                                                        className="px-4 py-2 text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/50 dark:text-gray-300 cursor-pointer rounded-lg transition-colors"
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
                            <TableRowCol className="flex-[0.8]">
                                <h3 className="text-xs dark:text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</h3>
                            </TableRowCol>
                            <TableRowCol>
                                <div className={"w-full h-full flex justify-center items-center"}>
                                    <Button 
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedTicket(ticket)}
                                        className="h-8 text-xs rounded-full border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
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
                    <div className="bg-white dark:bg-card rounded-[2.5rem] max-w-2xl w-full p-8 shadow-2xl relative border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#125BAC]/5 rounded-bl-[5rem] -z-0" />
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block ${
                                        selectedTicket.status === 'RESOLVED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                                        selectedTicket.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                    }`}>
                                        {selectedTicket.status}
                                    </span>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedTicket.subject}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        From <span className="font-semibold text-[#125BAC] dark:text-blue-400">{selectedTicket.user?.email || user?.email}</span>
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setSelectedTicket(null)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                <div className="space-y-6">
                                    {/* User Message */}
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">User Message</p>
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                            {selectedTicket.message}
                                        </p>
                                        <p className="text-[10px] text-gray-400 mt-4">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                                    </div>

                                    {/* Admin Reply History */}
                                    {selectedTicket.adminReply && (
                                        <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800">
                                            <p className="text-xs font-bold text-[#125BAC] dark:text-blue-400 uppercase mb-2">Admin Reply</p>
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                                {selectedTicket.adminReply}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-4">
                                                Replied on {new Date(selectedTicket.repliedAt).toLocaleString()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Reply Input Section (Admins Only) */}
                            {isAdmin && (
                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex flex-col gap-3">
                                        <Label className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <Reply size={16} /> Send a Reply
                                        </Label>
                                        <div className="relative">
                                            <textarea 
                                                value={adminReply}
                                                onChange={(e) => setAdminReply(e.target.value)}
                                                placeholder="Type your response here..."
                                                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#125BAC]/20 focus:border-[#125BAC] outline-none min-h-[100px] transition-all"
                                            />
                                            <Button 
                                                disabled={isReplying || !adminReply.trim()}
                                                onClick={handleReply}
                                                className="absolute bottom-3 right-3 bg-[#125BAC] dark:bg-blue-600 text-white rounded-xl px-4 h-10 shadow-lg shadow-blue-100 dark:shadow-none transition-all active:scale-95"
                                            >
                                                {isReplying ? <Loader2 className="animate-spin" size={18} /> : <><Send size={16} className="mr-2" /> Send</>}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex justify-between items-center">
                                {isAdmin && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="rounded-full px-6 border-gray-200 dark:border-gray-800 dark:text-gray-300">
                                                Change Status
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-1 z-[110]">
                                            {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
                                                <DropdownMenuItem 
                                                    key={status}
                                                    onClick={() => handleStatusUpdate(selectedTicket.id, status)}
                                                    className="px-4 py-2 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/50 dark:text-gray-300 cursor-pointer rounded-lg"
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
                                    className="rounded-full px-8 ml-auto border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
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
