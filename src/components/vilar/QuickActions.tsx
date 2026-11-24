import { Bell, CalendarCheck, Package, Plus, Sparkles, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import type { QuickAction } from "@/data/mock";
import { cn } from "@/lib/utils";

const icons: Record<QuickAction["icon"], LucideIcon> = {
  "new-wo": Plus,
  delivery: Package,
  notice: Bell,
  inspection: CalendarCheck,
  "ask-ai": Sparkles,
};

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <section aria-label="Quick actions" className="-mx-4 sm:mx-0">
      <div className="no-scrollbar -my-3 flex gap-2 overflow-x-auto px-4 py-3 sm:flex-wrap sm:px-0">
        {actions.map(({ id, label, icon, primary }) => {
          const Icon = icons[icon];
          return (
            <button
              key={id}
              type="button"
              onClick={() => toast(label, { description: "This action arrives in a later step." })}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]",
                primary
                  ? "bg-lime text-lime-foreground shadow-lime hover:brightness-105"
                  : "border border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2.3} />
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
