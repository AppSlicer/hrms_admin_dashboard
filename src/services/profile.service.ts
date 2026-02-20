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
    const response = await fetch('http://164.68.121.216:8089/api/v1/profile/upload', {
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
