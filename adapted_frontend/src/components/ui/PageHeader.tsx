import type { ReactNode } from "react";
import { useI18n } from "@/i18n/I18nProvider";

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: Props) {
  const { t } = useI18n();

  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{t(title)}</h1>
        {description ? <p className="mt-2 text-sm adapted-muted">{t(description)}</p> : null}
      </div>
      {action}
    </header>
  );
}
