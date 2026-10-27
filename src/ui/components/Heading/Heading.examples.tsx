import { Heading } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Heading as="h3" size={2}>A quiet heading</Heading>`,
  <Heading as="h3" size={2}>A quiet heading</Heading>,
);

export const examples: Example[] = [];
