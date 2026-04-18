"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  HeadcountRequest,
  ApprovalStage,
  nextStatus,
  stageForStatus,
} from "./types";
import { SEED_REQUESTS } from "./seed";

const APPROVER_BY_STAGE: Record<ApprovalStage, string> = {
  finance: "Dana Cho",
  vp: "Ravi Shah",
  chro: "Elena Ford",
};

type NewRequestInput = Omit<
  HeadcountRequest,
  "id" | "status" | "createdAt" | "history"
>;

type Store = {
  requests: HeadcountRequest[];
  createRequest: (input: NewRequestInput) => string;
  approve: (id: string, note?: string) => void;
  reject: (id: string, note?: string) => void;
  reset: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      requests: SEED_REQUESTS,
      createRequest: (input) => {
        const id = `HC-${1043 + get().requests.length - SEED_REQUESTS.length + Math.floor(Math.random() * 7)}`;
        const newReq: HeadcountRequest = {
          ...input,
          id,
          status: "pending_finance",
          createdAt: new Date().toISOString(),
          history: [],
        };
        set({ requests: [newReq, ...get().requests] });
        return id;
      },
      approve: (id, note) => {
        set({
          requests: get().requests.map((r) => {
            if (r.id !== id) return r;
            const stage = stageForStatus(r.status);
            if (!stage) return r;
            return {
              ...r,
              status: nextStatus(stage),
              history: [
                ...r.history,
                {
                  stage,
                  approver: APPROVER_BY_STAGE[stage],
                  decision: "approved",
                  note,
                  timestamp: new Date().toISOString(),
                },
              ],
            };
          }),
        });
      },
      reject: (id, note) => {
        set({
          requests: get().requests.map((r) => {
            if (r.id !== id) return r;
            const stage = stageForStatus(r.status);
            if (!stage) return r;
            return {
              ...r,
              status: "rejected",
              history: [
                ...r.history,
                {
                  stage,
                  approver: APPROVER_BY_STAGE[stage],
                  decision: "rejected",
                  note,
                  timestamp: new Date().toISOString(),
                },
              ],
            };
          }),
        });
      },
      reset: () => set({ requests: SEED_REQUESTS }),
    }),
    { name: "headcount-store" },
  ),
);
