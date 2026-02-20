import Logo from "/icons/logo.svg";
import Profile from "../ui/Profile.tsx";
import { Bell, MessageSquare, Users, Search, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import { useEffect, useState } from "react";
import { notificationService } from "@/services/notification.service";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, clearSearch } from "@/redux/reducers/searchSlice";
import type { RootState } from "@/redux/stores/store";
import { toggleTheme } from "@/redux/reducers/themeSlice";

export default function Navbar () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const themeMode = useSelector((state: RootState) => state.theme.mode);
    const [notificationCount, setNotificationCount] = useState(0);

    // Mock data for other indications (default to 0)
    const userCount = 0;
    const messageCount = 0;

    const fetchUnreadCount = async () => {
        try {
            const data = await notificationService.getUnreadCount();
            setNotificationCount(data.count || 0);
        } catch (error) {
            console.error("Failed to fetch unread count", error);
        }
    };

    useEffect(() => {
        fetchUnreadCount();
        
        // Optional: Poll every 30 seconds to keep the count fresh
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const resetHome = () => {
        dispatch(clearSearch());
        navigate("/");
    };

    // Paths where search bar should be VISIBLE
    const searchablePaths = [
        "/sub-admin-management",
        "/employer-management",
        "/user-management", // If we add this later
        "/help-and-support",
        "/immigration-report",
        "/system-audit-logs",
        "/subscriber"
    ];

    const isSearchVisible = searchablePaths.includes(location.pathname);

    return (
        <nav className="w-full h-[70px] border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-background/80 backdrop-blur-md sticky top-0 z-[50] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="w-full h-full px-8 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <div onClick={resetHome} className="w-[160px] cursor-pointer hover:opacity-80 transition-opacity dark:invert dark:brightness-200">
                        <ImageWithSkeleton src={Logo} />
                    </div>
                    
                    {/* Global Search Bar - Conditional Rendering */}
                    {isSearchVisible && (
                        <div className="hidden md:flex relative group animate-in fade-in zoom-in-95 duration-200">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#125BAC] dark:group-focus-within:text-blue-400 transition-colors" size={18} />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search everything..." 
                                className="bg-gray-50 dark:bg-gray-900 border-none rounded-xl py-2.5 pl-10 pr-10 w-[300px] text-sm focus:ring-2 focus:ring-[#125BAC]/20 dark:focus:ring-blue-400/20 transition-all outline-none dark:text-gray-200"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => dispatch(clearSearch())}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-2">
                    {/* User Management Indication */}
                    <button 
                        onClick={() => navigate("/employer-management")}
                        className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-[#125BAC] dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all relative cursor-pointer group"
                        title="Employer Management"
                    >
                        <Users size={22} className="group-hover:scale-110 transition-transform" />
                        {userCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white flex justify-center items-center text-[10px] font-bold rounded-full ring-2 ring-white dark:ring-gray-900">
                                {userCount}
                            </span>
                        )}
                    </button>

                    {/* Messages Indication */}
                    <button 
                        onClick={() => navigate("/messages")}
                        className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-[#125BAC] dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all relative cursor-pointer group"
                        title="Messages"
                    >
                        <MessageSquare size={22} className="group-hover:scale-110 transition-transform" />
                        {messageCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 text-white flex justify-center items-center text-[10px] font-bold rounded-full ring-2 ring-white dark:ring-gray-900">
                                {messageCount}
                            </span>
                        )}
                    </button>

                    {/* Notification Indication */}
                    <button 
                        onClick={() => navigate("/notifications")}
                        className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-[#125BAC] dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all relative cursor-pointer group"
                        title="Notifications"
                    >
                        <Bell size={22} className="group-hover:scale-110 transition-transform" />
                        {notificationCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white flex justify-center items-center text-[10px] font-bold rounded-full ring-2 ring-white dark:ring-gray-900">
                                {notificationCount}
                            </span>
                        )}
                    </button>

                    {/* Theme Toggle */}
                    <button 
                        onClick={() => dispatch(toggleTheme())}
                        className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-[#125BAC] dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all cursor-pointer group"
                        title={themeMode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
                    >
                        {themeMode === 'light' ? (
                            <Moon size={22} className="group-hover:scale-110 transition-transform" />
                        ) : (
                            <Sun size={22} className="group-hover:scale-110 transition-transform" />
                        )}
                    </button>

                    {/* Divider */}
                    <div className="w-[1px] h-8 bg-gray-100 dark:bg-gray-800 mx-2" />

                    <Profile />
                </div>
            </div>
        </nav>
    );
}
