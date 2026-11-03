import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Field } from "../Field";
import { InputOTP } from "./InputOTP";

const meta = {
  title: "Controls/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { "aria-label": "Verification code" },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Groups: Story = { args: { groups: [3, 3] } };
export const Masked: Story = { args: { mask: true } };
export const InField: Story = { render: () => <Field label="Verification code" description="Enter the 6 digits we sent you."><InputOTP /></Field> };
export const Invalid: Story = { render: () => <Field label="Verification code" error="That code has expired."><InputOTP aria-invalid="true" /></Field> };
export const Dark: Story = { ...InField, globals: { theme: "dark" } };
export const Light: Story = { ...InField, globals: { theme: "light" } };
