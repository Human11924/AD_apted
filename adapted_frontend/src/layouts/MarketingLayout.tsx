import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Instagram, Mail, Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Send Request" },
];

export function MarketingLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--panel)]/95 backdrop-blur-lg">
        <div className="adapted-container flex h-20 items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center" aria-label="AdaptEd Home">
            <img src="/logo.svg" alt="AdaptEd" className="h-16 w-auto" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[var(--accent)] md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3 py-1.5 transition duration-200 hover:border hover:border-[#e8cb86] hover:bg-[#fff3d6] hover:text-[#6c4a10]",
                    isActive && "border border-[#e8cb86] bg-[#fff3d6] text-[#6c4a10]",
                  )
                }
              >
                {t(item.label)}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex rounded-full p-2 text-[var(--accent)] transition hover:bg-[#fff3d6] md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link
              to="/login"
              className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-[var(--accent)] transition duration-200 hover:border hover:border-[#e8cb86] hover:bg-[#fff3d6] hover:text-[#6c4a10] md:inline-block"
            >
              {t("Log in")}
            </Link>
            <Link to="/register-by-code">
              <Button size="sm">{t("Join by Access Code")}</Button>
            </Link>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-[var(--line)] bg-[var(--panel)] md:hidden">
            <nav className="adapted-container grid gap-2 py-3 text-sm text-[var(--accent)]">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-3 py-2 transition duration-200 hover:border hover:border-[#e8cb86] hover:bg-[#fff3d6] hover:text-[#6c4a10]",
                      isActive && "border border-[#e8cb86] bg-[#fff3d6] text-[#6c4a10]",
                    )
                  }
                >
                  {t(item.label)}
                </NavLink>
              ))}
              <div className="mt-1 grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl border border-[#e8cb86] px-3 py-2 text-sm font-medium text-[#6c4a10]"
                >
                  {t("Log in")}
                </Link>
                <Link to="/register-by-code" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">
                    {t("Join")}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        ) : null}
      </header>

      <main className="fade-up">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-[#6f4e2d] bg-[linear-gradient(120deg,#2a1d17,#1f1511,#3b291f)] text-white">
        <div className="adapted-container grid gap-6 py-10 text-sm md:grid-cols-3">
          <div>
            <img src="/logo_white.svg" alt="AdaptEd" className="h-16 w-auto" />
            <p className="mt-2 max-w-md text-white/80">
              Hybrid workplace English training with business-ready analytics for modern teams.
            </p>
          </div>
          <div className="grid gap-2">
            <Link to="/" className="text-white/80 underline-offset-4 transition duration-200 hover:translate-x-0.5 hover:text-[#f3be29] hover:underline">
              {t("Home")}
            </Link>
            <Link
              to="/pricing"
              className="text-white/80 underline-offset-4 transition duration-200 hover:translate-x-0.5 hover:text-[#f3be29] hover:underline"
            >
              {t("Pricing")}
            </Link>
            <Link
              to="/contact"
              className="text-white/80 underline-offset-4 transition duration-200 hover:translate-x-0.5 hover:text-[#f3be29] hover:underline"
            >
              {t("Send Request")}
            </Link>
          </div>
          <div className="grid gap-3 md:justify-self-end">
            <p className="text-base font-semibold">{t("Contact Us")}</p>
            <a
              href="mailto:join.adapted@gmail.com"
              className="inline-flex items-center gap-2 text-white/80 underline-offset-4 transition duration-200 hover:translate-x-0.5 hover:text-[#f3be29] hover:underline"
            >
              <Mail size={16} aria-hidden="true" />
              <span>join.adapted@gmail.com</span>
            </a>
            <a
              href="tel:+996508603600"
              className="inline-flex items-center gap-2 text-white/80 underline-offset-4 transition duration-200 hover:translate-x-0.5 hover:text-[#f3be29] hover:underline"
            >
              <Phone size={16} aria-hidden="true" />
              <span>+996508603600</span>
            </a>
            <a
              href="https://instagram.com/adapted.kg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/80 underline-offset-4 transition duration-200 hover:translate-x-0.5 hover:text-[#f3be29] hover:underline"
            >
              <Instagram size={16} aria-hidden="true" />
              <span>adapted.kg</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
