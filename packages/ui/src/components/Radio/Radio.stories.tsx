import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Radio, RadioGroup } from "./Radio";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";
import {
  ValidationMatrix,
  validationControlProps,
  validationFieldProps,
} from "../../stories/ValidationMatrix";

const meta = {
  title: "Controls/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    legend: "Plan",
    defaultValue: "free",
    children: (
      <>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
        <Radio value="team" label="Team" />
      </>
    ),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: "horizontal" } };
export const Description: Story = {
  render: () => (
    <RadioGroup legend="Notification frequency" description="Choose how often we send updates." defaultValue="weekly">
      <Radio value="daily" label="Daily" description="A short summary every morning." />
      <Radio value="weekly" label="Weekly" description="A digest every Monday." />
    </RadioGroup>
  ),
};
export const ChoiceCards: Story = {
  render: () => (
    <RadioGroup legend="Plan" defaultValue="pro">
      <Radio value="free" label="Free" description="For personal projects." variant="card" />
      <Radio value="pro" label="Pro" description="For growing teams." variant="card" />
    </RadioGroup>
  ),
};
export const Disabled: Story = {
  render: () => (
    <RadioGroup legend="Plan" defaultValue="free" disabled>
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
    </RadioGroup>
  ),
};

const rows = [
  { label: "Checked", checked: true },
  { label: "Unchecked", checked: false },
];

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={rows.map((row) => ({
        label: row.label,
        render: (state) => (
          <RadioGroup
            legend="Option"
            defaultValue={row.checked || state === "selected" ? "a" : undefined}
          >
            <Radio value="a" label="Option" {...forceProps(state)} />
          </RadioGroup>
        ),
      }))}
    />
  ),
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: () => (
    <div data-touch-debug>
      <RadioGroup legend="Plan" defaultValue="free">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    </div>
  ),
};

export const ValidationStates: Story = {
  name: "Validation states",
  render: () => (
    <ValidationMatrix
      rows={[true, false].map((checked) => ({
        label: checked ? "Checked" : "Unchecked",
        render: (state) => (
          <RadioGroup
            legend="Option"
            defaultValue={checked ? "a" : undefined}
            {...validationFieldProps(state)}
          >
            <Radio
              value="a"
              label="Option"
              {...validationControlProps(state)}
            />
          </RadioGroup>
        ),
      }))}
    />
  ),
};

export const Dark: Story = { ...ValidationStates, globals: { theme: "dark" } };
export const Light: Story = { ...ValidationStates, globals: { theme: "light" } };
