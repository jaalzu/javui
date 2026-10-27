import { Kbd, Text } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Text>Press <Kbd>Tab</Kbd> to move on.</Text>`,
  <Text>Press <Kbd>Tab</Kbd> to move on.</Text>,
);

export const examples: Example[] = [];
