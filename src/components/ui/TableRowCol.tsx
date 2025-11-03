import React from "react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export default function TableRowCol(props: Props) {

    return (
        <div className={`w-full h-full flex justify-center items-center text-black border-[#A7A7A7] border-r ${props.children}`}>
            { props.children }
        </div>
    )
}