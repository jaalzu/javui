import { Badge, Stack } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Stack direction="row" gap="3" align="center">
  <Badge>One</Badge>
  <Badge>Two</Badge>
  <Badge>Three</Badge>
</Stack>`,
  <Stack direction="row" gap="3" align="center">
    <Badge>One</Badge>
    <Badge>Two</Badge>
    <Badge>Three</Badge>
  </Stack>,
);

export const examples: Example[] = [];
