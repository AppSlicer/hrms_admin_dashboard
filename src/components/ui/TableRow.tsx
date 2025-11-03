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
        <div className={`w-full flex justify-between overflow-hidden border ${className}`}>
            {children}
        </div>
    )
}