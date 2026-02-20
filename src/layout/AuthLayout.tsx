import type { ReactNode} from "react";

function AuthLayout ({ children }: { children: ReactNode }) {
    return (
        <main className={"w-full min-h-svh relative flex justify-center items-center bg-white dark:bg-slate-950 overflow-hidden"}>

            {/* Round Elements */}
            <div className={"absolute -top-[50vh] -left-[60vh] xl:-left-[40vh] xl:-top-[70vh] w-[120vh] xl:w-[150vh] h-[120vh] xl:h-[150vh] rounded-full bg-gradient-to-r from-[#002282] to-[#0170DA]"} />
            <div className={"absolute -bottom-[50vh] -left-[50vh] w-[90vh] h-[90vh] xl:-bottom-[40vh] xl:-left-[40vh] rounded-full bg-gradient-to-r from-[#4A58F9] to-[#8BEAFE] shadow-md"} />
            <div className={"absolute top-[50vh] -right-[40vh] w-[80vh] h-[80vh] rounded-full bg-gradient-to-r to-[#4A58F9] from-[#8BEAFE] shadow-md"} />

            {/* Passed the Children props */}
            <div className="absolute w-full h-full flex justify-center md:justify-between items-center max-w-7xl md:max-w-full">{ children }</div>

        </main>
    )
}

AuthLayout.Left = function ({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`${className} hidden md:block`}>
            { children }
        </div>
    )
}

AuthLayout.Right = function ({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`${className}`}>
            { children }
        </div>
    )
}

export default AuthLayout;