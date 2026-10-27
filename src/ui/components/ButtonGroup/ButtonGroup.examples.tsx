import { Button, ButtonGroup, ButtonGroupSeparator } from "@/ui";
import { ButtonGroupSplitExample } from "./ButtonGroupSplitExample";
import { ex, type Example } from "@/docs/example";

export const examples: Example[] = [
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
      <ButtonGroupSplitExample />,
      "A Menu trigger joins the group like a button, giving you a split-button pattern.",
    ),
];
