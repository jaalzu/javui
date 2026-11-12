import "@javui/ui/tokens.css";
import "@javui/ui/base.css";
import "@javui/ui/fonts.css";
import { LinkProvider } from "@javui/ui";
import NextLink from "next/link";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <html data-theme="light"><body><LinkProvider component={NextLink}>{children}</LinkProvider></body></html>;
}
