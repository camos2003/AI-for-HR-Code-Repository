"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Users, Inbox, LayoutDashboard, PlusCircle, RotateCcw } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/requests/new", label: "New Request", icon: PlusCircle },
  { href: "/approvals", label: "Approval Queue", icon: Inbox },
];

export function Nav() {
  const pathname = usePathname();
  const reset = useStore((s) => s.reset);

  function onReset() {
    if (confirm("Reset demo data? All requests will be restored to the starting state.")) {
      reset();
    }
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card/50 md:flex md:flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Users className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-none">Headcount</div>
          <div className="text-xs text-muted-foreground">Approval Portal</div>
        </div>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {links.map((l) => {
          const active =
            l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-3 border-t p-4">
        <button
          onClick={onReset}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset demo data
        </button>
        <div className="flex items-center gap-2 px-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            PROTOTYPE
          </span>
          <span>Demo only</span>
        </div>
      </div>
    </aside>
  );
}
