import { describe, expect, it } from "vitest";
import { residentDirectory } from "@/data/openlobby";
import {
  findResident,
  formatCountdown,
  generatePin,
  intercomStages,
  isWithinGeofence,
  PIN_TTL_SECONDS,
  retentionExpiry,
} from "@/lib/openlobby";

describe("OpenLobby courier access rules", () => {
  it("12 m from the lobby passes the geofence, 340 m does not", () => {
    expect(isWithinGeofence(12)).toBe(true);
    expect(isWithinGeofence(340)).toBe(false);
  });

  it("PIN is always exactly 4 digits", () => {
    expect(generatePin(() => 0)).toBe("1000");
    expect(generatePin(() => 0.9999)).toBe("9999");
  });

  it("PIN countdown starts at 03:00", () => {
    expect(formatCountdown(PIN_TTL_SECONDS)).toBe("03:00");
    expect(formatCountdown(59)).toBe("00:59");
  });

  it("intercom recognises the spoken PIN and sends DTMF 9 to unlock", () => {
    expect(intercomStages("4829")).toEqual([
      "Intercom Connected to OpenLobby AI",
      'Voice Recognized: "4-8-2-9" (Matched)',
      'Sending DTMF Tone "9"',
      "Lobby Door Unlocked",
    ]);
  });

  it("unit 605 autofills its resident from the directory", () => {
    expect(findResident(residentDirectory, "605")?.name).toBe("Hannah Kowalski");
    expect(findResident(residentDirectory, "999")).toBeUndefined();
  });

  it("delivery records are purged 30 days after the delivery (PIPEDA)", () => {
    expect(retentionExpiry("2026-11-23T15:15:00Z").toISOString()).toBe("2026-12-23T15:15:00.000Z");
  });
});
