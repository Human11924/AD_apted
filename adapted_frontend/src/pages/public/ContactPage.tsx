import { AxiosError } from "axios";
import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { applicationsService } from "@/services/api/applicationsService";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    teamSize: "",
    notes: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const teamSize = Number.parseInt(form.teamSize, 10);
    if (!Number.isFinite(teamSize) || teamSize <= 0) {
      setError("Team size must be a positive number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await applicationsService.createApplication({
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        team_size: teamSize,
        notes: form.notes.trim() || undefined,
      });

      setSent(true);
      setForm({ name: "", company: "", email: "", teamSize: "", notes: "" });
    } catch (caughtError) {
      if (caughtError instanceof AxiosError) {
        const detail = caughtError.response?.data?.detail;
        setError(typeof detail === "string" ? detail : "Failed to send request. Please try again.");
      } else {
        setError("Failed to send request. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="adapted-container py-14">
      <div className="mx-auto max-w-xl adapted-card p-6 md:p-8">
        <h1 className="font-brand text-3xl font-semibold tracking-tight">Send Request</h1>
        <p className="mt-2 text-sm adapted-muted">
          Tell us about your team and we will design a custom hybrid training rollout.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={submitRequest}>
          <Input
            label="Your name"
            placeholder="Enter your name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
          <Input
            label="Company"
            placeholder="Enter company name"
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            required
          />
          <Input
            label="Work email"
            type="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
          <Input
            label="Team size"
            type="number"
            min={1}
            placeholder="Enter team size"
            value={form.teamSize}
            onChange={(event) => updateField("teamSize", event.target.value)}
            required
          />
          <Input
            label="Notes"
            placeholder="Add your request details"
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Request"}
          </Button>
          {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
          {sent ? <p className="text-sm text-emerald-700">Thank you. Our team will contact you shortly.</p> : null}
        </form>
      </div>
    </div>
  );
}
