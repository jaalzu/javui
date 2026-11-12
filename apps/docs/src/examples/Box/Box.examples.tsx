import { Box, Text } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Box surface="card"><Text>Content region</Text></Box>`,
  <Box surface="card"><Text>Content region</Text></Box>,
);

export const examples: Example[] = [
  ex(
    "Surfaces",
    `<Box surface="sunken" size="sm"><Text>Recessed content</Text></Box>`,
    <Box surface="sunken" size="sm"><Text>Recessed content</Text></Box>,
    "Use semantic surfaces instead of inventing nested card styles.",
  ),
];
