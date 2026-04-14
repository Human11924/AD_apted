import type { AccessCodeRecord, GroupRecord, MetricCard, StudentRecord } from "@/types/dashboard";

import { apiClient } from "./client";
import { accessCodes, employerGroups, employerMetrics, employerStudents } from "./mockData";

interface CompanyOrdersSummaryResponse {
  company_id: number;
  orders_count: number;
  total_seats: number;
  used_seats: number;
  available_seats: number;
}

interface EmployerSummaryResponse {
  total_students: number;
  total_groups: number;
  total_courses: number;
  total_lessons_completed: number;
  total_lessons_available: number;
  completion_percent: number;
}

interface EmployerStudentProgressItemResponse {
  student_id: number;
  full_name: string;
  company_id: number;
  department: string | null;
  group_names: string[];
  lessons_completed: number;
  total_lessons: number;
  progress_percent: number;
}

interface CourseGroupResponse {
  id: number;
  name: string;
  course_id: number;
  company_id: number;
  teacher_id: number | null;
  start_date: string | null;
  end_date: string | null;
  max_students: number | null;
  format: string;
  course_title: string | null;
  teacher_name: string | null;
  active_students: number;
  departments: string[];
}

interface AccessCodeResponse {
  id: number;
  company_order_id: number;
  code: string;
  max_uses: number;
  used_count: number;
  expires_at: string;
  is_active: boolean;
  used_by: string[];
}

async function withMock<T>(fallback: T, request: () => Promise<T>): Promise<T> {
  try {
    return await request();
  } catch {
    return fallback;
  }
}

export const dashboardService = {
  async getEmployerMetrics(): Promise<MetricCard[]> {
    return withMock(employerMetrics, async () => {
      const [ordersSummary, employerSummary] = await Promise.all([
        apiClient.get<CompanyOrdersSummaryResponse>("/company-orders/me/summary"),
        apiClient.get<EmployerSummaryResponse>("/employer/summary"),
      ]);

      return [
        {
          title: "Purchased Seats",
          value: String(ordersSummary.data.total_seats),
          trend: `${ordersSummary.data.orders_count} active orders`,
        },
        {
          title: "Used Seats",
          value: String(ordersSummary.data.used_seats),
          trend: `${ordersSummary.data.available_seats} available`,
        },
        {
          title: "Avg Completion",
          value: `${Math.round(employerSummary.data.completion_percent)}%`,
          trend: `${employerSummary.data.total_lessons_completed} lessons completed`,
        },
        {
          title: "Active Groups",
          value: String(employerSummary.data.total_groups),
          trend: `${employerSummary.data.total_students} students`,
        },
      ];
    });
  },

  async getEmployerStudents(): Promise<StudentRecord[]> {
    return withMock(employerStudents, async () => {
      const { data } = await apiClient.get<EmployerStudentProgressItemResponse[]>("/employer/students/progress");
      return data.map((student) => ({
        id: `S-${student.student_id}`,
        name: student.full_name,
        department: student.department?.trim() || "-",
        group: student.group_names.length > 0 ? student.group_names.join(", ") : "-",
        progress: student.progress_percent,
        status: student.progress_percent >= 95 ? "completed" : student.progress_percent < 45 ? "at-risk" : "active",
      }));
    });
  },

  async getEmployerGroups(): Promise<GroupRecord[]> {
    return withMock(employerGroups, async () => {
      const { data } = await apiClient.get<CourseGroupResponse[]>("/course-groups/me");
      return data.map((group) => ({
        id: `G-${group.id}`,
        name: group.name,
        course: group.course_title || `Course #${group.course_id}`,
        teacher: group.teacher_name || (group.teacher_id ? `Teacher #${group.teacher_id}` : "Unassigned"),
        seats: group.max_students ?? 0,
        activeStudents: group.active_students,
      }));
    });
  },

  async getAccessCodes(): Promise<AccessCodeRecord[]> {
    return withMock(accessCodes, async () => {
      const { data } = await apiClient.get<AccessCodeResponse[]>("/access-codes/me");
      const now = Date.now();
      return data.map((code) => {
        const expiresMs = new Date(code.expires_at).getTime();
        const expired = expiresMs < now;
        const redeemed = code.max_uses > 0 && code.used_count >= code.max_uses;

        return {
          id: code.id,
          code: code.code,
          createdAt: new Date(code.expires_at).toLocaleDateString(),
          usedBy: code.used_by.length > 0 ? code.used_by.join(", ") : "-",
          status: !code.is_active || expired ? "expired" : redeemed ? "redeemed" : "available",
        };
      });
    });
  },
};
