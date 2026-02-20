import { apiRequest } from '../lib/api';

export const userService = {
  getMe: async () => {
    return apiRequest<any>('/users/me');
  },

  createSubAdmin: async (payload: any) => {
    return apiRequest<any>('/users/sub-admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getSubAdmins: async () => {
    return apiRequest<any[]>('/users/sub-admins');
  },

  updateStatus: async (id: string, status: string) => {
    return apiRequest<any>(`/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  blockUser: async (id: string) => {
    return apiRequest<any>(`/users/${id}/block`, {
      method: 'PATCH',
    });
  },

  deleteSubAdmin: async (id: string) => {
    return apiRequest<any>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};
