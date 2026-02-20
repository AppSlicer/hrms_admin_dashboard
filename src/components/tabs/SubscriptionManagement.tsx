import { Button } from "@/components/ui/button.tsx";
import { Check, Plus } from "lucide-react";

export default function SubscriptionManagement() {
    return (
        <div className="w-full h-full p-6 bg-transparent overflow-y-auto custom-scrollbar">
            {/* Header section */}
            <div className="w-full flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Subscription Plans</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Manage your service packages and pricing.</p>
                </div>
                <Button className="bg-green-600 dark:bg-green-700 hover:opacity-90 text-white rounded-full px-8 h-12 font-bold shadow-lg">
                    <Plus className="mr-2" size={20} /> Add Plan
                </Button>
            </div>

            {/* Cards Container */}
            <div className="flex flex-wrap justify-center items-stretch gap-8 py-10">
                {/* Standard Plan */}
                <div className="flex flex-col items-center gap-4 group">
                    <h2 className="text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">Standard</h2>
                    <div className="border-2 border-[#125BAC] dark:border-blue-500 w-[280px] rounded-[2.5rem] overflow-hidden relative bg-white dark:bg-card shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                        <div className="w-full h-[100px] bg-[#125BAC] dark:bg-blue-600 flex justify-center items-center">
                            <h1 className="text-center text-3xl text-white font-black">$0<span className="text-sm font-bold opacity-80">/3 month</span></h1>
                        </div>
                        <div className="w-full pb-[100px] px-6 py-6 space-y-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex justify-start gap-3 items-center">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-[#125BAC] dark:text-blue-400" strokeWidth={4} />
                                    </div>
                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Essential platform access</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-[90px] bg-gray-50 dark:bg-gray-900/50 flex justify-center items-center absolute bottom-0 border-t dark:border-gray-800">
                            <Button className="w-[160px] h-[45px] bg-[#125BAC] dark:bg-blue-600 rounded-xl font-bold shadow-lg">Edit Plan</Button>
                        </div>
                    </div>
                </div>

                {/* Premium Plan */}
                <div className="flex flex-col items-center gap-4 group">
                    <h2 className="text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">Premium</h2>
                    <div className="border-2 border-[#125BAC] dark:border-blue-500 w-[280px] rounded-[2.5rem] overflow-hidden relative bg-white dark:bg-card shadow-2xl transition-transform duration-500 hover:scale-[1.02] ring-4 ring-blue-100 dark:ring-blue-900/20">
                        <div className="w-full h-[100px] bg-gradient-to-br from-[#125BAC] to-[#003B8D] flex justify-center items-center">
                            <h1 className="text-center text-3xl text-white font-black">$19.99<span className="text-sm font-bold opacity-80">/6 month</span></h1>
                        </div>
                        <div className="w-full pb-[100px] px-6 py-6 space-y-4">
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <div key={i} className="flex justify-start gap-3 items-center">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-[#125BAC] dark:text-blue-400" strokeWidth={4} />
                                    </div>
                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Advanced team features</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-[90px] bg-gray-50 dark:bg-gray-900/50 flex justify-center items-center absolute bottom-0 border-t dark:border-gray-800">
                            <Button className="w-[160px] h-[45px] bg-[#125BAC] dark:bg-blue-600 rounded-xl font-bold shadow-lg">Edit Plan</Button>
                        </div>
                    </div>
                </div>

                {/* Custom Plan */}
                <div className="flex flex-col items-center gap-4 group">
                    <h2 className="text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">Custom</h2>
                    <div className="border-2 border-[#125BAC] dark:border-blue-500 w-[280px] rounded-[2.5rem] overflow-hidden relative bg-white dark:bg-card shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                        <div className="w-full h-[100px] bg-[#125BAC] dark:bg-blue-600 flex justify-center items-center">
                            <h1 className="text-center text-3xl text-white font-black">$49.99<span className="text-sm font-bold opacity-80">/Year</span></h1>
                        </div>
                        <div className="w-full pb-[100px] px-6 py-6 space-y-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex justify-start gap-3 items-center">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-[#125BAC] dark:text-blue-400" strokeWidth={4} />
                                    </div>
                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Enterprise custom logic</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-[90px] bg-gray-50 dark:bg-gray-900/50 flex justify-center items-center absolute bottom-0 border-t dark:border-gray-800">
                            <Button className="w-[160px] h-[45px] bg-[#125BAC] dark:bg-blue-600 rounded-xl font-bold shadow-lg">Edit Plan</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
