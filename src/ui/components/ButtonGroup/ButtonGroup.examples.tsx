import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Input,
  Select,
} from "@/ui";
import { ButtonGroupSplitExample } from "./ButtonGroupSplitExample";
import { defineHero, ex, type Example } from "@/docs/example";

const currencies = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "ars", label: "ARS" },
];

export const hero = defineHero(
  `<ButtonGroup aria-label="Deploy">
  <Button>Deploy</Button>
  <Menu label="Options" variant="primary" items={items} />
</ButtonGroup>`,
  <ButtonGroupSplitExample />,
);

export const examples: Example[] = [
  ex(
    "Related actions",
    `<ButtonGroup aria-label="Document actions">
  <Button variant="secondary">Save draft</Button>
  <Button variant="secondary">Preview</Button>
  <Button variant="secondary">Publish</Button>
</ButtonGroup>`,
    <ButtonGroup aria-label="Document actions">
      <Button variant="secondary">Save draft</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="secondary">Publish</Button>
    </ButtonGroup>,
    "Two to four actions that belong together.",
  ),
  ex(
    "With separator",
    `<ButtonGroup aria-label="Export">
  <Button>CSV</Button>
  <Button>JSON</Button>
  <ButtonGroupSeparator />
  <Button>More</Button>
</ButtonGroup>`,
    <ButtonGroup aria-label="Export">
      <Button>CSV</Button>
      <Button>JSON</Button>
      <ButtonGroupSeparator />
      <Button>More</Button>
    </ButtonGroup>,
    "Filled variants hide the default border, so add a separator.",
  ),
  ex(
    "With Input",
    `<ButtonGroup aria-label="Search">
  <Input aria-label="Search" placeholder="Search projects" />
  <Button>Search</Button>
</ButtonGroup>`,
    <div style={{ maxWidth: "24rem" }}>
      <ButtonGroup aria-label="Search">
        <Input aria-label="Search" placeholder="Search projects" />
        <Button>Search</Button>
      </ButtonGroup>
    </div>,
    "A field and its action share one edge.",
  ),
  ex(
    "With Select",
    `<ButtonGroup aria-label="Currency">
  <Select aria-label="Currency" placeholder="USD" items={currencies} />
  <Button>Apply</Button>
</ButtonGroup>`,
    <div style={{ maxWidth: "20rem" }}>
      <ButtonGroup aria-label="Currency">
        <Select aria-label="Currency" placeholder="USD" items={currencies} />
        <Button>Apply</Button>
      </ButtonGroup>
    </div>,
    "The select trigger follows the same edge and height.",
  ),
  ex(
    "With text",
    `<ButtonGroup aria-label="Domain">
  <ButtonGroupText>https://</ButtonGroupText>
  <Input aria-label="Domain" placeholder="example.com" />
</ButtonGroup>`,
    <div style={{ maxWidth: "24rem" }}>
      <ButtonGroup aria-label="Domain">
        <ButtonGroupText>https://</ButtonGroupText>
        <Input aria-label="Domain" placeholder="example.com" />
      </ButtonGroup>
    </div>,
    "A static addon such as a protocol or a currency code.",
  ),
  ex(
    "Vertical",
    `<ButtonGroup aria-label="Document actions" orientation="vertical">
  <Button variant="secondary">Save draft</Button>
  <Button variant="secondary">Preview</Button>
</ButtonGroup>`,
    <ButtonGroup aria-label="Document actions" orientation="vertical">
      <Button variant="secondary">Save draft</Button>
      <Button variant="secondary">Preview</Button>
    </ButtonGroup>,
  ),
  ex(
    "Nested",
    `<ButtonGroup aria-label="Formatting">
  <ButtonGroup aria-label="Text style">
    <Button variant="secondary">Bold</Button>
    <Button variant="secondary">Italic</Button>
  </ButtonGroup>
  <ButtonGroup aria-label="Alignment">
    <Button variant="secondary">Left</Button>
    <Button variant="secondary">Center</Button>
  </ButtonGroup>
</ButtonGroup>`,
    <ButtonGroup aria-label="Formatting">
      <ButtonGroup aria-label="Text style">
        <Button variant="secondary">Bold</Button>
        <Button variant="secondary">Italic</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Alignment">
        <Button variant="secondary">Left</Button>
        <Button variant="secondary">Center</Button>
      </ButtonGroup>
    </ButtonGroup>,
    "Nested groups keep a gap and never merge their edges.",
  ),
  ex(
    "Responsive",
    `<ButtonGroup aria-label="Document actions" stackBelow="md">
  <Button variant="secondary">Save draft</Button>
  <Button variant="secondary">Preview</Button>
  <Button variant="secondary">Publish</Button>
</ButtonGroup>`,
    <ButtonGroup aria-label="Document actions" stackBelow="md">
      <Button variant="secondary">Save draft</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="secondary">Publish</Button>
    </ButtonGroup>,
    "Below the breakpoint the group stacks into a column.",
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
    <ButtonGroupSplitExample />,
    "The Menu trigger adds its own caret icon.",
  ),
];
