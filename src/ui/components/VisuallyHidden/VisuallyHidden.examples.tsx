import { Text, VisuallyHidden } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Text>
  4 results <VisuallyHidden>(updated just now)</VisuallyHidden>
</Text>`,
  <Text>
    4 results <VisuallyHidden>(updated just now)</VisuallyHidden>
  </Text>,
);

export const examples: Example[] = [];
