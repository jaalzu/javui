import { ArrowRightIcon, Button, CheckIcon, PlusIcon, Stack } from "@/ui";
import { ex, type Example } from "@/docs/example";

const check = <CheckIcon />;
const plus = <PlusIcon />;

export const examples: Example[] = [
  ex(
    "Primary",
    `<Button>Save</Button>
<Button aria-label="Add" startIcon={<PlusIcon />} />`,
    <Stack direction="row" gap="3" align="center">
      <Button>Save</Button>
      <Button aria-label="Add" startIcon={plus} />
    </Stack>,
    "The main action of a view, with its icon-only equivalent.",
  ),
  ex(
    "Secondary",
    `<Button variant="secondary">Cancel</Button>`,
    <Button variant="secondary">Cancel</Button>,
    "For the actions next to the primary one.",
  ),
  ex(
    "Ghost",
    `<Button variant="ghost">Skip</Button>`,
    <Button variant="ghost">Skip</Button>,
    "Low emphasis, for actions that should not compete.",
  ),
  ex(
    "Accent",
    `<Button variant="accent">Upgrade</Button>`,
    <Button variant="accent">Upgrade</Button>,
    "Brand emphasis; this is the color you change for your brand.",
  ),
  ex(
    "Danger",
    `<Button variant="danger">Delete</Button>`,
    <Button variant="danger">Delete</Button>,
    "Destructive actions.",
  ),
  ex(
    "Disabled",
    `<Button disabled>Disabled</Button>`,
    <Button disabled>Disabled</Button>,
  ),
  ex(
    "Loading",
    `<Button loading>Saving</Button>`,
    <Button loading>Saving</Button>,
    "Keeps its label, stays focusable and ignores clicks.",
  ),
  ex(
    "With icon",
    `<Button variant="secondary" startIcon={<CheckIcon />}>Done</Button>`,
    <Button variant="secondary" startIcon={check}>
      Done
    </Button>,
    "Icons are decorative when there is text next to them.",
  ),
  ex(
    "As a link",
    `<Button href="/docs/installation">Get started</Button>
<Button href="/docs" variant="secondary">Docs</Button>
<Button href="/docs" variant="secondary" endIcon={<ArrowRightIcon />}>Continue</Button>
<Button href="https://example.com" target="_blank">Open site</Button>`,
    <Stack direction="row" gap="3" wrap align="center">
      <Button href="/docs/installation">Get started</Button>
      <Button href="/docs" variant="secondary">
        Docs
      </Button>
      <Button href="/docs" variant="secondary" endIcon={<ArrowRightIcon />}>
        Continue
      </Button>
      <Button href="https://example.com" target="_blank">
        Open site
      </Button>
    </Stack>,
    "With `href` it renders a link; without it, a button.",
  ),
  ex(
    "Size",
    `<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xs" aria-label="Add" startIcon={<PlusIcon />} />
<Button size="sm" aria-label="Add" startIcon={<PlusIcon />} />
<Button size="md" aria-label="Add" startIcon={<PlusIcon />} />
<Button size="lg" aria-label="Add" startIcon={<PlusIcon />} />`,
    <Stack gap="3">
      <Stack direction="row" gap="3" align="center" wrap>
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Stack>
      <Stack direction="row" gap="3" align="center" wrap>
        <Button size="xs" aria-label="Add" startIcon={plus} />
        <Button size="sm" aria-label="Add" startIcon={plus} />
        <Button size="md" aria-label="Add" startIcon={plus} />
        <Button size="lg" aria-label="Add" startIcon={plus} />
      </Stack>
    </Stack>,
  ),
  ex(
    "Pill",
    `<Button pill>Save</Button>
<Button pill size="sm" aria-label="Add" startIcon={<PlusIcon />} />
<Button pill variant="secondary" size="xs">Filter</Button>`,
    <Stack direction="row" gap="3" align="center" wrap>
      <Button pill>Save</Button>
      <Button pill size="sm" aria-label="Add" startIcon={plus} />
      <Button pill variant="secondary" size="xs">
        Filter
      </Button>
    </Stack>,
    "A fully rounded shape in any variant and size.",
  ),
];
