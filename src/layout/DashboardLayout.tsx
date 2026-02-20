import type {ReactNode} from "react";
import Navbar from "@/components/section/Navbar.tsx";
import Sidebar from "@/components/section/Sidebar.tsx";

export default function DashboardLayout ({ children }:{ children: ReactNode }) {
    return (
        <main className={"w-full h-screen flex flex-col overflow-hidden"}>
            <Navbar />
            <div className={"w-full flex-1 flex overflow-hidden"}>
                <Sidebar />
                <div className={"flex-1 h-full overflow-auto"}>{ children }</div>
            </div>
        </main>
    )
}