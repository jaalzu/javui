import {
  ArrowRightIcon,
  Button,
  CheckIcon,
  FloppyDiskIcon,
  PlusIcon,
  ProhibitIcon,
  SkipForwardIcon,
  SparkleIcon,
  Stack,
  TrashIcon,
  XIcon,
} from "@/ui";
import { ex, type Example } from "@/docs/example";

const check = <CheckIcon />;
const plus = <PlusIcon />;
const floppyDisk = <FloppyDiskIcon />;
const skipForward = <SkipForwardIcon />;
const sparkle = <SparkleIcon />;
const trash = <TrashIcon />;
const x = <XIcon />;
const prohibit = <ProhibitIcon />;

export const examples: Example[] = [
  ex(
    "Primary",
    `<Button>Save</Button>
<Button aria-label="Save" startIcon={<FloppyDiskIcon />} />`,
    <Stack direction="row" gap="3" align="center" wrap>
      <Button>Save</Button>
      <Button aria-label="Save" startIcon={floppyDisk} />
    </Stack>,
    "The main action of a view, with its icon-only equivalent.",
  ),
  ex(
    "Secondary",
    `<Button variant="secondary">Cancel</Button>
<Button variant="secondary" aria-label="Cancel" startIcon={<XIcon />} />`,
    <Stack direction="row" gap="3" align="center" wrap>
      <Button variant="secondary">Cancel</Button>
      <Button variant="secondary" aria-label="Cancel" startIcon={x} />
    </Stack>,
    "For the actions next to the primary one.",
  ),
  ex(
    "Ghost",
    `<Button variant="ghost">Skip</Button>
<Button variant="ghost" aria-label="Skip" startIcon={<SkipForwardIcon />} />`,
    <Stack direction="row" gap="3" align="center" wrap>
      <Button variant="ghost">Skip</Button>
      <Button variant="ghost" aria-label="Skip" startIcon={skipForward} />
    </Stack>,
    "Low emphasis, for actions that should not compete.",
  ),
  ex(
    "Accent",
    `<Button variant="accent">Upgrade</Button>
<Button variant="accent" aria-label="Upgrade" startIcon={<SparkleIcon />} />`,
    <Stack direction="row" gap="3" align="center" wrap>
      <Button variant="accent">Upgrade</Button>
      <Button variant="accent" aria-label="Upgrade" startIcon={sparkle} />
    </Stack>,
    "Brand emphasis; this is the color you change for your brand.",
  ),
  ex(
    "Danger",
    `<Button variant="danger">Delete</Button>
<Button variant="danger" aria-label="Delete" startIcon={<TrashIcon />} />`,
    <Stack direction="row" gap="3" align="center" wrap>
      <Button variant="danger">Delete</Button>
      <Button variant="danger" aria-label="Delete" startIcon={trash} />
    </Stack>,
    "Destructive actions.",
  ),
  ex(
    "Disabled",
    `<Button disabled>Disabled</Button>
<Button disabled aria-label="Disabled" startIcon={<ProhibitIcon />} />`,
    <Stack direction="row" gap="3" align="center" wrap>
      <Button disabled>Disabled</Button>
      <Button disabled aria-label="Disabled" startIcon={prohibit} />
    </Stack>,
  ),
  ex(
    "Loading",
    `<Button loading>Saving</Button>
<Button loading aria-label="Saving" startIcon={<FloppyDiskIcon />} />`,
    <Stack direction="row" gap="3" align="center" wrap>
      <Button loading>Saving</Button>
      <Button loading aria-label="Saving" startIcon={floppyDisk} />
    </Stack>,
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
