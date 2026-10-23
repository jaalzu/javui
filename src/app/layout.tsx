import type { Metadata } from "next";
import "@/ui/styles/global.css";
import { Link } from "@/ui";
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
          <footer className={shell.footer}>
            <div className={shell.wrap}>
              Built with Base UI, CSS variables and care. Agents can read{" "}
              <Link href="/llms.txt">llms.txt</Link>.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
