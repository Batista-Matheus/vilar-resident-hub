import { ArrowUp, Languages } from "lucide-react";
import { useState } from "react";
import { languages, quickReplies, type LangCode } from "@/data/work-orders";
import { translateReply } from "@/lib/work-orders";

interface Props {
  residentLang: LangCode;
  onSend: (english: string, translation: string | null) => void;
}

export function ReplyBox({ residentLang, onSend }: Props) {
  const [text, setText] = useState("");
  const lang = languages[residentLang];
  const bilingual = residentLang !== "en";
  const translation = translateReply(text, residentLang);

  function send() {
    const english = text.trim();
    if (!english) return;
    onSend(english, bilingual ? translation : null);
    setText("");
  }

  return (
    <div className="space-y-2.5">
      <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4">
        {quickReplies.map((r) => (
          <button
            key={r.en}
            type="button"
            onClick={() => setText(r.en)}
            className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
          >
            {r.en}
          </button>
        ))}
      </div>

      {bilingual && text.trim() && (
        <div className="rounded-xl bg-lime-soft px-3 py-2">
          <p className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-lime">
            <Languages className="h-3 w-3" /> Resident will receive · {lang.native}
          </p>
          {translation ? (
            <p dir={lang.dir} lang={residentLang} className="text-sm leading-relaxed">
              {translation}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Demo mode: pick a quick reply to preview its translation. Free-text translation connects in a later step.
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex items-end gap-2 rounded-2xl border border-input bg-card p-1.5 focus-within:ring-2 focus-within:ring-ring"
      >
        <label htmlFor="reply" className="sr-only">
          Reply in English
        </label>
        <textarea
          id="reply"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={bilingual ? `Reply in English — sent in ${lang.label}` : "Reply to resident"}
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="Send reply"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime text-lime-foreground transition-opacity disabled:opacity-40"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
}
