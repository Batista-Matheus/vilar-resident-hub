import { Moon, PhoneForwarded } from "lucide-react";
import type { AfterHoursOutcome } from "@/data/work-orders";
import { cn } from "@/lib/utils";

export function AfterHoursBadge({ outcome, className }: { outcome: AfterHoursOutcome; className?: string }) {
  const escalated = outcome.mode === "escalated";
  const Icon = escalated ? PhoneForwarded : Moon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        escalated ? "bg-destructive/12 text-destructive" : "bg-navy text-navy-foreground dark:bg-lime-soft dark:text-lime",
        className,
      )}
    >
      <Icon className="h-3 w-3" strokeWidth={2.4} />
      {escalated ? "AI escalated" : "AI resolved"} · {outcome.receivedAt}
    </span>
  );
}
