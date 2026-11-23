import type { Metadata } from "next";
import "./globals.css";
// The library ships no @font-face: this app loads its own fonts, matching the
// families the tokens reference (DM Sans, Source Serif 4, Commit Mono).
import "@fontsource-variable/dm-sans/opsz.css";
import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource/commit-mono/400.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/app/_shell/SiteHeader/SiteHeader";
import shell from "./_shell/shell.module.css";

const themeInitScript = `(function () {
  try {
    var stored = localStorage.getItem("theme") || "system";
    var theme =
      stored === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : stored;
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
  } catch (error) {}
})();`;

export const metadata: Metadata = {
  title: {
    default: "ui-lib: a zen component library",
    template: "%s · ui-lib",
  },
  description: "A zen component library made for humans and agents.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: next-themes sets data-theme on <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body>
        <Providers>
          <a href="#main" className={shell.skip}>
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
