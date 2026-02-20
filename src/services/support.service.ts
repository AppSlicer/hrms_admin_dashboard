import { apiRequest } from '../lib/api';

export const supportService = {
  createTicket: async (data: { subject: string; message: string }) => {
    return apiRequest<any>('/support/tickets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getMyTickets: async () => {
    return apiRequest<any[]>('/support/tickets/my');
  },

  getAllTickets: async () => {
    return apiRequest<any[]>('/support/tickets/all');
  },

  updateTicketStatus: async (id: string, status: string) => {
    return apiRequest<any>(`/support/tickets/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  replyToTicket: async (id: string, reply: string) => {
    return apiRequest<any>(`/support/tickets/${id}/reply`, {
      method: 'PATCH',
      body: JSON.stringify({ reply }),
    });
  },
};
