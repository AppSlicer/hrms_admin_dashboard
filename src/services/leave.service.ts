import { apiRequest } from '../lib/api';

export const leaveService = {
  // Employee Endpoints
  requestLeave: async (data: {
    leaveType?: string;
    customLeaveTypeId?: string;
    startDate: string;
    endDate: string;
    reason?: string;
  }) => {
    return apiRequest<any>('/employee/leave', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getMyLeaves: async (params: { page?: number; limit?: number; status?: string }) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.status) query.append('status', params.status);
    return apiRequest<any>(`/employee/leave?${query.toString()}`);
  },

  getLeaveBalance: async () => {
    return apiRequest<any>('/employee/leave/balance');
  },

  cancelLeave: async (id: string) => {
    return apiRequest<any>(`/employee/leave/${id}`, {
      method: 'DELETE',
    });
  },

  // Employer Endpoints
  getLeaveRequests: async (params: { page?: number; size?: number; status?: string }) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.append('page', params.page.toString());
    if (params.size !== undefined) query.append('size', params.size.toString());
    if (params.status) query.append('status', params.status);
    return apiRequest<any>(`/employer/leave?${query.toString()}`);
  },

  approveLeave: async (id: string) => {
    return apiRequest<any>(`/employer/leave/${id}/approve`, {
      method: 'PATCH',
    });
  },

  rejectLeave: async (id: string, reason: string) => {
    return apiRequest<any>(`/employer/leave/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });
  },

  // Custom Leave Type Management (Employer)
  createLeaveType: async (data: { name: string; description?: string; daysPerYear: number }) => {
    return apiRequest<any>('/employer/leave/types', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getLeaveTypes: async () => {
    return apiRequest<any>('/employer/leave/types');
  },

  deleteLeaveType: async (id: string) => {
    return apiRequest<any>(`/employer/leave/types/${id}`, {
      method: 'DELETE',
    });
  },

  // Leave Balance Management (Employer)
  manageEmployeeBalance: async (data: {
    employeeId: string;
    leaveTypeId: string;
    totalDays: number;
    year?: number;
  }) => {
    return apiRequest<any>('/employer/leave/balances', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};
