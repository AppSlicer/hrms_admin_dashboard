import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@/redux/stores/store.ts";
import {useSearchParams} from "react-router-dom";
import {setTabOnState} from "@/redux/reducers/tabSlice.ts";
import {admin, subAdmin} from "@/enum/tab.enum.ts";
import {USER_ROLE_ENUM} from "@/enum/role.enum.ts";

export default function Profile () {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth );
    const [, setSearchParams] = useSearchParams();

    const goToProfile = () => {
        let profileTabTitle = "";
        if (user?.role === USER_ROLE_ENUM.SUPER_ADMIN) {
            profileTabTitle = admin.find(t => t.title === "My Profile")?.title || "My Profile";
        } else if (user?.role === USER_ROLE_ENUM.SUB_ADMIN) {
            profileTabTitle = subAdmin.find(t => t.title === "My Profile")?.title || "My Profile";
        }

        if (profileTabTitle) {
            setSearchParams({ tab: profileTabTitle });
            dispatch(setTabOnState({ tab: profileTabTitle }));
        }
    }

    return (
        <div onClick={goToProfile} className={"min-w-[120px] h-[45px] flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"}>
            <div className={"w-[45px] h-[45px] rounded-full bg-blue-100 overflow-hidden shrink-0 border-2 border-white shadow-sm"}>
                <ImageWithSkeleton src={user?.image!} />
            </div>
            <div className={"flex flex-col ml-2 border-l border-[#BFBFBF] pl-2 overflow-hidden"}>
                <h1 className={"text-base font-bold text-[#0062EB] truncate"}>
                    {
                        user?.name
                            ?.toString()
                            ?.split(" ")
                            .map((word, i) => (i < 2 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word))
                            .join(" ")
                            .slice(0, 15)
                    }
                </h1>
                <h4 className={"text-[10px] uppercase font-bold tracking-wider text-gray-500"}>{user?.role?.replace('_', ' ')}</h4>
            </div>
        </div>
    )
}