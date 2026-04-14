import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, className, ...props }: Props) {
  return (
    <label className="grid gap-2 text-sm">
      {label ? <span className="font-medium text-[var(--text)]">{label}</span> : null}
      <input
        className={cn(
          "h-11 rounded-xl border border-[var(--line)] bg-white px-3 outline-none transition focus:border-[var(--primary)] focus:shadow-[var(--ring)]",
          error && "border-[var(--danger)]",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-[var(--danger)]">{error}</span> : null}
      {!error && hint ? <span className="text-xs text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}
