"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import NextLink from "next/link";
import { LinkProvider, ToastProvider, TooltipProvider } from "@/ui";

/**
 * App-level providers. next-themes sets data-theme="light|dark" on <html> before first paint
 * (no flash) and remembers the choice; with "system" the OS preference applies.
 * The tokens read `data-theme`, so no component needs to know about the theme.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LinkProvider component={NextLink}>
        <TooltipProvider delay={600}>
          <ToastProvider>{children}</ToastProvider>
        </TooltipProvider>
      </LinkProvider>
    </ThemeProvider>
  );
}
