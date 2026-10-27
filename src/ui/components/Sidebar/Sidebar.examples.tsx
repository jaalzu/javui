import { ChartLineIcon, GearIcon, Sidebar, Text } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Sidebar
  label="Workspace"
  header={<Text weight="medium">Acme</Text>}
  items={[
    { label: "Overview", href: "/docs", startIcon: <ChartLineIcon />, active: true },
    { label: "Settings", href: "/docs/components", startIcon: <GearIcon /> },
  ]}
  footer={<Text variant="caption" size="lg" tone="muted">v1.0</Text>}
/>`,
  <Sidebar
    label="Workspace"
    header={<Text weight="medium">Acme</Text>}
    items={[
      { label: "Overview", href: "/docs", startIcon: <ChartLineIcon />, active: true },
      { label: "Settings", href: "/docs/components", startIcon: <GearIcon /> },
    ]}
    footer={<Text variant="caption" size="lg" tone="muted">v1.0</Text>}
  />,
);

export const examples: Example[] = [];
