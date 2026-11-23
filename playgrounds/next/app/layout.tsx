import "@javui/ui/tokens.css";
// Minimal consumer pattern: tokens only. Page styles belong to the app.
// The library ships no @font-face: this app loads the fonts the tokens reference.
import "@fontsource-variable/dm-sans/opsz.css";
import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource/commit-mono/400.css";
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
