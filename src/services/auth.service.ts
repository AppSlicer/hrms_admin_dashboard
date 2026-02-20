import { apiRequest } from '../lib/api';

export const authService = {
  login: async (payload: any) => {
    return apiRequest<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  
  // Add other auth methods as needed
};
