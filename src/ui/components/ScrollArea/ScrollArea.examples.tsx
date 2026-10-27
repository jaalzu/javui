import { ScrollArea, Stack, Text } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<ScrollArea label="Activity">
  <Stack gap="3">
    {Array.from({ length: 10 }, (_, index) => (
      <Text key={index}>Activity entry {index + 1}: a change was saved.</Text>
    ))}
  </Stack>
</ScrollArea>`,
  <ScrollArea label="Activity">
    <Stack gap="3">
      {Array.from({ length: 10 }, (_, index) => (
        <Text key={index}>Activity entry {index + 1}: a change was saved.</Text>
      ))}
    </Stack>
  </ScrollArea>,
);

export const examples: Example[] = [];
