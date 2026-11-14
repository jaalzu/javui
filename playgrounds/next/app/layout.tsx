import "@javui/ui/tokens.css";
import "@javui/ui/fonts.css";
import { Providers } from "./providers";
import type { ReactNode } from "react";
import { Shell } from "./shell";

export default function Layout({ children }: { children: ReactNode }) {
  return <html data-theme="light"><body><Providers><Shell>{children}</Shell></Providers></body></html>;
}
