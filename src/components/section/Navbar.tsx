import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import Logo from "/icons/logo.svg";

// Static imports
import userIcon from "/icons/users.svg";
import messagesIcon from "/icons/messages.svg";
import notificationIcon from "/icons/notification.svg";
import Profile from "../ui/Profile.tsx";
import {useNavigate} from "react-router-dom";

export default function Navbar () {

    const navigate = useNavigate();
    const user = 2;
    const notification = 8;
    const messages = 9;

    return (
        <nav className={"w-full h-[70px] border-b border-gray-200 bg-white"}>
            <div className={"w-full h-full px-6 mx-auto flex justify-between items-center"}>
                <div className={"w-[180px] h-[40px] flex items-center"}>
                     <ImageWithSkeleton src={Logo} />
                </div>
                <div className={"min-w-[120px] h-full flex justify-between items-center gap-[20px]"}>
                    <div
                        onClick={() => navigate("")}
                        className={"relative cursor-pointer flex justify-center items-center w-[32px] h-[32px]"}
                    >
                        <ImageWithSkeleton src={userIcon} />
                        <span className={"absolute -bottom-1 -right-1 w-[14px] h-[14px] text-white flex justify-center items-center text-[10px] rounded-full bg-red-600"}>{user}</span>
                    </div>
                    <div
                        onClick={() => navigate("")}
                        className={"relative cursor-pointer flex justify-center items-center w-[32px] h-[32px]"}
                    >
                        <ImageWithSkeleton src={messagesIcon} />
                        <span className={"absolute -top-1 -right-1 w-[14px] h-[14px] text-white flex justify-center items-center text-[10px] rounded-full bg-red-600"}>{messages}</span>
                    </div>
                    <div
                        onClick={() => navigate("")}
                        className={"relative cursor-pointer flex justify-center items-center w-[32px] h-[32px]"}
                    >
                        <ImageWithSkeleton src={notificationIcon} />
                        <span className={"absolute -bottom-1 -right-1 w-[14px] h-[14px] text-white flex justify-center items-center text-[10px] rounded-full bg-red-600"}>{notification}</span>
                    </div>
                    <Profile />
                </div>
            </div>
        </nav>
    )
}