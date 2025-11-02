import type {ReactNode} from "react";
import Navbar from "@/components/section/Navbar.tsx";
import Sidebar from "@/components/section/Sidebar.tsx";

export default function DashboardLayout ({ children }:{ children: ReactNode }) {
    return (
        <main className={"w-full h-[88vh]"}>
            <Navbar />
            <div className={"w-full h-full flex"}>
                <Sidebar />
                <div className={"w-full h-full overflow-auto"}>{ children }</div>
            </div>
        </main>
    )
}