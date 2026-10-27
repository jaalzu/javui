import { Collapsible, Text } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Collapsible title="Advanced settings" defaultOpen>
  <Text>Only the options most people need are visible.</Text>
</Collapsible>`,
  <Collapsible title="Advanced settings" defaultOpen>
    <Text>Only the options most people need are visible.</Text>
  </Collapsible>,
);

export const examples: Example[] = [];
