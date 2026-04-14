import { Menu, LogOut } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuthStore } from "@/store/authStore";
import type { Role } from "@/types/auth";

interface NavItem {
  to: string;
  label: string;
}

const roleNavigation: Record<Role, NavItem[]> = {
  admin: [
    { to: "/admin", label: "Overview" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/companies", label: "Companies" },
    { to: "/admin/teachers", label: "Teachers" },
    { to: "/admin/students", label: "Students" },
    { to: "/admin/courses", label: "Courses" },
    { to: "/admin/groups", label: "Course Groups" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/access-codes", label: "Access Codes" },
  ],
  employer: [
    { to: "/employer", label: "Overview" },
    { to: "/employer/students", label: "Workers" },
    { to: "/employer/groups", label: "Groups" },
    { to: "/employer/analytics", label: "Analytics" },
    { to: "/employer/access-codes", label: "Access Codes" },
    { to: "/employer/settings", label: "Settings" },
  ],
  teacher: [
    { to: "/teacher", label: "Dashboard" },
    { to: "/teacher/groups", label: "Assigned Groups" },
    { to: "/teacher/course-structure", label: "Course Structure" },
    { to: "/teacher/student-progress", label: "Student Progress" },
  ],
  student: [
    { to: "/student", label: "Dashboard" },
    { to: "/student/courses", label: "My Courses" },
    { to: "/student/ai/quiz", label: "Generate Quiz" },
    { to: "/student/ai/pronunciation", label: "Pronunciation Practice" },
    { to: "/student/progress", label: "Progress" },
    { to: "/student/profile", label: "Profile" },
  ],
};

export function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuthStore();
  const { t } = useI18n();

  const nav = useMemo(() => roleNavigation[user?.role ?? "student"], [user?.role]);

  return (
    <div className="min-h-screen bg-slate-50 md:grid md:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-[var(--line)] bg-white p-4 md:block">
        <SidebarContent nav={nav} pathname={pathname} close={() => setOpen(false)} />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 bg-slate-900/45 md:hidden" onClick={() => setOpen(false)}>
          <aside
            className="h-full w-[78%] max-w-[320px] bg-white p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <SidebarContent nav={nav} pathname={pathname} close={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[var(--line)] bg-white/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 hover:bg-slate-100 md:hidden" onClick={() => setOpen(true)}>
              <Menu size={18} />
            </button>
            <img src="/logo.svg" alt="AdaptEd" className="h-9 w-auto" />
            <p className="text-sm font-medium adapted-muted">{t("AdaptEd Workspace")}</p>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <span className="hidden text-sm adapted-muted sm:inline">{user?.full_name}</span>
            <Button variant="ghost" size="sm" onClick={logout} leftIcon={<LogOut size={14} />}>
              {t("Logout")}
            </Button>
          </div>
        </header>

        <div className="border-b border-[var(--line)] bg-white md:hidden">
          <nav className="flex gap-2 overflow-x-auto px-4 py-2">
            {nav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "bg-blue-50 text-[var(--primary)]"
                      : "bg-slate-100 text-[var(--muted)] hover:bg-slate-200"
                  }`}
                >
                  {t(item.label)}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ nav, pathname, close }: { nav: NavItem[]; pathname: string; close: () => void }) {
  const { t } = useI18n();

  return (
    <div className="flex h-full flex-col gap-5">
      <Link to="/" className="inline-flex items-center">
        <img src="/logo.svg" alt="AdaptEd" className="h-12 w-auto" />
      </Link>
      <nav className="grid gap-1 text-sm">
        {nav.map((item) => {
          const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={close}
              className={`rounded-xl px-3 py-2 transition ${
                active ? "bg-blue-50 text-[var(--primary)]" : "text-[var(--muted)] hover:bg-slate-100"
              }`}
            >
              {t(item.label)}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
