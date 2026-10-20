"use client";

import type { ReactNode } from "react";
import {
  Alert, Avatar, Badge, Button, Card, CaretDownIcon, Checkbox, CheckIcon, CodeBlock, Field, Heading, Input, Progress, Slider, Stack, Switch, Text,
} from "@/ui";
import { Demo } from "./Demo";
import styles from "./Examples.module.css";

/** A live preview with a collapsible "View code" underneath. Uses a native `details`, so it works without extra JavaScript. */
export function ExampleFrame({ children, code, full = false }: { children: ReactNode; code?: string; full?: boolean }) {
  return (
    <div className={styles.example}>
      <div className={`${styles.exampleStage} ${full ? styles.exampleStageFull : ""}`}>{children}</div>
      {code && (
        <details className={styles.exampleCode}>
          <summary>
            <CaretDownIcon size="sm" className={styles.chev} />
            View code
          </summary>
          <CodeBlock language="tsx" label="Code" code={code} />
        </details>
      )}
    </div>
  );
}

/** The main preview of a component page: its live demo and the first example from the manifest as code. */
export function Preview({ name, code }: { name: string; code?: string }) {
  return (
    <ExampleFrame code={code} full>
      <Demo name={name} />
    </ExampleFrame>
  );
}

type Example = { title: string; description?: string; node: ReactNode; code: string };
const ex = (title: string, code: string, node: ReactNode, description?: string): Example => ({ title, description, code, node });

const check = <CheckIcon />;

/**
 * One section per case, each with its own preview and code, for the components where the cases matter.
 * Components without an entry show only the main preview and the usage from the manifest.
 */
