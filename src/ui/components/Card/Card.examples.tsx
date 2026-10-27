import type { CSSProperties } from "react";
import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Text } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Card variant="surface">
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Related content in one surface.</CardDescription>
    <CardAction><Badge>New</Badge></CardAction>
  </CardHeader>
  <CardContent>
    <Text>Body content sits between the header and the footer.</Text>
  </CardContent>
</Card>`,
  <Card variant="surface">
    <CardHeader>
      <CardTitle>Card title</CardTitle>
      <CardDescription>Related content in one surface.</CardDescription>
      <CardAction><Badge>New</Badge></CardAction>
    </CardHeader>
    <CardContent>
      <Text>Body content sits between the header and the footer.</Text>
    </CardContent>
  </Card>,
);

export const examples: Example[] = [
    ex(
      "Basic",
      `<Card variant="surface">
  <CardHeader>
    <CardTitle>Release notes</CardTitle>
    <CardDescription>What changed in this version.</CardDescription>
  </CardHeader>
  <CardContent>
    <Text>Body content sits between the header and the footer.</Text>
  </CardContent>
  <CardFooter>
    <Text size="sm" tone="muted">Updated today</Text>
  </CardFooter>
</Card>`,
      <Card variant="surface"><CardHeader><CardTitle>Release notes</CardTitle><CardDescription>What changed in this version.</CardDescription></CardHeader><CardContent><Text>Body content sits between the header and the footer.</Text></CardContent><CardFooter><Text size="sm" tone="muted">Updated today</Text></CardFooter></Card>,
    ),
    ex(
      "Small",
      `<Card size="sm" variant="surface">
  <CardHeader>
    <CardTitle>Compact</CardTitle>
  </CardHeader>
  <CardContent><Text size="sm">A tighter inset for dense lists.</Text></CardContent>
</Card>`,
      <Card size="sm" variant="surface"><CardHeader><CardTitle>Compact</CardTitle></CardHeader><CardContent><Text size="sm">A tighter inset for dense lists.</Text></CardContent></Card>,
      "Use small cards inside dense layouts such as sidebars or dashboards.",
    ),
    ex(
      "Custom spacing",
      `<Card variant="surface" style={{ "--card-spacing": "var(--space-3)" }}>
  <CardContent><Text>Any spacing step.</Text></CardContent>
</Card>`,
      <Card variant="surface" style={{ "--card-spacing": "var(--space-3)" } as CSSProperties}><CardContent><Text>Any spacing step.</Text></CardContent></Card>,
      "Change the shared `--card-spacing` variable once; every part follows it.",
    ),
    ex(
      "With image",
      `<Card variant="surface">
  <img src="/window.svg" alt="" width="640" height="360" />
  <CardHeader>
    <CardTitle>Image first</CardTitle>
    <CardDescription>The first image is full-bleed with rounded top corners.</CardDescription>
  </CardHeader>
</Card>`,
      <Card variant="surface">
        {/* eslint-disable-next-line @next/next/no-img-element -- Card styles the first <img> as full-bleed media. */}
        <img src="/window.svg" alt="" width="640" height="360" /><CardHeader><CardTitle>Image first</CardTitle><CardDescription>The first image is full-bleed with rounded top corners.</CardDescription></CardHeader></Card>,
      "An image as the first child spans the full width; there is no separate media part.",
    ),
    ex(
      "With CardAction",
      `<Card variant="surface">
  <CardHeader>
    <CardTitle>Release notes</CardTitle>
    <CardAction><Button size="sm" variant="secondary">Share</Button></CardAction>
  </CardHeader>
  <CardContent><Text>Keep the primary action in the header.</Text></CardContent>
</Card>`,
      <Card variant="surface"><CardHeader><CardTitle>Release notes</CardTitle><CardAction><Button size="sm" variant="secondary">Share</Button></CardAction></CardHeader><CardContent><Text>Keep the primary action in the header.</Text></CardContent></Card>,
    ),
];
