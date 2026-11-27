"use client";

import {
  useEffect } from "react";
import { useTheme } from "next-themes";
import { Button,
  Kbd,
  Tooltip
} from "@javui/ui";
import { MoonIcon, SunIcon } from "@/icons";
import styles from "./ThemeSwitcher.module.css";

/**
 * Light/dark toggle: one icon button. Both icons are rendered and CSS shows the one that matches
 * `data-theme` (set by next-themes before first paint), so there is no flash and no hydration mismatch.
 * Pressing `T` anywhere outside a text field toggles the theme; the tooltip advertises the shortcut.
 */
export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.toLowerCase() !== "t") return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resolvedTheme, setTheme]);

  return (
    <Tooltip
      content={
        <span className={styles.tooltipContent}>
          Toggle theme <Kbd variant="inverted">T</Kbd>
        </span>
      }
      delay={1000}
      side="bottom"
    >
      <Button
        variant="ghost"
        size="md"
        pill
        aria-label="Toggle theme"
        aria-keyshortcuts="T"
        className={styles.themeButton}
        startIcon={
          <>
            <SunIcon className={styles.sun} />
            <MoonIcon className={styles.moon} />
          </>
        }
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
    </Tooltip>
  );
}
