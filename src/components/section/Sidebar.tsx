import {
    Banknote,
    Calendar1, CalendarDays, CalendarMinus,
    ChartNetwork,
    ClipboardPlus, CreditCard,
    LogOut,
    LucideLayoutDashboard, MessageCircleQuestionMark, ReceiptText, Siren,
    TrainFrontTunnel,
    UserRound,
    UsersRound
} from "lucide-react";
import Cookies from "js-cookie";
import {TOKEN_NAME} from "@/enum/token.enum.ts";
import {toast} from "sonner";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@/redux/stores/store.ts";
import {USER_ROLE_ENUM} from "@/enum/role.enum.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {setTabOnState} from "@/redux/reducers/tabSlice.ts";

export default function Sidebar () {

    const { user } = useSelector( (state: RootState ) => state.auth );

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const admin = [
        {
            icon: LucideLayoutDashboard,
            title: "Overview",
        },
        {
            icon: TrainFrontTunnel,
            title: "Sub Admin Management",
        },
        {
            icon: UserRound,
            title: "Employee Management",
        },
        {
            icon: ChartNetwork,
            title: "Profit",
        },
        {
            icon: ClipboardPlus,
            title: "HRMC Audit Report",
        },
        {
            icon: UsersRound,
            title: "Audit Log",
        },
        {
            icon: CreditCard,
            title: "Subscription Management",
        },
        {
            icon: ReceiptText,
            title: "Terms & Condition",
        },
        {
            icon: Siren,
            title: "Privacy Policy",
        },
        {
            icon: UserRound,
            title: "My Profile",
        },
        {
            icon: MessageCircleQuestionMark,
            title: "Help & Support",
        },
    ]

    const subAdmin = [
        {
            icon: LucideLayoutDashboard,
            title: "Overview",
        },
        {
            icon: UsersRound,
            title: "User Management",
        },
        {
            icon: Calendar1,
            title: "Attendance Management",
        },
        {
            icon: CalendarMinus,
            title: "Leave Management",
        },
        {
            icon: CalendarDays,
            title: "Task Management",
        },
        {
            icon: Banknote,
            title: "Pay Sli",
        },
        {
            icon: CreditCard,
            title: "Subscription Management",
        },
        {
            icon: ReceiptText,
            title: "Terms & Condition",
        },
        {
            icon: Siren,
            title: "Privacy Policy",
        },
        {
            icon: UserRound,
            title: "My Profile",
        },
        {
            icon: MessageCircleQuestionMark,
            title: "Help & Support",
        },
    ]

    const logOut = () => {

        Cookies.remove(TOKEN_NAME.USER_INFO);
        Cookies.remove(TOKEN_NAME.HRM_FIRM);

        toast.info("Your was successfully logged out.");

        window.location.reload();
    }

    const setTab = (tab: string) => {
        setSearchParams({tab});
        dispatch(setTabOnState({tab}));
        toast.success(`${tab} active successfully!`, {position: "top-right"});
    }

    const activeTab = searchParams.get("tab");

    useEffect(() => {
        setTab(admin[0].title)
    },[])

    return (
        <div className={"w-[400px] h-full flex justify-center items-center relative"}>
            <div className="w-[90%] h-[95%] bg-[#125BAC] text-white rounded-3xl relative flex flex-col items-end">
                {user?.role === USER_ROLE_ENUM.ADMIN ? (
                    admin.map((Item, index) => (
                        <div
                            key={index}
                            onClick={() => setTab(Item.title)}
                            className={ Item.title == activeTab ? `text-[#125BAC] h-[50px] w-[95%] rounded-bl-full rounded-tl-full bg-white flex justify-start items-center gap-2 pl-4 mt-[6%] cursor-pointer duration-200 ease-in-out` : `text-white h-[50px] w-[95%] rounded-bl-full rounded-tl-full flex justify-start items-center gap-2 pl-4 mt-[6%] cursor-pointer duration-200 ease-in-out` }
                        >
                            <Item.icon />
                            <span className="font-bold text-sm">{Item.title}</span>
                        </div>
                    ))
                ) : user?.role === USER_ROLE_ENUM.SUB_ADMIN ? (
                    subAdmin.map((Item, index) => (
                        <div
                            key={index}
                            onClick={() => setTab(Item.title)}
                            className={ Item.title == activeTab ? `text-[#125BAC] h-[50px] w-[95%] rounded-bl-full rounded-tl-full bg-white flex justify-start items-center gap-2 pl-4 mt-[6%] cursor-pointer duration-200 ease-in-out` : `text-white h-[50px] w-[95%] rounded-bl-full rounded-tl-full flex justify-start items-center gap-2 pl-4 mt-[6%] cursor-pointer duration-200 ease-in-out` }
                        >
                            <Item.icon />
                            <span className="font-bold text-sm">{Item.title}</span>
                        </div>
                    ))
                ) : (
                    <h1>This is not an admin account</h1>
                )}
            </div>
            {/* Logout button */}
            <div onClick={() => logOut()} className={"absolute cursor-pointer bottom-9 left-9 text-white flex gap-2"}>
                <LogOut />
                <span>Logout</span>
            </div>
        </div>
    )
}