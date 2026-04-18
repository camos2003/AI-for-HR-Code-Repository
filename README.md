# Headcount Approval Portal

A prototype that routes manager requests for new headcount through leadership approval (Finance → Department VP → CHRO).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with shadcn/ui-style components
- Zustand + `localStorage` for client-side state (no backend required for the demo)
- Lucide icons

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

- `/` — Dashboard with recent requests and status counts
- `/requests/new` — Manager submits a new headcount request
- `/requests/[id]` — Full detail with approval timeline and approve / reject actions
- `/approvals` — Approval queue filtered by stage

State is seeded with demo requests and persisted in `localStorage`. Clear the key `headcount-store` to reset.
