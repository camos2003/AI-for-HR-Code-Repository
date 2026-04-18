export type ApprovalStage = "finance" | "vp" | "chro";

export type RequestStatus =
  | "pending_finance"
  | "pending_vp"
  | "pending_chro"
  | "approved"
  | "rejected";

export type EmploymentType = "full_time" | "part_time" | "contract";
export type Urgency = "low" | "medium" | "high";

export type ApprovalAction = {
  stage: ApprovalStage;
  approver: string;
  decision: "approved" | "rejected";
  note?: string;
  timestamp: string;
};

export type HeadcountRequest = {
  id: string;
  roleTitle: string;
  department: string;
  manager: string;
  justification: string;
  employmentType: EmploymentType;
  level: string;
  salaryMin: number;
  salaryMax: number;
  startDate: string;
  urgency: Urgency;
  status: RequestStatus;
  createdAt: string;
  history: ApprovalAction[];
};

export const STAGE_ORDER: ApprovalStage[] = ["finance", "vp", "chro"];

export const STAGE_LABELS: Record<ApprovalStage, string> = {
  finance: "Finance",
  vp: "Department VP",
  chro: "CHRO",
};

export const STATUS_LABELS: Record<RequestStatus, string> = {
  pending_finance: "Pending Finance",
  pending_vp: "Pending Dept VP",
  pending_chro: "Pending CHRO",
  approved: "Approved",
  rejected: "Rejected",
};

export function stageForStatus(status: RequestStatus): ApprovalStage | null {
  if (status === "pending_finance") return "finance";
  if (status === "pending_vp") return "vp";
  if (status === "pending_chro") return "chro";
  return null;
}

export function nextStatus(stage: ApprovalStage): RequestStatus {
  if (stage === "finance") return "pending_vp";
  if (stage === "vp") return "pending_chro";
  return "approved";
}
