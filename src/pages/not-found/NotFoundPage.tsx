
export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6">
            {/* Animated Icon */}
            <div className="relative">
                <div className="absolute inset-0 blur-xl bg-red-500/40 rounded-full w-24 h-24 animate-ping"></div>
                <svg
                    className="mx-auto h-24 w-24 text-red-500 drop-shadow-lg animate-bounce relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                </svg>
            </div>

            {/* Text */}
            <h1 className="text-7xl font-extrabold mt-8 tracking-tight">
                4<span className="text-red-500">0</span>4
            </h1>
            <p className="text-gray-400 mt-4 text-lg max-w-md text-center">
                Oops! The page you’re looking for doesn’t exist or has been moved.
            </p>

            {/* Button */}
            <a
                href="/"
                className="mt-8 inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-red-600 transition-all duration-300 hover:scale-105"
            >
                Back to Home
            </a>

            {/* Subtle Decoration */}
            <div className="absolute bottom-6 text-gray-600 text-sm select-none">
                © {new Date().getFullYear()} HRM Firm
            </div>
        </div>
    )
}