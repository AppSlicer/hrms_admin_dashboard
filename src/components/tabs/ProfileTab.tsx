import { useEffect, useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profileService } from "@/services/profile.service";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/reducers/authSlice";

export default function ProfileTabs() {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [tab, setTab] = useState<"profile" | "password">("profile");
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    // Profile state
    const [profile, setProfile] = useState<any>(null);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");

    // Password state
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const defaultImage = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

    const fetchProfile = async () => {
        try {
            const data = await profileService.getProfile();
            console.log("FETCHED PROFILE DATA:", data);
            setProfile(data);
            setEmail(data.email);
            
            let displayName = "";
            // Use the User model image first, fallback to role-specific, then default
            const avatarUrl = data.profileImage || data.profile?.profileImage || defaultImage;
            console.log("RESOLVED AVATAR URL:", avatarUrl);

            if (data.role === 'EMPLOYER') {
                displayName = data.profile?.companyName || "";
                setName(displayName);
                setContact(data.profile?.phoneNumber || "");
            } else if (data.role === 'EMPLOYEE') {
                displayName = `${data.profile?.firstName || ""} ${data.profile?.lastName || ""}`.trim();
                setName(displayName);
                setContact(data.profile?.phoneNumber || "");
            } else {
                displayName = data.email.split('@')[0];
                setName(displayName);
            }

            // Sync to global state so Sidebar and Navbar update
            dispatch(updateUser({
                name: displayName,
                image: avatarUrl,
                role: data.role
            }));

        } catch (error: any) {
            toast.error(error.message || "Failed to load profile");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        setIsUploading(true);
        try {
            const { url } = await profileService.uploadImage(file);
            console.log("1. UPLOADED IMAGE URL:", url);
            
            const response = await profileService.updateProfile({ profileImage: url });
            console.log("2. UPDATE PROFILE RESPONSE:", response);
            
            toast.success("Profile image updated successfully");
            
            // Re-fetch to sync everything
            console.log("3. TRIGGERING RE-FETCH...");
            await fetchProfile();
        } catch (error: any) {
            console.error("IMAGE UPDATE ERROR:", error);
            toast.error(error.message || "Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpdateProfile = async () => {
        setIsUpdating(true);
        try {
            const payload: any = { phoneNumber: contact, email };
            
            if (profile.role === 'EMPLOYER') {
                payload.companyName = name;
            } else if (profile.role === 'EMPLOYEE') {
                const parts = name.split(' ');
                payload.firstName = parts[0];
                payload.lastName = parts.slice(1).join(' ');
            }

            await profileService.updateProfile(payload);
            toast.success("Profile updated successfully");
            await fetchProfile();
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsUpdating(true);
        try {
            await authService.changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            toast.success("Password changed successfully");
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error: any) {
            toast.error(error.message || "Failed to change password");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading || !profile) return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-[#125BAC] animate-spin" />
            <p className="text-blue-600 font-semibold">Loading profile data...</p>
        </div>
    );

    return (
        <div className="w-full h-full px-6 overflow-y-auto custom-scrollbar">
            {/* Tabs */}
            <div className="flex gap-6 p-6">
                <h2
                    onClick={() => setTab("profile")}
                    className={`text-xl font-semibold cursor-pointer transition-all duration-300 pb-2 ${
                        tab === "profile" ? "text-[#125BAC] border-b-2 border-[#125BAC]" : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Edit Profile
                </h2>
                <h2
                    onClick={() => setTab("password")}
                    className={`text-xl font-semibold cursor-pointer transition-all duration-300 pb-2 ${
                        tab === "password" ? "text-[#125BAC] border-b-2 border-[#125BAC]" : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Change Password
                </h2>
            </div>

            {/* Content Card */}
            <div className="max-w-[900px] min-h-[500px] mx-auto shadow-2xl p-8 rounded-3xl bg-white mb-10 border border-gray-100/50">
                {tab === "profile" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Profile Image - ENHANCED UI */}
                        <div className="flex flex-col items-center gap-4">
                            <div 
                                onClick={() => !isUploading && fileInputRef.current?.click()}
                                className={`group relative w-[180px] h-[180px] rounded-full overflow-hidden cursor-pointer ring-4 ring-blue-50 transition-all duration-500 hover:ring-[#125BAC]/30 ${isUploading ? 'cursor-wait' : 'hover:scale-[1.02]'}`}
                            >
                                {/* Hidden File Input */}
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleImageChange} 
                                    className="hidden" 
                                    accept="image/*"
                                />
                                
                                {/* Overlay on Hover */}
                                <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${isUploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    {isUploading ? (
                                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                    ) : (
                                        <Camera className="w-8 h-8 mb-2 transform group-hover:scale-110 transition-transform" />
                                    )}
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-center px-4">
                                        {isUploading ? 'Uploading...' : 'Change Photo'}
                                    </span>
                                </div>

                                {/* Main Image */}
                                <div className={`w-full h-full transition-transform duration-700 ${isUploading ? 'scale-110 blur-sm' : 'group-hover:scale-110'}`}>
                                    <ImageWithSkeleton
                                        src={profile?.profileImage || profile?.profile?.profileImage || defaultImage}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <p className="text-xs text-gray-400 font-medium italic">Allowed: JPG, PNG. Max size 5MB</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="mt-10 flex flex-col gap-6 max-w-[500px] mx-auto">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullname" className="text-gray-600 font-bold ml-1">
                                        {profile?.role === 'EMPLOYER' ? 'Company Name' : 'Full Name'}
                                    </Label>
                                    <Input
                                        id="fullname"
                                        className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 shadow-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-600 font-bold ml-1">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className="h-12 rounded-xl border-gray-200 shadow-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact" className="text-gray-600 font-bold ml-1">Contact Number</Label>
                                    <Input
                                        id="contact"
                                        className="h-12 rounded-xl border-gray-200 shadow-sm"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button 
                                disabled={isUpdating || isUploading}
                                onClick={handleUpdateProfile}
                                className="mt-4 h-14 rounded-xl bg-[#125BAC] hover:opacity-90 text-white font-bold text-lg shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Updating Profile...
                                    </>
                                ) : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                )}

                {tab === "password" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6 max-w-[500px] mx-auto pt-10">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input 
                                    id="currentPassword" 
                                    type="password" 
                                    className="h-12 rounded-xl border-gray-200"
                                    value={passwords.currentPassword}
                                    onChange={e => setPasswords({...passwords, currentPassword: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input 
                                    id="newPassword" 
                                    type="password" 
                                    className="h-12 rounded-xl border-gray-200"
                                    value={passwords.newPassword}
                                    onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input 
                                    id="confirmPassword" 
                                    type="password" 
                                    className="h-12 rounded-xl border-gray-200"
                                    value={passwords.confirmPassword}
                                    onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})}
                                />
                            </div>
                        </div>

                        <Button 
                            disabled={isUpdating}
                            onClick={handleChangePassword}
                            className="mt-4 h-12 rounded-xl bg-blue-600 hover:opacity-90 text-white font-bold text-lg transition-all active:scale-95 shadow-lg shadow-blue-100"
                        >
                            {isUpdating ? "Processing..." : "Change Password"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
