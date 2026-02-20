import { apiRequest } from '../lib/api';

export const notificationService = {
  getNotifications: async (page = 0, size = 10) => {
    return apiRequest<any>(`/notifications?page=${page}&size=${size}`);
  },

  getUnreadCount: async () => {
    return apiRequest<any>('/notifications/unread-count');
  },

  markAsRead: async (id: string) => {
    return apiRequest<any>(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  markAllAsRead: async () => {
    return apiRequest<any>('/notifications/mark-all-read', {
      method: 'PATCH',
    });
  },

  deleteNotification: async (id: string) => {
    return apiRequest<any>(`/notifications/${id}`, {
      method: 'DELETE',
    });
  },
};
