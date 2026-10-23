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
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      // next-themes 0.4.6 renders its no-flash <script> inside a Client Component,
      // which React 19.3 reports as an error. The real pre-paint script lives in
      // the root layout <head>; this inert data block just silences the warning.
      scriptProps={{ type: "application/json" }}
    >
      <LinkProvider component={NextLink}>
        <TooltipProvider delay={600}>
          <ToastProvider>{children}</ToastProvider>
        </TooltipProvider>
      </LinkProvider>
    </ThemeProvider>
  );
}
