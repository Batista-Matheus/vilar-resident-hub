import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { FilterPills } from "@/components/vilar/work-orders/FilterPills";
import { WorkOrderDetail } from "@/components/vilar/work-orders/WorkOrderDetail";
import { WorkOrderRow } from "@/components/vilar/work-orders/WorkOrderRow";
import { workOrders, type ThreadMessage } from "@/data/work-orders";
import { useIsMobile } from "@/hooks/use-mobile";
import { countByFilter, filterWorkOrders, type WorkOrderFilter } from "@/lib/work-orders";

const DESCRIPTION = "Emergency, in-progress and scheduled maintenance with live resident translation and after-hours AI triage.";

export const Route = createFileRoute("/work-orders")({
  head: () => ({
    meta: [
      { title: "Work Orders — Vilar Building OS" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Work Orders — Vilar Building OS" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkOrdersPage,
});

function WorkOrdersPage() {
  const [filter, setFilter] = useState<WorkOrderFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, ThreadMessage[]>>({});
  const isMobile = useIsMobile();

  const counts = useMemo(() => countByFilter(workOrders), []);
  const visible = useMemo(() => filterWorkOrders(workOrders, filter), [filter]);
  const selected = workOrders.find((w) => w.id === selectedId) ?? null;
  const openCount = workOrders.filter((w) => w.status !== "resolved").length;

  function addReply(english: string, translation: string | null) {
    if (!selected) return;
    const msg: ThreadMessage = {
      id: `r${Date.now()}`,
      author: "manager",
      time: "Just now",
      original: english,
      originalLang: "en",
      translation,
    };
    setReplies((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] ?? []), msg] }));
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">Work Orders</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Maintenance queue</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {openCount} open · {counts.emergency} emergency · {counts["after-hours"]} handled overnight by AI
        </p>
      </div>

      <FilterPills value={filter} counts={counts} onChange={setFilter} />

      <ul className="grid gap-2.5 lg:grid-cols-2">
        {visible.map((wo) => (
          <WorkOrderRow key={wo.id} wo={wo} onOpen={() => setSelectedId(wo.id)} />
        ))}
      </ul>

      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={
            isMobile
              ? "h-[92dvh] gap-0 rounded-t-3xl p-0"
              : "w-full gap-0 p-0 sm:max-w-xl"
          }
        >
          {selected && (
            <WorkOrderDetail wo={selected} extraMessages={replies[selected.id] ?? []} onReply={addReply} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
