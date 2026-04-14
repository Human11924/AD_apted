import { cn, formatPercent } from "@/lib/utils";

interface Props {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: Props) {
  return (
    <div className={cn("grid gap-1", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] transition-all"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <span className="text-xs adapted-muted">{formatPercent(value)} complete</span>
    </div>
  );
}
