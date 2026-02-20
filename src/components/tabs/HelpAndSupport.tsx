import { Button } from "@/components/ui/button.tsx";
import { copyToClipboard } from "@/lib/copyClipboard.ts";
import { useEffect, useState } from "react";
import { supportService } from "@/services/support.service";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store";
import { USER_ROLE_ENUM } from "@/enum/role.enum";
import { Loader2, Plus, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Tooltip from "@/components/ui/Tooltip";
import { io } from "socket.io-client";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";

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

    const filteredTickets = tickets.filter(ticket => 
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ticket.user?.email && ticket.user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const columns: Column<any>[] = [
        { header: "SL", flex: 0.5, render: (_, index) => <span className="text-sm font-bold">{index + 1}</span> },
        { 
            header: "User", 
            render: (item) => (
                <Tooltip content={item.user?.email || user?.email || ""}>
                    <span className="text-sm font-medium truncate px-2 dark:text-gray-300 block">
                        {item.user?.email || user?.email}
                    </span>
                </Tooltip>
            )
        },
        { 
            header: "Subject", 
            flex: 1.5, 
            render: (item) => (
                <Tooltip content={item.subject}>
                    <span className="text-sm truncate cursor-pointer px-2 dark:text-gray-300 block" onClick={() => copyToClipboard(item.subject)}>
                        {item.subject}
                    </span>
                </Tooltip>
            )
        },
        { 
            header: "Status", 
            render: (item) => (
                <div className="w-full flex justify-center">
                    {isAdmin ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className={`border font-normal text-[10px] h-7 px-3 rounded-md ${getStatusStyle(item.status)}`}>
                                    {item.status}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-1 z-[110]">
                                {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
                                    <DropdownMenuItem 
                                        key={status}
                                        onClick={() => handleStatusUpdate(item.id, status)}
                                        className="px-4 py-2 text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/50 dark:text-gray-300 cursor-pointer rounded-lg transition-colors"
                                    >
                                        {status}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className={`border font-normal text-[10px] h-7 px-3 flex items-center rounded-md ${getStatusStyle(item.status)}`}>
                            {item.status}
                        </div>
                    )}
                </div>
            )
        },
        { header: "Date", flex: 0.8, render: (item) => <span className="text-xs dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span> },
        { 
            header: "Action", 
            render: (item) => (
                <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTicket(item)}
                    className="h-7 text-[10px] font-bold rounded-full border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                    View Details
                </Button>
            )
        }
    ];

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
        const socket = io("http://localhost:8080");
        socket.on("new-support-ticket", (data) => {
            const { ticket, targetSubAdminId } = data;
            const shouldNotify = user?.role === USER_ROLE_ENUM.SUPER_ADMIN || (user?.role === USER_ROLE_ENUM.SUB_ADMIN && user?.id === targetSubAdminId);
            if (shouldNotify) {
                toast.info(`New Ticket: ${ticket.subject}`);
                fetchTickets();
            }
        });
        return () => { socket.disconnect(); };
    }, [isAdmin, user?.id, user?.role]);

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await supportService.createTicket(newTicket);
            toast.success("Ticket created");
            setIsAdding(false);
            setNewTicket({ subject: "", message: "" });
            fetchTickets();
        } catch (error: any) {
            toast.error("Failed to create ticket");
        }
    };

    const handleStatusUpdate = async (id: string, nextStatus: string) => {
        try {
            await supportService.updateTicketStatus(id, nextStatus);
            toast.success(`Status: ${nextStatus}`);
            fetchTickets();
        } catch (error: any) {
            toast.error("Failed to update");
        }
    };

    const handleReply = async () => {
        if (!adminReply.trim()) return;
        setIsReplying(true);
        try {
            await supportService.replyToTicket(selectedTicket.id, adminReply);
            toast.success("Reply sent");
            setAdminReply("");
            fetchTickets();
            setSelectedTicket(null);
        } catch (error: any) {
            toast.error("Failed to reply");
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
                            <Input required value={newTicket.subject} onChange={e => setNewTicket({...newTicket, subject: e.target.value})} placeholder="What issue?" className="dark:bg-gray-900 dark:border-gray-800 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Message</Label>
                            <textarea required className="w-full min-h-[120px] p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" value={newTicket.message} onChange={e => setNewTicket({...newTicket, message: e.target.value})} placeholder="Detail..." />
                        </div>
                        <div className="flex justify-end"><Button type="submit" className="bg-[#125BAC] dark:bg-blue-600 text-white rounded-full px-8">Submit Ticket</Button></div>
                    </form>
                </div>
            )}

            <ReusableTable columns={columns} data={filteredTickets} isLoading={isLoading} />

            {/* Modal Logic Remains the Same... */}
            {selectedTicket && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-card rounded-[2.5rem] max-w-2xl w-full p-8 shadow-2xl relative border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block ${selectedTicket.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{selectedTicket.status}</span>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedTicket.subject}</h2>
                                </div>
                                <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full cursor-pointer"><X className="w-6 h-6 text-gray-400" /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 mb-6">
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedTicket.message}</p>
                                </div>
                                {selectedTicket.adminReply && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800">
                                        <p className="text-xs font-bold text-[#125BAC] uppercase mb-2">Admin Reply</p>
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedTicket.adminReply}</p>
                                    </div>
                                )}
                            </div>
                            {isAdmin && (
                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <Label className="font-bold mb-2 block dark:text-gray-300">Reply</Label>
                                    <div className="relative">
                                        <textarea value={adminReply} onChange={e => setAdminReply(e.target.value)} className="w-full p-4 rounded-2xl border dark:border-gray-800 dark:bg-gray-900 dark:text-white outline-none min-h-[100px]" placeholder="Type response..." />
                                        <Button disabled={isReplying} onClick={handleReply} className="absolute bottom-3 right-3 bg-[#125BAC] dark:bg-blue-600 text-white rounded-xl h-10 px-4">{isReplying ? <Loader2 className="animate-spin" /> : <Send size={16} />}</Button>
                                    </div>
                                </div>
                            )}
                            <div className="mt-6 flex justify-end"><Button onClick={() => setSelectedTicket(null)} variant="outline" className="rounded-full px-8 dark:border-gray-800 dark:text-gray-400">Close</Button></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
