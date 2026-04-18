"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowRight, Plus, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function DashboardPage() {
  const requests = useStore((s) => s.requests);

  const pending = requests.filter((r) => r.status.startsWith("pending")).length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const rejected = requests.filter((r) => r.status === "rejected").length;

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            All headcount requests across the organization.
          </p>
        </div>
        <Link href="/requests/new">
          <Button>
            <Plus className="h-4 w-4" />
            New request
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="In review" value={pending} icon={Clock} tint="amber" />
        <Stat
          label="Approved"
          value={approved}
          icon={CheckCircle2}
          tint="emerald"
        />
        <Stat label="Rejected" value={rejected} icon={XCircle} tint="rose" />
      </div>

      <Card>
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">Recent requests</h2>
        </div>
        <CardContent className="p-0">
          <ul className="divide-y">
            {requests.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/requests/${r.id}`}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-accent/40"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {r.id}
                      </span>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="mt-1 truncate text-sm font-medium">
                      {r.roleTitle}{" "}
                      <span className="font-normal text-muted-foreground">
                        · {r.department}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {r.manager} · start {formatDate(r.startDate)} ·{" "}
                      {formatCurrency(r.salaryMin)}–
                      {formatCurrency(r.salaryMax)}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tint: "amber" | "emerald" | "rose";
}) {
  const tintMap = {
    amber: "bg-amber-100 text-amber-700",
    emerald: "bg-emerald-100 text-emerald-700",
    rose: "bg-rose-100 text-rose-700",
  };
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="mt-1 text-3xl font-semibold tracking-tight">
            {value}
          </div>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${tintMap[tint]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
