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

export default function EmployeeManagement() {
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const [employers, setEmployers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    
    const defaultImage = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

    const filteredEmployers = employers.filter(emp => 
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (emp.employer?.companyName && emp.employer.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const columns: Column<any>[] = [
        { header: "SL", flex: 0.5, render: (_, index) => <span className="text-sm font-bold">{index + 1}</span> },
        { 
            header: "Image", 
            flex: 0.5, 
            render: (item) => (
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                    <ImageWithSkeleton src={item.profileImage || item.employer?.profileImage || defaultImage} />
                </div>
            ) 
        },
        { 
            header: "Company", 
            flex: 1.2, 
            render: (item) => (
                <Tooltip content={item.employer?.companyName || "N/A"}>
                    <span className="text-sm font-bold dark:text-gray-200 truncate block px-2">{item.employer?.companyName || "N/A"}</span>
                </Tooltip>
            )
        },
        { 
            header: "Email", 
            flex: 1.5, 
            render: (item) => (
                <Tooltip content={item.email}>
                    <span className="text-sm font-medium truncate cursor-pointer dark:text-gray-300 px-2 block" onClick={() => copyToClipboard(item.email)}>{item.email}</span>
                </Tooltip>
            )
        },
        { header: "Contact", render: (item) => <span className="text-xs dark:text-gray-400">{item.employer?.phoneNumber || "N/A"}</span> },
        { header: "Created At", render: (item) => <span className="text-xs dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span> },
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

    const [newEmployer, setNewEmployer] = useState({
        email: "",
        password: "",
        companyName: "",
        phoneNumber: ""
    });

    const fetchEmployers = async () => {
        setIsLoading(true);
        try {
            const data = await userService.getEmployers();
            setEmployers(data);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch employers");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployers();
    }, []);

    const handleCreateEmployer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await userService.createEmployer(newEmployer);
            toast.success("Employer created successfully");
            setIsAdding(false);
            setNewEmployer({ email: "", password: "", companyName: "", phoneNumber: "" });
            fetchEmployers();
        } catch (error: any) {
            toast.error(error.message || "Failed to create employer");
        }
    };

    const handleStatusToggle = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        try {
            await userService.updateStatus(id, newStatus);
            toast.success(`User status updated to ${newStatus}`);
            fetchEmployers();
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        }
    };

    const handleBlock = async (id: string) => {
        if (!confirm("Block this user?")) return;
        try {
            await userService.blockUser(id);
            toast.success("User blocked");
            fetchEmployers();
        } catch (error: any) {
            toast.error(error.message || "Failed to block user");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this employer?")) return;
        try {
            await userService.deleteSubAdmin(id);
            toast.success("Employer deleted");
            fetchEmployers();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete employer");
        }
    };

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>Employer Management</h1>
                <div className={"gap-2 flex z-20"}>
                    <Button 
                        onClick={() => setIsAdding(!isAdding)}
                        className={"bg-[#125BAC] dark:bg-blue-600 text-white rounded-full"}
                    >
                        {isAdding ? "Cancel" : "Add Employer"}
                    </Button>
                </div>
            </div>

            {isAdding && (
                <div className="mb-8 p-6 border rounded-xl bg-gray-50 dark:bg-card border-gray-200 dark:border-gray-800 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Employer</h2>
                    <form onSubmit={handleCreateEmployer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Company Name</Label>
                            <Input 
                                required
                                value={newEmployer.companyName}
                                onChange={e => setNewEmployer({...newEmployer, companyName: e.target.value})}
                                placeholder="Enter company name"
                                className="dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Email</Label>
                            <Input 
                                type="email"
                                required
                                value={newEmployer.email}
                                onChange={e => setNewEmployer({...newEmployer, email: e.target.value})}
                                placeholder="employer@example.com"
                                className="dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Password</Label>
                            <Input 
                                type="password"
                                required
                                value={newEmployer.password}
                                onChange={e => setNewEmployer({...newEmployer, password: e.target.value})}
                                placeholder="Min 6 characters"
                                className="dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-300">Phone Number</Label>
                            <Input 
                                value={newEmployer.phoneNumber}
                                onChange={e => setNewEmployer({...newEmployer, phoneNumber: e.target.value})}
                                placeholder="Contact number"
                                className="dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                            <Button type="submit" className="bg-[#125BAC] dark:bg-blue-600 text-white rounded-full px-8">
                                Create Employer
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <ReusableTable 
                columns={columns} 
                data={filteredEmployers} 
                isLoading={isLoading} 
                emptyMessage="No employers found."
            />
        </div>
    )
}
