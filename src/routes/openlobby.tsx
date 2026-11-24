import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Smartphone } from "lucide-react";
import { useState } from "react";
import { AuditLog } from "@/components/vilar/openlobby/AuditLog";
import { CourierFlow } from "@/components/vilar/openlobby/CourierFlow";
import { GpsTestToggle } from "@/components/vilar/openlobby/GpsTestToggle";
import { PhoneFrame } from "@/components/vilar/openlobby/PhoneFrame";
import { seedAuditLog, type AuditEntry, type GpsState } from "@/data/openlobby";
import { cn } from "@/lib/utils";

const DESCRIPTION =
  "App-free courier lobby access: GPS geofence, parcel photo, one-time PIN spoken at the intercom, and a PIPEDA-ready audit log.";

export const Route = createFileRoute("/openlobby")({
  head: () => ({
    meta: [
      { title: "OpenLobby AI — Vilar Building OS" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "OpenLobby AI — Vilar Building OS" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OpenLobbyPage,
});

type View = "courier" | "audit";

function OpenLobbyPage() {
  const [view, setView] = useState<View>("courier");
  const [gps, setGps] = useState<GpsState>("verified");
  const [log, setLog] = useState<AuditEntry[]>(seedAuditLog);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const deliveryCount = log.length - seedAuditLog.length;

  function addEntry(entry: AuditEntry) {
    setLog((prev) => [entry, ...prev]);
    setHighlightId(entry.id);
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">OpenLobby AI</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Courier lobby access</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Couriers scan the lobby QR code, photograph the parcel and speak a one-time PIN at the intercom.
        </p>
      </div>

      <div role="tablist" aria-label="View" className="grid grid-cols-2 gap-1 rounded-2xl bg-muted p-1 lg:hidden">
        {(
          [
            { id: "courier", label: "Courier view", icon: Smartphone },
            { id: "audit", label: `Audit log (${log.length})`, icon: ClipboardList },
          ] as const
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={view === id}
            onClick={() => setView(id)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-medium transition-colors",
              view === id ? "bg-card text-foreground shadow-card" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className={cn("space-y-3 lg:block", view === "courier" ? "block" : "hidden")}>
          <GpsTestToggle value={gps} onChange={setGps} />
          <PhoneFrame url="openlobby.vilar.ca/the-grove">
            <CourierFlow gps={gps} onGpsChange={setGps} deliveryCount={deliveryCount} onDelivered={addEntry} />
          </PhoneFrame>
        </div>
        <div className={cn("lg:block", view === "audit" ? "block" : "hidden")}>
          <AuditLog entries={log} highlightId={highlightId} />
        </div>
      </div>
    </div>
  );
}
