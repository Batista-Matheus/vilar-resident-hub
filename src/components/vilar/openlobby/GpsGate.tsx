import { MapPinOff, Navigation } from "lucide-react";
import { gpsDistances, type GpsState } from "@/data/openlobby";
import { GEOFENCE_RADIUS_M } from "@/lib/openlobby";

export function GpsGate({ state, onResolve }: { state: Exclude<GpsState, "verified">; onResolve: () => void }) {
  if (state === "prompt") {
    return (
      <div className="rounded-2xl border border-border bg-card p-3 shadow-card">
        <p className="text-[13px] font-semibold">openlobby.vilar.ca wants to know your location</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Used once to confirm you're at The Grove's lobby. Not stored after delivery.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" className="rounded-lg border border-border py-2 text-xs font-semibold">
            Block
          </button>
          <button
            type="button"
            onClick={onResolve}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground"
          >
            <Navigation className="h-3 w-3" /> Allow
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/6 p-3">
      <p className="flex items-center gap-1.5 text-[13px] font-semibold text-destructive">
        <MapPinOff className="h-4 w-4" /> You're {gpsDistances["out-of-range"]} m from the lobby
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Move within {GEOFENCE_RADIUS_M} m of The Grove's front entrance to request access.
      </p>
      <button
        type="button"
        onClick={onResolve}
        className="mt-3 w-full rounded-lg border border-border bg-card py-2 text-xs font-semibold"
      >
        Re-check my location
      </button>
    </div>
  );
}
