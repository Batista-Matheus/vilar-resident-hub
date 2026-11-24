import type { LucideIcon } from "lucide-react";

export function ComingSoon({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return (
    <div className="blueprint-grid flex min-h-[55vh] flex-col items-center justify-center rounded-3xl border border-dashed border-border px-6 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-soft text-lime">
        <Icon className="h-6 w-6" />
      </span>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      <span className="mt-5 rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-card">Coming next</span>
    </div>
  );
}
