# Headcount Approval Portal — Prototype

A working demo of a program that routes manager requests for new headcount through leadership approval: **Finance → Department VP → CHRO**.

Built with Next.js + Tailwind. No backend required for the prototype — demo data is stored in the browser so anyone can click through a full approval flow.

---

## What's in the prototype

- **Dashboard** — Status counts and a feed of recent requests
- **New request** — Manager submission form (role, comp band, start date, justification, urgency)
- **Request detail** — Full approval timeline with Approve / Reject actions and approver notes
- **Approval queue** — Filtered by stage (Finance, Dept VP, CHRO) so each approver sees only what's waiting on them
- **Reset demo data** — One-click reset in the sidebar so you can re-walk the flow

Seeded with 5 sample requests covering every status: pending at each stage, approved, and rejected.

---

## Share it with your client

### Option 1 — One-click deploy to a public URL (recommended)

This gives you a live link like `headcount-approval.vercel.app` to send the client.

1. Click this button:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcamos2003%2FAI-for-HR-Code-Repository&project-name=headcount-approval&repository-name=headcount-approval)

2. Sign in with GitHub, accept the defaults, and click **Deploy**
3. Copy the URL Vercel gives you and share it

Every new commit to the branch auto-redeploys. Free tier is plenty for a client demo.

### Option 2 — Run locally on your laptop for a walkthrough

```bash
git clone https://github.com/camos2003/AI-for-HR-Code-Repository.git
cd AI-for-HR-Code-Repository
git checkout claude/headcount-approval-design-5VGgH
npm install
npm run dev
```

Then open http://localhost:3000.

Requires [Node.js](https://nodejs.org) (LTS).

### Option 3 — Temporary tunnel for a quick demo

With `npm run dev` running, in a second terminal:

```bash
npx localtunnel --port 3000
```

Share the URL it gives you. Works only while your laptop and dev server are running.

---

## What this prototype is (and isn't)

**It is:** a clickable demonstration of the user experience, approval routing, and data model. Good for scoping conversations, stakeholder buy-in, and sign-off on the workflow.

**It isn't:** production-ready. Missing pieces the client should expect to scope next:

- Authentication and real users (currently anyone sees all requests)
- Persistent database (data lives in each visitor's browser)
- Email / Slack notifications to approvers
- HRIS integration (Workday, Paycom, ADP, etc.)
- Audit export, reporting, budget ties, org-chart-based routing
- Role-based views (manager vs. approver vs. HRBP)

---

## Stack

- Next.js 14 (App Router), TypeScript
- Tailwind CSS + shadcn/ui-style components
- Zustand + `localStorage` for demo state
- Lucide icons
