import { Badge } from "@/components/ui/badge";
import { RequestStatus, STATUS_LABELS } from "@/lib/types";

export function StatusBadge({ status }: { status: RequestStatus }) {
  const variant =
    status === "approved"
      ? "approved"
      : status === "rejected"
        ? "rejected"
        : "pending";
  return <Badge variant={variant}>{STATUS_LABELS[status]}</Badge>;
}
