import { LocateFixed, MapPinOff, ShieldQuestion } from "lucide-react";
import { gpsDistances, type GpsState } from "@/data/openlobby";
import { cn } from "@/lib/utils";

export function GeofenceBadge({ state }: { state: GpsState }) {
  if (state === "verified") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-lime-foreground shadow-lime">
        <span className="relative flex h-2 w-2">
          <span className="animate-live-ping absolute inline-flex h-full w-full rounded-full bg-lime-foreground" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-foreground" />
        </span>
        <LocateFixed className="h-3 w-3" />
        GPS Geofence Verified ({gpsDistances.verified}m from Lobby)
      </span>
    );
  }
  const out = state === "out-of-range";
  const Icon = out ? MapPinOff : ShieldQuestion;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        out ? "bg-destructive/12 text-destructive" : "bg-warning-soft text-warning",
      )}
    >
      <Icon className="h-3 w-3" />
      {out ? `Out of Range (${gpsDistances["out-of-range"]}m from Lobby)` : "Location Permission Needed"}
    </span>
  );
}
