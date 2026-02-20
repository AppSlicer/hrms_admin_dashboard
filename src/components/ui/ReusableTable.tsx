import React from "react";
import Table from "./Table";
import TableRow from "./TableRow";
import TableRowCol from "./TableRowCol";
import { Loader2 } from "lucide-react";

export interface Column<T> {
    header: string;
    flex?: number;
    render?: (item: T, index: number) => React.ReactNode;
    accessor?: keyof T | string;
    align?: "left" | "center" | "right";
}

interface ReusableTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    minHeight?: string;
    emptyMessage?: string;
}

export default function ReusableTable<T extends { id?: string | number }>({
    columns,
    data,
    isLoading = false,
    totalPages = 1,
    minHeight = "450px",
    emptyMessage = "No data found."
}: ReusableTableProps<T>) {
    
    return (
        <Table totalPages={totalPages} minHeight={minHeight}>
            {/* Header */}
            <TableRow className="bg-[#C7E2FF] dark:bg-blue-900/30 h-[60px] border-b border-gray-200 dark:border-gray-800 font-bold">
                {columns.map((col, idx) => (
                    <TableRowCol 
                        key={`header-${idx}`} 
                        className={col.flex ? `flex-[${col.flex}]` : ""}
                        style={col.flex ? { flex: col.flex } : {}}
                    >
                        <h3 className="dark:text-white uppercase text-[11px] tracking-widest">{col.header}</h3>
                    </TableRowCol>
                ))}
            </TableRow>

            {/* Body */}
            {isLoading ? (
                <div className="flex-1 flex items-center justify-center min-h-[300px]">
                    <Loader2 className="w-8 h-8 animate-spin text-[#125BAC]" />
                </div>
            ) : data.length === 0 ? (
                <div className="flex-1 flex items-center justify-center min-h-[300px] text-gray-400 font-medium">
                    {emptyMessage}
                </div>
            ) : (
                data.map((item, index) => (
                    <TableRow 
                        key={item.id || index} 
                        className="h-[65px] border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    >
                        {columns.map((col, colIdx) => (
                            <TableRowCol 
                                key={`cell-${index}-${colIdx}`}
                                className={col.flex ? `flex-[${col.flex}]` : ""}
                                style={col.flex ? { flex: col.flex } : {}}
                            >
                                {col.render ? (
                                    col.render(item, index)
                                ) : (
                                    <span className="text-sm font-medium dark:text-gray-300 truncate px-2">
                                        {col.accessor ? (item[col.accessor as keyof T] as React.ReactNode) : ""}
                                    </span>
                                )}
                            </TableRowCol>
                        ))}
                    </TableRow>
                ))
            )}
        </Table>
    );
}
