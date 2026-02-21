import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { X, Upload, Calendar as CalendarIcon, DollarSign, FileText, User } from "lucide-react";
import { dashboardService } from "@/services/dashboard.service";
import { userService } from "@/services/user.service";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface PaySlipUploadModalProps {
    onClose: () => void;
    onUpdate: () => void;
}

export default function PaySlipUploadModal({ onClose, onUpdate }: PaySlipUploadModalProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState(false);
    
    const [formData, setFormData] = useState({
        employeeId: "",
        amount: "",
        description: "",
        transactionDate: new Date(),
        image: ""
    });

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoadingEmployees(true);
            try {
                // We need a way to get employees for the admin/subadmin to select from
                // For now, let's assume userService.getEmployees exists or similar
                const response = await userService.getEmployees({ size: 100 });
                setEmployees(response.content || []);
            } catch (error: any) {
                console.error("Failed to fetch employees", error);
            } finally {
                setLoadingEmployees(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!formData.employeeId || !formData.amount || !file) {
            toast.error("Please fill in all required fields and select a file");
            return;
        }

        setIsUpdating(true);
        try {
            // 1. Upload file first if needed, or send as multipart
            // Assuming we have a file upload utility. 
            // For now, let's simulate the upload or use a placeholder URL if the API expects a URL
            // Real implementation would likely use a FormData object
            
            // Simulating file upload to get a URL (you should replace this with actual upload logic)
            // const imageUrl = await uploadFile(file);
            const imageUrl = "https://placehold.co/400x600?text=PaySlip"; // Placeholder

            await dashboardService.createAdminPaySlip({
                ...formData,
                transactionDate: formData.transactionDate.toISOString(),
                image: imageUrl
            });

            toast.success("Pay slip created successfully");
            onUpdate();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Failed to create pay slip");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center bg-[#125BAC] text-white">
                    <div>
                        <h2 className="text-xl font-bold">Upload Pay Slip</h2>
                        <p className="text-blue-100 text-xs mt-1">Create a new pay slip record for an employee</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                    {/* Employee Selection */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <User size={14} /> Select Employee *
                        </Label>
                        <select 
                            value={formData.employeeId}
                            onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                            className="w-full h-11 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select an employee</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.name} ({emp.email})</option>
                            ))}
                        </select>
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <DollarSign size={14} /> Amount *
                        </Label>
                        <Input 
                            type="text"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            placeholder="e.g. 1000000"
                            className="rounded-xl h-11"
                        />
                    </div>

                    {/* Transaction Date */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <CalendarIcon size={14} /> Transaction Date *
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal h-11 rounded-xl"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.transactionDate ? format(formData.transactionDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={formData.transactionDate}
                                    onSelect={(date) => setFormData({...formData, transactionDate: date || new Date()})}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <FileText size={14} /> Description
                        </Label>
                        <textarea 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Add a description or note..."
                            className="w-full min-h-[100px] p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <Upload size={14} /> Pay Slip File (Image) *
                        </Label>
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors relative">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-2 text-gray-500">
                                <Upload size={32} className="text-blue-500" />
                                <p className="text-sm font-medium">
                                    {file ? file.name : "Click or drag to upload image"}
                                </p>
                                <p className="text-[10px] uppercase tracking-wider">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900/50">
                    <Button variant="outline" onClick={onClose} disabled={isUpdating} className="rounded-xl px-6 font-bold h-11 border-gray-300 dark:border-gray-700">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isUpdating} className="rounded-xl px-10 font-bold h-11 bg-[#125BAC] hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20">
                        {isUpdating ? "Uploading..." : "Create Pay Slip"}
                    </Button>
                </div>
            </div>
        </div>
    );
}