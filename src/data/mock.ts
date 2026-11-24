// Local mock data for the Vilar shell. No backend — replace with real sources later.

export const activeBuilding = {
  name: "The Grove",
  units: 217,
  city: "London",
  province: "ON",
} as const;

export type KpiTone = "lime" | "navy" | "info" | "warning";

export interface Kpi {
  id: string;
  label: string;
  value: string;
  hint: string;
  tone: KpiTone;
  icon: "occupancy" | "work-orders" | "deliveries" | "after-hours";
}

export const kpis: Kpi[] = [
  { id: "occupancy", label: "Occupancy", value: "98.2%", hint: "213 of 217 units leased", tone: "lime", icon: "occupancy" },
  { id: "work-orders", label: "Open Work Orders", value: "7", hint: "2 marked urgent", tone: "warning", icon: "work-orders" },
  { id: "deliveries", label: "Deliveries Today", value: "34", hint: "9 awaiting pickup", tone: "info", icon: "deliveries" },
  { id: "after-hours", label: "After-Hours Resolved", value: "12", hint: "Last 7 days", tone: "navy", icon: "after-hours" },
];

export type ActivityKind = "work-order" | "delivery" | "ai" | "inspection" | "access";

export interface Activity {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  time: string;
}

export const activity: Activity[] = [
  { id: "a1", kind: "ai", title: "OpenLobby AI resolved a noise complaint", detail: "Unit 1204 · auto-replied with quiet-hour policy", time: "2m" },
  { id: "a2", kind: "delivery", title: "Parcel logged for Unit 507", detail: "Canada Post · Locker B-14", time: "8m" },
  { id: "a3", kind: "work-order", title: "WO-1182 opened: leaking faucet", detail: "Unit 312 · assigned to M. Tremblay", time: "21m" },
  { id: "a4", kind: "inspection", title: "Fire panel check passed", detail: "Level P1 · monthly inspection", time: "1h" },
  { id: "a5", kind: "access", title: "FOB reissued for Unit 908", detail: "Front desk · lost key report", time: "2h" },
];

export interface QuickAction {
  id: string;
  label: string;
  icon: "new-wo" | "delivery" | "notice" | "inspection" | "ask-ai";
  primary?: boolean;
}

export const quickActions: QuickAction[] = [
  { id: "new-wo", label: "New work order", icon: "new-wo", primary: true },
  { id: "delivery", label: "Log delivery", icon: "delivery" },
  { id: "notice", label: "Notify residents", icon: "notice" },
  { id: "inspection", label: "Schedule inspection", icon: "inspection" },
  { id: "ask-ai", label: "Ask OpenLobby", icon: "ask-ai" },
];
