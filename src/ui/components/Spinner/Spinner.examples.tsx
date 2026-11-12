import type { CSSProperties } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  EmptyState,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@/ui";
import { PaperPlaneTiltIcon } from "@/ui/icons/icons.generated";
import { defineHero, ex, type Example } from "@/docs/example";

const emptyStateStyle = {
  "max-inline-size": "26rem",
  "margin-inline": "auto",
  "--empty-state-padding": "var(--space-6) var(--space-4)",
  "--empty-state-gap": "var(--space-1)",
  "--empty-state-illustration": "var(--space-10)",
} as CSSProperties;

export const hero = defineHero(
  `<Card variant="surface" size="sm" style={{ maxInlineSize: "calc(22rem + var(--space-2) + var(--space-1) / 2)", paddingBlock: "calc(var(--space-4) - var(--space-1) / 2)" }}>
  <CardContent>
    <Stack direction="row" gap="10" align="center" justify="between">
      <Stack direction="row" gap="2" align="center">
        <Spinner size="sm" label="" />
        <Text>Procesando transacción</Text>
      </Stack>
      <Text size="base" tone="success" weight="medium">$128.40</Text>
    </Stack>
  </CardContent>
</Card>`,
  <Card
    variant="surface"
    size="sm"
    style={{
      maxInlineSize: "calc(22rem + var(--space-2) + var(--space-1) / 2)",
      paddingBlock: "calc(var(--space-4) - var(--space-1) / 2)",
    }}
  >
    <CardContent>
      <Stack direction="row" gap="10" align="center" justify="between">
        <Stack direction="row" gap="2" align="center">
          <Spinner size="sm" label="" />
          <Text>Procesando transacción</Text>
        </Stack>
        <Text size="base" tone="success" weight="medium">
          $128.40
        </Text>
      </Stack>
    </CardContent>
  </Card>,
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
    "Five sizes, from 13px to 33px. Use the size that matches the element it sits in.",
  ),
  ex(
    "With text",
    `<Stack direction="row" gap="2" align="center">
  <Text>Saving changes</Text>
  <Spinner size="md" label="Saving changes" />
</Stack>`,
    <Stack direction="row" gap="2" align="center">
      <Text>Saving changes</Text>
      <Spinner size="md" label="Saving changes" />
    </Stack>,
    "The spinner paints with currentColor, so it inherits the text color around it.",
  ),
  ex(
    "Colors",
    `<Stack direction="row" gap="4" align="center">
  <Spinner size="lg" label="" color="color-mix(in oklab, oklch(55% 0.2 300) 75%, var(--color-primary-foreground))" />
  <Spinner size="lg" label="" color="color-mix(in oklab, oklch(60% 0.22 350) 75%, var(--color-primary-foreground))" />
  <Spinner size="lg" label="" color="color-mix(in oklab, oklch(65% 0.18 55) 75%, var(--color-primary-foreground))" />
</Stack>`,
    <Stack direction="row" gap="4" align="center">
      <Spinner
        size="lg"
        label=""
        color="color-mix(in oklab, oklch(55% 0.2 300) 75%, var(--color-primary-foreground))"
      />
      <Spinner
        size="lg"
        label=""
        color="color-mix(in oklab, oklch(60% 0.22 350) 75%, var(--color-primary-foreground))"
      />
      <Spinner
        size="lg"
        label=""
        color="color-mix(in oklab, oklch(65% 0.18 55) 75%, var(--color-primary-foreground))"
      />
    </Stack>,
    "Use `color` for a custom tone. Derive it from one hue so it stays readable in light and dark; prefer semantic tokens when one fits.",
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
    `<Stack gap="3" style={{ width: "calc(min(100%, 36rem) - var(--space-5))", marginInline: "auto" }}>
  <InputGroup>
    <InputGroupInput aria-label="Uploading" placeholder="Uploading file" disabled />
    <InputGroupAddon align="end"><Spinner size="sm" label="Uploading" /></InputGroupAddon>
  </InputGroup>
  <Card variant="surface" size="sm">
    <CardContent>
    <Textarea aria-label="Reply" rows={3} placeholder="Write a reply…" variant="ghost" disabled />
    </CardContent>
    <CardFooter>
      <Stack direction="row" gap="3" align="center" justify="between" style={{ flex: 1 }}>
        <Stack direction="row" gap="2" align="center">
          <Spinner size="md" label="" />
          <Text size="sm" tone="muted">Checking for typos</Text>
        </Stack>
        <Button size="sm" aria-label="Send reply" startIcon={<PaperPlaneTiltIcon />} disabled />
      </Stack>
    </CardFooter>
  </Card>
</Stack>`,
    <Stack gap="3" style={{ width: "calc(min(100%, 36rem) - var(--space-5))", marginInline: "auto" }}>
      <InputGroup>
        <InputGroupInput aria-label="Uploading" placeholder="Uploading file" disabled />
        <InputGroupAddon align="end">
          <Spinner size="sm" label="Uploading" />
        </InputGroupAddon>
      </InputGroup>
      <Card variant="surface" size="sm">
        <CardContent>
          <Textarea aria-label="Reply" rows={3} placeholder="Write a reply…" variant="ghost" disabled />
        </CardContent>
        <CardFooter>
          <Stack direction="row" gap="3" align="center" justify="between" style={{ flex: 1 }}>
            <Stack direction="row" gap="2" align="center">
              <Spinner size="md" label="" />
              <Text size="sm" tone="muted">
                Checking for typos
              </Text>
            </Stack>
            <Button size="sm" aria-label="Send reply" startIcon={<PaperPlaneTiltIcon />} disabled />
          </Stack>
        </CardFooter>
      </Card>
    </Stack>,
    "While the control is busy it stays disabled: it shows the spinner, blocks clicks and keeps its place in the layout. Pair it with a footer for longer background work.",
  ),
  ex(
    "In an empty state",
    `<EmptyState
  size="sm"
  style={{
    maxInlineSize: "26rem",
    marginInline: "auto",
    "--empty-state-padding": "var(--space-6) var(--space-4)",
    "--empty-state-gap": "var(--space-1)",
    "--empty-state-illustration": "var(--space-10)",
  } as CSSProperties}
  illustration={<Spinner size="xl" label="" />}
  title="Processing your import"
  description="This can take a moment."
  actions={
    <Button
      variant="secondary"
      size="md"
      style={{ marginBlockStart: "calc(var(--space-1) / 2)" }}
    >
      Cancel
    </Button>
  }
/>`,
    <EmptyState
      size="sm"
      style={emptyStateStyle}
      illustration={<Spinner size="xl" label="" />}
      title="Processing your import"
      description="This can take a moment."
      actions={
        <Button
          variant="secondary"
          size="md"
          style={{ marginBlockStart: "calc(var(--space-1) / 2)" }}
        >
          Cancel
        </Button>
      }
    />,
    "A compact empty state: tune the local spacing and illustration size with their CSS variables so the spinner sits close to the text.",
  ),
];
