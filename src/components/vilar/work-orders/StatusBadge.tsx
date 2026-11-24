import type { WorkOrderStatus } from "@/data/work-orders";
import { cn } from "@/lib/utils";

export const statusMeta: Record<WorkOrderStatus, { label: string; badge: string; bar: string }> = {
  emergency: { label: "Emergency", badge: "bg-destructive/12 text-destructive", bar: "bg-destructive" },
  "in-progress": { label: "In progress", badge: "bg-warning-soft text-warning", bar: "bg-warning" },
  scheduled: { label: "Scheduled", badge: "bg-info-soft text-info", bar: "bg-info" },
  resolved: { label: "Resolved", badge: "bg-lime-soft text-lime", bar: "bg-lime" },
};

export function StatusBadge({ status, className }: { status: WorkOrderStatus; className?: string }) {
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        meta.badge,
        className,
      )}
    >
      {status === "emergency" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />}
      {meta.label}
    </span>
  );
}
