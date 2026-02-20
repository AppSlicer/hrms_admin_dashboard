import React from "react";


interface ITableRowProps {
    className?: string;
    children?: React.ReactNode;
}

export default function TableRow ({
                                    className,
                                    children,
                                  }: ITableRowProps) {
    return (
        <div className={`w-full flex items-stretch overflow-hidden border-b border-gray-200 dark:border-gray-800 min-h-[50px] ${className}`}>
            {children}
        </div>
    )
}