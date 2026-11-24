import { BellOff, Moon, PhoneForwarded } from "lucide-react";
import type { AfterHoursOutcome } from "@/data/work-orders";
import { cn } from "@/lib/utils";
import { VoiceSummary } from "./VoiceSummary";

export function AfterHoursPanel({ outcome }: { outcome: AfterHoursOutcome }) {
  const escalated = outcome.mode === "escalated";
  return (
    <section
      aria-label="After-hours AI handling"
      className={cn(
        "rounded-2xl border p-4",
        escalated ? "border-destructive/30 bg-destructive/6" : "border-lime/30 bg-lime-soft",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            escalated ? "bg-destructive text-destructive-foreground" : "bg-lime text-lime-foreground",
          )}
        >
          {escalated ? <PhoneForwarded className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            After-hours AI · {outcome.receivedAt}
          </p>
          <p className="text-[15px] font-semibold leading-snug">
            {escalated ? "Escalated by warm transfer" : "Resolved automatically"}
          </p>
          <p className="text-xs text-muted-foreground">{outcome.classification}</p>
        </div>
      </div>

      {outcome.mode === "auto-resolved" ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-card px-3 py-2 text-sm">
          <BellOff className="h-4 w-4 text-lime" />
          <span>
            <strong className="font-semibold">Manager not woken</strong>
            <span className="text-muted-foreground"> · {outcome.managerPages} pages sent</span>
          </span>
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <VoiceSummary text={outcome.voiceSummary} seconds={outcome.voiceSeconds} />
          <p className="text-xs text-muted-foreground">
            Heard by <span className="font-medium text-foreground">{outcome.transferTo}</span> before the call
            connected · connected in {outcome.connectedIn}
          </p>
        </div>
      )}

      <ol className="mt-4 space-y-2.5 border-l border-border pl-4">
        {outcome.steps.map((s, i) => (
          <li key={i} className="relative text-[13px] leading-snug">
            <span
              className={cn(
                "absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-card",
                escalated ? "bg-destructive" : "bg-lime",
              )}
            />
            <span className="mr-2 font-semibold tabular-nums">{s.time}</span>
            <span className="text-muted-foreground">{s.label}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
