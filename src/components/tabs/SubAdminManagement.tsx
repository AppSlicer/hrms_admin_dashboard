import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {LockIcon, Trash2} from "lucide-react";
import {userService} from "@/services/user.service.ts";
import {toast} from "sonner";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import Tooltip from "@/components/ui/Tooltip";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store";
import ReusableTable, { Column } from "@/components/ui/ReusableTable";

export default function SubAdminManagement() {
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const [subAdmins, setSubAdmins] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const defaultImage = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

    const filteredSubAdmins = subAdmins.filter(admin => 
        admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (admin.name && admin.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const columns: Column<any>[] = [
        { header: "SL", flex: 0.5, render: (_, index) => <span className="text-sm font-bold">{index + 1}</span> },
        { 
            header: "Image", 
            flex: 0.5, 
            render: (item) => (
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                    <ImageWithSkeleton src={item.profileImage || defaultImage} />
                </div>
            ) 
        },
        { header: "Sub Admin", render: (item) => <span className="text-sm font-bold dark:text-gray-200">{item.name || item.email.split('@')[0]}</span> },
        { 
            header: "Email", 
            flex: 1.5, 
            render: (item) => (
                <Tooltip content={item.email}>
                    <span className="text-sm font-medium truncate cursor-pointer dark:text-gray-300" onClick={() => copyToClipboard(item.email)}>{item.email}</span>
                </Tooltip>
            )
        },
        { header: "Created At", render: (item) => <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span> },
        { 
            header: "Status", 
            render: (item) => (
                <Button 
                    onClick={() => handleStatusToggle(item.id, item.status)}
                    className={`h-8 text-[10px] font-bold px-4 rounded-md border ${
                        item.status === 'ACTIVE' ? 'border-[#008F37] bg-[#E6F4EB] text-black' : 'border-red-500 bg-red-50 text-black'
                    }`}
                >
                    {item.status}
                </Button>
            )
        },
        { 
            header: "Action", 
            render: (item) => (
                <div className="flex gap-4">
                    <LockIcon 
                        onClick={() => handleBlock(item.id)}
                        className={`cursor-pointer ${item.status === 'SUSPENDED' ? 'text-gray-400' : 'text-orange-500 dark:text-orange-400'} hover:scale-110 transition-transform`} 
                        size={18}
                    />
                    <Trash2 
                        onClick={() => handleDelete(item.id)}
                        className="cursor-pointer text-red-500 hover:scale-110 transition-transform" 
                        size={18}
                    />
                </div>
            )
        }
    ];

    const [newSubAdmin, setNewSubAdmin] = useState({
        email: "",
        password: "",
        name: "",
        phoneNumber: ""
    });

    const fetchSubAdmins = async () => {
        setIsLoading(true);
        try {
            const data = await userService.getSubAdmins();
            setSubAdmins(data);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch sub-admins");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubAdmins();
    }, []);

    const handleCreateSubAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await userService.createSubAdmin(newSubAdmin);
            toast.success("Sub Admin created successfully");
            setIsAdding(false);
            setNewSubAdmin({ email: "", password: "", name: "", phoneNumber: "" });
            fetchSubAdmins();
        } catch (error: any) {
            toast.error(error.message || "Failed to create sub-admin");
        }
    };

    const handleStatusToggle = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        try {
            await userService.updateStatus(id, newStatus);
            toast.success(`User status updated to ${newStatus}`);
            fetchSubAdmins();
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        }
    };

    const handleBlock = async (id: string) => {
        if (!confirm("Block this user?")) return;
        try {
            await userService.blockUser(id);
            toast.success("User blocked");
            fetchSubAdmins();
        } catch (error: any) {
            toast.error(error.message || "Failed to block user");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this user?")) return;
        try {
            await userService.deleteSubAdmin(id);
            toast.success("User deleted");
            fetchSubAdmins();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete user");
        }
    };

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            {/* Header section */}
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Sub Admin Management</h1>
                <div className={"gap-2 flex z-20"}>
                    <Button 
                        onClick={() => setIsAdding(!isAdding)}
                        className={"bg-[#125BAC] dark:bg-blue-600 text-white rounded-full"}
                    >
                        {isAdding ? "Cancel" : "Add Sub Admin"}
                    </Button>
                </div>
            </div>

            {isAdding && (
                <div className="mb-8 p-6 border rounded-xl bg-gray-50 dark:bg-card border-gray-200 dark:border-gray-800 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Sub Admin</h2>
                    <form onSubmit={handleCreateSubAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Full Name</Label>
                            <Input 
                                required
                                value={newSubAdmin.name}
                                onChange={e => setNewSubAdmin({...newSubAdmin, name: e.target.value})}
                                placeholder="Enter name"
                                className="dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Email</Label>
                            <Input 
                                type="email"
                                required
                                value={newSubAdmin.email}
                                onChange={e => setNewSubAdmin({...newSubAdmin, email: e.target.value})}
                                placeholder="email@example.com"
                                className="dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Password</Label>
                            <Input 
                                type="password"
                                required
                                value={newSubAdmin.password}
                                onChange={e => setNewSubAdmin({...newSubAdmin, password: e.target.value})}
                                placeholder="Min 6 characters"
                                className="dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Phone Number</Label>
                            <Input 
                                value={newSubAdmin.phoneNumber}
                                onChange={e => setNewSubAdmin({...newSubAdmin, phoneNumber: e.target.value})}
                                placeholder="Optional"
                                className="dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                            <Button type="submit" className="bg-[#125BAC] dark:bg-blue-600 text-white rounded-full px-8">
                                Create Sub Admin
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <ReusableTable 
                columns={columns} 
                data={filteredSubAdmins} 
                isLoading={isLoading} 
                emptyMessage="No sub-admins found."
            />
        </div>
    )
}
