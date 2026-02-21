import { apiRequest } from '../lib/api';

export interface AuditLog {
  id: string;
  userId: string | null;
  userEmail: string | null;
  userRole: string | null;
  action: string;
  resource: string | null;
  resourceId: string | null;
  description: string;
  status: 'SUCCESS' | 'FAILURE';
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, any> | null;
  errorMessage: string | null;
  createdAt: string;
}

export interface AuditLogPage {
  content: AuditLog[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface AuditStats {
  total: number;
  totalSuccess: number;
  totalFailure: number;
  successRate: number;
  topActions: { action: string; count: number }[];
  byRole: { role: string; count: number }[];
  byResource: { resource: string; count: number }[];
  recentActivity: AuditLog[];
}

export interface AuditLogQuery {
  page?: number;
  size?: number;
  userId?: string;
  userEmail?: string;
  userRole?: string;
  action?: string;
  resource?: string;
  resourceId?: string;
  status?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  sortDirection?: 'asc' | 'desc';
}

export const auditLogService = {
  getLogs: async (params: AuditLogQuery): Promise<AuditLogPage> => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.append('page', params.page.toString());
    if (params.size !== undefined) query.append('size', params.size.toString());
    if (params.userId) query.append('userId', params.userId);
    if (params.userEmail) query.append('userEmail', params.userEmail);
    if (params.userRole) query.append('userRole', params.userRole);
    if (params.action) query.append('action', params.action);
    if (params.resource) query.append('resource', params.resource);
    if (params.resourceId) query.append('resourceId', params.resourceId);
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.fromDate) query.append('fromDate', params.fromDate);
    if (params.toDate) query.append('toDate', params.toDate);
    if (params.sortDirection) query.append('sortDirection', params.sortDirection);
    // apiRequest returns data.data, but pagination is in data.pagination — use raw fetch
    const token = localStorage.getItem('accessToken');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8089';
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/audit-logs?${query.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Failed to fetch audit logs');
    // Response shape: { data: [...], pagination: {...} }
    return {
      content: json.data || [],
      totalElements: json.pagination?.totalElements ?? 0,
      totalPages: json.pagination?.totalPages ?? 1,
      size: json.pagination?.size ?? 20,
      number: json.pagination?.number ?? 0,
      first: json.pagination?.first ?? true,
      last: json.pagination?.last ?? true,
    };
  },

  getStats: async (fromDate?: string, toDate?: string): Promise<AuditStats> => {
    const query = new URLSearchParams();
    if (fromDate) query.append('fromDate', fromDate);
    if (toDate) query.append('toDate', toDate);
    return apiRequest<AuditStats>(`/admin/audit-logs/stats?${query.toString()}`);
  },

  getActions: async (): Promise<string[]> => {
    return apiRequest<string[]>('/admin/audit-logs/actions');
  },

  getById: async (id: string): Promise<AuditLog> => {
    return apiRequest<AuditLog>(`/admin/audit-logs/${id}`);
  },

  purge: async (olderThanDays: number): Promise<{ deleted: number; cutoffDate: string }> => {
    return apiRequest<{ deleted: number; cutoffDate: string }>(
      `/admin/audit-logs/purge?olderThanDays=${olderThanDays}`,
      { method: 'DELETE' }
    );
  },
};
