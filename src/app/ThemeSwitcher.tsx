"use client";

import { useTheme } from "next-themes";
import { Button, Icon } from "@/ui";
import styles from "./site.module.css";

/**
 * Light/dark toggle: one icon button. Both icons are rendered and CSS shows the one that matches
 * `data-theme` (set by next-themes before first paint), so there is no flash and no hydration mismatch.
 */
export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle theme"
      className={styles.themeButton}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Icon className={styles.sun}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </Icon>
      <Icon className={styles.moon}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </Icon>
    </Button>
  );
}
