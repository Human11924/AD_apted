import { BarChart3, Download, Layers3, Plus, Search, UsersRound, Wallet } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { StatCard } from "@/components/ui/StatCard";
import {
  useAccessCodes,
  useEmployerCohortPerformance,
  useEmployerGroups,
  useEmployerMetrics,
  useEmployerStudents,
} from "@/hooks/queries/useEmployerQueries";
import { useI18n } from "@/i18n/I18nProvider";

function StatusBadge({ status }: { status: "active" | "at-risk" | "completed" }) {
  const { t } = useI18n();

  if (status === "completed") return <Badge tone="success">{t("Completed")}</Badge>;
  if (status === "at-risk") return <Badge tone="warning">{t("At risk")}</Badge>;
  return <Badge tone="info">{t("Active")}</Badge>;
}

export function EmployerDashboardPage() {
  const { t } = useI18n();
  const metrics = useEmployerMetrics();
  const cohortPerformance = useEmployerCohortPerformance();

  const metricIconByIndex = [
    <Wallet key="wallet" size={18} />,
    <UsersRound key="users" size={18} />,
    <BarChart3 key="chart" size={18} />,
    <Layers3 key="layers" size={18} />,
  ];

  const resolveMetricIcon = (title: string, index: number) => {
    const normalizedTitle = title.toLowerCase();

    if (normalizedTitle.includes("seat")) {
      return normalizedTitle.includes("used") ? <UsersRound size={18} /> : <Wallet size={18} />;
    }
    if (normalizedTitle.includes("completion") || normalizedTitle.includes("avg")) {
      return <BarChart3 size={18} />;
    }
    if (normalizedTitle.includes("group")) {
      return <Layers3 size={18} />;
    }

    return metricIconByIndex[index % metricIconByIndex.length];
  };

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Monitor seats, cohorts, and learning outcomes across your company."
        action={<Button leftIcon={<Download size={16} />}>{t("Export Report")}</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.isLoading
          ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-32" />)
          : metrics.isError
            ? <p className="text-sm adapted-muted">Failed to load dashboard metrics.</p>
            : metrics.data?.map((metric, index) => (
              <StatCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                trend={metric.trend}
                icon={resolveMetricIcon(metric.title, index)}
              />
            ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Cohort Performance" subtitle="Completion trends by group launch cycle.">
          <div className="grid gap-4">
            {cohortPerformance.isLoading ? (
              Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-12" />)
            ) : cohortPerformance.isError ? (
              <p className="text-sm adapted-muted">Failed to load cohort performance.</p>
            ) : cohortPerformance.data && cohortPerformance.data.length > 0 ? (
              cohortPerformance.data.map((cohort) => (
                <div key={cohort.id}>
                  <p className="mb-1 text-sm">{cohort.name}</p>
                  <ProgressBar value={cohort.completionPercent} />
                </div>
              ))
            ) : (
              <p className="text-sm adapted-muted">No cohorts yet.</p>
            )}
          </div>
        </Card>
        <Card title="Insights" subtitle="Actionable focus areas for next sprint.">
          <ul className="grid gap-3 text-sm adapted-muted">
            <li>Night-shift cohorts engage best with micro-lessons under 12 minutes.</li>
            <li>Hospitality vocabulary module has highest drop-off after lesson 4.</li>
            <li>Groups with weekly teacher check-ins complete 16% faster.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export function EmployerStudentsPage() {
  const { t } = useI18n();
  const students = useEmployerStudents();
  const [query, setQuery] = useState("");

  const filteredWorkers = useMemo(() => {
    if (!students.data) return [];

    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return students.data;

    return students.data.filter((worker) =>
      [worker.name, worker.department, worker.group, worker.id]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [students.data, query]);

  return (
    <div>
      <PageHeader
        title="Workers"
        description="Track learning health across departments and groups."
        action={<Button leftIcon={<Plus size={16} />}>{t("Invite Worker")}</Button>}
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <label className="relative min-w-[260px] flex-1">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-9 w-full rounded-xl border border-[var(--line)] bg-white px-9 text-sm outline-none transition focus:border-[var(--primary)] focus:shadow-[var(--ring)]"
            placeholder={t("Search worker, department, or group")}
            aria-label={t("Search workers")}
          />
        </label>
        <Button variant="secondary" size="sm">
          {t("Filter: All Departments")}
        </Button>
      </div>

      {students.data ? (
        <DataTable
          data={filteredWorkers}
          columns={[
            { key: "name", header: "Worker", render: (row) => row.name },
            { key: "department", header: "Department", render: (row) => row.department },
            { key: "group", header: "Group", render: (row) => row.group },
            { key: "progress", header: "Progress", render: (row) => <ProgressBar value={row.progress} /> },
            { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      ) : (
        <Skeleton className="h-44" />
      )}
    </div>
  );
}

export function EmployerGroupsPage() {
  const { t } = useI18n();
  const groups = useEmployerGroups();

  return (
    <div>
      <PageHeader title="Course Groups" description="Manage launched cohorts per company branch, shift, and target level." />
      {groups.data ? (
        <div className="grid gap-4 md:grid-cols-2">
          {groups.data.map((group) => (
            <Card key={group.id} title={group.name} subtitle={`${group.course} · ${t("Teacher:")} ${group.teacher}`}>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <p className="adapted-muted">{t("Seats:")} {group.seats}</p>
                <p className="adapted-muted">{t("Active:")} {group.activeStudents}</p>
              </div>
              <ProgressBar className="mt-3" value={group.seats > 0 ? (group.activeStudents / group.seats) * 100 : 0} />
            </Card>
          ))}
        </div>
      ) : (
        <Skeleton className="h-44" />
      )}
    </div>
  );
}

export function EmployerAnalyticsPage() {
  const { t } = useI18n();

  return (
    <div>
      <PageHeader title="Analytics" description="Business-oriented learning analytics for leadership and operations." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Completion by Department" subtitle="Last 30 days">
          <div className="grid gap-3 text-sm">
            {[
              ["Front Desk", 78],
              ["Guest Services", 62],
              ["Food Service", 69],
              ["Supervisors", 84],
            ].map(([label, value]) => (
              <div key={label as string}>
                <p>{t(label as string)}</p>
                <ProgressBar value={value as number} />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Risk Radar" subtitle="Groups requiring intervention">
          <ul className="grid gap-3 text-sm">
            <li className="rounded-xl bg-amber-50 p-3 text-amber-800">{t("Hospitality B1 - Morning: 4 students inactive for 7+ days.")}</li>
            <li className="rounded-xl bg-blue-50 p-3 text-blue-800">{t("Service English Intensive: strong weekly growth (+12%).")}</li>
            <li className="rounded-xl bg-slate-100 p-3 text-slate-700">{t("Recommend: schedule targeted speaking clinic this week.")}</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export function EmployerAccessCodesPage() {
  const { t } = useI18n();
  const codes = useAccessCodes();

  return (
    <div>
      <PageHeader
        title="Access Codes"
        description="Issue and track employee onboarding access codes."
        action={<Button leftIcon={<Plus size={16} />}>{t("Generate Codes")}</Button>}
      />
      {codes.data ? (
        <DataTable
          data={codes.data}
          columns={[
            { key: "code", header: "Code", render: (row) => <span className="font-medium">{row.code}</span> },
            { key: "createdAt", header: "Expires", render: (row) => row.createdAt },
            { key: "usedBy", header: "Used By", render: (row) => row.usedBy ?? "-" },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <Badge tone={row.status === "redeemed" ? "success" : row.status === "expired" ? "warning" : "info"}>
                  {t(row.status)}
                </Badge>
              ),
            },
          ]}
        />
      ) : (
        <Skeleton className="h-44" />
      )}
    </div>
  );
}

export function EmployerSettingsPage() {
  return (
    <div>
      <PageHeader title="Company Settings" description="Manage company-level learning preferences and reporting contacts." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="General">
          <div className="grid gap-2 text-sm adapted-muted">
            <p>Company: Current Employer Organization</p>
            <p>Primary contact: operations@company.com</p>
            <p>Default language level: A2-B1</p>
          </div>
        </Card>
        <Card title="Reporting">
          <div className="grid gap-2 text-sm adapted-muted">
            <p>Weekly digest: enabled</p>
            <p>At-risk alerts: enabled</p>
            <p>Executive summary export: monthly</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
