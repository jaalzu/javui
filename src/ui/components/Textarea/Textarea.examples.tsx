import { Field, Textarea } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Field label="Message">
  <Textarea rows={3} />
</Field>`,
  <Field label="Message">
    <Textarea rows={3} />
  </Field>,
);

export const examples: Example[] = [];
