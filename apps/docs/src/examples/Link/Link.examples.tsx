import {
  Heading,
  Link,
  Stack,
  Text
} from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import { GithubLogoIcon } from "@/icons";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Text>
  Read the <Link href="/docs">documentation</Link>.
</Text>`,
  <Text>
    Read the <Link href="/docs">documentation</Link>.
  </Text>,
);

export const extras = (
  <>
    <Heading as="h2" size={6} id="custom-links">
      Custom links
    </Heading>
    <p>
      When you build your own link component, call <code>useLinkComponent()</code>{" "}
      instead of rendering <code>a</code> or <code>next/link</code> directly, so it
      keeps following <code>LinkProvider</code>. It must run in a client component.
    </p>
    <CodeBlock
      language="tsx"
      label="components/CardLink.tsx"
      minimal
      code={`"use client";

import { useLinkComponent } from "@javui/ui";

export function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  const LinkComponent = useLinkComponent();
  return <LinkComponent href={href}>{children}</LinkComponent>;
}`}
    />
  </>
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
