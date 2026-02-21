import { apiRequest } from '../lib/api';

export const profileService = {
  getProfile: async () => {
    return apiRequest<any>('/profile');
  },

  updateProfile: async (data: any) => {
    return apiRequest<any>('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('accessToken');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8089';
    const response = await fetch(`${API_BASE_URL}/api/v1/profile/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Upload failed');
    return data.data;
  },
};
