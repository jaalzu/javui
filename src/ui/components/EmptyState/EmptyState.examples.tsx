import { Button, ChartLineIcon, EmptyState, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const heroCode = `<EmptyState illustration={<ChartLineIcon />} title="No reports yet" description="Connect a data source to see your first report." actions={<Button size="sm">Connect source</Button>} />`;

export const hero = defineHero(heroCode, <EmptyState illustration={<ChartLineIcon />} title="No reports yet" description="Connect a data source to see your first report." actions={<Button size="sm">Connect source</Button>} />);

export const examples: Example[] = [
  ex("Small", `<EmptyState size="sm" illustration={<ChartLineIcon />} title="No reports yet" description="Connect a data source to see your first report." />`, <EmptyState size="sm" illustration={<ChartLineIcon />} title="No reports yet" description="Connect a data source to see your first report." />),
  ex("Extra small", `<EmptyState size="xs" title="No reports yet" description="Connect a data source to see your first report." />`, <EmptyState size="xs" title="No reports yet" description="Connect a data source to see your first report." />),
  ex("Without title", `<EmptyState description="Connect a data source to see your first report." />`, <EmptyState description="Connect a data source to see your first report." />),
  ex("Without actions", `<EmptyState title="No reports yet" description="Connect a data source to see your first report." />`, <EmptyState title="No reports yet" description="Connect a data source to see your first report." />),
  ex("Two actions", `<EmptyState title="No reports yet" description="Connect a data source to see your first report." actions={<Stack direction="row" gap="2"><Button size="sm">Connect source</Button><Button size="sm" variant="secondary">Learn more</Button></Stack>} />`, <EmptyState title="No reports yet" description="Connect a data source to see your first report." actions={<Stack direction="row" gap="2"><Button size="sm">Connect source</Button><Button size="sm" variant="secondary">Learn more</Button></Stack>} />),
];
