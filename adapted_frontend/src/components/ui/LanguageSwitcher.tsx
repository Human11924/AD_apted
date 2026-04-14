import { useI18n } from "@/i18n/I18nProvider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="inline-flex rounded-full border border-[var(--primary)] bg-[#fff7e8] p-1">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
          language === "en"
            ? "bg-[var(--primary)] text-[#2f220e]"
            : "text-[#6c4a10] hover:bg-[var(--primary-strong)]/20"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("ru")}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
          language === "ru"
            ? "bg-[var(--primary)] text-[#2f220e]"
            : "text-[#6c4a10] hover:bg-[var(--primary-strong)]/20"
        }`}
      >
        RU
      </button>
    </div>
  );
}
