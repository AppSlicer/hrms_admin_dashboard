import { useState, useEffect } from 'react';
import { marketingService } from '@/services/marketing.service';
import { userService } from '@/services/user.service';
import { toast } from 'sonner';
import { Loader2, Send, Users, Mail, Search, CheckCircle2, Plus, Edit, Trash2, RotateCcw } from 'lucide-react';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function EmailMarketing() {
    const [view, setView] = useState<'list' | 'create'>('list');
    const [step, setTab] = useState<'compose' | 'recipients'>('compose');
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [queueStats, setQueueStats] = useState({ waiting: 0, active: 0, failed: 0, total: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Selection state
    const [users, setUsers] = useState<{ SUB_ADMIN: any[], EMPLOYER: any[], EMPLOYEE: any[] }>({ SUB_ADMIN: [], EMPLOYER: [], EMPLOYEE: [] });
    const [searchTerms, setSearchTerms] = useState({ SUB_ADMIN: "", EMPLOYER: "", EMPLOYEE: "" });
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    // Campaign form state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [campaignData, setCampaignData] = useState({
        name: '',
        subject: '',
        content: '',
        template: 'basic'
    });

    const fetchDashboardData = async () => {
        try {
            const [campaignData, stats] = await Promise.all([
                marketingService.getCampaigns(),
                marketingService.getQueueStats()
            ]);
            setCampaigns(campaignData);
            setQueueStats(stats);
        } catch (error: any) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const [subs, employers, emps] = await Promise.all([
                userService.getUsersByRole('SUB_ADMIN'),
                userService.getUsersByRole('EMPLOYER'),
                userService.getUsersByRole('EMPLOYEE')
            ]);
            setUsers({ SUB_ADMIN: subs, EMPLOYER: employers, EMPLOYEE: emps });
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        fetchUsers();
        const interval = setInterval(async () => {
            try {
                const stats = await marketingService.getQueueStats();
                setQueueStats(stats);
            } catch (e) { /* ignore */ }
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const toggleUserSelection = (id: string) => {
        setSelectedUserIds(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
    };

    const toggleRoleSelection = (role: string, roleUsers: any[]) => {
        const roleIds = roleUsers.map(u => u.id);
        const allSelected = roleIds.every(id => selectedUserIds.includes(id));
        if (allSelected) {
            setSelectedUserIds(prev => prev.filter(id => !roleIds.includes(id)));
            setSelectedRoles(prev => prev.filter(r => r !== role));
        } else {
            setSelectedUserIds(prev => [...new Set([...prev, ...roleIds])]);
            setSelectedRoles(prev => [...new Set([...prev, role])]);
        }
    };

    const handleCreateAndSend = async () => {
        if (!campaignData.name || !campaignData.subject || !campaignData.content) {
            toast.error("Please fill in all details");
            return;
        }
        if (selectedUserIds.length === 0 && selectedRoles.length === 0) {
            toast.error("Select at least one recipient");
            return;
        }

        setIsSaving(true);
        try {
            let result;
            if (editingId) {
                result = await marketingService.updateCampaign(editingId, {
                    ...campaignData,
                    targetRoles: selectedRoles,
                    targetUserIds: selectedUserIds,
                    status: 'draft' // Reset to draft if edited
                });
            } else {
                result = await marketingService.createCampaign({
                    ...campaignData,
                    targetRoles: selectedRoles,
                    targetUserIds: selectedUserIds
                });
            }
            
            const campaignId = editingId || (result.data ? result.data.id : result.id);
            if (!campaignId) throw new Error("Could not determine campaign ID");

            await marketingService.startCampaign(campaignId);
            toast.success("Campaign started successfully!");
            resetForm();
            setView('list');
            fetchDashboardData();
        } catch (error: any) {
            toast.error(error.message || "Failed to process campaign");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Permanently delete this campaign?")) return;
        try {
            await marketingService.deleteCampaign(id);
            toast.success("Campaign deleted");
            fetchDashboardData();
        } catch (error: any) {
            toast.error(error.message || "Delete failed");
        }
    };

    const handleEdit = (campaign: any) => {
        setEditingId(campaign.id);
        setCampaignData({
            name: campaign.name,
            subject: campaign.subject,
            content: campaign.content || "",
            template: campaign.template
        });
        setSelectedRoles(campaign.targetRoles || []);
        setSelectedUserIds(campaign.targetUserIds || []);
        setView('create');
        setTab('compose');
    };

    const handleResend = async (id: string) => {
        try {
            await marketingService.startCampaign(id);
            toast.success("Campaign re-queued for sending!");
            fetchDashboardData();
        } catch (error: any) {
            toast.error(error.message || "Resend failed");
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setCampaignData({ name: '', subject: '', content: '', template: 'basic' });
        setSelectedRoles([]);
        setSelectedUserIds([]);
        setTab('compose');
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "clean"],
        ],
    };

    if (isLoading && view === 'list') return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#125BAC] animate-spin mb-4" />
            <p className="text-blue-600 font-semibold">Loading dashboard...</p>
        </div>
    );

    return (
        <div className="p-6 max-w-full mx-auto h-full flex flex-col bg-gray-50/30 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Email Marketing</h1>
                    <p className="text-gray-500 font-medium">Manage and blast your campaigns.</p>
                </div>
                {view === 'list' ? (
                    <Button onClick={() => { resetForm(); setView('create'); }} className="bg-[#125BAC] hover:opacity-90 text-white rounded-2xl px-8 h-12 font-bold shadow-lg">
                        <Plus className="mr-2" size={20} /> New Campaign
                    </Button>
                ) : (
                    <Button variant="outline" onClick={() => setView('list')} className="rounded-2xl px-8 h-12 font-bold">
                        Back to Dashboard
                    </Button>
                )}
            </div>

            {view === 'list' ? (
                <div className="flex-1 overflow-hidden flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Total Campaigns</p>
                            <h3 className="text-3xl font-black text-[#125BAC]">{campaigns.length}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Queue</p>
                            <h3 className="text-3xl font-black text-orange-500">{queueStats.waiting}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Active</p>
                            <h3 className="text-3xl font-black text-green-600">{queueStats.active}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Failed</p>
                            <h3 className="text-3xl font-black text-red-500">{queueStats.failed}</h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
                        <div className="overflow-y-auto flex-1 custom-scrollbar">
                            <table className="w-full">
                                <thead className="bg-gray-50/50 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase">Campaign</th>
                                        <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase">Recipients</th>
                                        <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase">Status</th>
                                        <th className="px-8 py-4 text-center text-xs font-bold text-gray-400 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {campaigns.map((c) => (
                                        <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-gray-900">{c.name}</div>
                                                <div className="text-xs text-gray-400">{c.subject}</div>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-bold text-gray-600">{c.recipients}</td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                                    c.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="flex justify-center gap-3">
                                                    <button onClick={() => handleEdit(c)} className="text-blue-600 hover:text-blue-800 transition-colors p-1" title="Edit Campaign"><Edit size={18} /></button>
                                                    <button onClick={() => handleResend(c.id)} className="text-green-600 hover:text-green-800 transition-colors p-1" title="Resend Campaign"><RotateCcw size={18} /></button>
                                                    <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800 transition-colors p-1" title="Delete Campaign"><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col xl:flex-row gap-6 overflow-hidden bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-2">
                    <div className="w-full xl:w-[300px] bg-gray-50 rounded-[2rem] flex flex-col p-6 shrink-0">
                        <div className="flex xl:flex-col gap-2 overflow-x-auto pb-2 xl:pb-0">
                            <button onClick={() => setTab('compose')} className={`flex-1 xl:w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm ${step === 'compose' ? 'bg-[#125BAC] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}><Mail size={18} /> Compose</button>
                            <button onClick={() => setTab('recipients')} className={`flex-1 xl:w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm ${step === 'recipients' ? 'bg-[#125BAC] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}><Users size={18} /> Recipients</button>
                        </div>
                        <div className="mt-4 xl:mt-auto p-4 bg-blue-50 rounded-2xl border border-blue-100">
                            <p className="text-xs font-black uppercase text-[#125BAC] mb-2">Selection</p>
                            <p className="text-sm font-bold text-gray-700">{selectedUserIds.length} Users Selected</p>
                            <Button disabled={isSaving} onClick={handleCreateAndSend} className="w-full mt-4 bg-green-600 hover:opacity-90 text-white rounded-xl font-bold h-12 shadow-lg">
                                {isSaving ? <Loader2 className="animate-spin" /> : <><Send size={16} className="mr-2" /> {editingId ? "Update & Send" : "Blast Campaign"}</>}
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                        {step === 'compose' ? (
                            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="font-bold text-gray-700">Campaign Name</Label>
                                        <Input className="h-12 rounded-xl" value={campaignData.name} onChange={e => setCampaignData({...campaignData, name: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold text-gray-700">Template</Label>
                                        <select className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none" value={campaignData.template} onChange={e => setCampaignData({...campaignData, template: e.target.value})}>
                                            <option value="basic">Minimal</option>
                                            <option value="newsletter">Marketing</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Email Subject</Label>
                                    <Input className="h-12 rounded-xl" value={campaignData.subject} onChange={e => setCampaignData({...campaignData, subject: e.target.value})} />
                                </div>
                                <div className="space-y-2 flex-1 flex flex-col min-h-[400px]">
                                    <Label className="font-bold text-gray-700">Message Content</Label>
                                    <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white">
                                        <ReactQuill theme="snow" value={campaignData.content} onChange={val => setCampaignData({...campaignData, content: val})} modules={modules} className="flex-1 flex flex-col" />
                                    </div>
                                    <style>{`.ql-container.ql-snow { border: none !important; flex: 1; display: flex; flex-direction: column; } .ql-editor { flex: 1; min-height: 300px; } .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #e5e7eb !important; background: #f9fafb; }`}</style>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                {(['SUB_ADMIN', 'EMPLOYER', 'EMPLOYEE'] as const).map(role => (
                                    <div key={role} className="bg-gray-50/50 rounded-[2rem] border border-gray-100 p-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                            <h3 className="text-xl font-black text-gray-900">{role.replace('_', ' ')}s ({users[role].length})</h3>
                                            <div className="flex gap-2 w-full sm:w-auto">
                                                <div className="relative flex-1 sm:w-[200px]">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                    <Input className="h-9 pl-9 rounded-full text-xs" placeholder="Search..." value={searchTerms[role]} onChange={e => setSearchTerms({...searchTerms, [role]: e.target.value})} />
                                                </div>
                                                <Button variant={selectedRoles.includes(role) ? "default" : "outline"} onClick={() => toggleRoleSelection(role, users[role])} className="h-9 rounded-full text-xs font-bold">{selectedRoles.includes(role) ? 'All Selected' : 'Select All'}</Button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {users[role].filter(u => u.email.toLowerCase().includes(searchTerms[role].toLowerCase())).slice(0, 9).map(u => (
                                                <div key={u.id} onClick={() => toggleUserSelection(u.id)} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${selectedUserIds.includes(u.id) ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:border-blue-100'}`}>
                                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${selectedUserIds.includes(u.id) ? 'bg-[#125BAC] border-[#125BAC]' : 'border-gray-300'}`}>
                                                        {selectedUserIds.includes(u.id) && <CheckCircle2 size={12} className="text-white" />}
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-800 truncate">{u.email}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmailMarketing;