import { apiRequest } from '../lib/api';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface TaskEmployee {
  id: string;
  firstName: string;
  lastName: string;
  employeeCode: string | null;
  profileImage: string | null;
  user?: { email: string };
  companyInfo?: { designation: string | null; department: string | null };
}

export interface TaskAssignment {
  id: string;
  taskId: string;
  employeeId: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  employee: TaskEmployee;
}

export interface TaskNote {
  id: string;
  taskId: string;
  note: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  description: string;
  assignedBy: string;
  startDate: string;
  endDate: string;
  breakTime: number | null;
  priority: TaskPriority;
  status: TaskStatus;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  assignments: TaskAssignment[];
  notes: TaskNote[];
  // only present in admin queries
  employer?: {
    id: string;
    companyName: string | null;
    user?: { email: string; firstName: string; lastName: string };
  };
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface TaskPage {
  content: Task[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  byPriority: { low: number; medium: number; high: number; urgent: number };
}

// ─── Admin / Sub-Admin Task Service ────────────────────────────────────────

export const taskService = {
  /** GET /api/v1/admin/dashboard/tasks — for SUB_ADMIN and SUPER_ADMIN */
  getAdminTasks: async (params: {
    page?: number;
    size?: number;
    status?: string;
    priority?: string;
    search?: string;
    employerId?: string;
  }): Promise<{ content: Task[]; totalElements: number; totalPages: number; size: number; number: number; first: boolean; last: boolean }> => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.append('page', params.page.toString());
    if (params.size !== undefined) query.append('size', params.size.toString());
    if (params.status) query.append('status', params.status);
    if (params.priority) query.append('priority', params.priority);
    if (params.search) query.append('search', params.search);
    if (params.employerId) query.append('employerId', params.employerId);

    // Use raw fetch to handle pagination shape
    const token = localStorage.getItem('accessToken');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8089';
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/dashboard/tasks?${query.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Failed to fetch tasks');
    return {
      content: json.data || [],
      totalElements: json.pagination?.totalElements ?? 0,
      totalPages: json.pagination?.totalPages ?? 1,
      size: json.pagination?.size ?? 10,
      number: json.pagination?.number ?? 0,
      first: json.pagination?.first ?? true,
      last: json.pagination?.last ?? true,
    };
  },

  /** GET /api/v1/admin/dashboard/tasks/:id — full task detail */
  getAdminTaskById: async (id: string): Promise<Task> => {
    return apiRequest<Task>(`/admin/dashboard/tasks/${id}`);
  },
};
