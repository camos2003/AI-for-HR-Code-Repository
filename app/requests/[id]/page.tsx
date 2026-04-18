"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import {
  STAGE_LABELS,
  STAGE_ORDER,
  stageForStatus,
  ApprovalStage,
} from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, initials } from "@/lib/utils";
import {
  ArrowLeft,
  Check,
  X,
  CircleDot,
  Circle,
  CheckCircle2,
} from "lucide-react";

export default function RequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const request = useStore((s) => s.requests.find((r) => r.id === params.id));
  const approve = useStore((s) => s.approve);
  const reject = useStore((s) => s.reject);
  const [note, setNote] = useState("");

  if (!request) {
    return (
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="text-muted-foreground">Request not found.</div>
      </div>
    );
  }

  const currentStage = stageForStatus(request.status);
  const isTerminal = !currentStage;

  function onApprove() {
    approve(request!.id, note.trim() || undefined);
    setNote("");
  }
  function onReject() {
    reject(request!.id, note.trim() || undefined);
    setNote("");
  }

  const urgencyTint =
    request.urgency === "high"
      ? "bg-rose-100 text-rose-800"
      : request.urgency === "medium"
        ? "bg-amber-100 text-amber-800"
        : "bg-muted text-muted-foreground";

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                {request.id}
              </span>
              <StatusBadge status={request.status} />
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${urgencyTint}`}
              >
                {request.urgency} urgency
              </div>
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {request.roleTitle}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {request.department} · Submitted by {request.manager} ·{" "}
              {formatDate(request.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold">Approval progress</h2>
              <ol className="mt-5 space-y-4">
                {STAGE_ORDER.map((stage, idx) => {
                  const action = request.history.find((h) => h.stage === stage);
                  const isCurrent =
                    currentStage === stage && request.status !== "rejected";
                  const isComplete =
                    action?.decision === "approved" ||
                    (request.status === "approved" && idx < 3);
                  const isRejected =
                    action?.decision === "rejected" ||
                    (request.status === "rejected" && currentStage === stage);
                  return (
                    <li key={stage} className="flex gap-4">
                      <div className="mt-0.5">
                        {isComplete ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : isRejected ? (
                          <X className="h-5 w-5 text-rose-600" />
                        ) : isCurrent ? (
                          <CircleDot className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/40" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">
                            {STAGE_LABELS[stage]}
                          </div>
                          {isCurrent && (
                            <Badge variant="pending">Awaiting decision</Badge>
                          )}
                        </div>
                        {action ? (
                          <div className="mt-1 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {action.approver}
                            </span>{" "}
                            {action.decision} · {formatDate(action.timestamp)}
                            {action.note && (
                              <div className="mt-1.5 rounded-md bg-muted p-3 text-xs">
                                {action.note}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-1 text-sm text-muted-foreground">
                            {isCurrent ? "In review" : "Not yet reached"}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold">Business justification</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-foreground/90">
                {request.justification}
              </p>
            </CardContent>
          </Card>

          {!isTerminal && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <div>
                  <h2 className="font-semibold">
                    Your decision · {STAGE_LABELS[currentStage as ApprovalStage]}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Approving routes this to the next approver. Rejecting closes
                    the request.
                  </p>
                </div>
                <Textarea
                  placeholder="Add a note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onReject}>
                    <X className="h-4 w-4" /> Reject
                  </Button>
                  <Button onClick={onApprove}>
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="font-semibold">Details</h2>
              <Detail label="Level" value={request.level} />
              <Detail
                label="Employment"
                value={request.employmentType.replace("_", "-")}
              />
              <Detail
                label="Comp band"
                value={`${formatCurrency(request.salaryMin)} – ${formatCurrency(
                  request.salaryMax,
                )}`}
              />
              <Detail
                label="Target start"
                value={formatDate(request.startDate)}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-6">
              <h2 className="font-semibold">Manager</h2>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {initials(request.manager)}
                </div>
                <div>
                  <div className="text-sm font-medium">{request.manager}</div>
                  <div className="text-xs text-muted-foreground">
                    {request.department}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium capitalize">{value}</span>
    </div>
  );
}
