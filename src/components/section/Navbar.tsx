import Logo from "/icons/logo.svg";
import Profile from "../ui/Profile.tsx";
import { Bell, MessageSquare, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";

export default function Navbar () {
    const navigate = useNavigate();

    // Mock data for indications
    const userCount = 2;
    const notificationCount = 8;
    const messageCount = 9;

    return (
        <nav className="w-full h-[70px] border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-[50]">
            <div className="w-full h-full px-8 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <div onClick={() => navigate("/")} className="w-[160px] cursor-pointer hover:opacity-80 transition-opacity">
                        <ImageWithSkeleton src={Logo} />
                    </div>
                    
                    {/* Global Search Bar */}
                    <div className="hidden md:flex relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#125BAC] transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search everything..." 
                            className="bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 w-[300px] text-sm focus:ring-2 focus:ring-[#125BAC]/20 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-2">
                    {/* User Management Indication */}
                    <button 
                        onClick={() => navigate("/employer-management")}
                        className="p-2.5 text-gray-500 hover:text-[#125BAC] hover:bg-blue-50 rounded-xl transition-all relative cursor-pointer group"
                        title="Employer Management"
                    >
                        <Users size={22} className="group-hover:scale-110 transition-transform" />
                        {userCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white flex justify-center items-center text-[10px] font-bold rounded-full ring-2 ring-white">
                                {userCount}
                            </span>
                        )}
                    </button>

                    {/* Messages Indication */}
                    <button 
                        onClick={() => navigate("/messages")}
                        className="p-2.5 text-gray-500 hover:text-[#125BAC] hover:bg-blue-50 rounded-xl transition-all relative cursor-pointer group"
                        title="Messages"
                    >
                        <MessageSquare size={22} className="group-hover:scale-110 transition-transform" />
                        {messageCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 text-white flex justify-center items-center text-[10px] font-bold rounded-full ring-2 ring-white">
                                {messageCount}
                            </span>
                        )}
                    </button>

                    {/* Notification Indication */}
                    <button 
                        onClick={() => navigate("/notifications")}
                        className="p-2.5 text-gray-500 hover:text-[#125BAC] hover:bg-blue-50 rounded-xl transition-all relative cursor-pointer group"
                        title="Notifications"
                    >
                        <Bell size={22} className="group-hover:scale-110 transition-transform" />
                        {notificationCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white flex justify-center items-center text-[10px] font-bold rounded-full ring-2 ring-white">
                                {notificationCount}
                            </span>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="w-[1px] h-8 bg-gray-100 mx-2" />

                    <Profile />
                </div>
            </div>
        </nav>
    );
}
