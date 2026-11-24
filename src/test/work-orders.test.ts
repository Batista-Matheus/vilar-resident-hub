import { describe, expect, it } from "vitest";
import { workOrders } from "@/data/work-orders";
import { countByFilter, filterWorkOrders, translateReply } from "@/lib/work-orders";

describe("work order filters", () => {
  it("After-Hours AI Filtered shows only tickets handled by the overnight AI", () => {
    const ids = filterWorkOrders(workOrders, "after-hours").map((w) => w.id);
    expect(ids.sort()).toEqual(["WO-1188", "WO-1189", "WO-1190"]);
  });

  it("Emergency shows only emergency tickets", () => {
    expect(filterWorkOrders(workOrders, "emergency").every((w) => w.status === "emergency")).toBe(true);
    expect(countByFilter(workOrders).emergency).toBe(2);
  });

  it("open tickets match the 7 shown on Overview", () => {
    expect(workOrders.filter((w) => w.status !== "resolved")).toHaveLength(7);
  });
});

describe("reply translation", () => {
  it("translates a known English reply into Mandarin", () => {
    expect(translateReply("Please send a photo of the issue.", "zh")).toBe("请发送一张问题的照片。");
  });

  it("returns null for free text it cannot translate", () => {
    expect(translateReply("The plumber is parked out front", "es")).toBeNull();
  });
});
