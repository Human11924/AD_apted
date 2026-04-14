import type { ReactNode } from "react";

import { Button } from "./Button";

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, icon, actionLabel, onAction }: Props) {
  return (
    <div className="adapted-card flex flex-col items-start gap-3 p-6">
      <div className="rounded-xl bg-slate-100 p-3 text-slate-600">{icon ?? "📘"}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-lg text-sm adapted-muted">{description}</p>
      {actionLabel ? (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
