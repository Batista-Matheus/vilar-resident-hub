import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { ComingSoon } from "@/components/vilar/ComingSoon";

export const Route = createFileRoute("/inspections")({
  head: () => ({
    meta: [
      { title: "Inspections — Vilar Building OS" },
      { name: "description", content: "Schedule and log fire, elevator and unit inspections." },
      { property: "og:title", content: "Inspections — Vilar Building OS" },
      { property: "og:description", content: "Schedule and log fire, elevator and unit inspections." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <ComingSoon title="Inspections" description="Schedule and log fire, elevator and unit inspections." icon={ClipboardCheck} />;
}
