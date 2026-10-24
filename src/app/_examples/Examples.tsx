import type { CSSProperties, ReactNode } from "react";
import {
  Alert, AlertDialog, AlertDialogClose, AlertDialogContent, AlertDialogTrigger, AspectRatio, Avatar, AvatarGroup, Badge, Button, ButtonGroup, ButtonGroupSeparator, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CaretDownIcon, Checkbox, CheckIcon, Field, GearIcon, Heading, Input, Menu, Progress, Slider, Stack, Switch, Tabs, Text,
} from "@/ui";
import { CodeBlock } from "@/ui/server";
import { Demo } from "./Demo";
import styles from "./Examples.module.css";

/** A live preview with a collapsible "View code" underneath. Uses a native `details`, so it works without extra JavaScript. */
export function ExampleFrame({ children, code, full = false }: { children: ReactNode; code?: string; full?: boolean }) {
  return (
    <div className={styles.example} data-doc-example>
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
  ButtonGroup: [
    ex(
      "Related actions",
      `<ButtonGroup aria-label="Document actions">
  <Button variant="outline">Save draft</Button>
  <Button variant="outline">Preview</Button>
  <Button variant="outline">Publish</Button>
</ButtonGroup>`,
      <ButtonGroup aria-label="Document actions"><Button variant="outline">Save draft</Button><Button variant="outline">Preview</Button><Button variant="outline">Publish</Button></ButtonGroup>,
      "Outline buttons share one border and round only on the outside.",
    ),
    ex(
      "With separator",
      `<ButtonGroup aria-label="Export">
  <Button variant="secondary">CSV</Button>
  <Button variant="secondary">JSON</Button>
  <ButtonGroupSeparator />
  <Button variant="secondary">More</Button>
</ButtonGroup>`,
      <ButtonGroup aria-label="Export"><Button variant="secondary">CSV</Button><Button variant="secondary">JSON</Button><ButtonGroupSeparator /><Button variant="secondary">More</Button></ButtonGroup>,
      "Non-outline variants have no visible shared border, so use a separator to mark the division.",
    ),
    ex(
      "Vertical",
      `<ButtonGroup aria-label="Document actions" orientation="vertical">
  <Button variant="outline">Save draft</Button>
  <Button variant="outline">Preview</Button>
</ButtonGroup>`,
      <ButtonGroup aria-label="Document actions" orientation="vertical"><Button variant="outline">Save draft</Button><Button variant="outline">Preview</Button></ButtonGroup>,
    ),
    ex(
      "Split button with Menu",
      `<ButtonGroup aria-label="Deploy">
  <Button>Deploy</Button>
  <Menu
    label="Options"
    variant="primary"
    items={[
      { label: "Deploy to staging", onSelect: () => {} },
      { label: "Deploy to production", onSelect: () => {} },
    ]}
  />
</ButtonGroup>`,
      <ButtonGroup aria-label="Deploy"><Button>Deploy</Button><Menu label="Options" variant="primary" items={[{ label: "Deploy to staging", onSelect: () => {} }, { label: "Deploy to production", onSelect: () => {} }]} /></ButtonGroup>,
      "A Menu trigger joins the group like a button, giving you a split-button pattern.",
    ),
  ],
  AspectRatio: [
    ex(
      "Landscape (16 / 9)",
      `<AspectRatio ratio={16 / 9}>
  <img src="/window.svg" alt="A window" width={640} height={360} />
</AspectRatio>`,
      <AspectRatio ratio={16 / 9}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Local fixture for the example. */}
        <img src="/window.svg" alt="A window" width={640} height={360} />
      </AspectRatio>,
      "The box keeps its 16:9 area before the image loads.",
    ),
    ex(
      "Square",
      `<AspectRatio ratio={1}>
  <img src="/window.svg" alt="A window" width={480} height={480} />
</AspectRatio>`,
      <AspectRatio ratio={1}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Local fixture for the example. */}
        <img src="/window.svg" alt="A window" width={480} height={480} />
      </AspectRatio>,
    ),
    ex(
      "Portrait",
      `<AspectRatio ratio={3 / 4}>
  <img src="/window.svg" alt="A window" width={480} height={640} />
</AspectRatio>`,
      <AspectRatio ratio={3 / 4}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Local fixture for the example. */}
        <img src="/window.svg" alt="A window" width={480} height={640} />
      </AspectRatio>,
    ),
  ],
  Button: [
    ex("Primary", `<Button>Save</Button>`, <Button>Save</Button>, "The main action of a view. Use only one."),
    ex("Secondary", `<Button variant="secondary">Cancel</Button>`, <Button variant="secondary">Cancel</Button>),
    ex("Ghost", `<Button variant="ghost">Skip</Button>`, <Button variant="ghost">Skip</Button>, "Low emphasis, for actions that should not compete."),
    ex("Outline", `<Button variant="outline">Learn more</Button>`, <Button variant="outline">Learn more</Button>, "A transparent button with a visible border."),
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
  AlertDialog: [
    ex(
      "Destructive confirmation",
      `<AlertDialog>\n  <AlertDialogTrigger variant="danger">Delete project</AlertDialogTrigger>\n  <AlertDialogContent title="Delete project?" description="This permanently removes the project and its data. This cannot be undone.">\n    <AlertDialogClose>Cancel</AlertDialogClose>\n    <AlertDialogClose variant="danger">Delete</AlertDialogClose>\n  </AlertDialogContent>\n</AlertDialog>`,
      <AlertDialog>
        <AlertDialogTrigger variant="danger">Delete project</AlertDialogTrigger>
        <AlertDialogContent title="Delete project?" description="This permanently removes the project and its data. This cannot be undone.">
          <AlertDialogClose>Cancel</AlertDialogClose>
          <AlertDialogClose variant="danger">Delete</AlertDialogClose>
        </AlertDialogContent>
      </AlertDialog>,
      "The safe action, Cancel, receives initial focus and the dialog does not close on outside click.",
    ),
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
  Tabs: [
    ex(
      "Vertical",
      `<Tabs\n  orientation="vertical"\n  aria-label="Account sections"\n  items={[\n    { value: "profile", label: "Profile", content: <p>Your name and photo.</p> },\n    { value: "billing", label: "Billing", content: <p>Plan and invoices.</p> },\n    { value: "team", label: "Team", content: <p>Members and roles.</p> },\n  ]}\n/>`,
      <Tabs
        orientation="vertical"
        aria-label="Account sections"
        items={[
          { value: "profile", label: "Profile", content: <Text>Your name and photo.</Text> },
          { value: "billing", label: "Billing", content: <Text>Plan and invoices.</Text> },
          { value: "team", label: "Team", content: <Text>Members and roles.</Text> },
        ]}
      />,
      "Vertical tabs sit in a column next to their panel, for settings and compact spaces.",
    ),
  ],
  Avatar: [
    ex("Sizes", `<Avatar name="Ada Lovelace" size="sm" />
<Avatar name="Ada Lovelace" />
<Avatar name="Ada Lovelace" size="lg" />`, <Stack direction="row" gap="3" align="center"><Avatar name="Ada Lovelace" size="sm" /><Avatar name="Ada Lovelace" /><Avatar name="Ada Lovelace" size="lg" /></Stack>),
    ex(
      "Status",
      `<Avatar name="Ada Lovelace" status="online" />
<Avatar name="Grace Hopper" status="away" />
<Avatar name="Alan Turing" status="busy" />
<Avatar name="Katherine Johnson" status="offline" />`,
      <Stack direction="row" gap="3" align="center"><Avatar name="Ada Lovelace" status="online" /><Avatar name="Grace Hopper" status="away" /><Avatar name="Alan Turing" status="busy" /><Avatar name="Katherine Johnson" status="offline" /></Stack>,
      "Each status has its own shape, and the state is appended to the accessible name.",
    ),
    ex(
      "Badge",
      `<Avatar name="Ada Lovelace" badge={<CheckIcon />} badgeLabel="Verified" />`,
      <Avatar name="Ada Lovelace" badge={<CheckIcon />} badgeLabel="Verified" />,
      "The badge label is required and appended to the accessible name.",
    ),
    ex(
      "Icon fallback",
      `<Avatar name="Build bot" icon={<GearIcon />} />`,
      <Avatar name="Build bot" icon={<GearIcon />} />,
      "Replaces the initials for bots or organizations while the name stays the accessible name.",
    ),
    ex(
      "AvatarGroup",
      `<AvatarGroup max={3} aria-label="Project members">
  <Avatar name="Ada Lovelace" />
  <Avatar name="Grace Hopper" />
  <Avatar name="Alan Turing" />
  <Avatar name="Katherine Johnson" />
  <Avatar name="Margaret Hamilton" />
</AvatarGroup>`,
      <AvatarGroup max={3} aria-label="Project members"><Avatar name="Ada Lovelace" /><Avatar name="Grace Hopper" /><Avatar name="Alan Turing" /><Avatar name="Katherine Johnson" /><Avatar name="Margaret Hamilton" /></AvatarGroup>,
      "Overlapping avatars share one size and collapse the rest into an accessible +N item.",
    ),
    ex("Sizes", `<Avatar name="Ada Lovelace" size="sm" />\n<Avatar name="Ada Lovelace" />\n<Avatar name="Ada Lovelace" size="lg" />`, <Stack direction="row" gap="3" align="center"><Avatar name="Ada Lovelace" size="sm" /><Avatar name="Ada Lovelace" /><Avatar name="Ada Lovelace" size="lg" /></Stack>),
  ],
  Text: [
    ex("Body", `<Text>Regular body text.</Text>`, <Text>Regular body text.</Text>),
    ex("Muted", `<Text tone="muted">Secondary text.</Text>`, <Text tone="muted">Secondary text.</Text>),
    ex("Emphasis", `<Text variant="emphasis">A short line that deserves attention.</Text>`, <Text variant="emphasis">A short line that deserves attention.</Text>, "Serif italic (Source Serif 4). Use it for one lead sentence or a quote, never for long text."),
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
