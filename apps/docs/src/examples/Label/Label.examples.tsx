import { Checkbox, Input, Label, Stack } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Label.module.css";

const checkboxExample = (
  <Stack direction="row" gap="2" align="center">
    <Checkbox id="terms" aria-labelledby="terms-label" />
    <Label className={styles.checkboxLabel} id="terms-label" htmlFor="terms">Accept terms and conditions</Label>
  </Stack>
);

export const hero = defineHero(
  `<div className="flex items-center gap-2">
  <Checkbox id="terms" aria-labelledby="terms-label" />
  <Label id="terms-label" htmlFor="terms">Accept terms and conditions</Label>
</div>`,
  checkboxExample,
);

export const examples: Example[] = [
  ex(
    "Label with input",
    `<Stack gap="2">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</Stack>`,
    <Stack gap="2" style={{ width: "min(100%, var(--container-xs))" }}><Label htmlFor="email">Email address</Label><Input id="email" type="email" placeholder="you@example.com" /></Stack>,
  ),
];
