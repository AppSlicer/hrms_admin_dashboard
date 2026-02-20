import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import TableRow from "@/components/ui/TableRow.tsx";
import Table from "@/components/ui/Table.tsx";
import TableRowCol from "@/components/ui/TableRowCol.tsx";
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

export default function EmployeeManagement() {
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const [employers, setEmployers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filtered data based on global search
    const filteredEmployers = employers.filter(emp => 
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (emp.employer?.companyName && emp.employer.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const [isAdding, setIsAdding] = useState(false);
    
    // Form state
    const [newEmployer, setNewEmployer] = useState({
        email: "",
        password: "",
        companyName: "",
        phoneNumber: ""
    });

    const defaultImage = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

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
        if (!confirm("Are you sure you want to block this user?")) return;
        try {
            await userService.blockUser(id);
            toast.success("User blocked successfully");
            fetchEmployers();
        } catch (error: any) {
            toast.error(error.message || "Failed to block user");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this employer?")) return;
        try {
            await userService.deleteSubAdmin(id); // Using the same delete method for soft delete
            toast.success("Employer deleted successfully");
            fetchEmployers();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete employer");
        }
    };

    return (
        <div className={"w-full h-full p-6 bg-transparent"}>
            {/* Header section */}
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

            {/* Table */}
            <Table totalPages={1} className={""}>
                {/* Table Heading*/}
                <TableRow className={"bg-[#C7E2FF] dark:bg-blue-900/30 h-[60px] border-b border-gray-200 dark:border-gray-800 font-semibold"}>
                    <TableRowCol className="flex-[0.5]"><h3 className="dark:text-white">SL</h3></TableRowCol>
                    <TableRowCol className="flex-[0.5]"><h3 className="dark:text-white">Image</h3></TableRowCol>
                    <TableRowCol className="flex-[1.2]"><h3 className="dark:text-white">Company Name</h3></TableRowCol>
                    <TableRowCol className="flex-[1.5]"><h3 className="dark:text-white">Email</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Contact</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Created At</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Status</h3></TableRowCol>
                    <TableRowCol><h3 className="dark:text-white">Action</h3></TableRowCol>
                </TableRow>
                
                {isLoading ? (
                    <TableRow className="h-[100px] border rounded-none">
                        <TableRowCol className="col-span-full text-center">Loading...</TableRowCol>
                    </TableRow>
                ) : filteredEmployers.length === 0 ? (
                    <TableRow className="h-[100px] border rounded-none">
                        <TableRowCol className="col-span-full text-center dark:text-gray-400">No employers found.</TableRowCol>
                    </TableRow>
                ) : (
                    filteredEmployers.map((emp, index) => (
                        <TableRow key={emp.id} className={"h-[60px] border rounded-none hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"}>
                            <TableRowCol className="flex-[0.5]"><h3>{index + 1}</h3></TableRowCol>
                            <TableRowCol className="flex-[0.5]">
                                <div className={"w-[35px] h-[35px] rounded-full overflow-hidden border border-gray-200 dark:border-gray-700"}>
                                    <ImageWithSkeleton src={emp.profileImage || emp.employer?.profileImage || defaultImage} />
                                </div>
                            </TableRowCol>
                            <TableRowCol className="flex-[1.2]">
                                <Tooltip content={emp.employer?.companyName || "N/A"}>
                                    <h3 className="text-sm font-medium truncate dark:text-gray-300">{emp.employer?.companyName || "N/A"}</h3>
                                </Tooltip>
                            </TableRowCol>
                            <TableRowCol className="flex-[1.5]">
                                <Tooltip content={emp.email}>
                                    <h3 className="text-sm truncate cursor-pointer dark:text-gray-300" onClick={() => copyToClipboard(emp.email)}>{emp.email}</h3>
                                </Tooltip>
                            </TableRowCol>
                            <TableRowCol>
                                <h3 className="text-sm dark:text-gray-400">{emp.employer?.phoneNumber || "N/A"}</h3>
                            </TableRowCol>
                            <TableRowCol>
                                <h3 className="text-sm dark:text-gray-400">{new Date(emp.createdAt).toLocaleDateString()}</h3>
                            </TableRowCol>
                            <TableRowCol>
                                <div className={"w-full h-full flex justify-center items-center"}>
                                    <Button 
                                        onClick={() => handleStatusToggle(emp.id, emp.status)}
                                        className={`border font-normal text-xs h-8 ${
                                            emp.status === 'ACTIVE' ? 'border-[#008F37] bg-[#E6F4EB] text-black' : 
                                            emp.status === 'SUSPENDED' ? 'border-orange-500 bg-orange-50 text-black' :
                                            'border-red-500 bg-red-50 text-black'
                                        }`}
                                    >
                                        {emp.status}
                                    </Button>
                                </div>
                            </TableRowCol>
                            <TableRowCol>
                                <div className={"w-[80%] h-full flex justify-around items-center"}>
                                    <LockIcon 
                                        onClick={() => handleBlock(emp.id)}
                                        className={`cursor-pointer ${emp.status === 'SUSPENDED' ? 'text-gray-400' : 'text-orange-500 dark:text-orange-400'} hover:scale-110 transition-transform`} 
                                        size={18}
                                    />
                                    <Trash2 
                                        onClick={() => handleDelete(emp.id)}
                                        className={"cursor-pointer text-red-500 dark:text-red-400 hover:scale-110 transition-transform"} 
                                        size={18}
                                    />
                                </div>
                            </TableRowCol>
                        </TableRow>
                    ))
                )}
            </Table>
        </div>
    )
}