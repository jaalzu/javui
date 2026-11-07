import type { CSSProperties } from "react";
import { Badge, Button, Field, Grid, InfoIcon, Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, MagnifyingGlassIcon, Select, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Input.examples.module.css";

const smallInfoIconStyle = { "--icon-size": "var(--size-icon-sm)" } as CSSProperties;
const compactInputGroupStyle = { "--input-px": "calc(var(--space-3) - var(--space-1) / 2 - var(--space-1) / 4)" } as CSSProperties;
const searchButtonStyle = { "--icon-size": "var(--size-icon-sm)" } as CSSProperties;
const departments = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
];

export const hero = defineHero(
  `<Field label="Name" description="Use your full name as it appears on your account.">
  <Input autoComplete="name" size="md" />
</Field>`,
  <Field label="Name" description="Use your full name as it appears on your account.">
    <Input autoComplete="name" size="md" />
  </Field>,
);

export const examples: Example[] = [
  ex(
    "Basic",
    `<Input placeholder="Some text" size="md" />`,
    <Input aria-label="Basic text" placeholder="Some text" size="md" />,
  ),
  ex(
    "Field",
    `<Field label="Reset Password" description="Password should be at least 6 characters long.">
  <Input type="password" placeholder="Enter your password" size="md" />
</Field>`,
    <Field label="Reset Password" description="Password should be at least 6 characters long.">
      <Input type="password" placeholder="Enter your password" size="md" />
    </Field>,
  ),
  ex(
    "Invalid",
    `<Field label="Email" error="Enter a valid email address.">
  <Input type="email" aria-invalid="true" size="md" />
</Field>`,
    <Field label="Email" error="Enter a valid email address.">
      <Input type="email" placeholder="Error" aria-invalid="true" data-force="focus" size="md" />
    </Field>,
  ),
  ex(
    "Disabled",
    `<Field label="Disabled field" description="This is currently disabled.">
  <Input placeholder="Disabled input" disabled size="md" />
</Field>`,
    <Field label="Disabled field" description="This is currently disabled.">
      <Input placeholder="Disabled input" disabled size="md" />
    </Field>,
  ),
  ex(
    "Required",
    `<Field label={<><span>Required Field</span> <span aria-hidden="true">*</span>}>
  <Input aria-label="Name" placeholder="This field is required" required size="md" />
</Field>`,
    <Field label={<><span>Required Field</span> <span style={{ color: "var(--color-danger-foreground)" }} aria-hidden="true">*</span></>}>
      <Input aria-label="Name" placeholder="This field is required" required size="md" />
    </Field>,
  ),
  ex(
    "File",
    `<Field label="Avatar"><Input type="file" accept="image/*" size="md" /></Field>`,
    <Field label="Avatar"><Input type="file" accept="image/*" size="md" /></Field>,
  ),
  ex(
    "Button group",
    `<Field label="Search">
  <Stack direction="row" gap="3" align="center" className="searchRow" style={{ gap: "calc(var(--space-3) - var(--space-1) / 4)" }}>
    <Input type="search" placeholder="Search projects" size="md" />
    <Button className={styles.searchButton} endIcon={<MagnifyingGlassIcon />} size="md" variant="primary" style={{ "--icon-size": "var(--size-icon-sm)" }}>Search</Button>
  </Stack>
</Field>`,
    <Field label="Search">
      <Stack direction="row" gap="3" align="center" className="searchRow" style={{ gap: "calc(var(--space-3) - var(--space-1) / 4)" }}>
        <Input type="search" placeholder="Search projects" size="md" />
        <Button className={styles.searchButton} endIcon={<MagnifyingGlassIcon />} size="md" variant="primary" style={searchButtonStyle}>Search</Button>
      </Stack>
    </Field>,
  ),
  ex(
    "Input group",
    `<Field label="Website URL">
  <InputGroup size="md" style={{ "--input-px": "calc(var(--space-3) - var(--space-1) / 2 - var(--space-1) / 4)" }}>
    <InputGroupInput placeholder="example.com" />
    <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
    <InputGroupAddon align="end"><span style={{ "--icon-size": "var(--size-icon-sm)" }}><InfoIcon /></span></InputGroupAddon>
  </InputGroup>
</Field>`,
    <Field label="Website URL">
      <InputGroup size="md" style={compactInputGroupStyle}>
        <InputGroupInput placeholder="example.com" />
        <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
        <InputGroupAddon align="end"><span style={smallInfoIconStyle}><InfoIcon /></span></InputGroupAddon>
      </InputGroup>
    </Field>,
  ),
  ex(
    "Badge",
    `<Field label={<Stack direction="row" gap="2" align="center" justify="between" style={{ width: "100%" }}>Subscription plan <Badge variant="inverted" size="sm">Pro</Badge></Stack>}>
  <Input placeholder="Team plan" size="md" />
</Field>`,
    <Field label={<Stack direction="row" gap="2" align="center" justify="between" style={{ width: "100%" }}>Subscription plan <Badge variant="inverted" size="sm">Pro</Badge></Stack>}>
      <Input placeholder="Team plan" size="md" />
    </Field>,
  ),
  ex(
    "Grid",
    `<Grid columns={{ base: 1, sm: 2 }} gap="3">
  <Field label="First name"><Input placeholder="Javier" autoComplete="given-name" size="md" /></Field>
  <Field label="Last name"><Input placeholder="Alzú" autoComplete="family-name" size="md" /></Field>
</Grid>`,
    <Grid columns={{ base: 1, sm: 2 }} gap="3">
      <Field label="First name"><Input placeholder="Javier" autoComplete="given-name" size="md" /></Field>
      <Field label="Last name"><Input placeholder="Alzú" autoComplete="family-name" size="md" /></Field>
    </Grid>,
  ),
  ex(
    "Form",
    `<form style={{ paddingBlock: "var(--space-6)" }}>
  <Stack gap="6">
    <Field label="Full name"><Input placeholder="María González" size="md" /></Field>
    <Field label="Work email" description="We'll only use this for account updates."><Input type="email" placeholder="maria@company.com" size="md" /></Field>
    <Grid columns={{ base: 1, sm: 2 }} gap="3">
      <Field label="Phone"><Input type="tel" placeholder="+54 11 5555 0199" size="md" /></Field>
      <Field label="Department"><Select items={departments} placeholder="Choose a team" size="md" /></Field>
    </Grid>
    <Field label="City"><Input placeholder="Buenos Aires" size="md" /></Field>
    <Stack direction="row" gap="2" justify="end">
      <Button type="button" variant="ghost" size="sm">Cancel</Button>
      <Button type="submit" size="sm">Save profile</Button>
    </Stack>
  </Stack>
</form>`,
    <form style={{ paddingBlock: "var(--space-6)" }}>
      <Stack gap="6">
        <Field label="Full name"><Input placeholder="María González" size="md" /></Field>
        <Field label="Work email" description="We'll only use this for account updates."><Input type="email" placeholder="maria@company.com" size="md" /></Field>
        <Grid columns={{ base: 1, sm: 2 }} gap="3">
          <Field label="Phone"><Input type="tel" placeholder="+54 11 5555 0199" size="md" /></Field>
          <Field label="Department"><Select items={departments} placeholder="Choose a team" size="md" /></Field>
        </Grid>
        <Field label="City"><Input placeholder="Buenos Aires" size="md" /></Field>
        <Stack direction="row" gap="2" justify="end">
          <Button type="button" variant="ghost" size="sm">Cancel</Button>
          <Button type="submit" size="sm">Save profile</Button>
        </Stack>
      </Stack>
    </form>,
  ),
];
