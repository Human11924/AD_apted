import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";
import type { Role } from "@/types/auth";

interface Props {
  role: Role;
}

const fallbackByRole: Record<Role, string> = {
  admin: "/admin",
  employer: "/employer",
  teacher: "/teacher",
  student: "/student",
};

export function RoleProtectedRoute({ role }: Props) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={fallbackByRole[user.role]} replace />;
  }

  return <Outlet />;
}
