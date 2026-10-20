"use client";

import { useTheme } from "next-themes";
import { Button, MoonIcon, SunIcon } from "@/ui";
import styles from "./ThemeSwitcher.module.css";

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
      startIcon={
        <>
          <SunIcon className={styles.sun} />
          <MoonIcon className={styles.moon} />
        </>
      }
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    />
  );
}
