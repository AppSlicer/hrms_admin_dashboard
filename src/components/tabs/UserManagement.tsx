import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useEffect, useState} from "react";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import {copyToClipboard} from "@/lib/copyClipboard.ts";
import {LockIcon, Trash2} from "lucide-react";
import {userService} from "@/services/user.service.ts";
import {toast} from "sonner";
import Tooltip from "@/components/ui/Tooltip";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store";

export default function UserManagement() {
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filtered data based on global search
    const filteredData = data.filter(user => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.employer?.companyName && user.employer.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const [userType, setUserType] = useState<"EMPLOYER" | "EMPLOYEE">("EMPLOYER");

    const defaultImage = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // For now, listing employers as sub-admins primarily manage employers
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
        if (!confirm("Are you sure you want to block this user?")) return;
        try {
            await userService.blockUser(id);
            toast.success("User blocked successfully");
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to block user");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await userService.deleteSubAdmin(id);
            toast.success("User deleted successfully");
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete user");
        }
    };

    return (
        <div className={"w-full h-full p-6"}>
            {/* Header section */}
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className={"text-3xl font-semibold"}>User Management</h1>
                <div className={"gap-2 flex z-20"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"cursor-pointer"}>
                                {userType === "EMPLOYER" ? "Employers" : "Employees"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 border bg-white rounded-xl p-4 mr-8 mt-4" align="start">
                            <DropdownMenuLabel className={"font-semibold border-b pb-2"}>Users type</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setUserType("EMPLOYER")} className={"p-2 border rounded-full text-center cursor-pointer my-3 hover:shadow-sm font-semibold"}>Employer</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setUserType("EMPLOYEE")} className={"p-2 border rounded-full text-center cursor-pointer hover:shadow-sm font-semibold"}>Employee</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* Table */}
            <Table totalPages={1} className={""}>
                <TableRow className={"bg-[#C7E2FF] h-[60px] border-0 font-semibold"}>
                    <TableRowCol className="flex-[0.5]"><h3>SL</h3></TableRowCol>
                    <TableRowCol className="flex-[0.5]"><h3>Image</h3></TableRowCol>
                    <TableRowCol className="flex-[1.2]"><h3>Name</h3></TableRowCol>
                    <TableRowCol className="flex-[1.5]"><h3>Email</h3></TableRowCol>
                    <TableRowCol><h3>Company</h3></TableRowCol>
                    <TableRowCol><h3>Joined At</h3></TableRowCol>
                    <TableRowCol><h3>Status</h3></TableRowCol>
                    <TableRowCol><h3>Action</h3></TableRowCol>
                </TableRow>

                {isLoading ? (
                    <TableRow className="h-[100px] border rounded-none">
                        <TableRowCol className="col-span-full text-center">Loading...</TableRowCol>
                    </TableRow>
                ) : filteredData.length === 0 ? (
                    <TableRow className="h-[100px] border rounded-none">
                        <TableRowCol className="col-span-full text-center text-gray-500">No users found.</TableRowCol>
                    </TableRow>
                ) : (
                    filteredData.map((user, index) => (
                        <TableRow key={user.id} className={"h-[60px] border rounded-none"}>
                            <TableRowCol className="flex-[0.5]"><h3>{index + 1}</h3></TableRowCol>
                            <TableRowCol className="flex-[0.5]">
                                <div className={"w-[35px] h-[35px] rounded-full overflow-hidden border border-gray-200"}>
                                    <ImageWithSkeleton src={user.profileImage || user.employer?.profileImage || defaultImage} />
                                </div>
                            </TableRowCol>
                            <TableRowCol className="flex-[1.2]">
                                <Tooltip content={user.employer?.companyName || user.email.split('@')[0]}>
                                    <h3 className="text-sm font-medium truncate">{user.employer?.companyName || user.email.split('@')[0]}</h3>
                                </Tooltip>
                            </TableRowCol>
                            <TableRowCol className="flex-[1.5]">
                                <Tooltip content={user.email}>
                                    <h3 className="text-sm truncate cursor-pointer" onClick={() => copyToClipboard(user.email)}>{user.email}</h3>
                                </Tooltip>
                            </TableRowCol>
                            <TableRowCol>
                                <h3 className="text-sm">{user.employer?.companyName || "N/A"}</h3>
                            </TableRowCol>
                            <TableRowCol>
                                <h3 className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</h3>
                            </TableRowCol>
                            <TableRowCol>
                                <div className={"w-full h-full flex justify-center items-center"}>
                                    <Button className={`border font-normal ${user.status === 'ACTIVE' ? 'border-[#008F37] bg-[#E6F4EB] text-black' : 'border-red-500 bg-red-50 text-black'}`}>
                                        {user.status}
                                    </Button>
                                </div>
                            </TableRowCol>
                            <TableRowCol>
                                <div className={"w-[70px] h-full flex justify-around items-center"}>
                                    <LockIcon onClick={() => handleBlock(user.id)} className={`cursor-pointer ${user.status === 'SUSPENDED' ? 'text-gray-400' : 'text-red-500'}`} size={18} />
                                    <Trash2 onClick={() => handleDelete(user.id)} className={"cursor-pointer text-red-500"} size={18} />
                                </div>
                            </TableRowCol>
                        </TableRow>
                    ))
                )}
            </Table>
        </div>
    )
}