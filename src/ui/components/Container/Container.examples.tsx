import { Container, Text } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Container size="sm">
  <Text variant="caption" size="lg" tone="muted">
    Content centered and limited in width.
  </Text>
</Container>`,
  <Container size="sm">
    <Text variant="caption" size="lg" tone="muted">
      Content centered and limited in width.
    </Text>
  </Container>,
);

export const examples: Example[] = [];
