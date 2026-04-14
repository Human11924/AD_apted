import type { AccessCodeRecord, GroupRecord, MetricCard, StudentRecord } from "@/types/dashboard";

export const employerMetrics: MetricCard[] = [
  { title: "Purchased Seats", value: "240", trend: "+20 this month" },
  { title: "Used Seats", value: "181", trend: "75% utilization" },
  { title: "Avg Completion", value: "68%", trend: "+9% QoQ" },
  { title: "Active Groups", value: "12", trend: "3 launching next week" },
];

export const employerStudents: StudentRecord[] = [
  {
    id: "S-1021",
    name: "Mila Petrova",
    department: "Front Desk",
    group: "Hospitality A2 - Night Shift",
    progress: 71,
    status: "active",
  },
  {
    id: "S-1022",
    name: "Rafael Gomes",
    department: "Guest Services",
    group: "Hospitality B1 - Morning",
    progress: 42,
    status: "at-risk",
  },
  {
    id: "S-1023",
    name: "Anya Smirnova",
    department: "Food Service",
    group: "Service English Intensive",
    progress: 100,
    status: "completed",
  },
];

export const employerGroups: GroupRecord[] = [
  {
    id: "G-440",
    name: "Hospitality A2 - Night Shift",
    course: "Frontline Hospitality English",
    teacher: "Alex Turner",
    seats: 24,
    activeStudents: 22,
  },
  {
    id: "G-441",
    name: "Service English Intensive",
    course: "Service Excellence Communication",
    teacher: "Nadia Koleva",
    seats: 18,
    activeStudents: 16,
  },
];

export const accessCodes: AccessCodeRecord[] = [
  { code: "ADPT-9F3K-21QA", createdAt: "2026-04-02", status: "available" },
  { code: "ADPT-LM77-02XZ", createdAt: "2026-04-03", usedBy: "Mila Petrova", status: "redeemed" },
  { code: "ADPT-K1N0-8QWE", createdAt: "2026-03-01", status: "expired" },
];
