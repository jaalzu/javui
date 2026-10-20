import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "./Switch";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";

const meta = {
  title: "Controls/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Notifications" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Off",
          render: (state) => <Switch label="Notifications" {...forceProps(state)} />,
        },
        {
          label: "On",
          render: (state) => (
            <Switch label="Notifications" defaultChecked {...forceProps(state)} />
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
      <Switch label="Notifications" defaultChecked />
    </div>
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
