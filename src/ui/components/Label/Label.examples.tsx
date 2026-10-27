import { Input, Label, Stack } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Stack gap="2">
  <Label htmlFor="hero-label-email">Email</Label>
  <Input id="hero-label-email" type="email" placeholder="you@example.com" />
</Stack>`,
  <Stack gap="2">
    <Label htmlFor="hero-label-email">Email</Label>
    <Input id="hero-label-email" type="email" placeholder="you@example.com" />
  </Stack>,
);

export const examples: Example[] = [];
