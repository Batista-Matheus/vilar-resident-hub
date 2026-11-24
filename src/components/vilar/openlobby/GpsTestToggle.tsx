import type { GpsState } from "@/data/openlobby";
import { cn } from "@/lib/utils";

const options: { id: GpsState; label: string }[] = [
  { id: "verified", label: "In range" },
  { id: "prompt", label: "Permission prompt" },
  { id: "out-of-range", label: "Out of range" },
];

export function GpsTestToggle({ value, onChange }: { value: GpsState; onChange: (s: GpsState) => void }) {
  return (
    <div className="mx-auto w-full max-w-[340px]">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Test GPS state</p>
      <div role="radiogroup" aria-label="Test GPS state" className="grid grid-cols-3 gap-1 rounded-xl bg-muted p-1">
        {options.map((o) => (
          <button
            key={o.id}
            role="radio"
            aria-checked={value === o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={cn(
              "rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
              value === o.id ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
