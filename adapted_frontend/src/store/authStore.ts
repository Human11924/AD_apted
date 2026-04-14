import { create } from "zustand";

import type { AuthState, Role, User } from "@/types/auth";

interface AuthActions {
  login: (token: string, user: User) => void;
  logout: () => void;
  setRoleDemo: (role: Role) => void;
}

type AuthStore = AuthState & AuthActions;

const STORAGE_KEY = "adapted-auth";

function readInitialState(): AuthState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { token: null, user: null };
  }

  try {
    return JSON.parse(raw) as AuthState;
  } catch {
    return { token: null, user: null };
  }
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...readInitialState(),
  login: (token, user) => {
    const next = { token, user };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    set(next);
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ token: null, user: null });
  },
  setRoleDemo: (role) => {
    const current = get();
    const user: User = {
      id: current.user?.id ?? 0,
      full_name: current.user?.full_name ?? "Demo User",
      email: current.user?.email ?? "demo@adapted.ai",
      role,
      is_active: true,
    };

    const token = current.token ?? "demo-token";
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
    set({ token, user });
  },
}));
