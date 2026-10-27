import { Button, ButtonGroup, ButtonGroupSeparator } from "@/ui";
import { ButtonGroupSplitExample } from "./ButtonGroupSplitExample";
import { ex, type Example } from "@/docs/example";

export const examples: Example[] = [
    ex(
      "Related actions",
      `<ButtonGroup aria-label="Document actions">
  <Button variant="secondary">Save draft</Button>
  <Button variant="secondary">Preview</Button>
  <Button variant="secondary">Publish</Button>
</ButtonGroup>`,
      <ButtonGroup aria-label="Document actions"><Button variant="secondary">Save draft</Button><Button variant="secondary">Preview</Button><Button variant="secondary">Publish</Button></ButtonGroup>,
      "The group rounds only the outer corners.",
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
      "Use a separator when the shared edge needs a visible division.",
    ),
    ex(
      "Vertical",
      `<ButtonGroup aria-label="Document actions" orientation="vertical">
  <Button variant="secondary">Save draft</Button>
  <Button variant="secondary">Preview</Button>
</ButtonGroup>`,
      <ButtonGroup aria-label="Document actions" orientation="vertical"><Button variant="secondary">Save draft</Button><Button variant="secondary">Preview</Button></ButtonGroup>,
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
