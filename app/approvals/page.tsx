"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import {
  ApprovalStage,
  STAGE_LABELS,
  STAGE_ORDER,
  stageForStatus,
} from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowRight, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ApprovalsPage() {
  const requests = useStore((s) => s.requests);
  const [stage, setStage] = useState<ApprovalStage>("finance");

  const pending = requests.filter((r) => stageForStatus(r.status) === stage);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Approval queue
        </h1>
        <p className="mt-1 text-muted-foreground">
          Requests waiting on each approval stage.
        </p>
      </div>

      <div className="flex gap-2">
        {STAGE_ORDER.map((s) => {
          const count = requests.filter(
            (r) => stageForStatus(r.status) === s,
          ).length;
          const active = stage === s;
          return (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-accent",
              )}
            >
              {STAGE_LABELS[s]}
              <Badge
                variant={active ? "outline" : "muted"}
                className={active ? "border-primary-foreground/30" : ""}
              >
                {count}
              </Badge>
            </button>
          );
        })}
      </div>

      {pending.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <div className="font-medium">No requests in this queue</div>
              <div className="text-sm text-muted-foreground">
                You're all caught up.
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pending.map((r) => (
            <Link key={r.id} href={`/requests/${r.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-center justify-between p-5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {r.id}
                      </span>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="mt-1 font-medium">{r.roleTitle}</div>
                    <div className="mt-0.5 text-sm text-muted-foreground">
                      {r.department} · {r.manager} ·{" "}
                      {formatCurrency(r.salaryMin)}–
                      {formatCurrency(r.salaryMax)} · start{" "}
                      {formatDate(r.startDate)}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Review <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
