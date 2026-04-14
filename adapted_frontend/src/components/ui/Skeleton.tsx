import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function Skeleton({ className }: Props) {
  return <div className={cn("animate-pulse rounded-xl bg-slate-200", className)} />;
}
