import { GithubLogoIcon, Link, Stack, Text } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Text>
  Read the <Link href="/docs">documentation</Link>.
</Text>`,
  <Text>
    Read the <Link href="/docs">documentation</Link>.
  </Text>,
);

export const examples: Example[] = [
  ex(
    "Inline link",
    `<Text>Read the <Link href="/docs">documentation</Link>.</Text>`,
    <Text>Read the <Link href="/docs">documentation</Link>.</Text>,
  ),
  ex(
    "With icon",
    `<Link href="https://github.com/" target="_blank" rel="noopener noreferrer" startIcon={<GithubLogoIcon />}>GitHub</Link>`,
    <Stack align="center"><Link href="https://github.com/" target="_blank" rel="noopener noreferrer" startIcon={<GithubLogoIcon />}>GitHub</Link></Stack>,
  ),
  ex(
    "Muted",
    `<Link href="/docs" tone="muted">Learn more</Link>`,
    <Stack align="center"><Link href="/docs" tone="muted">Learn more</Link></Stack>,
  ),
];
