import { Text } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Text>
  Body text with <Text as="span" variant="code">inline code</Text>.
</Text>`,
  <Text>
    Body text with <Text as="span" variant="code">inline code</Text>.
  </Text>,
);

export const examples: Example[] = [
    ex("Body", `<Text>Regular body text.</Text>`, <Text>Regular body text.</Text>),
    ex("Muted", `<Text tone="muted">Secondary text.</Text>`, <Text tone="muted">Secondary text.</Text>),
    ex("Emphasis", `<Text variant="emphasis">A short line that deserves attention.</Text>`, <Text variant="emphasis">A short line that deserves attention.</Text>, "Serif italic (Source Serif 4). Use it for one lead sentence or a quote, never for long text."),
    ex("Code", `<Text variant="code">const x = 1;</Text>`, <Text variant="code">const x = 1;</Text>),
];
