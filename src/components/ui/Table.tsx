import React, { useState } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    totalPages?: number;
    minHeight?: string;
}

export default function Table({ children, className, totalPages = 5, minHeight = "450px" }: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="w-full flex flex-col mt-5 border-x border-b border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden bg-white dark:bg-card">
            <div className="overflow-x-auto flex-1" style={{ minHeight }}>
                <div className={`min-w-[1000px] h-full ${className}`}>
                    {children}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-sm rounded-md border dark:text-gray-300 ${
                        currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-100 dark:hover:bg-blue-900/20 border-blue-400"
                    }`}
                >
                    Previous
                </button>

                <div className="hidden sm:flex items-center gap-2">
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        if (totalPages > 7 && Math.abs(currentPage - page) > 2 && page !== 1 && page !== totalPages) return null;
                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-md text-sm font-medium border ${
                                    currentPage === page
                                        ? "bg-gradient-to-l from-[#003B8D] to-[#0062EB] text-white"
                                        : "hover:bg-blue-100 dark:hover:bg-blue-900/20 border-blue-400 dark:text-gray-300"
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <div className="sm:hidden text-sm font-medium dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 text-sm rounded-md border dark:text-gray-300 ${
                        currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-100 dark:hover:bg-blue-900/20 border-blue-400"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
