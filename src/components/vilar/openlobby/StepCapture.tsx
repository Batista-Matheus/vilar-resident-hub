import { Camera, RotateCcw, Sparkles, UserPlus } from "lucide-react";
import { useState } from "react";
import { residentDirectory, type GpsState } from "@/data/openlobby";
import { findResident } from "@/lib/openlobby";
import { cn } from "@/lib/utils";
import { GpsGate } from "./GpsGate";

export interface CaptureValues {
  photo: string | null;
  unit: string;
  name: string;
  newResident: boolean;
}

interface Props {
  gps: GpsState;
  onGpsResolve: () => void;
  samplePhoto: string;
  values: CaptureValues;
  onChange: (v: CaptureValues) => void;
  onSubmit: () => void;
}

export function StepCapture({ gps, onGpsResolve, samplePhoto, values, onChange, onSubmit }: Props) {
  const [shutter, setShutter] = useState(false);
  const match = findResident(residentDirectory, values.unit);
  const nameMatches = match && match.name === values.name;
  const unitUnknown = values.unit.trim().length >= 3 && !match;
  const canSubmit = gps === "verified" && values.photo && values.unit.trim() && values.name.trim();

  function takePhoto() {
    setShutter(true);
    setTimeout(() => {
      onChange({ ...values, photo: samplePhoto });
      setShutter(false);
    }, 450);
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit();
      }}
    >
      {gps !== "verified" && <GpsGate state={gps} onResolve={onGpsResolve} />}

      <StepLabel n={1} title="Package photo & recipient" />

      {values.photo ? (
        <div className="relative overflow-hidden rounded-2xl">
          <img src={values.photo} alt="Parcel photo taken by courier" className="aspect-[4/3] w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange({ ...values, photo: null })}
            className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur"
          >
            <RotateCcw className="h-3 w-3" /> Retake
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={takePhoto}
          className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-border bg-muted/50 text-sm font-semibold transition-colors hover:bg-muted"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Camera className="h-5 w-5" />
          </span>
          Take Package Photo
          <span className="text-xs font-normal text-muted-foreground">Label facing up</span>
          {shutter && <span className="animate-shutter absolute inset-0 bg-background" />}
        </button>
      )}

      <div className="grid grid-cols-[96px_1fr] gap-2">
        <Field label="Unit">
          <input
            inputMode="numeric"
            value={values.unit}
            placeholder="605"
            onChange={(e) =>
              onChange({ ...values, unit: e.target.value.replace(/\D/g, "").slice(0, 4), newResident: false })
            }
            className="w-full bg-transparent text-base font-semibold tabular-nums outline-none placeholder:text-muted-foreground/60"
          />
        </Field>
        <Field label={values.newResident ? "New resident name" : "Resident name"}>
          <input
            value={values.name}
            placeholder="Full name"
            onChange={(e) => onChange({ ...values, name: e.target.value })}
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
          />
        </Field>
      </div>

      {match && !nameMatches && !values.newResident && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...values, name: match.name, newResident: false })}
            className="inline-flex items-center gap-1.5 rounded-full bg-lime-soft px-3 py-1.5 text-xs font-semibold text-lime"
          >
            <Sparkles className="h-3 w-3" /> Autofill: {match.name}
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...values, name: "", newResident: true })}
            className="text-xs font-medium text-muted-foreground underline underline-offset-2"
          >
            Different resident?
          </button>
        </div>
      )}

      {unitUnknown && !values.newResident && (
        <button
          type="button"
          onClick={() => onChange({ ...values, newResident: true })}
          className="flex w-full items-center gap-2 rounded-xl border border-border bg-card p-2.5 text-left text-xs"
        >
          <UserPlus className="h-4 w-4 shrink-0 text-lime" />
          <span>
            <span className="font-semibold">Unit {values.unit} not in directory.</span>{" "}
            <span className="text-muted-foreground">Quick-register a new resident</span>
          </span>
        </button>
      )}

      {values.newResident && (
        <p className="rounded-xl bg-info-soft px-3 py-2 text-xs text-info">
          Quick registration · the front desk confirms new residents within 24 h.
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          "w-full rounded-2xl py-3.5 text-sm font-semibold transition-all",
          canSubmit ? "bg-lime text-lime-foreground shadow-lime active:scale-[0.98]" : "bg-muted text-muted-foreground",
        )}
      >
        Generate Lobby PIN
      </button>
    </form>
  );
}

export function StepLabel({ n, title }: { n: number; title: string }) {
  return (
    <p className="flex items-center gap-2 text-sm font-semibold">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] text-primary-foreground">
        {n}
      </span>
      {title}
    </p>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-xl border border-input bg-card px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
      <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
