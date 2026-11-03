import { Badge, Button, ButtonGroup, Field, Grid, Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Field label="Name" description="Use your full name as it appears on your account.">
  <Input autoComplete="name" size="lg" />
</Field>`,
  <Field label="Name" description="Use your full name as it appears on your account.">
    <Input autoComplete="name" size="lg" />
  </Field>,
);

export const examples: Example[] = [
  ex(
    "Sizes",
    `<Stack gap="2">\n  <Input aria-label="Small" size="sm" />\n  <Input aria-label="Medium" size="md" />\n  <Input aria-label="Large" size="lg" />\n  <Input aria-label="Extra large" size="xl" />\n</Stack>`,
    <div style={{ display: "grid", gap: "var(--space-2)", width: "20rem", maxWidth: "100%", marginInline: "auto" }}>
      <Input aria-label="Small" size="sm" />
      <Input aria-label="Medium" size="md" />
      <Input aria-label="Large" size="lg" />
      <Input aria-label="Extra large" size="xl" />
    </div>,
  ),
  ex(
    "Field",
    `<Field label="Email" description="We'll never share your email.">
  <Input type="email" autoComplete="email" />
</Field>`,
    <Field label="Email" description="We'll never share your email.">
      <Input type="email" autoComplete="email" />
    </Field>,
  ),
  ex(
    "Validation",
    `<Field label="Email" error="Enter a valid email address.">
  <Input type="email" aria-invalid="true" />
</Field>`,
    <Field label="Email" error="Enter a valid email address.">
      <Input type="email" aria-invalid="true" />
    </Field>,
  ),
  ex(
    "Loading states",
    `<Stack gap="2"><Input aria-label="Loading" loading /><Field label="Loading"><Input /></Field></Stack>`,
    <div style={{ display: "grid", gap: "var(--space-2)", width: "20rem", maxWidth: "100%", marginInline: "auto" }}>
      <Input aria-label="Loading" loading />
      <Field label="Loading"><Input /></Field>
    </div>,
  ),
  ex(
    "Disabled, read-only and required",
    `<Stack gap="2">
  <Field label="Disabled"><Input disabled /></Field>
  <Field label="Read-only"><Input readOnly defaultValue="Imported value" /></Field>
  <Field label="Required" required><Input /></Field>
</Stack>`,
    <Stack gap="2">
      <Field label="Disabled"><Input disabled /></Field>
      <Field label="Read-only"><Input readOnly defaultValue="Imported value" /></Field>
      <Field label="Required" required><Input /></Field>
    </Stack>,
  ),
  ex(
    "File",
    `<Field label="Avatar"><Input type="file" accept="image/*" /></Field>`,
    <Field label="Avatar"><Input type="file" accept="image/*" /></Field>,
  ),
  ex(
    "Inline search",
    `<Field label="Search" orientation="horizontal">
  <Input placeholder="Search projects" />
  <Button>Search</Button>
</Field>`,
    <div style={{ width: "20rem", maxWidth: "100%", marginInline: "auto" }}><ButtonGroup aria-label="Search"><Input aria-label="Search projects" placeholder="Search projects" /><Button>Search</Button></ButtonGroup></div>,
  ),
  ex(
    "Grid",
    `<Grid columns={{ base: 1, sm: 2 }} gap="3">
  <Field label="First name"><Input autoComplete="given-name" /></Field>
  <Field label="Last name"><Input autoComplete="family-name" /></Field>
</Grid>`,
    <Grid columns={{ base: 1, sm: 2 }} gap="3">
      <Field label="First name"><Input autoComplete="given-name" /></Field>
      <Field label="Last name"><Input autoComplete="family-name" /></Field>
    </Grid>,
  ),
  ex(
    "Badge",
    `<Field label={<Stack direction="row" gap="2" align="center">Plan <Badge>Recommended</Badge></Stack>}>
  <Input placeholder="Team plan" />
</Field>`,
    <Field label={<Stack direction="row" gap="2" align="center" justify="between">Plan <Badge>Recommended</Badge></Stack>}>
      <Input placeholder="Team plan" />
    </Field>,
  ),
  ex(
    "Input Group",
    `<Field label="Website URL">
  <InputGroup>
    <InputGroupInput placeholder="example.com" />
    <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
  </InputGroup>
</Field>`,
    <div style={{ width: "20rem", maxWidth: "100%", marginInline: "auto" }}><Field label="Website URL"><InputGroup><InputGroupInput placeholder="example.com" /><InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon></InputGroup></Field></div>,
  ),
  ex(
    "ButtonGroup",
    `<ButtonGroup aria-label="Search">
  <Input aria-label="Search" placeholder="Search projects" />
  <Button>Search</Button>
</ButtonGroup>`,
    <ButtonGroup aria-label="Search">
      <Input aria-label="Search" placeholder="Search projects" />
      <Button>Search</Button>
    </ButtonGroup>,
  ),
];
