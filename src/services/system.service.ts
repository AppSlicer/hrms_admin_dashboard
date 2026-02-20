import { apiRequest } from '../lib/api';

export const systemService = {
  getTerms: async () => {
    return apiRequest<any>('/system/terms');
  },

  updateTerms: async (content: string) => {
    return apiRequest<any>('/system/terms', {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    });
  },

  getPrivacy: async () => {
    return apiRequest<any>('/system/privacy');
  },

  updatePrivacy: async (content: string) => {
    return apiRequest<any>('/system/privacy', {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    });
  },
};
