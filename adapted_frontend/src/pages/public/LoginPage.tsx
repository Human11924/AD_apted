import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/api/authService";
import { useAuthStore } from "@/store/authStore";
import type { Role } from "@/types/auth";

const roleRoute: Record<Role, string> = {
  admin: "/admin",
  employer: "/employer",
  teacher: "/teacher",
  student: "/student",
};

const demoCredentials: Record<Exclude<Role, "admin" | "teacher">, { email: string; password: string }> = {
  employer: { email: "employer@test.com", password: "12345678" },
  student: { email: "student1@test.com", password: "12345678" },
};

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ access_token, user }) => {
      login(access_token, user);
      navigate(roleRoute[user.role]);
    },
  });

  const errorMessage = (() => {
    if (!mutation.error) return null;
    if (isAxiosError(mutation.error)) {
      const apiMessage = (mutation.error.response?.data as { detail?: string } | undefined)?.detail;
      return apiMessage ?? "Login failed. Please check your credentials and try again.";
    }
    return "Login failed. Please try again.";
  })();

  return (
    <div className="adapted-container py-14">
      <div className="mx-auto max-w-md adapted-card p-6 md:p-8">
        <div className="mb-4 flex justify-center">
          <img src="/logo.svg" alt="AdaptEd" className="h-16 w-auto" />
        </div>
        <h1 className="font-brand text-3xl font-semibold tracking-tight">Login to AdaptEd</h1>
        <p className="mt-2 text-sm adapted-muted">Use your workspace credentials.</p>
        <form
          className="mt-6 grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            mutation.mutate({ email, password });
          }}
        >
          <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Signing in..." : "Sign in"}
          </Button>
          {errorMessage ? <p className="text-sm text-[var(--danger)]">{errorMessage}</p> : null}
        </form>

        <div className="mt-6 grid gap-2">
          <p className="text-xs uppercase tracking-wide adapted-muted">Demo quick-login</p>
          <div className="grid grid-cols-2 gap-2">
            {(["employer", "student"] as Exclude<Role, "admin" | "teacher">[]).map((role) => (
              <Button
                key={role}
                variant="secondary"
                size="sm"
                onClick={() => {
                  const creds = demoCredentials[role];
                  setEmail(creds.email);
                  setPassword(creds.password);
                  mutation.mutate(creds);
                }}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
