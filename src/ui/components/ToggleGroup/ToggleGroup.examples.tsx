import { ToggleGroup } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<ToggleGroup
  label="View"
  defaultValue="list"
  items={[
    { value: "list", label: "List" },
    { value: "board", label: "Board" },
  ]}
/>`,
  <ToggleGroup
    label="View"
    defaultValue="list"
    items={[
      { value: "list", label: "List" },
      { value: "board", label: "Board" },
    ]}
  />,
);

export const examples: Example[] = [];
