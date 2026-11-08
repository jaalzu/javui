import {
  Badge,
  Button,
  EmptyState,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Spinner,
  Stack,
  Text,
} from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Stack direction="row" gap="5" align="center">
  <Spinner size="xs" label="" />
  <Spinner size="sm" label="" />
  <Spinner label="" />
  <Spinner size="lg" label="" />
  <Spinner size="xl" label="" />
</Stack>`,
  <Stack direction="row" gap="5" align="center">
    <Spinner size="xs" label="" />
    <Spinner size="sm" label="" />
    <Spinner label="" />
    <Spinner size="lg" label="" />
    <Spinner size="xl" label="" />
  </Stack>,
);

export const examples: Example[] = [
  ex(
    "Sizes",
    `<Spinner size="xs" label="" />
<Spinner size="sm" label="" />
<Spinner size="md" label="" />
<Spinner size="lg" label="" />
<Spinner size="xl" label="" />`,
    <Stack direction="row" gap="4" align="center">
      <Spinner size="xs" label="" />
      <Spinner size="sm" label="" />
      <Spinner size="md" label="" />
      <Spinner size="lg" label="" />
      <Spinner size="xl" label="" />
    </Stack>,
    "Five sizes, from 12px to 32px. Use the size that matches the element it sits in.",
  ),
  ex(
    "With text",
    `<Text>Saving changes <Spinner size="sm" label="Saving changes" /></Text>`,
    <Text>
      Saving changes <Spinner size="sm" label="Saving changes" />
    </Text>,
    "The spinner paints with currentColor, so it inherits the text color around it.",
  ),
  ex(
    "In a button",
    `<Stack direction="row" gap="3" align="center">
  <Button loading>Saving</Button>
  <Button variant="secondary" loading>Publishing</Button>
</Stack>`,
    <Stack direction="row" gap="3" align="center">
      <Button loading>Saving</Button>
      <Button variant="secondary" loading>
        Publishing
      </Button>
    </Stack>,
    "Use the button loading state instead of placing a spinner in it: the button keeps its width, announces the label and ignores clicks.",
  ),
  ex(
    "In a badge",
    `<Stack direction="row" gap="3" align="center">
  <Badge loading>Pending</Badge>
  <Badge variant="brand" loading>Syncing</Badge>
</Stack>`,
    <Stack direction="row" gap="3" align="center">
      <Badge loading>Pending</Badge>
      <Badge variant="brand" loading>
        Syncing
      </Badge>
    </Stack>,
  ),
  ex(
    "In an input",
    `<InputGroup>
  <InputGroupInput aria-label="Uploading" placeholder="Uploading file" readOnly />
  <InputGroupAddon align="end"><Spinner size="sm" label="Uploading" /></InputGroupAddon>
</InputGroup>`,
    <InputGroup>
      <InputGroupInput aria-label="Uploading" placeholder="Uploading file" readOnly />
      <InputGroupAddon align="end">
        <Spinner size="sm" label="Uploading" />
      </InputGroupAddon>
    </InputGroup>,
  ),
  ex(
    "In an empty state",
    `<EmptyState
  illustration={<Spinner size="xl" label="" />}
  title="Processing your import"
  description="This can take a moment. You can leave this page and come back later."
/>`,
    <EmptyState
      illustration={<Spinner size="xl" label="" />}
      title="Processing your import"
      description="This can take a moment. You can leave this page and come back later."
    />,
  ),
];
