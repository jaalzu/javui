import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Field } from "./Field";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { Switch } from "../Switch";
import { Stack } from "../Stack";
import {
  ValidationMatrix,
  validationControlProps,
  validationFieldProps,
} from "../../stories/ValidationMatrix";

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
export const Required: Story = { args: { required: true } };
export const ReadOnly: Story = { args: { readOnly: true } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const ControlLabel: Story = {
  name: "Control provides label",
  args: { label: undefined, required: true, children: <Switch label="Notifications" /> },
};

const selectItems = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
];

export const ValidationStates: Story = {
  name: "Validation states",
  render: () => (
    <ValidationMatrix
      rows={[
        {
          label: "Input",
          render: (state) => (
            <Field label="Email" {...validationFieldProps(state)}>
              <Input type="email" autoComplete="email" {...validationControlProps(state)} />
            </Field>
          ),
        },
        {
          label: "Textarea",
          render: (state) => (
            <Field label="Message" {...validationFieldProps(state)}>
              <Textarea rows={2} defaultValue="A short note." {...validationControlProps(state)} />
            </Field>
          ),
        },
        {
          label: "Select",
          render: (state) => (
            <Field label="Country" {...validationFieldProps(state)}>
              <Select items={selectItems} defaultValue="ar" />
            </Field>
          ),
        },
        {
          label: "Checkbox",
          render: (state) => (
            <Field {...validationFieldProps(state)}>
              <Checkbox
                label="Accept terms"
                defaultChecked
                {...validationControlProps(state)}
              />
            </Field>
          ),
        },
      ]}
    />
  ),
};

export const Form: Story = {
  render: () => (
    <Stack gap="4">
      <Field label="Name" required><Input autoComplete="name" /></Field>
      <Field label="Message" description="Up to 500 characters."><Textarea rows={4} /></Field>
    </Stack>
  ),
};

export const Dark: Story = {
  ...ValidationStates,
  globals: { theme: "dark" },
};
export const Light: Story = {
  ...ValidationStates,
  globals: { theme: "light" },
};
