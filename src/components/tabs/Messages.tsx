import { useState } from "react";
import { Search, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Messages() {
    const [selectedChat, setSelectedChat] = useState<number | null>(1);

    const chats = [
        { id: 1, name: "MD Sohidul Islam", lastMsg: "Hello, how are you?", time: "10:30 AM", unread: 2 },
        { id: 2, name: "Shakir Ahmed", lastMsg: "The report is ready.", time: "Yesterday", unread: 0 },
        { id: 3, name: "System Admin", lastMsg: "Welcome to HRMS!", time: "2 days ago", unread: 0 },
    ];

    return (
        <div className="w-full h-full flex bg-gray-50 dark:bg-black/20 overflow-hidden">
            {/* Sidebar - Chat List */}
            <div className="w-[350px] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-card flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <h1 className="text-2xl font-bold mb-4 dark:text-white">Messages</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input className="pl-10 rounded-xl bg-gray-50 dark:bg-gray-900 border-none dark:text-white" placeholder="Search chats..." />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {chats.map(chat => (
                        <div 
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
                                <User className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold truncate dark:text-gray-200">{chat.name}</h3>
                                    <span className="text-[10px] text-gray-400">{chat.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMsg}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="w-5 h-5 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white dark:bg-card m-4 rounded-[2rem] shadow-sm border border-gray-200 dark:border-gray-800">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                    <User className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold dark:text-white">
                                        {chats.find(c => c.id === selectedChat)?.name}
                                    </h3>
                                    <span className="text-xs text-green-500 font-medium">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                            <div className="self-start max-w-[70%] bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none">
                                <p className="text-sm dark:text-gray-300">Hello! I wanted to ask about the new policy update.</p>
                                <span className="text-[10px] text-gray-400 mt-1 block">10:30 AM</span>
                            </div>
                            <div className="self-end max-w-[70%] bg-[#125BAC] text-white p-4 rounded-2xl rounded-tr-none">
                                <p className="text-sm">Sure, I can help with that. Which part are you interested in?</p>
                                <span className="text-[10px] text-blue-200 mt-1 block text-right">10:32 AM</span>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex gap-2">
                                <Input className="flex-1 h-12 rounded-xl dark:bg-gray-900 dark:border-gray-800 dark:text-white" placeholder="Type a message..." />
                                <Button className="h-12 w-12 rounded-xl bg-[#125BAC] dark:bg-blue-600 flex items-center justify-center p-0">
                                    <Send size={20} className="text-white" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <User size={64} className="mb-4 opacity-20" />
                        <p className="font-bold">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
