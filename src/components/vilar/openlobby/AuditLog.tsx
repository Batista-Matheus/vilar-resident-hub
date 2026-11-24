import { Check, LocateFixed, ShieldCheck } from "lucide-react";
import type { AuditEntry } from "@/data/openlobby";
import { formatLogTime, formatShortDate, RETENTION_DAYS, retentionExpiry } from "@/lib/openlobby";
import { cn } from "@/lib/utils";

export function AuditLog({ entries, highlightId }: { entries: AuditEntry[]; highlightId: string | null }) {
  return (
    <section aria-labelledby="audit-heading" className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-2 px-4 pb-3 pt-4">
        <div>
          <h2 id="audit-heading" className="text-base font-semibold tracking-tight">
            Building Manager Audit Log
          </h2>
          <p className="text-xs text-muted-foreground">Every OpenLobby courier entry, logged as it happens</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-lime-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-lime">
          <span className="relative flex h-2 w-2">
            <span className="animate-live-ping absolute inline-flex h-full w-full rounded-full bg-lime" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          Live · {entries.length}
        </span>
      </div>

      <MobileList entries={entries} highlightId={highlightId} />

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[600px] text-left text-xs">
          <thead className="border-y border-border bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="py-2 pl-3 pr-2 font-semibold">Photo</th>
              <th className="px-2 py-2 font-semibold">Unit & resident</th>
              <th className="px-2 py-2 font-semibold">GPS</th>
              <th className="px-2 py-2 font-semibold">PIN</th>
              <th className="px-2 py-2 font-semibold">Voice</th>
              <th className="px-2 py-2 font-semibold">Time</th>
              <th className="py-2 pl-2 pr-3 font-semibold">Retention</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((e) => {
              const t = formatLogTime(e.timestamp);
              const purge = formatShortDate(retentionExpiry(e.timestamp));
              const fresh = e.id === highlightId;
              return (
                <tr key={e.id} className={cn("align-middle", fresh && "animate-rise-in bg-lime-soft")}>
                  <td className="py-2.5 pl-3 pr-2">
                    <img src={e.photo} alt={`Parcel for unit ${e.unit}`} className="h-10 w-10 rounded-lg object-cover" />
                  </td>
                  <td className="px-2 py-2.5">
                    <p className="font-semibold">
                      Unit {e.unit}
                      {e.newResident && (
                        <span className="ml-1.5 rounded bg-info-soft px-1 py-px text-[9px] font-semibold uppercase text-info">
                          New
                        </span>
                      )}
                    </p>
                    <p className="text-muted-foreground">{e.resident}</p>
                    <p className="text-[10px] text-muted-foreground/80">{e.courier}</p>
                  </td>
                  <td className="px-2 py-2.5">
                    <span className="inline-flex items-center gap-1 font-medium text-lime">
                      <LocateFixed className="h-3 w-3" /> {e.gpsVerified ? "Verified" : "Failed"}
                    </span>
                    <p className="text-[10px] text-muted-foreground">{e.gpsDistanceM} m</p>
                  </td>
                  <td className="px-2 py-2.5 font-semibold tabular-nums tracking-widest">{e.pin}</td>
                  <td className="px-2 py-2.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-lime-soft px-1.5 py-0.5 text-[10px] font-semibold text-lime">
                      <Check className="h-3 w-3" strokeWidth={3} /> {e.voiceMatched ? "Matched" : "No match"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-2.5 tabular-nums">
                    <p className="font-medium">{fresh ? "Just now" : t.time}</p>
                    <p className="text-[10px] text-muted-foreground">{t.date}</p>
                  </td>
                  <td className="py-2.5 pl-2 pr-3">
                    <span
                      title={`Photo, voice clip and PIN purged ${RETENTION_DAYS} days after delivery`}
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-border px-1.5 py-0.5 text-[10px] font-semibold"
                    >
                      <ShieldCheck className="h-3 w-3 text-lime" /> PIPEDA · {RETENTION_DAYS}d
                    </span>
                    <p className="mt-0.5 whitespace-nowrap text-[10px] text-muted-foreground">Purge {purge}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MobileList({ entries, highlightId }: { entries: AuditEntry[]; highlightId: string | null }) {
  return (
    <ul className="divide-y divide-border border-t border-border md:hidden">
      {entries.map((e) => {
        const t = formatLogTime(e.timestamp);
        const fresh = e.id === highlightId;
        return (
          <li key={e.id} className={cn("flex gap-3 px-4 py-3", fresh && "animate-rise-in bg-lime-soft")}>
            <img src={e.photo} alt={`Parcel for unit ${e.unit}`} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-sm font-semibold">
                  Unit {e.unit} · <span className="font-normal">{e.resident}</span>
                </p>
                <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                  {fresh ? "Just now" : `${t.date}, ${t.time}`}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {e.courier}
                {e.newResident && " · new resident"}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1 text-[10px] font-semibold">
                <span className="inline-flex items-center gap-1 rounded-full bg-lime-soft px-1.5 py-0.5 text-lime">
                  <LocateFixed className="h-3 w-3" /> GPS {e.gpsDistanceM} m
                </span>
                <span className="rounded-full bg-muted px-1.5 py-0.5 tabular-nums tracking-widest">PIN {e.pin}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-lime-soft px-1.5 py-0.5 text-lime">
                  <Check className="h-3 w-3" strokeWidth={3} /> Voice matched
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-1.5 py-0.5">
                  <ShieldCheck className="h-3 w-3 text-lime" /> PIPEDA · {RETENTION_DAYS}d
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
