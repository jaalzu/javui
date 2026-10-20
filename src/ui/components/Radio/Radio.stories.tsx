import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Radio, RadioGroup } from "./Radio";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";

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

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
