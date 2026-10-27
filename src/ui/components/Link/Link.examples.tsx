import { Link, Text } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Text>
  Read the <Link href="/docs">documentation</Link>.
</Text>`,
  <Text>
    Read the <Link href="/docs">documentation</Link>.
  </Text>,
);

export const examples: Example[] = [];
