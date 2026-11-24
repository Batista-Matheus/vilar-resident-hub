import { ChevronRight, Languages } from "lucide-react";
import { languages, type WorkOrder } from "@/data/work-orders";
import { cn } from "@/lib/utils";
import { AfterHoursBadge } from "./AfterHoursBadge";
import { StatusBadge, statusMeta } from "./StatusBadge";

export function WorkOrderRow({ wo, onOpen }: { wo: WorkOrder; onOpen: () => void }) {
  const lang = wo.resident.lang;
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="group relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border border-border bg-card p-4 pl-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-ring/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className={cn("absolute inset-y-3 left-0 w-1 rounded-r-full", statusMeta[wo.status].bar)} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold tabular-nums text-muted-foreground">{wo.id}</span>
            <StatusBadge status={wo.status} />
            {wo.afterHours && <AfterHoursBadge outcome={wo.afterHours} />}
          </div>
          <p className="mt-1.5 text-[15px] font-semibold leading-snug tracking-tight">{wo.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {wo.location} · {wo.category} · {wo.scheduledFor ?? wo.reportedAt}
          </p>
          {lang !== "en" && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              <Languages className="h-3 w-3" />
              {languages[lang].native} ↔ English
            </span>
          )}
        </div>
        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </button>
    </li>
  );
}
