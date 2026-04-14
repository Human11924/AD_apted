import type { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: Props) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {description ? <p className="mt-2 text-sm adapted-muted">{description}</p> : null}
      </div>
      {action}
    </header>
  );
}
