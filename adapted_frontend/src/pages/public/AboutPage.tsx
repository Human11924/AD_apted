import { Card } from "@/components/ui/Card";

export function AboutPage() {
  return (
    <div className="adapted-container py-14">
      <h1 className="font-brand text-4xl font-semibold tracking-tight">How AdaptEd Works</h1>
      <p className="mt-3 max-w-3xl adapted-muted">
        We combine instructor-led sessions and digital reinforcement to drive practical language improvement where it matters most: real
        workplace scenarios.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card title="Assess & Design" subtitle="Map roles, needs, and baseline levels.">
          <p className="text-sm adapted-muted">Each company gets role-based paths for departments and job functions.</p>
        </Card>
        <Card title="Launch Cohorts" subtitle="Activate groups per shift, team, or location.">
          <p className="text-sm adapted-muted">Course templates become live groups with assigned teachers and goals.</p>
        </Card>
        <Card title="Track Outcomes" subtitle="Monitor adoption, progress, and completion.">
          <p className="text-sm adapted-muted">Managers get operational dashboards for measurable training ROI.</p>
        </Card>
      </div>
    </div>
  );
}
