import { Building, Moon, Package, Wrench, type LucideIcon } from "lucide-react";
import type { Kpi, KpiTone } from "@/data/mock";
import { cn } from "@/lib/utils";

const icons: Record<Kpi["icon"], LucideIcon> = {
  occupancy: Building,
  "work-orders": Wrench,
  deliveries: Package,
  "after-hours": Moon,
};

const toneStyles: Record<KpiTone, string> = {
  lime: "bg-lime-soft text-lime",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
  navy: "bg-navy text-navy-foreground dark:bg-secondary dark:text-foreground",
};

export function KpiCard({ kpi, index = 0 }: { kpi: Kpi; index?: number }) {
  const Icon = icons[kpi.icon];
  return (
    <article
      className="animate-rise-in flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-medium leading-snug text-muted-foreground">{kpi.label}</p>
        <span className={cn("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", toneStyles[kpi.tone])}>
          <Icon className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </div>
      <div>
        <p className="text-3xl font-semibold leading-none tracking-tight sm:text-4xl">{kpi.value}</p>
        <p className="mt-2 text-xs text-muted-foreground">{kpi.hint}</p>
      </div>
    </article>
  );
}
