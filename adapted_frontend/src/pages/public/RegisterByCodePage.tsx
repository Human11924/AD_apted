import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/api/authService";
import { useAuthStore } from "@/store/authStore";

export function RegisterByCodePage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [access_code, setAccessCode] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: authService.registerByCode,
    onSuccess: ({ access_token, user }) => {
      login(access_token, user);
      navigate("/student");
    },
  });

  return (
    <div className="adapted-container py-14">
      <div className="mx-auto max-w-lg adapted-card p-6 md:p-8">
        <h1 className="font-brand text-3xl font-semibold tracking-tight">Register by Access Code</h1>
        <p className="mt-2 text-sm adapted-muted">
          Use the code shared by your company to join your training group.
        </p>

        <form
          className="mt-6 grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            mutation.mutate({ access_code, full_name, email, password });
          }}
        >
          <Input label="Access code" value={access_code} onChange={(event) => setAccessCode(event.target.value)} required />
          <Input label="Full name" value={full_name} onChange={(event) => setFullName(event.target.value)} required />
          <Input label="Work email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating account..." : "Create account"}
          </Button>
          {mutation.isError ? (
            <p className="text-sm text-[var(--danger)]">Could not register by access code. Check code validity and backend availability.</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
