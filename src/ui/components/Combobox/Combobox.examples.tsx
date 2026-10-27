import { Combobox } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Combobox
  label="Assignee"
  placeholder="Search people"
  items={[
    { value: "ada", label: "Ada Lovelace", description: "Engineering" },
    { value: "grace", label: "Grace Hopper", description: "Research" },
    { value: "alan", label: "Alan Turing", description: "Engineering" },
  ]}
/>`,
  <Combobox
    label="Assignee"
    placeholder="Search people"
    items={[
      { value: "ada", label: "Ada Lovelace", description: "Engineering" },
      { value: "grace", label: "Grace Hopper", description: "Research" },
      { value: "alan", label: "Alan Turing", description: "Engineering" },
    ]}
  />,
);

export const examples: Example[] = [];
