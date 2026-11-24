import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { ComingSoon } from "@/components/vilar/ComingSoon";

export const Route = createFileRoute("/work-orders")({
  head: () => ({
    meta: [
      { title: "Work Orders — Vilar Building OS" },
      { name: "description", content: "Track, assign and close maintenance requests across every unit." },
      { property: "og:title", content: "Work Orders — Vilar Building OS" },
      { property: "og:description", content: "Track, assign and close maintenance requests across every unit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <ComingSoon title="Work Orders" description="Track, assign and close maintenance requests across every unit." icon={Wrench} />;
}
