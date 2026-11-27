import "@javui/ui/tokens.css";
import "./consumer.css";
// Minimal consumer pattern: tokens only. Page styles and font choices belong to the app.
import "@fontsource-variable/inter/wght.css";
import { Providers } from "./providers";
import type { ReactNode } from "react";
import { Shell } from "./shell";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
