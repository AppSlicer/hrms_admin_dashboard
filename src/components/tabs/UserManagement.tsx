import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useEffect, useState} from "react";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {LockIcon, Trash2} from "lucide-react";
import {userService} from "@/services/user.service.ts";
import {toast} from "sonner";
import Tooltip from "@/components/ui/Tooltip";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";

export default function UserManagement() {
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userType, setUserType] = useState<"EMPLOYER" | "EMPLOYEE">("EMPLOYER");

    const defaultImage = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

    const filteredData = data.filter(user => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.employer?.companyName && user.employer.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
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
            header: "Name", 
            flex: 1.2, 
            render: (item) => (
                <span className="text-sm font-bold dark:text-gray-200 truncate px-2 block">
                    {item.employer?.companyName || item.name || item.email.split('@')[0]}
                </span>
            )
        },
        { 
            header: "Email", 
            flex: 1.5, 
            render: (item) => (
                <Tooltip content={item.email}>
                    <span className="text-sm font-medium truncate cursor-pointer dark:text-gray-300 block px-2" onClick={() => copyToClipboard(item.email)}>{item.email}</span>
                </Tooltip>
            )
        },
        { 
            header: userType === "EMPLOYER" ? "Company" : "Role", 
            render: (item) => <span className="text-xs dark:text-gray-400">{userType === "EMPLOYER" ? (item.employer?.companyName || "N/A") : item.role}</span> 
        },
        { 
            header: "Joined At", 
            render: (item) => <span className="text-xs dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span> 
        },
        { 
            header: "Status", 
            render: (item) => (
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold inline-block ${
                    item.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                    {item.status}
                </div>
            )
        },
        { 
            header: "Action", 
            render: (item) => (
                <div className="flex gap-4">
                    <LockIcon onClick={() => handleBlock(item.id)} className={`cursor-pointer ${item.status === 'SUSPENDED' ? 'text-gray-400' : 'text-orange-500 dark:text-orange-400'} hover:scale-110 transition-transform`} size={18} />
                    <Trash2 onClick={() => handleDelete(item.id)} className="cursor-pointer text-red-500 dark:text-red-400 hover:scale-110 transition-transform" size={18} />
                </div>
            )
        }
    ];

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const result = await userService.getEmployers();
            setData(result);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userType]);

    const handleBlock = async (id: string) => {
        if (!confirm("Block this user?")) return;
        try {
            await userService.blockUser(id);
            toast.success("User blocked");
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to block user");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this user?")) return;
        try {
            await userService.deleteSubAdmin(id);
            toast.success("User deleted");
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete user");
        }
    };

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold text-gray-900 dark:text-white"}>User Management</h1>
                <div className={"gap-2 flex z-20"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer dark:border-gray-800 dark:text-gray-300 dark:bg-card"}>
                                {userType === "EMPLOYER" ? "Employers" : "Employees"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200"}>Users type</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setUserType("EMPLOYER")} className={"p-2 border border-gray-100 dark:border-gray-800 rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold dark:text-gray-300 dark:hover:bg-gray-800"}>Employer</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setUserType("EMPLOYEE")} className={"p-2 border border-gray-100 dark:border-gray-800 rounded-full text-center cursor-pointer hover:shadow-sm font-semibold dark:text-gray-300 dark:hover:bg-gray-800"}>Employee</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <ReusableTable 
                columns={columns} 
                data={filteredData} 
                isLoading={isLoading} 
                emptyMessage="No users found."
            />
        </div>
    )
}
