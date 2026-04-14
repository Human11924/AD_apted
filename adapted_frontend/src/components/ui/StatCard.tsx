import type { ReactNode } from "react";

import { Card } from "./Card";

interface Props {
  title: string;
  value: string;
  trend?: string;
  icon?: ReactNode;
}

export function StatCard({ title, value, trend, icon }: Props) {
  return (
    <Card className="p-4 md:p-5">
      <div className="mb-3 inline-flex rounded-xl bg-slate-100 p-2 text-slate-700">{icon ?? "📊"}</div>
      <p className="text-sm adapted-muted">{title}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      {trend ? <p className="mt-2 text-xs text-emerald-700">{trend}</p> : null}
    </Card>
  );
}
