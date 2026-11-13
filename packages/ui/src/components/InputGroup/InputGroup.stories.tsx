import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Field } from "../Field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "./InputGroup";

const meta = {
  title: "Controls/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: null },
  decorators: [(Story) => <div style={{ maxWidth: "24rem" }}><Story /></div>],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field label="Website" description="Include the protocol and domain suffix.">
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
        <InputGroupAddon align="end"><InputGroupText>.com</InputGroupText></InputGroupAddon>
      </InputGroup>
    </Field>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Field label="API key">
      <InputGroup>
        <InputGroupInput type="password" />
        <InputGroupAddon align="end">
          <InputGroupButton aria-label="Show password">Show</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-3)" }}>
      <InputGroup size="sm"><InputGroupInput aria-label="Small" placeholder="Small" /></InputGroup>
      <InputGroup loading><InputGroupInput aria-label="Loading" /></InputGroup>
      <InputGroup><InputGroupInput aria-label="Read only" readOnly defaultValue="Read only" /></InputGroup>
    </div>
  ),
};

export const Dark: Story = { ...Default, globals: { theme: "dark" } };
export const Light: Story = { ...Default, globals: { theme: "light" } };
