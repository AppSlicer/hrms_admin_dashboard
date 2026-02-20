import React from "react";
import Tooltip from "./Tooltip";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export default function TableRowCol(props: Props) {
    const isString = typeof props.children === 'string';

    return (
        <div className={`flex-1 h-full flex justify-center items-center text-black dark:text-gray-300 border-[#A7A7A7] dark:border-gray-800 border-r last:border-r-0 px-2 overflow-hidden ${props.className || ""}`}>
            {isString ? (
                <Tooltip content={props.children as string}>
                    <span className="truncate block w-full text-center px-1">
                        { props.children }
                    </span>
                </Tooltip>
            ) : (
                <div className="w-full flex justify-center items-center overflow-hidden">
                    { props.children }
                </div>
            )}
        </div>
    )
}