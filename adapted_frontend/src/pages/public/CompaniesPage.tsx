import { BarChart3, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function CompaniesPage() {
  return (
    <div className="adapted-container py-14">
      <Badge tone="info">For Employers</Badge>
      <h1 className="font-brand mt-3 text-4xl font-semibold tracking-tight">Run language training like a business program.</h1>
      <p className="mt-3 max-w-2xl adapted-muted">
        Track seats, launch groups, manage access codes, and monitor outcomes with dashboards tailored for people operations.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card title="Operational Visibility" subtitle="Know what is happening across groups.">
          <ul className="grid gap-2 text-sm adapted-muted">
            <li>Seat utilization by company and cohort</li>
            <li>Active learners and completion tracking</li>
            <li>Teacher assignment visibility</li>
          </ul>
        </Card>
        <Card title="Low-Friction Onboarding" subtitle="Enroll employees in minutes.">
          <ul className="grid gap-2 text-sm adapted-muted">
            <li>Bulk access code generation</li>
            <li>Code redemption and audit trail</li>
            <li>Role-based self-registration for employees</li>
          </ul>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <div className="mb-3 inline-flex rounded-xl bg-[#ffe6aa] p-3 text-[#5b3f14]">
            <BarChart3 size={18} />
          </div>
          <h3 className="font-semibold">Executive analytics</h3>
          <p className="mt-2 text-sm adapted-muted">Weekly readiness pulse across departments and branches.</p>
        </Card>
        <Card>
          <div className="mb-3 inline-flex rounded-xl bg-[#efe4d6] p-3 text-[#4f3829]">
            <UsersRound size={18} />
          </div>
          <h3 className="font-semibold">Team-level accountability</h3>
          <p className="mt-2 text-sm adapted-muted">Identify lagging cohorts early and reallocate support quickly.</p>
        </Card>
      </div>
    </div>
  );
}
