import type { Metadata } from "next";
import "@/ui/styles/global.css";
import { Link } from "@/ui";
import { Providers } from "./providers";
import { SiteHeader } from "./SiteHeader";
import styles from "./site.module.css";

export const metadata: Metadata = {
  title: { default: "ui-lib: a zen component library", template: "%s · ui-lib" },
  description: "A zen component library made for humans and agents.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: next-themes sets data-theme on <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <a href="#main" className={styles.skip}>Skip to content</a>
          <SiteHeader />
          <main id="main">{children}</main>
          <footer className={styles.footer}>
            <div className={styles.wrap}>
              Built with Base UI, CSS variables and care. Agents can read <Link href="/llms.txt">llms.txt</Link>.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
