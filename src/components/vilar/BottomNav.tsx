import { Link } from "@tanstack/react-router";
import { ClipboardCheck, LayoutGrid, Sparkles, Wrench, type LucideIcon } from "lucide-react";

type Tab = {
  to: "/" | "/work-orders" | "/openlobby" | "/inspections";
  label: string;
  icon: LucideIcon;
};

const tabs: Tab[] = [
  { to: "/", label: "Overview", icon: LayoutGrid },
  { to: "/work-orders", label: "Work Orders", icon: Wrench },
  { to: "/openlobby", label: "OpenLobby AI", icon: Sparkles },
  { to: "/inspections", label: "Inspections", icon: ClipboardCheck },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4 gap-1 rounded-3xl bg-dock p-1.5 text-dock-foreground shadow-dock">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: true }}
              className="group flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-dock-muted transition-colors hover:text-dock-foreground data-[status=active]:bg-lime data-[status=active]:text-lime-foreground data-[status=active]:shadow-lime"
            >
              <Icon className="h-5 w-5" strokeWidth={2.1} />
              <span className="truncate text-[11px] font-medium leading-none tracking-tight">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
