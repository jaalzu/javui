"use client";

import type { ReactNode } from "react";
import {
  Accordion, Alert, Avatar, Badge, Box, Breadcrumb, Button, ButtonLink, Card, Checkbox, CodeBlock, Container,
  Dialog, DialogClose, DialogContent, DialogTrigger, Divider, Field, Grid, Heading, Icon, Input, Kbd, Link, Menu,
  Pagination, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, Radio, RadioGroup, Select, Skeleton,
  Slider, Spinner, Stack, Switch, Table, Tabs, Text, Textarea, Tooltip, VisuallyHidden, useToast,
} from "@/ui";

function ToastDemo() {
  const { show } = useToast();
  return (
    <Button variant="secondary" onClick={() => show({ title: "Saved", description: "Your changes are safe.", tone: "success" })}>
      Show a toast
    </Button>
  );
}

const countries = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
];

/** Live example of each public component, keyed by export name. Parts of a composite point at their parent in `demoAlias`. */
const demos: Record<string, () => ReactNode> = {
  Text: () => <Text>Body text with <Text as="span" variant="code">inline code</Text>.</Text>,
  Heading: () => <Heading as="h3" size={2}>A quiet heading</Heading>,
  Link: () => <Text>Read the <Link href="/docs">documentation</Link>.</Text>,
  Kbd: () => <Text>Press <Kbd>Tab</Kbd> to move on.</Text>,
  Badge: () => (
    <Stack gap="3">
      <Stack direction="row" gap="2" wrap>
        <Badge>Neutral</Badge>
        <Badge tone="accent">Accent</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="warning">Warning</Badge>
        <Badge tone="info">Info</Badge>
        <Badge tone="danger">Danger</Badge>
      </Stack>
      <Stack direction="row" gap="2" wrap>
        <Badge variant="solid">Solid</Badge>
        <Badge variant="solid" tone="accent">Accent</Badge>
        <Badge variant="solid" tone="danger">Danger</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="outline" tone="success">Outline</Badge>
      </Stack>
      <Stack direction="row" gap="2" wrap>
        <Badge tone="success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>Verified</Badge>
        <Badge tone="info" loading>Syncing</Badge>
        <Badge tone="warning" loading>Pending</Badge>
      </Stack>
    </Stack>
  ),
  Box: () => <Box bordered padding="4" radius="lg"><Text>A bordered box</Text></Box>,
  Stack: () => (
    <Stack direction="row" gap="3" align="center">
      <Badge>One</Badge><Badge>Two</Badge><Badge>Three</Badge>
    </Stack>
  ),
  Grid: () => (
    <Grid columns="repeat(3, 1fr)" gap="3">
      <Box bordered padding="3"><Text variant="caption" size="lg">A</Text></Box>
      <Box bordered padding="3"><Text variant="caption" size="lg">B</Text></Box>
      <Box bordered padding="3"><Text variant="caption" size="lg">C</Text></Box>
    </Grid>
  ),
  Container: () => <Container size="sm"><Text variant="caption" size="lg" tone="muted">Content centered and limited in width.</Text></Container>,
  Divider: () => <Divider />,
  VisuallyHidden: () => (
    <Button variant="secondary">
      <Icon><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon>
      <VisuallyHidden>Mark as done</VisuallyHidden>
    </Button>
  ),
  Icon: () => <Icon label="Done" size="lg"><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon>,
  Spinner: () => <Spinner label="Saving" />,
  Skeleton: () => (
    <Stack direction="row" gap="3" align="center" aria-busy="true">
      <Skeleton shape="circle" />
      <Stack gap="2" style={{ flex: 1 }}><Skeleton width="60%" /><Skeleton width="35%" /></Stack>
    </Stack>
  ),
  Button: () => (
    <Stack direction="row" gap="3" wrap align="center" justify="center">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="secondary">
        <Icon><path d="M12 5v14M5 12h14" /></Icon>
        New
      </Button>
      <Button loading>Saving</Button>
    </Stack>
  ),
  Field: () => (
    <Field label="Email" description="We only use it for receipts.">
      <Input type="email" autoComplete="email" placeholder="you@example.com" />
    </Field>
  ),
  Input: () => <Field label="Name"><Input autoComplete="name" /></Field>,
  Textarea: () => <Field label="Message"><Textarea rows={3} /></Field>,
  Checkbox: () => (
    <Stack gap="1">
      <Checkbox label="Send me updates" defaultChecked />
      <Checkbox label="Select all" indeterminate />
    </Stack>
  ),
  Radio: () => (
    <RadioGroup legend="Plan" defaultValue="free">
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
    </RadioGroup>
  ),
  RadioGroup: () => (
    <RadioGroup legend="Plan" defaultValue="free">
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="team" label="Team" />
    </RadioGroup>
  ),
  Switch: () => <Switch label="Notifications" defaultChecked />,
  Select: () => <Field label="Country"><Select items={countries} placeholder="Choose one" /></Field>,
  Dialog: () => (
    <Dialog>
      <DialogTrigger variant="danger">Delete project</DialogTrigger>
      <DialogContent title="Delete project?" description="This permanently removes the project and its data.">
        <DialogClose>Cancel</DialogClose>
        <DialogClose variant="danger">Delete</DialogClose>
      </DialogContent>
    </Dialog>
  ),
  Tooltip: () => (
    <Tooltip content="Saved">
      <Button variant="secondary" aria-label="Saved"><Icon><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon></Button>
    </Tooltip>
  ),
  Tabs: () => (
    <Tabs
      aria-label="Account sections"
      items={[
        { value: "profile", label: "Profile", content: <Text>Your name and photo.</Text> },
        { value: "billing", label: "Billing", content: <Text>Plan and invoices.</Text> },
      ]}
    />
  ),
  ButtonLink: () => (
    <Stack direction="row" gap="3" wrap>
      <ButtonLink href="/docs/installation">Get started</ButtonLink>
      <ButtonLink href="/docs" variant="secondary">Docs</ButtonLink>
    </Stack>
  ),
  Card: () => (
    <Card padding="5">
      <Stack gap="1"><Heading as="h3" size={6}>Card title</Heading><Text tone="muted">Related content in one surface.</Text></Stack>
    </Card>
  ),
  Alert: () => (
    <Stack gap="3">
      <Alert tone="info" title="Heads up">Your trial ends in 3 days.</Alert>
      <Alert tone="danger" title="Could not save">Check your connection and try again.</Alert>
    </Stack>
  ),
  Avatar: () => (
    <Stack direction="row" gap="3" align="center">
      <Avatar name="Ada Lovelace" size="sm" /><Avatar name="Grace Hopper" /><Avatar name="Alan Turing" size="lg" />
    </Stack>
  ),
  Popover: () => (
    <Popover>
      <PopoverTrigger variant="secondary">Share</PopoverTrigger>
      <PopoverContent title="Share this page" description="Anyone with the link can read it.">
        <PopoverClose variant="secondary">Done</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
  Menu: () => (
    <Menu
      label="Account"
      variant="secondary"
      items={[
        { label: "Profile", href: "/docs" },
        { label: "Settings", onSelect: () => {} },
        { type: "separator" },
        { label: "Sign out", destructive: true, onSelect: () => {} },
      ]}
    />
  ),
  useToast: () => <ToastDemo />,
  Accordion: () => (
    <Accordion
      defaultValue={["a"]}
      items={[
        { value: "a", title: "Is it accessible?", content: <Text>Behavior comes from Base UI and every component is tested with axe.</Text> },
        { value: "b", title: "Is it themeable?", content: <Text>Light and dark come from semantic tokens.</Text> },
      ]}
    />
  ),
  Table: () => (
    <Table
      caption="Plans"
      columns={[{ key: "name", header: "Plan" }, { key: "seats", header: "Seats", align: "end" }, { key: "price", header: "Price", align: "end" }]}
      rows={[{ name: "Free", seats: "1", price: "$0" }, { name: "Team", seats: "10", price: "$12" }]}
    />
  ),
  Breadcrumb: () => <Breadcrumb aria-label="Breadcrumb example" items={[{ label: "Docs", href: "/docs" }, { label: "Components", href: "/docs/components" }, { label: "Button" }]} />,
  Pagination: () => <Pagination page={2} pageCount={9} hrefTemplate="/docs/components?page={page}" />,
  Progress: () => <Progress label="Uploading" value={40} />,
  Slider: () => <Slider label="Volume" defaultValue={40} />,
  CodeBlock: () => <CodeBlock language="tsx" label="Example" code={'import { Button } from "@/ui";\n\n<Button>Save</Button>'} />,
};

const demoAlias: Record<string, string> = {
  DialogTrigger: "Dialog", DialogContent: "Dialog", DialogClose: "Dialog",
  PopoverTrigger: "Popover", PopoverContent: "Popover", PopoverClose: "Popover",
};

/** Renders the live example for a component export name, or nothing when it has none (providers, hooks without UI). */
export function Demo({ name }: { name: string }) {
  const render = demos[demoAlias[name] ?? name];
  return render ? <>{render()}</> : null;
}
