// Mock data for OpenLobby AI courier access at The Grove. Local only — no backend.
import parcel1 from "@/assets/parcel-1.jpg";
import parcel2 from "@/assets/parcel-2.jpg";

export const parcelPhotos = [parcel1, parcel2] as const;

export interface DirectoryEntry {
  unit: string;
  name: string;
}

export const residentDirectory: DirectoryEntry[] = [
  { unit: "605", name: "Hannah Kowalski" },
  { unit: "804", name: "Lucía Hernández" },
  { unit: "1107", name: "Wei Zhang" },
  { unit: "312", name: "Priya Patel" },
  { unit: "418", name: "Amélie Gagnon" },
  { unit: "210", name: "Li Na" },
  { unit: "1204", name: "Omar Haddad" },
  { unit: "615", name: "Carlos Romero" },
  { unit: "907", name: "Jordan MacLeod" },
];

export type GpsState = "verified" | "prompt" | "out-of-range";

export const gpsDistances: Record<Exclude<GpsState, "prompt">, number> = {
  verified: 12,
  "out-of-range": 340,
};

export interface AuditEntry {
  id: string;
  photo: string;
  unit: string;
  resident: string;
  newResident: boolean;
  courier: string;
  gpsVerified: boolean;
  gpsDistanceM: number;
  pin: string;
  voiceMatched: boolean;
  /** ISO timestamp (UTC). */
  timestamp: string;
}

export const seedAuditLog: AuditEntry[] = [
  { id: "d5", photo: parcel2, unit: "907", resident: "Jordan MacLeod", newResident: false, courier: "Purolator", gpsVerified: true, gpsDistanceM: 9, pin: "7316", voiceMatched: true, timestamp: "2026-11-23T22:41:00Z" },
  { id: "d4", photo: parcel1, unit: "615", resident: "Carlos Romero", newResident: false, courier: "Amazon", gpsVerified: true, gpsDistanceM: 14, pin: "2058", voiceMatched: true, timestamp: "2026-11-23T21:07:00Z" },
  { id: "d3", photo: parcel2, unit: "1204", resident: "Omar Haddad", newResident: false, courier: "Canada Post", gpsVerified: true, gpsDistanceM: 11, pin: "9472", voiceMatched: true, timestamp: "2026-11-23T19:26:00Z" },
  { id: "d2", photo: parcel1, unit: "1502", resident: "Sophie Tremblay", newResident: true, courier: "Intelcom", gpsVerified: true, gpsDistanceM: 18, pin: "6631", voiceMatched: true, timestamp: "2026-11-23T17:52:00Z" },
  { id: "d1", photo: parcel2, unit: "312", resident: "Priya Patel", newResident: false, courier: "FedEx", gpsVerified: true, gpsDistanceM: 7, pin: "1849", voiceMatched: true, timestamp: "2026-11-23T15:15:00Z" },
];
