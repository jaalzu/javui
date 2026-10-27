"use client";

import type { ReactNode } from "react";
import {
  Accordion, Alert, AspectRatio, Avatar, Badge, Breadcrumb, Button, ButtonGroup, ButtonGroupSeparator, ButtonLink, Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, Checkbox, CodeBlockView, Container,
  Field, Grid, Heading, CheckIcon, Input, Kbd, Link, Menu, Modal, ModalClose, ModalContent, ModalTrigger,
  Pagination, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, PlusIcon, Radio, RadioGroup, Select, Skeleton,
  Slider, Spinner, Stack, Switch, Table, Tabs, Text, Textarea, Tooltip, VisuallyHidden, useToast,
  Label, EmptyState, Sidebar, Collapsible, ToggleGroup, ScrollArea, Sheet, Combobox, ChartLineIcon, GearIcon,
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
        <Badge>Default</Badge>
        <Badge variant="inverted">Inverted</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="brand">Brand</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
      </Stack>
      <Stack direction="row" gap="2" wrap>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
        <Badge shape="rounded">Rounded</Badge>
        <Badge variant="outline" shape="rounded">Outline</Badge>
      </Stack>
      <Stack direction="row" gap="2" wrap>
        <Badge variant="success" startIcon={<CheckIcon />}>Verified</Badge>
        <Badge variant="brand" loading>Saving</Badge>
        <Badge variant="outline" spinnerPosition="end" loading>Pending</Badge>
      </Stack>
    </Stack>
  ),
  Stack: () => (
    <Stack direction="row" gap="3" align="center">
      <Badge>One</Badge><Badge>Two</Badge><Badge>Three</Badge>
    </Stack>
  ),
  Grid: () => (
    <Grid columns="repeat(3, 1fr)" gap="3">
      <Card size="sm" variant="surface"><Text variant="caption" size="lg">A</Text></Card>
      <Card size="sm" variant="surface"><Text variant="caption" size="lg">B</Text></Card>
      <Card size="sm" variant="surface"><Text variant="caption" size="lg">C</Text></Card>
    </Grid>
  ),
  Container: () => <Container size="sm"><Text variant="caption" size="lg" tone="muted">Content centered and limited in width.</Text></Container>,
  AspectRatio: () => (
    <AspectRatio ratio={16 / 9}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Local fixture for the live demo. */}
      <img src="/window.svg" alt="A window" width="640" height="360" />
    </AspectRatio>
  ),
  VisuallyHidden: () => (
    <Text>
      4 results <VisuallyHidden>(updated just now)</VisuallyHidden>
    </Text>
  ),
  Icon: () => <CheckIcon label="Done" size="lg" />,
  Spinner: () => <Spinner label="Saving" />,
  Skeleton: () => (
    <Stack direction="row" gap="3" align="center" aria-busy="true">
      <Skeleton shape="circle" />
      <Stack gap="2" style={{ flex: 1 }}><Skeleton width="60%" /><Skeleton width="35%" /></Stack>
    </Stack>
  ),
  ButtonGroup: () => (
    <ButtonGroup aria-label="Export">
      <Button variant="secondary">CSV</Button>
      <Button variant="secondary">JSON</Button>
      <ButtonGroupSeparator />
      <Menu label="More" variant="secondary" items={[{ label: "Copy link", onSelect: () => {} }]} />
    </ButtonGroup>
  ),
  Button: () => (
    <Stack direction="row" gap="3" wrap align="center" justify="center">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="secondary" startIcon={<PlusIcon />}>
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
  Modal: () => (
    <Modal
      role="alertdialog"
      color="critical"
      description="This permanently removes the project and its data. This cannot be undone."
    >
      <ModalTrigger variant="danger">Delete project</ModalTrigger>
      <ModalContent
        title="Delete project?"
        actions={
          <>
            <ModalClose>Cancel</ModalClose>
            <ModalClose variant="danger">Delete</ModalClose>
          </>
        }
      >
        This permanently removes the project and its data.
      </ModalContent>
    </Modal>
  ),
  Tooltip: () => (
    <Tooltip content="Saved">
      <Button variant="secondary" aria-label="Saved" startIcon={<CheckIcon />} />
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
    <Card variant="surface">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Related content in one surface.</CardDescription>
        <CardAction><Badge>New</Badge></CardAction>
      </CardHeader>
      <CardContent><Text>Body content sits between the header and the footer.</Text></CardContent>
    </Card>
  ),
  Alert: () => (
    <Alert title="A new dashboard is available">Your reports moved to the new overview.</Alert>
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
        { value: "a", title: "What does this component do?", content: <Text>It groups related sections and opens the one you need.</Text> },
        { value: "b", title: "Which states are included?", content: <Text>Open, closed, focus and disabled come from Base UI.</Text> },
        { value: "c", title: "How do I customize it?", content: <Text>Pass your own items and use the semantic tokens.</Text> },
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
  Label: () => (
    <Stack gap="2">
      <Label htmlFor="demo-label-email">Email</Label>
      <Input id="demo-label-email" type="email" placeholder="you@example.com" />
    </Stack>
  ),
  EmptyState: () => (
    <EmptyState
      icon={<ChartLineIcon />}
      title="No reports yet"
      description="Connect a data source to see your first report."
      action={<Button size="sm">Connect source</Button>}
    />
  ),
  Sidebar: () => (
    <Sidebar
      label="Workspace"
      header={<Text weight="medium">Acme</Text>}
      items={[
        { label: "Overview", href: "/docs", startIcon: <ChartLineIcon />, active: true },
        { label: "Settings", href: "/docs/components", startIcon: <GearIcon /> },
      ]}
      footer={<Text variant="caption" size="lg" tone="muted">v1.0</Text>}
    />
  ),
  Collapsible: () => (
    <Collapsible title="Advanced settings" defaultOpen>
      <Text>Only the options most people need are visible.</Text>
    </Collapsible>
  ),
  ToggleGroup: () => (
    <ToggleGroup
      label="View"
      defaultValue="list"
      items={[
        { value: "list", label: "List" },
        { value: "board", label: "Board" },
      ]}
    />
  ),
  ScrollArea: () => (
    <ScrollArea label="Activity">
      <Stack gap="3">
        {Array.from({ length: 10 }, (_, index) => (
          <Text key={index}>Activity entry {index + 1}: a change was saved.</Text>
        ))}
      </Stack>
    </ScrollArea>
  ),
  Sheet: () => (
    <Sheet
      trigger="Filters"
      title="Filters"
      description="Narrow the results."
      footer={<Button size="sm">Apply</Button>}
    >
      <Text>Filter controls would go here.</Text>
    </Sheet>
  ),
  Combobox: () => (
    <Combobox
      label="Assignee"
      placeholder="Search people"
      items={[
        { value: "ada", label: "Ada Lovelace", description: "Engineering" },
        { value: "grace", label: "Grace Hopper", description: "Research" },
        { value: "alan", label: "Alan Turing", description: "Engineering" },
      ]}
    />
  ),
  CodeBlock: () => <CodeBlockView language="tsx" label="Example" code={'import { Button } from "@/ui";\n\n<Button>Save</Button>'} />,
};

const demoAlias: Record<string, string> = {
  ModalTrigger: "Modal", ModalContent: "Modal", ModalClose: "Modal",
  PopoverTrigger: "Popover", PopoverContent: "Popover", PopoverClose: "Popover",
  ButtonGroupSeparator: "ButtonGroup",
  Radio: "RadioGroup",
  CardHeader: "Card", CardTitle: "Card", CardDescription: "Card", CardAction: "Card", CardContent: "Card", CardFooter: "Card",
};

/** Renders the live example for a component export name, or nothing when it has none (providers, hooks without UI). */
export function Demo({ name }: { name: string }) {
  const render = demos[demoAlias[name] ?? name];
  return render ? <>{render()}</> : null;
}
