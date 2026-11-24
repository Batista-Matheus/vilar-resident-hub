import { Bot, Languages, UserRound, Wrench } from "lucide-react";
import { languages, type LangCode, type ThreadMessage } from "@/data/work-orders";
import { cn } from "@/lib/utils";

const authorMeta = {
  resident: { label: "Resident", icon: UserRound, className: "bg-muted text-foreground" },
  manager: { label: "Building manager", icon: Wrench, className: "bg-primary text-primary-foreground" },
  ai: { label: "OpenLobby AI", icon: Bot, className: "bg-lime text-lime-foreground" },
} as const;

interface Props {
  messages: ThreadMessage[];
  residentName: string;
  residentLang: LangCode;
}

export function TranslationThread({ messages, residentName, residentLang }: Props) {
  const bilingual = residentLang !== "en";
  const lang = languages[residentLang];

  return (
    <section aria-label="Conversation" className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Conversation</h3>
        {bilingual && (
          <span className="inline-flex items-center gap-1 rounded-full bg-lime-soft px-2 py-0.5 text-[11px] font-semibold text-lime">
            <Languages className="h-3 w-3" /> {lang.native} ↔ English
          </span>
        )}
      </div>

      {messages.map((m) => {
        const meta = authorMeta[m.author];
        const Icon = meta.icon;
        const writtenInResidentLang = m.originalLang === residentLang;
        const residentText = writtenInResidentLang ? m.original : m.translation;
        const englishText = m.originalLang === "en" ? m.original : m.translation;

        return (
          <article key={m.id} className="rounded-2xl border border-border bg-card p-3">
            <header className="mb-2 flex items-center gap-2">
              <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full", meta.className)}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-semibold">
                {m.author === "resident" ? residentName : meta.label}
              </span>
              <time className="ml-auto text-[11px] tabular-nums text-muted-foreground">{m.time}</time>
            </header>

            {bilingual ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <Pane
                  title={lang.native}
                  tag={writtenInResidentLang ? "Original" : "Auto-translated"}
                  text={residentText}
                  dir={lang.dir}
                  langCode={residentLang}
                />
                <Pane
                  title="English"
                  tag={m.originalLang === "en" ? "Original" : "Auto-translated"}
                  text={englishText}
                  dir="ltr"
                  langCode="en"
                  highlight
                />
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{m.original}</p>
            )}
          </article>
        );
      })}
    </section>
  );
}

function Pane({
  title,
  tag,
  text,
  dir,
  langCode,
  highlight,
}: {
  title: string;
  tag: string;
  text: string | null;
  dir: "ltr" | "rtl";
  langCode: LangCode;
  highlight?: boolean;
}) {
  return (
    <div className={cn("rounded-xl p-2.5", highlight ? "bg-surface" : "bg-muted/60")}>
      <p className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span>{title}</span>
        <span className={cn(tag === "Original" ? "text-foreground/70" : "text-lime")}>{tag}</span>
      </p>
      {text ? (
        <p dir={dir} lang={langCode} className="text-sm leading-relaxed">
          {text}
        </p>
      ) : (
        <p className="text-xs italic text-muted-foreground">Translation pending (demo)</p>
      )}
    </div>
  );
}
