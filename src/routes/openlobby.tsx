import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ComingSoon } from "@/components/vilar/ComingSoon";

export const Route = createFileRoute("/openlobby")({
  head: () => ({
    meta: [
      { title: "OpenLobby AI — Vilar Building OS" },
      { name: "description", content: "Your 24/7 AI concierge for resident questions and after-hours triage." },
      { property: "og:title", content: "OpenLobby AI — Vilar Building OS" },
      { property: "og:description", content: "Your 24/7 AI concierge for resident questions and after-hours triage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <ComingSoon title="OpenLobby AI" description="Your 24/7 AI concierge for resident questions and after-hours triage." icon={Sparkles} />;
}
