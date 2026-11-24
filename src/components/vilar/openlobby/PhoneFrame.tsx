import type { ReactNode } from "react";

export function PhoneFrame({ children, url }: { children: ReactNode; url: string }) {
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-[2.75rem] bg-navy p-2.5 shadow-dock ring-1 ring-border dark:bg-secondary">
      <div className="relative flex h-[700px] flex-col overflow-hidden rounded-[2.25rem] bg-background">
        <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2.5 h-5 w-24 -translate-x-1/2 rounded-full bg-navy dark:bg-secondary" />
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-sm bg-foreground/80" />
            <span className="h-2 w-4 rounded-sm border border-foreground/60" />
          </span>
        </div>
        <div className="mx-3 mb-1 truncate rounded-full bg-muted px-3 py-1 text-center text-[10px] text-muted-foreground">
          🔒 {url}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
