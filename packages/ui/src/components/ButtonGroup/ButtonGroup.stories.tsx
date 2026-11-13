import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../Button";
import { Input } from "../Input";
import { Menu } from "../Menu";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "../Modal";
import { Select } from "../Select";
import { PulseIcon, PlusIcon, ArrowRightIcon } from "../../icons/icons.generated";
import { ButtonGroup } from "./ButtonGroup";
import { ButtonGroupSeparator } from "./ButtonGroupSeparator";

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
        <Button variant="outline">Save draft</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="outline">Publish</Button>
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

    // Outline buttons keep one visible border across the shared edge.
    expect(getComputedStyle(save).borderInlineEndWidth).toBe("1px");
    expect(getComputedStyle(preview).borderInlineStartWidth).toBe("0px");
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    children: (
      <>
        <Button variant="outline">Save draft</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="outline">Publish</Button>
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

export const WithInput: Story = {
  name: "With Input",
  args: {
    "aria-label": "Send message",
    children: (
      <>
        <Button size="sm" variant="outline" aria-label="Add" startIcon={<PlusIcon />} />
        <Input aria-label="Message" placeholder="Send message" endIcon={<PulseIcon />} />
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
        <Button variant="outline" aria-label="Next currency" startIcon={<ArrowRightIcon />} />
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
          <Button variant="outline">Bold</Button>
          <Button variant="outline">Italic</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Alignment">
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
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
        <Button pill variant="outline">Pill one</Button>
        <Button pill variant="outline">Pill two</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="XS actions">
        <Button size="xs" variant="outline">XS one</Button>
        <Button size="xs" variant="outline">XS two</Button>
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
        <Button variant="outline">Rename</Button>
        <Modal>
          <ModalTrigger variant="outline">Open settings</ModalTrigger>
          <ModalContent
            title="Settings"
            closeLabel="Close settings"
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

export const SplitButton: Story = {
  args: {
    "aria-label": "Deploy",
    children: (
      <>
        <Button variant="outline">Deploy</Button>
        <Menu
          label="Options"
          variant="outline"
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
