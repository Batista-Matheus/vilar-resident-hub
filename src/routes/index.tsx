import { createFileRoute } from "@tanstack/react-router";
import { ActivityFeed } from "@/components/vilar/ActivityFeed";
import { KpiCard } from "@/components/vilar/KpiCard";
import { QuickActions } from "@/components/vilar/QuickActions";
import { activeBuilding, activity, kpis, quickActions } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — Vilar Building OS" },
      { name: "description", content: `Live occupancy, work orders, deliveries and activity for ${activeBuilding.name}.` },
      { property: "og:title", content: "Overview — Vilar Building OS" },
      { property: "og:description", content: "Live building KPIs and activity for Canadian multi-residential teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Overview,
});

function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">Overview</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Building at a glance</h1>
      </div>

      <QuickActions actions={quickActions} />

      <section aria-label="Key metrics" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </section>

      <ActivityFeed items={activity} />
    </div>
  );
}
