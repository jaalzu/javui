"use client";

import Link from "next/link";
import { LinkProvider } from "@javui/ui";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <LinkProvider component={Link}>{children}</LinkProvider>;
}
