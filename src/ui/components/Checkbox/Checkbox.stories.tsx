import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "./Checkbox";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";
import {
  ValidationMatrix,
  validationControlProps,
  validationFieldProps,
} from "../../stories/ValidationMatrix";

const meta = {
  title: "Controls/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Send me product updates" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { label: "Select all", indeterminate: true } };
export const Disabled: Story = { args: { disabled: true } };

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Unchecked",
          render: (state) => <Checkbox label="Option" {...forceProps(state)} />,
        },
        {
          label: "Checked",
          render: (state) => (
            <Checkbox label="Option" defaultChecked {...forceProps(state)} />
          ),
        },
        {
          label: "Indeterminate",
          render: (state) => (
            <Checkbox label="Option" indeterminate {...forceProps(state)} />
          ),
        },
      ]}
    />
  ),
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: () => (
    <div data-touch-debug>
      <Checkbox label="Send me product updates" />
    </div>
  ),
};

export const ValidationStates: Story = {
  name: "Validation states",
  render: () => (
    <ValidationMatrix
      rows={[
        {
          label: "Unchecked",
          render: (state) => (
            <Checkbox
              label="Option"
              {...validationFieldProps(state)}
              {...validationControlProps(state)}
            />
          ),
        },
        {
          label: "Checked",
          render: (state) => (
            <Checkbox
              label="Option"
              defaultChecked
              {...validationFieldProps(state)}
              {...validationControlProps(state)}
            />
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...ValidationStates, globals: { theme: "dark" } };
export const Light: Story = { ...ValidationStates, globals: { theme: "light" } };
