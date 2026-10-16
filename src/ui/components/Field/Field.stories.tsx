import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Field } from "./Field";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Stack } from "../Stack";

const meta = {
  title: "Controls/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Email", children: <Input type="email" autoComplete="email" /> },
  decorators: [(Story) => <div style={{ maxWidth: "24rem" }}><Story /></div>],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: "We only use it to send receipts." } };
export const WithError: Story = { args: { error: "Enter a valid email address" } };

export const Form: Story = {
  render: () => (
    <Stack gap="4">
      <Field label="Name"><Input autoComplete="name" /></Field>
      <Field label="Message" description="Up to 500 characters."><Textarea rows={4} /></Field>
    </Stack>
  ),
};

export const Dark: Story = { args: { error: "Enter a valid email address" }, globals: { theme: "dark" } };
export const Light: Story = { args: { error: "Enter a valid email address" }, globals: { theme: "light" } };
