

interface StatCardProps {
    title: string;
    value: number;
    className?: string;
}

export default function StatCard({ title, value, className = "" }: StatCardProps) {
    return (
        <div className={`rounded-lg px-4 py-6 md:px-6 shadow-lg bg-white border border-gray-100 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 ${className}`}>
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-600 mb-2 truncate">{title}</h3>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#125BAC]">{value.toLocaleString()}</h2>
        </div>
    );
}