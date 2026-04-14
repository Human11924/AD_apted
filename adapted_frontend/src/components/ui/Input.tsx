import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, className, placeholder, ...props }: Props) {
  const { t } = useI18n();

  return (
    <label className="grid gap-2 text-sm">
      {label ? <span className="font-medium text-[var(--text)]">{t(label)}</span> : null}
      <input
        className={cn(
          "h-11 rounded-xl border border-[var(--line)] bg-white px-3 outline-none transition focus:border-[var(--primary)] focus:shadow-[var(--ring)]",
          error && "border-[var(--danger)]",
          className,
        )}
        {...props}
        placeholder={placeholder ? t(placeholder) : placeholder}
      />
      {error ? <span className="text-xs text-[var(--danger)]">{t(error)}</span> : null}
      {!error && hint ? <span className="text-xs text-[var(--muted)]">{t(hint)}</span> : null}
    </label>
  );
}
