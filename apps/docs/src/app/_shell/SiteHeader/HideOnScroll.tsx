"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The site header. Slides up out of view when you scroll down and slides back when you scroll up.
 * It stays visible near the top of the page and while something inside it has focus.
 * Also sets `data-header-hidden` on <html> so other sticky elements can move up with it.
 */
export function HideOnScroll({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const root = document.documentElement;
    let last = window.scrollY;
    let frame = 0;

    const set = (hidden: boolean) => {
      header.toggleAttribute("data-hidden", hidden);
      root.toggleAttribute("data-header-hidden", hidden);
    };

    const update = () => {
      frame = 0;
      const y = Math.max(window.scrollY, 0);
      const delta = y - last;
      if (y < 80 || header.contains(document.activeElement)) {
        set(false);
      } else if (delta > 6) {
        set(true);
      } else if (delta < -6) {
        set(false);
      }
      if (Math.abs(delta) > 6 || y < 80) last = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onFocusIn = () => set(false);

    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocusIn);
      if (frame) cancelAnimationFrame(frame);
      root.removeAttribute("data-header-hidden");
    };
  }, []);

  return (
    <header ref={ref} className={className}>
      {children}
    </header>
  );
}
