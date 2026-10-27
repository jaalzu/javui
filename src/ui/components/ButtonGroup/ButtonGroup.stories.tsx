import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../Button";
import { Input } from "../Input";
import { Menu } from "../Menu";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "../Modal";
import { Select } from "../Select";
import { ButtonGroup } from "./ButtonGroup";
import { ButtonGroupSeparator } from "./ButtonGroupSeparator";
import { ButtonGroupText } from "./ButtonGroupText";

const selectItems = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "ars", label: "ARS" },
];

const meta = {
  title: "Atoms/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Document actions",
    children: (
      <>
        <Button variant="secondary">Save draft</Button>
        <Button variant="secondary">Preview</Button>
        <Button variant="secondary">Publish</Button>
      </>
    ),
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [save, preview] = canvas.getAllByRole("button");

    // One 1px default divider between flat faces, drawn by the following face only.
    expect(getComputedStyle(save, "::before").boxShadow).toBe("none");
    expect(getComputedStyle(preview, "::before").boxShadow).not.toBe("none");
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    children: (
      <>
        <Button variant="secondary">Save draft</Button>
        <Button variant="secondary">Preview</Button>
        <Button variant="secondary">Publish</Button>
      </>
    ),
  },
};

export const WithSeparator: Story = {
  args: {
    "aria-label": "Export",
    children: (
      <>
        <Button>CSV</Button>
        <Button>JSON</Button>
        <ButtonGroupSeparator />
        <Button>More</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole("separator");
    expect(getComputedStyle(separator).alignSelf).toBe("stretch");
    expect(getComputedStyle(separator).width).toBe("1px");
  },
};

export const SeparatorWithFlatButtons: Story = {
  name: "Separator with secondary",
  args: {
    "aria-label": "Export",
    children: (
      <>
        <Button variant="secondary">CSV</Button>
        <ButtonGroupSeparator />
        <Button variant="secondary">JSON</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [, json] = canvas.getAllByRole("button");
    const separator = canvas.getByRole("separator");

    expect(getComputedStyle(separator).width).toBe("1px");
    expect(getComputedStyle(separator).alignSelf).toBe("stretch");
    // The separator draws the edge; the next flat button must not add its own divider.
    expect(getComputedStyle(json, "::before").boxShadow).toBe("none");
  },
};

export const WithInput: Story = {
  name: "With Input",
  args: {
    "aria-label": "Search",
    children: (
      <>
        <Input aria-label="Search" placeholder="Search projects" />
        <Button>Search</Button>
      </>
    ),
  },
};

export const WithSelect: Story = {
  name: "With Select",
  args: {
    "aria-label": "Currency",
    children: (
      <>
        <Select aria-label="Currency" placeholder="USD" items={selectItems} />
        <Button>Apply</Button>
      </>
    ),
  },
};

export const WithText: Story = {
  name: "With text",
  args: {
    "aria-label": "Domain",
    children: (
      <>
        <ButtonGroupText>https://</ButtonGroupText>
        <Input aria-label="Domain" placeholder="example.com" />
      </>
    ),
  },
};

export const Nested: Story = {
  args: {
    "aria-label": "Formatting",
    children: (
      <>
        <ButtonGroup aria-label="Text style">
          <Button variant="secondary">Bold</Button>
          <Button variant="secondary">Italic</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Alignment">
          <Button variant="secondary">Left</Button>
          <Button variant="secondary">Center</Button>
        </ButtonGroup>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const outer = canvas.getByRole("group", { name: "Formatting" });
    expect(getComputedStyle(outer).gap).toBe("8px");
  },
};

export const PillAndXs: Story = {
  name: "Pill and xs ends",
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      <ButtonGroup aria-label="Pill actions">
        <Button pill variant="secondary">Pill one</Button>
        <Button pill variant="secondary">Pill two</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="XS actions">
        <Button size="xs" variant="secondary">XS one</Button>
        <Button size="xs" variant="secondary">XS two</Button>
      </ButtonGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pillGroup = canvas.getByRole("group", { name: "Pill actions" });
    const pillOne = within(pillGroup).getByRole("button", { name: "Pill one" });
    const pillTwo = within(pillGroup).getByRole("button", { name: "Pill two" });
    expect(getComputedStyle(pillOne).borderStartStartRadius).toBe("9999px");
    expect(getComputedStyle(pillOne).borderStartEndRadius).toBe("0px");
    expect(getComputedStyle(pillTwo).borderEndEndRadius).toBe("9999px");

    const xsGroup = canvas.getByRole("group", { name: "XS actions" });
    const xsOne = within(xsGroup).getByRole("button", { name: "XS one" });
    const xsTwo = within(xsGroup).getByRole("button", { name: "XS two" });
    expect(getComputedStyle(xsOne).borderStartStartRadius).toBe("8px");
    expect(getComputedStyle(xsOne).borderStartEndRadius).toBe("0px");
    expect(getComputedStyle(xsTwo).borderEndEndRadius).toBe("8px");
  },
};

export const ModalTriggerInGroup: Story = {
  name: "Modal trigger",
  args: {
    "aria-label": "Actions",
    children: (
      <>
        <Button variant="secondary">Rename</Button>
        <Modal>
          <ModalTrigger variant="secondary">Open settings</ModalTrigger>
          <ModalContent
            title="Settings"
            actions={<ModalClose>Close</ModalClose>}
          >
            The trigger keeps its outer rounding while the modal is open.
          </ModalContent>
        </Modal>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Open settings" });
    const before = getComputedStyle(trigger).borderStartEndRadius;

    await userEvent.click(trigger);

    expect(getComputedStyle(trigger).borderStartEndRadius).toBe(before);
    expect(getComputedStyle(trigger).borderStartEndRadius).not.toBe("0px");
  },
};

export const Responsive: Story = {
  name: "Responsive",
  parameters: {
    viewport: {
      viewports: {
        mobile375: {
          name: "Mobile 375",
          styles: { width: "375px", height: "812px" },
          type: "mobile",
        },
      },
      defaultViewport: "mobile375",
    },
  },
  args: {
    "aria-label": "Responsive actions",
    stackBelow: "md",
    children: (
      <>
        <Button variant="secondary">Save draft</Button>
        <Button variant="secondary">Preview</Button>
        <Button variant="secondary">Publish</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group", { name: "Responsive actions" });
    expect(getComputedStyle(group).flexDirection).toBe("column");
  },
};

export const SplitButton: Story = {
  args: {
    "aria-label": "Deploy",
    children: (
      <>
        <Button>Deploy</Button>
        <Menu
          label="Options"
          variant="primary"
          items={[
            { label: "Deploy to staging", onSelect: () => {} },
            { label: "Deploy to production", onSelect: () => {} },
          ]}
        />
      </>
    ),
  },
};

export const Dark: Story = { globals: { theme: "dark" } };

export const Light: Story = { globals: { theme: "light" } };
