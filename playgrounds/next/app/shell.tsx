"use client";

import { Breadcrumb, Button, Container, Link, Separator, Stack, Text } from "@javui/ui";
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
      <Container as="main" size="xl" gutter={{ base: "4", md: "6" }} style={{ paddingBlock: "var(--space-6)" }}>
        <Stack gap="5">
          <Stack direction="row" gap="3" wrap align="center" justify="between">
            <Text weight="medium">JavUI consumer</Text>
            <Stack direction="row" gap="3" wrap align="center">
              {links.map(([href, label]) => <Link key={href} href={href} standalone>{label}</Link>)}
              <Button size="sm" variant="secondary" onClick={() => setDark((value) => !value)}>{dark ? "Tema claro" : "Tema oscuro"}</Button>
            </Stack>
          </Stack>
          <Separator />
          <Breadcrumb items={[{ label: "Inicio", href: "/" }]} />
          {children}
        </Stack>
      </Container>
    </div>
  );
}
