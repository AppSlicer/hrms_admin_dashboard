import { useState, useEffect } from 'react';
import { marketingService } from '@/services/marketing.service';
import { userService } from '@/services/user.service';
import { toast } from 'sonner';
import { Loader2, Send, Users, Mail, Search, CheckCircle2, ChevronRight } from 'lucide-react';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function EmailMarketing() {
    const [view, setView] = useState<'list' | 'create'>('list');
    const [step, setTab] = useState<'compose' | 'recipients'>('compose');
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // User Selection State
    const [users, setUsers] = useState<{
        SUB_ADMIN: any[],
        EMPLOYER: any[],
        EMPLOYEE: any[]
    }>({ SUB_ADMIN: [], EMPLOYER: [], EMPLOYEE: [] });
    
    const [searchTerms, setSearchTerms] = useState({
        SUB_ADMIN: "",
        EMPLOYER: "",
        EMPLOYEE: ""
    });

    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    // New Campaign State
    const [campaignData, setCampaignData] = useState({
        name: '',
        subject: '',
        content: '',
        template: 'basic'
    });

    const fetchCampaigns = async () => {
        setIsLoading(true);
        try {
            const data = await marketingService.getCampaigns();
            setCampaigns(data);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch campaigns");
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
            console.error("Failed to fetch users for targeting", error);
        }
    };

    useEffect(() => {
        fetchCampaigns();
        fetchUsers();
    }, []);

    const toggleUserSelection = (id: string) => {
        setSelectedUserIds(prev => 
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
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
            toast.error("Please fill in all campaign details");
            return;
        }
        if (selectedUserIds.length === 0 && selectedRoles.length === 0) {
            toast.error("Please select at least one recipient");
            return;
        }

        try {
            const result = await marketingService.createCampaign({
                ...campaignData,
                targetRoles: selectedRoles,
                targetUserIds: selectedUserIds
            });
            
            await marketingService.startCampaign(result.id);
            toast.success("Campaign started! Emails are being queued.");
            setView('list');
            fetchCampaigns();
        } catch (error: any) {
            toast.error(error.message || "Failed to start campaign");
        }
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    if (isLoading && view === 'list') return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#125BAC] animate-spin mb-4" />
            <p className="text-blue-600 font-semibold">Loading marketing dashboard...</p>
        </div>
    );

    return (
        <div className="p-6 max-w-full mx-auto h-full flex flex-col bg-gray-50/30 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Email Marketing</h1>
                    <p className="text-gray-500 font-medium">Broadcast messages to your users through our secure queue.</p>
                </div>
                {view === 'list' ? (
                    <Button onClick={() => setView('create')} className="bg-[#125BAC] hover:opacity-90 text-white rounded-2xl px-8 h-12 font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
                        <Plus className="mr-2" size={20} /> Create New Campaign
                    </Button>
                ) : (
                    <Button variant="outline" onClick={() => setView('list')} className="rounded-2xl px-8 h-12 font-bold">
                        Back to List
                    </Button>
                )}
            </div>

            {view === 'list' ? (
                <div className="flex-1 overflow-hidden flex flex-col gap-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Campaigns</p>
                            <h3 className="text-3xl font-black text-[#125BAC]">{campaigns.length}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Avg. Open Rate</p>
                            <h3 className="text-3xl font-black text-green-600">12.4%</h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Avg. Click Rate</p>
                            <h3 className="text-3xl font-black text-orange-500">4.8%</h3>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Queue Status</p>
                            <h3 className="text-3xl font-black text-blue-500">Active</h3>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
                        <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-white/50">
                            <h2 className="text-lg font-bold text-gray-800">Recent Campaigns</h2>
                        </div>
                        <div className="overflow-y-auto flex-1 custom-scrollbar">
                            <table className="w-full">
                                <thead className="bg-gray-50/50 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Campaign</th>
                                        <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Recipients</th>
                                        <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Created At</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {campaigns.map((c) => (
                                        <tr key={c.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-gray-900">{c.name}</div>
                                                <div className="text-xs text-gray-400 font-medium">{c.subject}</div>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-bold text-gray-600">{c.recipients}</td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                    c.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-gray-400 font-medium">
                                                {new Date(c.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col xl:flex-row gap-6 overflow-hidden bg-white rounded-[1.5rem] lg:rounded-[2.5rem] shadow-xl border border-gray-100 p-2">
                    {/* Side Navigation for Creator */}
                    <div className="w-full xl:w-[300px] bg-gray-50 rounded-[1.2rem] lg:rounded-[2rem] flex flex-col p-4 lg:p-6 shrink-0">
                        <div className="flex xl:flex-col gap-2 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 custom-scrollbar">
                            <button 
                                onClick={() => setTab('compose')}
                                className={`flex-1 xl:w-full flex items-center justify-center xl:justify-start gap-3 p-3 lg:p-4 rounded-xl lg:rounded-2xl transition-all font-bold text-xs lg:text-sm whitespace-nowrap ${step === 'compose' ? 'bg-[#125BAC] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <Mail size={18} /> Compose Email
                            </button>
                            <button 
                                onClick={() => setTab('recipients')}
                                className={`flex-1 xl:w-full flex items-center justify-center xl:justify-start gap-3 p-3 lg:p-4 rounded-xl lg:rounded-2xl transition-all font-bold text-xs lg:text-sm whitespace-nowrap ${step === 'recipients' ? 'bg-[#125BAC] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <Users size={18} /> Target Recipients
                            </button>
                        </div>

                        <div className="mt-4 xl:mt-auto p-4 bg-blue-50 rounded-xl lg:rounded-2xl border border-blue-100">
                            <div className="flex items-center gap-2 mb-2 text-[#125BAC]">
                                <CheckCircle2 size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Summary</span>
                            </div>
                            <div className="flex xl:flex-col justify-between items-baseline xl:items-start gap-1">
                                <p className="text-xs lg:text-sm font-bold text-gray-700">{selectedUserIds.length} Users</p>
                                <p className="text-[10px] lg:text-xs text-gray-500">{selectedRoles.length} Roles</p>
                            </div>
                            
                            <Button 
                                onClick={handleCreateAndSend}
                                className="w-full mt-4 bg-green-600 hover:opacity-90 text-white rounded-xl font-bold h-10 lg:h-12 shadow-lg shadow-green-100 transition-all active:scale-95"
                            >
                                <Send size={16} className="mr-2" /> Send Blast
                            </Button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-2 lg:p-6 overflow-y-auto custom-scrollbar">
                        {step === 'compose' ? (
                            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="font-bold text-gray-700 ml-1">Campaign Name</Label>
                                            <Input 
                                                className="h-11 lg:h-12 rounded-xl border-gray-200" 
                                                placeholder="Internal reference name"
                                                value={campaignData.name}
                                                onChange={e => setCampaignData({...campaignData, name: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="font-bold text-gray-700 ml-1">Template</Label>
                                            <select 
                                                className="w-full h-11 lg:h-12 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                value={campaignData.template}
                                                onChange={e => setCampaignData({...campaignData, template: e.target.value})}
                                            >
                                                <option value="basic">Minimal Style</option>
                                                <option value="newsletter">Marketing Heavy</option>
                                                <option value="corporate">Official Announcement</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold text-gray-700 ml-1">Email Subject</Label>
                                        <Input 
                                            className="h-11 lg:h-12 rounded-xl border-gray-200" 
                                            placeholder="What recipients will see"
                                            value={campaignData.subject}
                                            onChange={e => setCampaignData({...campaignData, subject: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2 min-h-[300px] lg:min-h-[400px] flex flex-col">
                                        <Label className="font-bold text-gray-700 ml-1">Message Content</Label>
                                        <ReactQuill 
                                            theme="snow"
                                            value={campaignData.content}
                                            onChange={val => setCampaignData({...campaignData, content: val})}
                                            modules={modules}
                                            className="flex-1 rounded-xl overflow-hidden border border-gray-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                {(['SUB_ADMIN', 'EMPLOYER', 'EMPLOYEE'] as const).map(role => (
                                    <div key={role} className="bg-gray-50/50 rounded-2xl lg:rounded-[2.5rem] border border-gray-100 p-4 lg:p-8">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                                                    <Users className="text-[#125BAC]" size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg lg:text-xl font-black text-gray-900">{role.replace('_', ' ')}s</h3>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{users[role].length} Total</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col xs:flex-row items-center gap-2 w-full sm:w-auto">
                                                <div className="relative w-full sm:w-auto">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                    <Input 
                                                        className="h-9 w-full sm:w-[200px] pl-9 rounded-full border-gray-200 text-xs bg-white" 
                                                        placeholder={`Search...`}
                                                        value={searchTerms[role]}
                                                        onChange={e => setSearchTerms({...searchTerms, [role]: e.target.value})}
                                                    />
                                                </div>
                                                <Button 
                                                    variant={selectedRoles.includes(role) ? "default" : "outline"}
                                                    onClick={() => toggleRoleSelection(role, users[role])}
                                                    className={`w-full sm:w-auto h-9 rounded-full px-4 text-xs font-bold transition-all ${selectedRoles.includes(role) ? 'bg-[#125BAC] text-white' : 'border-[#125BAC] text-[#125BAC]'}`}
                                                >
                                                    {selectedRoles.includes(role) ? 'Selected' : 'Select All'}
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3">
                                            {users[role]
                                                .filter(u => u.email.toLowerCase().includes(searchTerms[role].toLowerCase()))
                                                .slice(0, 12)
                                                .map(u => (
                                                <div 
                                                    key={u.id}
                                                    onClick={() => toggleUserSelection(u.id)}
                                                    className={`p-3 lg:p-4 rounded-xl lg:rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${selectedUserIds.includes(u.id) ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:border-blue-100'}`}
                                                >
                                                    <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-md border flex items-center justify-center transition-colors ${selectedUserIds.includes(u.id) ? 'bg-[#125BAC] border-[#125BAC]' : 'border-gray-300 bg-white'}`}>
                                                        {selectedUserIds.includes(u.id) && <CheckCircle2 size={10} className="text-white" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs lg:text-sm font-bold text-gray-800 truncate">{u.email.split('@')[0]}</p>
                                                        <p className="text-[10px] text-gray-400 truncate font-medium">{u.email}</p>
                                                    </div>
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

const Plus = ({ size, className }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default EmailMarketing;