"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  /** Use fixed light-on-dark styling instead of the theme tokens - for
   * a transparent navbar floating over a fixed-dark photo, where the
   * surface behind the toggle doesn't match the page theme. */
  variant?: "default" | "onDark";
}

export default function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();

  const className =
    variant === "onDark"
      ? "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors"
      : "flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--b)] text-[var(--t3)] transition-colors hover:border-[var(--b2)] hover:text-[var(--t)]";
  const style =
    variant === "onDark"
      ? ({
          borderColor: "rgba(255,255,255,.32)",
          color: "rgba(255,255,255,.82)",
        } as const)
      : undefined;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={className}
      style={style}
    >
      {theme === "dark" ? (
        /* Sun icon */
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      ) : (
        /* Moon icon */
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      )}
    </button>
  );
}
