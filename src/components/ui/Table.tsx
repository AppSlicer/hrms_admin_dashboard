import React, { useState } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    totalPages?: number;
}

export default function Table({ children, className, totalPages = 5 }: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="w-full flex flex-col mt-5 border rounded-sm overflow-hidden bg-white">
            <div className="overflow-x-auto">
                <div className={`min-w-[1000px] ${className}`}>
                    {children}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border-t bg-gray-50">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-sm rounded-md border ${
                        currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-100 border-blue-400"
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
                                        : "hover:bg-blue-100 border-blue-400"
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <div className="sm:hidden text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 text-sm rounded-md border ${
                        currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-100 border-blue-400"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
