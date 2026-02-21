import { apiRequest } from '../lib/api';

export const dashboardService = {
  getAdminOverview: async () => {
    return apiRequest<any>('/admin/dashboard/overview');
  },

  getAdminAttendances: async (params: { page?: number; size?: number; search?: string; date?: string }) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.append('page', params.page.toString());
    if (params.size !== undefined) query.append('size', params.size.toString());
    if (params.search) query.append('search', params.search);
    if (params.date) query.append('date', params.date);
    return apiRequest<any>(`/admin/dashboard/attendance?${query.toString()}`);
  },

  updateAdminAttendanceStatus: async (id: string, data: { approvalStatus: string; adminNote?: string }) => {
    return apiRequest<any>(`/admin/dashboard/attendance/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getEmployeeDashboard: async () => {
    return apiRequest<any>('/employee/dashboard');
  },

  getEmployeeAttendanceSummary: async (month?: number, year?: number) => {
    const query = new URLSearchParams();
    if (month) query.append('month', month.toString());
    if (year) query.append('year', year.toString());
    return apiRequest<any>(`/employee/dashboard/attendance-summary?${query.toString()}`);
  },

  getEmployerDashboard: async () => {
    return apiRequest<any>('/employer/dashboard');
  }
};
