import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "vilar-theme";

// Runs before paint (inlined in <head>) so the saved theme never flashes.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`;

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
