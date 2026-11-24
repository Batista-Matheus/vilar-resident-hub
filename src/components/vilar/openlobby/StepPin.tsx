import { Check, Loader2, Mic, PhoneCall, TimerOff } from "lucide-react";
import { formatCountdown } from "@/lib/openlobby";
import { cn } from "@/lib/utils";
import { StepLabel } from "./StepCapture";

interface Props {
  validating: boolean;
  checks: string[];
  checksDone: number;
  pin: string;
  secondsLeft: number;
  onSimulate: () => void;
  onRegenerate: () => void;
}

export function StepPin({ validating, checks, checksDone, pin, secondsLeft, onSimulate, onRegenerate }: Props) {
  const expired = secondsLeft <= 0;
  return (
    <div className="space-y-4">
      <StepLabel n={2} title="AI validation & one-time PIN" />

      <ul className="space-y-1.5 rounded-2xl border border-border bg-card p-3">
        {checks.map((c, i) => {
          const done = i < checksDone;
          return (
            <li key={c} className={cn("flex items-center gap-2 text-xs", done ? "text-foreground" : "text-muted-foreground")}>
              {done ? (
                <Check className="h-3.5 w-3.5 text-lime" strokeWidth={3} />
              ) : (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              )}
              {c}
            </li>
          );
        })}
      </ul>

      {!validating && (
        <>
          <div className="animate-rise-in rounded-3xl bg-navy p-5 text-center text-navy-foreground dark:bg-card dark:text-foreground">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-70">One-time lobby PIN</p>
            <p
              className={cn(
                "mt-2 font-display text-6xl font-bold tracking-[0.25em] tabular-nums",
                expired ? "line-through opacity-40" : "text-lime",
              )}
              aria-label={`PIN ${pin.split("").join(" ")}`}
            >
              {pin}
            </p>
            <p className={cn("mt-2 text-sm font-semibold tabular-nums", expired ? "text-destructive" : "opacity-80")}>
              {expired ? "Expired" : `Expires in ${formatCountdown(secondsLeft)}`}
            </p>
          </div>

          {expired ? (
            <button
              type="button"
              onClick={onRegenerate}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-semibold"
            >
              <TimerOff className="h-4 w-4" /> Generate a new PIN
            </button>
          ) : (
            <>
              <div className="flex gap-3 rounded-2xl border border-lime/40 bg-lime-soft p-3">
                <Mic className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <p className="text-[13px] leading-snug">
                  <span className="font-semibold">Step 3:</span> Dial <span className="font-semibold">'OpenLobby'</span>{" "}
                  on the building intercom and speak code{" "}
                  <span className="font-bold tabular-nums">{pin}</span> aloud.
                </p>
              </div>
              <button
                type="button"
                onClick={onSimulate}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-3.5 text-sm font-semibold text-lime-foreground shadow-lime active:scale-[0.98]"
              >
                <PhoneCall className="h-4 w-4" /> Simulate Intercom Call & Speak PIN
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
