import { Building2, ChevronDown } from "lucide-react";
import { activeBuilding } from "@/data/mock";
import { ThemeToggle } from "./ThemeToggle";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <VilarMark />
          <button
            type="button"
            className="group flex min-w-0 items-center gap-2 rounded-xl px-2 py-1 text-left transition-colors hover:bg-muted"
            aria-label="Active building"
          >
            <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-soft text-lime sm:inline-flex">
              <Building2 className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-semibold leading-tight tracking-tight">
                {activeBuilding.name}
                <span className="font-normal text-muted-foreground"> — {activeBuilding.units} Units</span>
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {activeBuilding.city}, {activeBuilding.province}
              </span>
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

function VilarMark() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-navy-foreground dark:bg-lime dark:text-lime-foreground">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M4 5l8 14 8-14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="10.5" y="4" width="3" height="3" rx="0.6" className="fill-lime dark:fill-navy" />
        </svg>
      </span>
      <span className="hidden text-lg font-bold tracking-tight md:inline">Vilar</span>
    </div>
  );
}
