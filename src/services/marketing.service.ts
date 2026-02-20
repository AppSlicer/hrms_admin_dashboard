import { apiRequest } from '../lib/api';

export const marketingService = {
  createCampaign: async (data: any) => {
    return apiRequest<any>('/marketing/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getCampaigns: async () => {
    return apiRequest<any[]>('/marketing/campaigns');
  },

  getCampaignById: async (id: string) => {
    return apiRequest<any>(`/marketing/campaigns/${id}`);
  },

  getQueueStats: async () => {
    return apiRequest<any>('/marketing/queue-stats');
  },

  updateCampaign: async (id: string, data: any) => {
    return apiRequest<any>(`/marketing/campaigns/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteCampaign: async (id: string) => {
    return apiRequest<any>(`/marketing/campaigns/${id}`, {
      method: 'DELETE',
    });
  },

  startCampaign: async (id: string) => {
    return apiRequest<any>(`/marketing/campaigns/${id}/start`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  },
};
