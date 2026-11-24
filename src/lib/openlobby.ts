import type { DirectoryEntry } from "@/data/openlobby";

/** Couriers must be within this distance of the lobby to request access. */
export const GEOFENCE_RADIUS_M = 50;
/** One-time PIN lifetime: 3 minutes. */
export const PIN_TTL_SECONDS = 180;
/** PIPEDA retention window for parcel photos and voice clips. */
export const RETENTION_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

export function isWithinGeofence(distanceM: number): boolean {
  return distanceM <= GEOFENCE_RADIUS_M;
}

export function generatePin(random: () => number = Math.random): string {
  return String(1000 + Math.floor(random() * 9000));
}

export function formatCountdown(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function spokenPin(pin: string): string {
  return pin.split("").join("-");
}

export function findResident(directory: DirectoryEntry[], unit: string): DirectoryEntry | undefined {
  const u = unit.trim();
  return u ? directory.find((d) => d.unit === u) : undefined;
}

export function retentionExpiry(timestampIso: string): Date {
  return new Date(new Date(timestampIso).getTime() + RETENTION_DAYS * DAY_MS);
}

/** The intercom unlock sequence, in order. */
export function intercomStages(pin: string): string[] {
  return [
    "Intercom Connected to OpenLobby AI",
    `Voice Recognized: "${spokenPin(pin)}" (Matched)`,
    'Sending DTMF Tone "9"',
    "Lobby Door Unlocked",
  ];
}

const TZ = "America/Toronto";

export function formatLogTime(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-CA", { timeZone: TZ, month: "short", day: "numeric" }),
    time: d.toLocaleTimeString("en-CA", { timeZone: TZ, hour: "numeric", minute: "2-digit" }),
  };
}

export function formatShortDate(d: Date): string {
  return d.toLocaleDateString("en-CA", { timeZone: TZ, month: "short", day: "numeric" });
}
