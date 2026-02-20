import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "@/enum/token.enum.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/stores/store.ts";
import { USER_ROLE_ENUM } from "@/enum/role.enum.ts";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useCallback } from "react";
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
            className={`h-[50px] w-[95%] rounded-bl-full rounded-tl-full flex justify-start items-center gap-3 pl-4 cursor-pointer duration-200 ease-in-out ${
                isActive
                    ? 'text-[#125BAC] bg-white'
                    : 'text-white hover:bg-blue-600'
            }`}
        >
            <item.icon size={18} />
            <span className="font-bold text-sm whitespace-nowrap">{item.title}</span>
        </button>
    ), [setTab]);

    if (!user) {
        return null;
    }

    return (
        <div className="w-[400px] h-full flex justify-center items-center relative">
            <div className="w-[230px] md:w-[260px] xl:w-[300px] pt-4 h-[95%] bg-[#125BAC] text-white rounded-3xl relative flex flex-col items-end">
                {user.role === USER_ROLE_ENUM.SUPER_ADMIN || user.role === USER_ROLE_ENUM.SUB_ADMIN ? (
                    tabs.map((item) => (
                        <TabItem
                            key={item.title}
                            item={item}
                            isActive={item.title === activeTab}
                        />
                    ))
                ) : (
                    <div className="w-full h-full flex items-center justify-center p-4">
                        <h1 className="text-white text-center font-medium">
                            This is not an admin account
                        </h1>
                    </div>
                )}
            </div>

            {/* Logout button */}
            <button
                onClick={logOut}
                className="absolute cursor-pointer bottom-9 left-9 text-white flex gap-2 items-center hover:text-blue-200 duration-200"
            >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
            </button>
        </div>
    );
}