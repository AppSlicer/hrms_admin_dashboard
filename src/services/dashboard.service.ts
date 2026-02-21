import { apiRequest } from '../lib/api';

export const dashboardService = {
  getAdminOverview: async () => {
    return apiRequest<any>('/admin/dashboard/overview');
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
