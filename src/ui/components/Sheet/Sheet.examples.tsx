import { Button, Sheet, Text } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Sheet
  trigger="Filters"
  title="Filters"
  description="Narrow the results."
  footer={<Button size="sm">Apply</Button>}
>
  <Text>Filter controls would go here.</Text>
</Sheet>`,
  <Sheet
    trigger="Filters"
    title="Filters"
    description="Narrow the results."
    footer={<Button size="sm">Apply</Button>}
  >
    <Text>Filter controls would go here.</Text>
  </Sheet>,
);

export const examples: Example[] = [];