const registry: Record<string, Example[]> = {
  Button: [
    ex("Primary", `<Button>Save</Button>`, <Button>Save</Button>, "The main action of a view. Use only one."),
    ex("Secondary", `<Button variant="secondary">Cancel</Button>`, <Button variant="secondary">Cancel</Button>),
    ex("Ghost", `<Button variant="ghost">Skip</Button>`, <Button variant="ghost">Skip</Button>, "Low emphasis, for actions that should not compete."),
    ex("Accent", `<Button variant="accent">Upgrade</Button>`, <Button variant="accent">Upgrade</Button>, "Brand emphasis. This is the color you change for your brand."),
    ex("Danger", `<Button variant="danger">Delete</Button>`, <Button variant="danger">Delete</Button>, "Destructive actions."),
    ex(
      "Size",
      `<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`,
      <Stack direction="row" gap="3" align="center" wrap><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></Stack>,
    ),
    ex("Disabled", `<Button disabled>Disabled</Button>`, <Button disabled>Disabled</Button>),
    ex(
      "Loading",
      `<Button loading>Saving</Button>`,
      <Button loading>Saving</Button>,
      "Shows a spinner and ignores clicks while an action runs. It keeps its label and stays focusable.",
    ),
    ex(
      "With icon",
      `<Button variant="secondary" startIcon={<CheckIcon />}>Done</Button>`,
      <Button variant="secondary" startIcon={check}>Done</Button>,
      "Icons are decorative when there is text next to them.",
    ),
    ex(
      "Icon only",
      `<Button variant="secondary" aria-label="Done" startIcon={<CheckIcon />} />`,
      <Button variant="secondary" aria-label="Done" startIcon={check} />,
      "Always give an icon-only button an accessible name.",
    ),
  ],
  Badge: [
    ex("Default", `<Badge>Draft</Badge>`, <Badge>Draft</Badge>),
    ex("Success", `<Badge variant="success">Active</Badge>`, <Badge variant="success">Active</Badge>),
    ex("Danger", `<Badge variant="danger">Failed</Badge>`, <Badge variant="danger">Failed</Badge>),
    ex("Brand", `<Badge variant="brand">Beta</Badge>`, <Badge variant="brand">Beta</Badge>),
    ex("Inverted", `<Badge variant="inverted">New</Badge>`, <Badge variant="inverted">New</Badge>),
    ex("Outline", `<Badge variant="outline">3 sources</Badge>`, <Badge variant="outline">3 sources</Badge>),
  ],
  Alert: [
    ex("Info", `<Alert tone="info" title="Heads up">Your trial ends in 3 days.</Alert>`, <Alert tone="info" title="Heads up">Your trial ends in 3 days.</Alert>),
    ex("Success", `<Alert tone="success" title="Saved">Your changes are live.</Alert>`, <Alert tone="success" title="Saved">Your changes are live.</Alert>),
    ex("Warning", `<Alert tone="warning" title="Almost full">You have used 90% of your storage.</Alert>`, <Alert tone="warning" title="Almost full">You have used 90% of your storage.</Alert>),
    ex("Danger", `<Alert tone="danger" title="Could not save">Check your connection and try again.</Alert>`, <Alert tone="danger" title="Could not save">Check your connection and try again.</Alert>, "Danger and warning are announced right away by screen readers."),
  ],
  Field: [
    ex("Default", `<Field label="Email">\n  <Input type="email" autoComplete="email" />\n</Field>`, <Field label="Email"><Input type="email" autoComplete="email" /></Field>),
    ex("With description", `<Field label="Email" description="We only use it for receipts.">\n  <Input type="email" autoComplete="email" />\n</Field>`, <Field label="Email" description="We only use it for receipts."><Input type="email" autoComplete="email" /></Field>),
    ex("With error", `<Field label="Name" error="Enter your name">\n  <Input autoComplete="name" />\n</Field>`, <Field label="Name" error="Enter your name"><Input autoComplete="name" /></Field>, "The error is linked to the input for screen readers."),
  ],
  Checkbox: [
    ex("Default", `<Checkbox label="Send me updates" />`, <Checkbox label="Send me updates" />),
    ex("Checked", `<Checkbox label="Send me updates" defaultChecked />`, <Checkbox label="Send me updates" defaultChecked />),
    ex("Indeterminate", `<Checkbox label="Select all" indeterminate />`, <Checkbox label="Select all" indeterminate />),
    ex("Disabled", `<Checkbox label="Not available" disabled />`, <Checkbox label="Not available" disabled />),
  ],
  Switch: [
    ex("Default", `<Switch label="Notifications" />`, <Switch label="Notifications" />),
    ex("On", `<Switch label="Notifications" defaultChecked />`, <Switch label="Notifications" defaultChecked />),
    ex("Disabled", `<Switch label="Notifications" disabled />`, <Switch label="Notifications" disabled />),
  ],
  Card: [
    ex("Outline", `<Card padding="5">\n  <Text>Related content.</Text>\n</Card>`, <Card padding="5"><Text>Related content.</Text></Card>),
    ex("Surface", `<Card variant="surface" padding="5">\n  <Text>Related content.</Text>\n</Card>`, <Card variant="surface" padding="5"><Text>Related content.</Text></Card>),
    ex("As an article", `<Card as="article" padding="5">\n  <Heading as="h3" size={6}>Title</Heading>\n  <Text>Self-contained content.</Text>\n</Card>`, <Card as="article" padding="5"><Heading as="h3" size={6}>Title</Heading><Text>Self-contained content.</Text></Card>, "Use article for content that makes sense on its own."),
  ],
  Progress: [
    ex("Determinate", `<Progress label="Uploading" value={40} />`, <Progress label="Uploading" value={40} />),
    ex("Indeterminate", `<Progress label="Working" value={null} />`, <Progress label="Working" value={null} />, "Use null when you do not know how long it will take."),
  ],
  Slider: [
    ex("Single", `<Slider label="Volume" defaultValue={40} />`, <Slider label="Volume" defaultValue={40} />),
    ex("Range", `<Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />`, <Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />),
    ex("Disabled", `<Slider label="Volume" defaultValue={40} disabled />`, <Slider label="Volume" defaultValue={40} disabled />),
  ],
  Avatar: [
    ex("Sizes", `<Avatar name="Ada Lovelace" size="sm" />\n<Avatar name="Ada Lovelace" />\n<Avatar name="Ada Lovelace" size="lg" />`, <Stack direction="row" gap="3" align="center"><Avatar name="Ada Lovelace" size="sm" /><Avatar name="Ada Lovelace" /><Avatar name="Ada Lovelace" size="lg" /></Stack>),
  ],
  Text: [
    ex("Body", `<Text>Regular body text.</Text>`, <Text>Regular body text.</Text>),
    ex("Muted", `<Text tone="muted">Secondary text.</Text>`, <Text tone="muted">Secondary text.</Text>),
    ex("Emphasis", `<Text variant="emphasis">A short line that deserves attention.</Text>`, <Text variant="emphasis">A short line that deserves attention.</Text>, "Serif italic (Newsreader). Use it for one lead sentence or a quote, never for long text."),
    ex("Code", `<Text variant="code">const x = 1;</Text>`, <Text variant="code">const x = 1;</Text>),
  ],
};

/** The cases of a component, one section each. Renders nothing when the component has no entry. */
export function Examples({ name }: { name: string }) {
  const items = registry[name];
  if (!items) return null;
  return (
    <>
      <Heading as="h2" size={6}>Examples</Heading>
      {items.map((e) => (
        <section key={e.title} aria-labelledby={`ex-${e.title.replace(/\W+/g, "-")}`}>
          <Heading as="h3" size={6} id={`ex-${e.title.replace(/\W+/g, "-")}`}>{e.title}</Heading>
          {e.description && <p className={styles.exampleNote}>{e.description}</p>}
          <ExampleFrame code={e.code}>{e.node}</ExampleFrame>
        </section>
      ))}
    </>
  );
}
