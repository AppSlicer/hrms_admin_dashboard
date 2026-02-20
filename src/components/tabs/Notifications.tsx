import { Bell, CheckCircle2, Clock, Info, ShieldAlert, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { notificationService } from "@/services/notification.service";
import { toast } from "sonner";

export default function Notifications() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const data = await notificationService.getNotifications();
            setNotifications(data.content || []);
        } catch (error: any) {
            toast.error(error.message || "Failed to load notifications");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAllRead = async () => {
        try {
            await notificationService.markAllAsRead();
            toast.success("All notifications marked as read");
            fetchNotifications();
        } catch (error: any) {
            toast.error(error.message || "Operation failed");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await notificationService.deleteNotification(id);
            setNotifications(notifications.filter(n => n.id !== id));
            toast.success("Notification deleted");
        } catch (error: any) {
            toast.error(error.message || "Delete failed");
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'LEAVE': return { icon: Clock, color: "text-orange-500 bg-orange-50" };
            case 'TASK': return { icon: CheckCircle2, color: "text-green-500 bg-green-50" };
            case 'SECURITY': return { icon: ShieldAlert, color: "text-red-500 bg-red-50" };
            default: return { icon: Info, color: "text-blue-500 bg-blue-50" };
        }
    };

    if (isLoading) return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-[#125BAC] animate-spin" />
            <p className="text-blue-600 font-semibold">Syncing notifications...</p>
        </div>
    );

    return (
        <div className="w-full h-full p-8 bg-gray-50 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-gray-500">Stay updated with the latest system activities</p>
                    </div>
                    {notifications.length > 0 && (
                        <Button 
                            onClick={handleMarkAllRead}
                            variant="outline" 
                            className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 cursor-pointer"
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>

                <div className="space-y-4">
                    {notifications.map((notif) => {
                        const { icon: Icon, color } = getIcon(notif.type);
                        return (
                            <div 
                                key={notif.id}
                                className={`bg-white p-6 rounded-[1.5rem] shadow-sm border flex gap-4 transition-all hover:shadow-md ${notif.status === 'UNREAD' ? 'border-blue-200' : 'border-gray-100 opacity-80'}`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-bold ${notif.status === 'UNREAD' ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {notif.title}
                                            {notif.status === 'UNREAD' && <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block" />}
                                        </h3>
                                        <span className="text-xs text-gray-400 font-medium">{new Date(notif.createdAt).toLocaleString()}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{notif.description}</p>
                                    <div className="mt-4 flex gap-2">
                                        <Button 
                                            onClick={() => handleDelete(notif.id)}
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-8 text-xs text-red-500 hover:bg-red-50 rounded-lg font-bold cursor-pointer"
                                        >
                                            <Trash2 size={14} className="mr-1" /> Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
