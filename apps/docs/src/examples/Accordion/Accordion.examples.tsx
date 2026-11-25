import { Accordion, Text } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const accordionItems = [
  {
    value: "a",
    title: "Is it accessible?",
    content: <Text>Behavior and ARIA come from Base UI.</Text>,
  },
  {
    value: "b",
    title: "Is it themeable?",
    content: <Text>Light and dark use semantic tokens.</Text>,
  },
  {
    value: "c",
    title: "Can agents use it?",
    content: <Text>Yes: every prop is listed in the agent manifest.</Text>,
  },
];

export const hero = defineHero(
  `<Accordion
 
  defaultValue={["a", "b", "c"]}
  items={items}
/>`,
  <Accordion defaultValue={["a", "b", "c"]} items={accordionItems} />,
  { stageHeight: "lg", fixed: true },
);

export const examples: Example[] = [
  ex(
    "Multiple",
    `<Accordion
  multiple
  defaultValue={["a", "b", "c"]}
  items={items}
/>`,
    <Accordion
      multiple
      defaultValue={["a", "b", "c"]}
      items={accordionItems}
    />,
    "The multiple prop allows to multiple items to be open at the same time",
    "lg",
  ),
  ex(
    "Bordered",
    `<Accordion bordered items={items} />`,
    <Accordion bordered items={accordionItems} />,
    "A border wraps the whole list, not only the space between items.",
    "lg",
  ),
];
