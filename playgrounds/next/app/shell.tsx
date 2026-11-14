"use client";

import { Breadcrumb, Button, Link, Stack, Text } from "@javui/ui";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const links = [
  ["/", "Inicio"], ["/forms", "Forms"], ["/overlays", "Overlays"],
  ["/navigation", "Navigation"], ["/data", "Data"], ["/layout", "Layout"], ["/dashboard", "Dashboard"],
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  return (
    <div>
      <main style={{ maxWidth: "var(--container-lg)", marginInline: "auto", padding: "var(--space-6) var(--space-4)" }}>
        <Stack gap="5">
          <Stack direction="row" gap="3" wrap align="center" justify="between">
            <Text weight="medium">JavUI consumer</Text>
            <Stack direction="row" gap="3" wrap align="center">
              {links.map(([href, label]) => <Link key={href} href={href} standalone>{label}</Link>)}
              <Button size="sm" variant="secondary" onClick={() => setDark((value) => !value)}>{dark ? "Tema claro" : "Tema oscuro"}</Button>
            </Stack>
          </Stack>
          <Breadcrumb items={[{ label: "Inicio", href: "/" }]} />
          {children}
        </Stack>
      </main>
    </div>
  );
}
