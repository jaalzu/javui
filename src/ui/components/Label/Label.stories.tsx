import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./Label";
import { Input } from "../Input";

const meta = {
  title: "Controls/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Email", htmlFor: "label-story-email" },
  decorators: [
    (Story) => (
      <div style={{ display: "grid", gap: "var(--space-2)", maxWidth: "20rem" }}>
        <Story />
        <Input id="label-story-email" type="email" placeholder="you@example.com" />
      </div>
    ),
  ],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Dark: Story = { ...Default, globals: { theme: "dark" } };
export const Light: Story = { ...Default, globals: { theme: "light" } };
