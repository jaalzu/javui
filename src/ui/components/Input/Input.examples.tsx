import { Field, Input } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Field label="Name">
  <Input autoComplete="name" />
</Field>`,
  <Field label="Name">
    <Input autoComplete="name" />
  </Field>,
);

export const examples: Example[] = [];
