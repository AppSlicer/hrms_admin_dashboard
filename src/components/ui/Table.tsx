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
        <div
            className={`min-w-[1400px] min-h-[75vh] mt-5 border rounded-sm overflow-hidden relative ${className}`}
        >
            {/* Table content */}
            <div className={"w-full h-full"}>{children}</div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 absolute bottom-0 w-full">
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

                <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
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
