import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

interface Props {
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Card({ className, title, subtitle, action, children }: Props) {
  const { t } = useI18n();

  return (
    <section className={cn("adapted-card p-5", className)}>
      {title || subtitle || action ? (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title ? <h3 className="text-base font-semibold">{t(title)}</h3> : null}
            {subtitle ? <p className="mt-1 text-sm adapted-muted">{t(subtitle)}</p> : null}
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}
