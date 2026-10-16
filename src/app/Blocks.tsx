"use client";

import {
  Avatar, Badge, Button, ButtonLink, Card, Checkbox, Field, Heading, Icon, Input, Link, Menu, Progress, Select, Stack, Switch, Table, Tabs, Text,
} from "@/ui";
import styles from "./site.module.css";

const roles = [
  { value: "viewer", label: "Viewer" },
  { value: "editor", label: "Editor" },
  { value: "admin", label: "Admin" },
];

const tick = <Icon size="sm"><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon>;

function Person({ name, email }: { name: string; email: string }) {
  return (
    <span className={styles.person}>
      <Avatar name={name} size="sm" />
      <span className={styles.personText}>
        <span className={styles.personName}>{name}</span>
        <span className={styles.personMail}>{email}</span>
      </span>
    </span>
  );
}

function SignIn() {
  return (
    <Card as="section" variant="surface" padding="6" className={`${styles.block} ${styles.span4}`} aria-labelledby="blk-signin">
      <Stack gap="5">
        <Stack gap="1">
          <Heading as="h3" size="h3" id="blk-signin">Sign in</Heading>
          <Text tone="muted">Welcome back. Enter your details to continue.</Text>
        </Stack>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack gap="4">
            <Field label="Email"><Input type="email" autoComplete="email" placeholder="you@example.com" /></Field>
            <Field label="Password"><Input type="password" autoComplete="current-password" /></Field>
            <Checkbox label="Remember me" defaultChecked />
            <Button type="submit">Sign in</Button>
          </Stack>
        </form>
        <Text variant="caption" tone="muted">
          Forgot your password? <Link href="/docs">Reset it</Link>
        </Text>
      </Stack>
    </Card>
  );
}

function Team() {
  return (
    <Card as="section" variant="surface" padding="6" className={`${styles.block} ${styles.span8}`} aria-labelledby="blk-team">
      <Stack gap="5">
        <div className={styles.blockHead}>
          <Stack gap="1">
            <Heading as="h3" size="h3" id="blk-team">Team members</Heading>
            <Text tone="muted">People with access to this project.</Text>
          </Stack>
          <Button size="sm">Invite</Button>
        </div>
        <Table
          caption="Members and roles"
          hideCaption
          columns={[
            { key: "person", header: "Member" },
            { key: "role", header: "Role" },
            { key: "status", header: "Status" },
            { key: "actions", header: <span className={styles.srOnly}>Actions</span>, align: "end" },
          ]}
          rows={[
            { person: <Person name="Ada Lovelace" email="ada@example.com" />, role: "Admin", status: <Badge tone="success">Active</Badge>, actions: <Menu label="Actions for Ada" variant="ghost" size="sm" align="end" items={[{ label: "Edit role", onSelect: () => {} }, { type: "separator" }, { label: "Remove", destructive: true, onSelect: () => {} }]} /> },
            { person: <Person name="Grace Hopper" email="grace@example.com" />, role: "Editor", status: <Badge tone="success">Active</Badge>, actions: <Menu label="Actions for Grace" variant="ghost" size="sm" align="end" items={[{ label: "Edit role", onSelect: () => {} }, { type: "separator" }, { label: "Remove", destructive: true, onSelect: () => {} }]} /> },
            { person: <Person name="Alan Turing" email="alan@example.com" />, role: "Viewer", status: <Badge tone="warning">Invited</Badge>, actions: <Menu label="Actions for Alan" variant="ghost" size="sm" align="end" items={[{ label: "Resend invite", onSelect: () => {} }, { type: "separator" }, { label: "Remove", destructive: true, onSelect: () => {} }]} /> },
          ]}
        />
      </Stack>
    </Card>
  );
}

function Plan() {
  return (
    <Card as="section" variant="surface" padding="6" className={`${styles.block} ${styles.span4}`} aria-labelledby="blk-plan">
      <Stack gap="5">
        <div className={styles.blockHead}>
          <Heading as="h3" size="h3" id="blk-plan">Pro</Heading>
          <Badge tone="accent">Popular</Badge>
        </div>
        <p className={styles.price}><span className={styles.priceNumber}>$12</span> <span className={styles.priceUnit}>per month</span></p>
        <Text tone="muted">Everything you need to ship with a small team.</Text>
        <ul className={styles.features}>
          <li>{tick}Unlimited projects</li>
          <li>{tick}Ten team members</li>
          <li>{tick}Priority support</li>
        </ul>
        <ButtonLink href="/docs/installation">Choose Pro</ButtonLink>
      </Stack>
    </Card>
  );
}

function Notifications() {
  return (
    <Card as="section" variant="surface" padding="6" className={`${styles.block} ${styles.span4}`} aria-labelledby="blk-notify">
      <Stack gap="5">
        <Stack gap="1">
          <Heading as="h3" size="h3" id="blk-notify">Notification settings</Heading>
          <Text tone="muted">Choose what we send you.</Text>
        </Stack>
        <Stack gap="3">
          <Switch label="Email updates" defaultChecked />
          <Switch label="Push notifications" />
          <Switch label="Weekly digest" defaultChecked />
        </Stack>
        <Field label="Language"><Select items={[{ value: "en", label: "English" }, { value: "es", label: "Español" }]} defaultValue="en" /></Field>
        <Button variant="secondary">Save changes</Button>
      </Stack>
    </Card>
  );
}

function Project() {
  return (
    <Card as="section" variant="surface" padding="6" className={`${styles.block} ${styles.span4}`} aria-labelledby="blk-project">
      <Stack gap="5">
        <div className={styles.blockHead}>
          <Stack gap="1">
            <Heading as="h3" size="h3" id="blk-project">Website redesign</Heading>
            <Text tone="muted">Due on Friday</Text>
          </Stack>
          <Badge tone="info">In progress</Badge>
        </div>
        <Progress label="Progress" value={64} />
        <Tabs
          aria-label="Project sections"
          items={[
            { value: "overview", label: "Overview", content: <Text tone="muted">Design is approved. Development starts next week.</Text> },
            { value: "activity", label: "Activity", content: <Text tone="muted">Ada updated the homepage mockup, 2 hours ago.</Text> },
          ]}
        />
      </Stack>
    </Card>
  );
}

function Invite() {
  return (
    <Card as="section" variant="surface" padding="6" className={`${styles.block} ${styles.span4}`} aria-labelledby="blk-invite">
      <Stack gap="5">
        <Stack gap="1">
          <Heading as="h3" size="h3" id="blk-invite">Invite a teammate</Heading>
          <Text tone="muted">They will get an email with a link.</Text>
        </Stack>
        <Field label="Email" description="You can add more people later."><Input type="email" autoComplete="off" placeholder="name@company.com" /></Field>
        <Field label="Role"><Select items={roles} defaultValue="editor" /></Field>
        <Stack direction="row" gap="3">
          <Button>Send invite</Button>
          <Button variant="ghost">Cancel</Button>
        </Stack>
      </Stack>
    </Card>
  );
}

/** Complete, composed examples built only from library components. They are real and interactive. */
export function Blocks() {
  return (
    <div className={styles.blocks}>
      <SignIn />
      <Team />
      <Plan />
      <Notifications />
      <Project />
      <Invite />
    </div>
  );
}
