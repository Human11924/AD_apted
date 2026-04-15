export interface MetricCard {
  title: string;
  value: string;
  trend?: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  department: string;
  group: string;
  progress: number;
  status: "active" | "at-risk" | "completed";
}

export interface GroupRecord {
  id: string;
  name: string;
  course: string;
  teacher: string;
  seats: number;
  activeStudents: number;
}

export interface CohortPerformanceRecord {
  id: string;
  name: string;
  completionPercent: number;
}

export interface AccessCodeRecord {
  id?: number;
  code: string;
  createdAt: string;
  usedBy?: string;
  status: "available" | "redeemed" | "expired";
}
