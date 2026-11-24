import { Check, DoorOpen, Loader2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepLabel } from "./StepCapture";

interface Props {
  stages: string[];
  reached: number;
  onReset: () => void;
}

export function StepIntercom({ stages, reached, onReset }: Props) {
  const unlocked = reached >= stages.length;
  return (
    <div className="space-y-4">
      <StepLabel n={3} title="Intercom voice check" />

      <ol className="space-y-2">
        {stages.map((label, i) => {
          const done = i < reached;
          const active = i === reached;
          const last = i === stages.length - 1;
          return (
            <li
              key={label}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 text-[13px] transition-all duration-300",
                done && last && "border-lime bg-lime text-lime-foreground",
                done && !last && "border-border bg-card",
                !done && "border-dashed border-border text-muted-foreground",
                active && "border-solid border-ring/50 bg-card text-foreground",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  done ? (last ? "bg-lime-foreground text-lime" : "bg-lime text-lime-foreground") : "bg-muted",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : active ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <span className="text-[10px] font-semibold">{i + 1}</span>}
              </span>
              <span className="font-medium">{label}</span>
            </li>
          );
        })}
      </ol>

      {unlocked && (
        <div className="animate-rise-in flex flex-col items-center gap-3 pt-2 text-center">
          <span className="animate-door-pulse inline-flex h-20 w-20 items-center justify-center rounded-full bg-lime text-lime-foreground">
            <DoorOpen className="h-9 w-9" />
          </span>
          <div>
            <p className="text-lg font-semibold">Door unlocked — come on in</p>
            <p className="text-xs text-muted-foreground">Leave the parcel in the mailroom. The resident has been notified.</p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Start another delivery
          </button>
        </div>
      )}
    </div>
  );
}
