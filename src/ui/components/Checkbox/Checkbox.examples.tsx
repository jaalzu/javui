import { Checkbox, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Stack gap="1">
  <Checkbox label="Send me updates" defaultChecked />
  <Checkbox label="Select all" indeterminate />
</Stack>`,
  <Stack gap="1">
    <Checkbox label="Send me updates" defaultChecked />
    <Checkbox label="Select all" indeterminate />
  </Stack>,
);

export const examples: Example[] = [
    ex("Default", `<Checkbox label="Send me updates" />`, <Checkbox label="Send me updates" />),
    ex("Checked", `<Checkbox label="Send me updates" defaultChecked />`, <Checkbox label="Send me updates" defaultChecked />),
    ex("Indeterminate", `<Checkbox label="Select all" indeterminate />`, <Checkbox label="Select all" indeterminate />),
    ex("Disabled", `<Checkbox label="Not available" disabled />`, <Checkbox label="Not available" disabled />),
];
