import { quickReplies, type LangCode, type WorkOrder } from "@/data/work-orders";

export type WorkOrderFilter = "all" | "emergency" | "in-progress" | "scheduled" | "after-hours";

export const workOrderFilters: { id: WorkOrderFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "emergency", label: "Emergency" },
  { id: "in-progress", label: "In Progress" },
  { id: "scheduled", label: "Scheduled" },
  { id: "after-hours", label: "After-Hours AI Filtered" },
];

export function matchesFilter(wo: WorkOrder, filter: WorkOrderFilter): boolean {
  if (filter === "all") return true;
  if (filter === "after-hours") return wo.afterHours !== undefined;
  return wo.status === filter;
}

export function filterWorkOrders(list: WorkOrder[], filter: WorkOrderFilter): WorkOrder[] {
  return list.filter((wo) => matchesFilter(wo, filter));
}

export function countByFilter(list: WorkOrder[]): Record<WorkOrderFilter, number> {
  return Object.fromEntries(
    workOrderFilters.map(({ id }) => [id, filterWorkOrders(list, id).length]),
  ) as Record<WorkOrderFilter, number>;
}

/**
 * Demo translator: English → resident language using the canned phrasebook.
 * Returns the English text unchanged for English residents and null when no
 * translation is available (free text needs a live translation service).
 */
export function translateReply(english: string, to: LangCode): string | null {
  const text = english.trim();
  if (!text) return null;
  if (to === "en") return text;
  const hit = quickReplies.find((r) => r.en.toLowerCase() === text.toLowerCase());
  return hit ? hit.translations[to] : null;
}
