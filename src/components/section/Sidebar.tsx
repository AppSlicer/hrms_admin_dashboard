import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useCallback } from "react";
import { TOKEN_NAME } from "@/enum/token.enum.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store.ts";
import { USER_ROLE_ENUM } from "@/enum/role.enum.ts";
import { useSearchParams } from "react-router-dom";
import { setTabOnState } from "@/redux/reducers/tabSlice.ts";
import { admin, subAdmin } from "@/enum/tab.enum.ts";

export default function Sidebar() {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab");

    const logOut = useCallback(() => {
        Cookies.remove(TOKEN_NAME.USER_INFO);
        Cookies.remove(TOKEN_NAME.HRM_FIRM);
        window.location.reload();
    }, []);

    const setTab = useCallback((tab: string) => {
        setSearchParams({ tab });
        dispatch(setTabOnState({ tab }));
    }, [setSearchParams, dispatch]);

    useEffect(() => {
        if (user?.role === USER_ROLE_ENUM.SUPER_ADMIN) {
            setTab(admin[0].title);
        } else if (user?.role === USER_ROLE_ENUM.SUB_ADMIN) {
            setTab(subAdmin[0].title);
        }
    }, []);

    // Memoized tab configuration based on user role
    const tabs = useMemo(() => {
        if (user?.role === USER_ROLE_ENUM.SUPER_ADMIN) {
            return admin;
        } else if (user?.role === USER_ROLE_ENUM.SUB_ADMIN) {
            return subAdmin;
        }
        return [];
    }, [user?.role]);

    // Memoized tab item component
    const TabItem = useCallback(({ item, isActive }: { item: any; isActive: boolean }) => (
        <button
            onClick={() => setTab(item.title)}
            className={`group relative min-h-[46px] py-2 w-[90%] flex justify-start items-center gap-3 px-4 mb-1 cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
                isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-blue-100/70 hover:bg-white/5 hover:text-white'
            }`}
        >
            {/* Active Indicator Line */}
            {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r-full" />
            )}
            
            <item.icon size={20} className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className={`text-sm font-semibold text-left leading-tight transition-all duration-300 ${isActive ? 'tracking-wide' : 'tracking-normal'}`}>
                {item.title}
            </span>
        </button>
    ), [setTab]);

    if (!user) {
        return null;
    }

    return (
        <div className="w-[260px] md:w-[280px] lg:w-[300px] h-full flex flex-col items-center py-4 shrink-0 bg-gray-50/50 border-r border-gray-200">
            <div className="w-[90%] h-full bg-[#125BAC] shadow-2xl shadow-blue-900/20 rounded-[2rem] relative flex flex-col items-center pt-6 pb-4 overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                
                <div className="w-full flex flex-col items-center gap-1 overflow-y-auto custom-scrollbar px-2 flex-1 scroll-smooth">
                    <div className="w-full px-6 mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/50">Menu</p>
                    </div>
                    
                    {user.role === USER_ROLE_ENUM.SUPER_ADMIN || user.role === USER_ROLE_ENUM.SUB_ADMIN ? (
                        tabs.map((item, idx) => (
                            <React.Fragment key={item.title}>
                                {idx === 1 && (
                                    <div className="w-full px-6 mt-4 mb-2">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/50">Management</p>
                                    </div>
                                )}
                                <TabItem
                                    item={item}
                                    isActive={item.title === activeTab}
                                />
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="w-full h-full flex items-center justify-center p-4">
                            <h1 className="text-white text-center font-medium opacity-60">
                                Restricted Access
                            </h1>
                        </div>
                    )}
                </div>

                {/* Logout area - More compact */}
                <div className="w-full px-4 mt-2 pt-2 border-t border-white/5">
                    <button
                        onClick={logOut}
                        className="w-full h-[40px] flex items-center gap-3 px-6 text-red-200/80 hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-300 cursor-pointer group"
                    >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}