import { ClipboardCheck, KeyRound, Package, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import type { Activity, ActivityKind } from "@/data/mock";
import { cn } from "@/lib/utils";

const kindMeta: Record<ActivityKind, { icon: LucideIcon; className: string }> = {
  ai: { icon: Sparkles, className: "bg-lime-soft text-lime" },
  delivery: { icon: Package, className: "bg-info-soft text-info" },
  "work-order": { icon: Wrench, className: "bg-warning-soft text-warning" },
  inspection: { icon: ClipboardCheck, className: "bg-lime-soft text-lime" },
  access: { icon: KeyRound, className: "bg-muted text-muted-foreground" },
};

export function ActivityFeed({ items }: { items: Activity[] }) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-card" aria-labelledby="activity-heading">
      <div className="flex items-center justify-between px-4 pb-2 pt-4 sm:px-5">
        <h2 id="activity-heading" className="text-base font-semibold tracking-tight">
          Live activity
        </h2>
        <span className="inline-flex items-center gap-2 rounded-full bg-lime-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-lime">
          <span className="relative flex h-2 w-2">
            <span className="animate-live-ping absolute inline-flex h-full w-full rounded-full bg-lime" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          Live
        </span>
      </div>
      <ul className="divide-y divide-border">
        {items.map((item) => {
          const { icon: Icon, className } = kindMeta[item.kind];
          return (
            <li key={item.id} className="flex items-start gap-3 px-4 py-3 sm:px-5">
              <span className={cn("mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", className)}>
                <Icon className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium leading-snug">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <time className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">{item.time}</time>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
