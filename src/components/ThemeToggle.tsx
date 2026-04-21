"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="relative w-10 h-10 rounded-xl border border-border bg-muted-surface transition-all duration-300 flex items-center justify-center group text-primary hover:border-primary/50"
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </span>
      {/* Tooltip */}
      <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 bg-card border border-border text-foreground shadow-xl">
        {isDark ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}
