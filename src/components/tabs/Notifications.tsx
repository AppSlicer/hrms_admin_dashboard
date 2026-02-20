import { Bell, CheckCircle2, Clock, Info, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Notifications() {
    const notifications = [
        {
            id: 1,
            title: "New Sub Admin Created",
            desc: "A new sub-admin account was created for John Doe.",
            time: "2 minutes ago",
            type: "success",
            icon: CheckCircle2,
            color: "text-green-500 bg-green-50"
        },
        {
            id: 2,
            title: "System Update",
            desc: "The system will undergo maintenance at 12:00 PM.",
            time: "1 hour ago",
            type: "info",
            icon: Info,
            color: "text-blue-500 bg-blue-50"
        },
        {
            id: 3,
            title: "Security Alert",
            desc: "Multiple failed login attempts detected from IP 192.168.1.1",
            time: "3 hours ago",
            type: "alert",
            icon: ShieldAlert,
            color: "text-red-500 bg-red-50"
        },
        {
            id: 4,
            title: "Leave Request",
            desc: "Sarah Jenkins has submitted a new leave request.",
            time: "5 hours ago",
            type: "pending",
            icon: Clock,
            color: "text-orange-500 bg-orange-50"
        }
    ];

    return (
        <div className="w-full h-full p-8 bg-gray-50 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-gray-500">Stay updated with the latest system activities</p>
                    </div>
                    <Button variant="outline" className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50">
                        Mark all as read
                    </Button>
                </div>

                <div className="space-y-4">
                    {notifications.map((notif) => (
                        <div 
                            key={notif.id}
                            className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md hover:translate-x-1"
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.color}`}>
                                <notif.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-gray-900">{notif.title}</h3>
                                    <span className="text-xs text-gray-400 font-medium">{notif.time}</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{notif.desc}</p>
                                <div className="mt-4 flex gap-2">
                                    <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600 hover:bg-blue-50 rounded-lg font-bold">
                                        View Details
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-400 hover:bg-gray-50 rounded-lg font-bold">
                                        Dismiss
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {notifications.length === 0 && (
                    <div className="text-center py-20">
                        <Bell size={64} className="mx-auto text-gray-200 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400">All caught up!</h3>
                        <p className="text-gray-400">No new notifications at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
