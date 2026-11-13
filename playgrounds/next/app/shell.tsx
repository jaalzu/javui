"use client";

import { Breadcrumb, Button, Sidebar, Stack, Text } from "@javui/ui";
import type { ReactNode } from "react";
import { useState } from "react";

const links = [
  ["/", "Inicio"], ["/forms", "Forms"], ["/overlays", "Overlays"],
  ["/navigation", "Navigation"], ["/data", "Data"], ["/layout", "Layout"],
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  return (
    <div data-theme={dark ? "dark" : "light"}>
      <Sidebar label="Secciones" header={<Text weight="medium">JavUI consumer</Text>}
        items={links.map(([href, label], index) => ({ href, label, active: index === 0 }))}
        footer={<Button size="sm" variant="secondary" onClick={() => setDark((value) => !value)}>{dark ? "Tema claro" : "Tema oscuro"}</Button>} />
      <main style={{ maxWidth: "var(--container-lg)", marginInline: "auto", padding: "var(--space-6) var(--space-4)" }}>
        <Breadcrumb items={[{ label: "Inicio", href: "/" }]} />
        {children}
      </main>
    </div>
  );
}
