import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./Textarea";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";
import { PencilSimpleIcon } from "../../icons/icons.generated";

const meta = {
  title: "Controls/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { "aria-label": "Message", placeholder: "Write a message" },
  decorators: [(Story) => <div style={{ maxWidth: "24rem" }}><Story /></div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tall: Story = { args: { rows: 6 } };
export const WithIcon: Story = { args: { startIcon: <PencilSimpleIcon /> } };

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Textarea",
          render: (state) => (
            <Textarea
              aria-label={`Message ${state}`}
              placeholder="Write a message"
              rows={2}
              {...forceProps(state)}
            />
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
