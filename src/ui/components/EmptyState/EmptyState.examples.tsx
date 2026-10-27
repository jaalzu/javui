import { Button, ChartLineIcon, EmptyState } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<EmptyState
  icon={<ChartLineIcon />}
  title="No reports yet"
  description="Connect a data source to see your first report."
  action={<Button size="sm">Connect source</Button>}
/>`,
  <EmptyState
    icon={<ChartLineIcon />}
    title="No reports yet"
    description="Connect a data source to see your first report."
    action={<Button size="sm">Connect source</Button>}
  />,
);

export const examples: Example[] = [];
