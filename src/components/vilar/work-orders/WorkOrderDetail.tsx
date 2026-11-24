import { CalendarClock, MapPin, UserRound } from "lucide-react";
import type { ThreadMessage, WorkOrder } from "@/data/work-orders";
import { SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { AfterHoursPanel } from "./AfterHoursPanel";
import { ReplyBox } from "./ReplyBox";
import { StatusBadge } from "./StatusBadge";
import { TranslationThread } from "./TranslationThread";

interface Props {
  wo: WorkOrder;
  extraMessages: ThreadMessage[];
  onReply: (english: string, translation: string | null) => void;
}

export function WorkOrderDetail({ wo, extraMessages, onReply }: Props) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-4 pb-4 pt-5 pr-12 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tabular-nums text-muted-foreground">{wo.id}</span>
          <StatusBadge status={wo.status} />
        </div>
        <SheetTitle className="mt-1 text-xl font-semibold leading-tight tracking-tight">{wo.title}</SheetTitle>
        <SheetDescription asChild>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {wo.location} · {wo.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarClock className="h-3.5 w-3.5" /> {wo.scheduledFor ?? wo.reportedAt}
            </span>
            <span className="inline-flex items-center gap-1">
              <UserRound className="h-3.5 w-3.5" /> {wo.assignee}
            </span>
          </div>
        </SheetDescription>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-6">
        {wo.afterHours && <AfterHoursPanel outcome={wo.afterHours} />}
        <TranslationThread
          messages={[...wo.thread, ...extraMessages]}
          residentName={wo.resident.name}
          residentLang={wo.resident.lang}
        />
      </div>

      <div className="border-t border-border bg-background px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
        <ReplyBox residentLang={wo.resident.lang} onSend={onReply} />
      </div>
    </div>
  );
}
