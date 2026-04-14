import { Card } from "@/components/ui/Card";

export function TeachersPage() {
  return (
    <div className="adapted-container py-14">
      <h1 className="font-brand text-4xl font-semibold tracking-tight">For Teachers</h1>
      <p className="mt-3 max-w-2xl adapted-muted">
        Deliver high-impact sessions, monitor student progress, and tailor lessons by operational context.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card title="Assigned Groups" subtitle="View cohorts by company and shift.">
          <p className="text-sm adapted-muted">Manage attendance, group targets, and session rhythm.</p>
        </Card>
        <Card title="Lesson Structure" subtitle="Course modules and practical units.">
          <p className="text-sm adapted-muted">Follow a clear path and adapt examples to workplace context.</p>
        </Card>
        <Card title="Progress Signals" subtitle="Identify support needs early.">
          <p className="text-sm adapted-muted">Spot at-risk learners and adjust intervention plans fast.</p>
        </Card>
      </div>
    </div>
  );
}
