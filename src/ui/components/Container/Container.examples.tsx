import { Card, Container, Text } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Container size="md">
  <Card variant="surface"><Text>Readable content width</Text></Card>
</Container>`,
  <Container size="md">
    <Card variant="surface"><Text>Readable content width</Text></Card>
  </Container>,
);

export const examples: Example[] = [
  ex(
    "Responsive width",
    `<Container size={{ base: "sm", lg: "xl" }} gutter={{ base: "4", md: "8" }}>
  <Text>Width and gutters change at the same breakpoints as the rest of the layout.</Text>
</Container>`,
    <Container size={{ base: "sm", lg: "xl" }} gutter={{ base: "4", md: "8" }}>
      <Text>Width and gutters change at the same breakpoints as the rest of the layout.</Text>
    </Container>,
    "Use Container as the page shell or as a readable content boundary.",
  ),
];
