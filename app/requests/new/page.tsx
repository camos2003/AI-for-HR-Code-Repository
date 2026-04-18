"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { DEPARTMENTS, LEVELS } from "@/lib/seed";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

export default function NewRequestPage() {
  const router = useRouter();
  const createRequest = useStore((s) => s.createRequest);

  const [form, setForm] = useState({
    roleTitle: "",
    department: DEPARTMENTS[0],
    manager: "",
    justification: "",
    employmentType: "full_time" as const,
    level: "L3",
    salaryMin: 100000,
    salaryMax: 130000,
    startDate: new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10),
    urgency: "medium" as const,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = createRequest(form);
    router.push(`/requests/${id}`);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">New request</h1>
        <p className="mt-1 text-muted-foreground">
          Submit a new headcount request. It will route through Finance, your
          Department VP, then CHRO.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Role</CardTitle>
            <CardDescription>What are you hiring for?</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <Field label="Role title" required>
              <Input
                required
                value={form.roleTitle}
                onChange={(e) => update("roleTitle", e.target.value)}
                placeholder="e.g. Senior Backend Engineer"
              />
            </Field>
            <Field label="Department">
              <Select
                value={form.department}
                onChange={(e) => update("department", e.target.value)}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Select>
            </Field>
            <Field label="Hiring manager" required>
              <Input
                required
                value={form.manager}
                onChange={(e) => update("manager", e.target.value)}
                placeholder="Your name"
              />
            </Field>
            <Field label="Level">
              <Select
                value={form.level}
                onChange={(e) => update("level", e.target.value)}
              >
                {LEVELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </Select>
            </Field>
            <Field label="Employment type">
              <Select
                value={form.employmentType}
                onChange={(e) =>
                  update("employmentType", e.target.value as typeof form.employmentType)
                }
              >
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
              </Select>
            </Field>
            <Field label="Urgency">
              <Select
                value={form.urgency}
                onChange={(e) =>
                  update("urgency", e.target.value as typeof form.urgency)
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compensation & timing</CardTitle>
            <CardDescription>
              Proposed comp band and desired start.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-3">
            <Field label="Salary min (USD)">
              <Input
                type="number"
                value={form.salaryMin}
                onChange={(e) => update("salaryMin", Number(e.target.value))}
              />
            </Field>
            <Field label="Salary max (USD)">
              <Input
                type="number"
                value={form.salaryMax}
                onChange={(e) => update("salaryMax", Number(e.target.value))}
              />
            </Field>
            <Field label="Start date">
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
              />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business justification</CardTitle>
            <CardDescription>
              Tell leadership why this hire matters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              required
              rows={5}
              value={form.justification}
              onChange={(e) => update("justification", e.target.value)}
              placeholder="Describe the business impact, what happens if we don't hire, and why now."
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Submit for approval</Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
    </div>
  );
}
