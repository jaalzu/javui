import "@javui/ui/tokens.css";
import "@javui/ui/base.css";
import "@javui/ui/fonts.css";
import { Providers } from "./providers";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <html data-theme="light"><body><Providers>{children}</Providers></body></html>;
}
