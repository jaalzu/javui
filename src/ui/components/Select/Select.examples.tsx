import { Field, Select } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

const countries = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
];

export const hero = defineHero(
  `<Field label="Country">
  <Select items={countries} placeholder="Choose one" />
</Field>`,
  <Field label="Country">
    <Select items={countries} placeholder="Choose one" />
  </Field>,
);

export const examples: Example[] = [];
