import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import { useDispatch, useSelector} from "react-redux";
import type {RootState} from "@/redux/stores/store.ts";
import {useNavigate} from "react-router-dom";
import {setTabOnState} from "@/redux/reducers/tabSlice.ts";

export default function Profile () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth );

    const goToProfile = () => {
        dispatch(setTabOnState({ tab: "My Profile" }));
        navigate("/profile");
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