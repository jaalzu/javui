import type { CSSProperties } from "react";
import { ArrowRightIcon, Badge, CheckIcon, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Stack direction="row" gap="2" wrap align="center">
  <Badge>Default</Badge>
  <Badge variant="inverted">Inverted</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="danger">Danger</Badge>
  <Badge variant="brand">Brand</Badge>
  <Badge loading>Pending</Badge>
</Stack>`,
  <Stack direction="row" gap="2" wrap align="center">
    <Badge>Default</Badge>
    <Badge variant="inverted">Inverted</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="danger">Danger</Badge>
    <Badge variant="brand">Brand</Badge>
    <Badge loading>Pending</Badge>
  </Stack>,
);

export const examples: Example[] = [
    ex(
      "Variants",
      `<Badge>Default</Badge>
<Badge variant="inverted">Inverted</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>`,
      <Stack direction="row" gap="2" wrap align="center">
        <Badge>Default</Badge>
        <Badge variant="inverted">Inverted</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="brand">Brand</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
      </Stack>,
    ),
    ex(
      "With icon",
      `<Badge variant="success" startIcon={<CheckIcon />}>Success</Badge>
<Badge variant="outline" endIcon={<ArrowRightIcon />}>Open</Badge>`,
      <Stack direction="row" gap="2" wrap align="center">
        <Badge variant="success" startIcon={<CheckIcon />}>Success</Badge>
        <Badge variant="outline" endIcon={<ArrowRightIcon />}>Open</Badge>
      </Stack>,
    ),
    ex(
      "Loading",
      `<Badge variant="brand" loading>Saving</Badge>
<Badge variant="outline" spinnerPosition="end" loading>Syncing</Badge>`,
      <Stack direction="row" gap="2" wrap align="center">
        <Badge variant="brand" loading>Saving</Badge>
        <Badge variant="outline" spinnerPosition="end" loading>Syncing</Badge>
      </Stack>,
    ),
    ex(
      "As a link",
      `<Badge render={<a href="#link" />} startIcon={<ArrowRightIcon />}>Open link</Badge>`,
      <Stack direction="row" gap="2" wrap align="center">
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content -- Badge injects the label into the rendered anchor. */}
        <Badge render={<a href="#link" />} startIcon={<ArrowRightIcon />}>Open link</Badge>
      </Stack>,
      "Use the render prop to render the badge as a link or any other element. Icons are optional.",
    ),
    ex(
      "Custom",
      `<Badge style={{
  "--badge-bg": "color-mix(in oklab, oklch(55% 0.2 300) 14%, transparent)",
  "--badge-fg": "color-mix(in oklab, oklch(55% 0.2 300) 75%, var(--color-primary-foreground))",
} as CSSProperties}>Purple</Badge>
<Badge style={{ /* same pattern, tone oklch(60% 0.22 350) */ }}>Pink</Badge>
<Badge style={{ /* same pattern, tone oklch(65% 0.18 55) */ }}>Orange</Badge>`,
      <Stack direction="row" gap="2" wrap align="center">
        <Badge
          style={
            {
              "--badge-bg": "color-mix(in oklab, oklch(55% 0.2 300) 14%, transparent)",
              "--badge-fg": "color-mix(in oklab, oklch(55% 0.2 300) 75%, var(--color-primary-foreground))",
            } as CSSProperties
          }
        >
          Purple
        </Badge>
        <Badge
          style={
            {
              "--badge-bg": "color-mix(in oklab, oklch(60% 0.22 350) 14%, transparent)",
              "--badge-fg": "color-mix(in oklab, oklch(60% 0.22 350) 75%, var(--color-primary-foreground))",
            } as CSSProperties
          }
        >
          Pink
        </Badge>
        <Badge
          style={
            {
              "--badge-bg": "color-mix(in oklab, oklch(65% 0.18 55) 14%, transparent)",
              "--badge-fg": "color-mix(in oklab, oklch(65% 0.18 55) 75%, var(--color-primary-foreground))",
            } as CSSProperties
          }
        >
          Orange
        </Badge>
      </Stack>,
      "Override --badge-bg and --badge-fg to use any color. Derive both from one tone so it works in light and dark.",
    ),
];
