import { Sparkles } from "lucide-react";
import { workOrderFilters, type WorkOrderFilter } from "@/lib/work-orders";
import { cn } from "@/lib/utils";

interface Props {
  value: WorkOrderFilter;
  counts: Record<WorkOrderFilter, number>;
  onChange: (filter: WorkOrderFilter) => void;
}

export function FilterPills({ value, counts, onChange }: Props) {
  return (
    <div role="tablist" aria-label="Filter work orders" className="-mx-4 sm:mx-0">
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 sm:flex-wrap sm:px-0">
        {workOrderFilters.map(({ id, label }) => {
          const active = id === value;
          return (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => onChange(id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              {id === "after-hours" && <Sparkles className="h-3.5 w-3.5" />}
              {label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs tabular-nums",
                  active ? "bg-primary-foreground/15" : "bg-muted text-muted-foreground",
                )}
              >
                {counts[id]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
