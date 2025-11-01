import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "@/redux/stores/store.ts";

export default function Profile () {

    const { user } = useSelector((state: RootState) => state.auth );

    return (
        <div className={"min-w-[120px] h-[45px] flex justify-center items-center"}>
            <div className={"w-[45px] h-[45x] rounded-full bg-green-200 overflow-hidden"}>
                <ImageWithSkeleton src={user?.image!} />
            </div>
            <div className={"flex flex-col ml-2 border-l border-[#BFBFBF] pl-2"}>
                <h1 className={"text-xl font-semibold text-[#0062EB]"}>
                    {
                        user?.name
                            ?.toString()
                            ?.split(" ")
                            .map((word, i) => (i < 2 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word))
                            .join(" ")
                            .slice(0, 15)
                    }
                </h1>
                <h4 className={"text-sm"}>{user?.role}</h4>
            </div>
        </div>
    )
}