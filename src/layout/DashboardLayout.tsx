import type {ReactNode} from "react";
import Navbar from "@/components/section/Navbar.tsx";
import Sidebar from "@/components/section/Sidebar.tsx";
// import {useSelector} from "react-redux";
// import type {RootState} from "@/redux/stores/store.ts";

export default function DashboardLayout ({ children }:{ children: ReactNode }) {

    // const { user, token } = useSelector( (state: RootState) => state.auth )

    return (
        <main className={"w-full h-[88vh]"}>
            <Navbar />
            <div className={"w-full h-full flex"}>
                <Sidebar />
                <div className={"w-full h-full"}>{ children }</div>
            </div>
        </main>
    )
}