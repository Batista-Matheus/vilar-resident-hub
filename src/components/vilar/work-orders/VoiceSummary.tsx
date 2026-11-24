import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const BARS = [0.4, 0.7, 0.55, 0.9, 0.6, 1, 0.75, 0.5, 0.85, 0.65, 0.95, 0.45, 0.7, 0.6, 0.9, 0.5, 0.8, 0.4, 0.65, 0.55];

export function VoiceSummary({ text, seconds }: { text: string; seconds: number }) {
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setPlaying(false);
  }

  function play() {
    if (playing) return stop();
    setPlaying(true);
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-CA";
      u.rate = 1.15;
      u.onend = () => setPlaying(false);
      window.speechSynthesis.speak(u);
    }
    timer.current = setTimeout(() => setPlaying(false), (seconds + 2) * 1000);
  }

  useEffect(() => stop, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rounded-xl bg-navy p-3 text-navy-foreground dark:bg-background">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={play}
          aria-label={playing ? "Stop voice summary" : "Play voice summary"}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-lime-foreground shadow-lime transition-transform active:scale-95"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
        <div className="flex h-8 flex-1 items-center gap-[3px]" aria-hidden="true">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={cn("w-full rounded-full bg-lime/80", playing && "animate-wave")}
              style={{ height: `${h * 100}%`, animationDelay: `${i * 45}ms` }}
            />
          ))}
        </div>
        <span className="text-xs font-semibold tabular-nums opacity-80">0:0{seconds}</span>
      </div>
      <p className="mt-2.5 text-[13px] leading-snug opacity-90">“{text}”</p>
    </div>
  );
}
