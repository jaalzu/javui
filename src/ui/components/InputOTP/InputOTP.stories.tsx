import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
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

const labelled = (args: ComponentProps<typeof InputOTP>) => <Field label="Verification code"><InputOTP {...args} /></Field>;

export const Default: Story = { render: (args) => labelled(args) };
export const FourDigits: Story = { args: { length: 4 }, render: (args) => labelled(args) };
export const SixDigits: Story = { args: { length: 6 }, render: (args) => labelled(args) };
export const Groups: Story = { args: { groups: [3, 3] }, render: (args) => labelled(args) };
export const TextAndNumbers: Story = { args: { length: 6, validationType: "alphanumeric" }, render: (args) => labelled(args) };
export const InField: Story = { render: () => <Field label="Verification code" description="Enter the 6 digits we sent you."><InputOTP /></Field> };
export const Invalid: Story = { render: () => <Field label="Verification code" error="That code has expired."><InputOTP aria-invalid="true" /></Field> };
export const Dark: Story = { ...InField, globals: { theme: "dark" } };
export const Light: Story = { ...InField, globals: { theme: "light" } };
