import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";
import { MagnifyingGlassIcon, XIcon } from "../../icons/icons.generated";

const meta = {
  title: "Controls/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { "aria-label": "Name", placeholder: "Your name" },
  decorators: [(Story) => <div style={{ maxWidth: "20rem" }}><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const Disabled: Story = { args: { disabled: true } };
export const WithIcons: Story = {
  args: {
    "aria-label": "Search",
    placeholder: "Search",
    startIcon: <MagnifyingGlassIcon />,
    endIcon: <XIcon />,
  },
};

const sizes = ["sm", "md", "lg"] as const;

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={sizes.map((size) => ({
        label: size,
        render: (state) => (
          <Input
            aria-label={`Name ${state}`}
            placeholder="Your name"
            size={size}
            {...forceProps(state)}
          />
        ),
      }))}
    />
  ),
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: () => (
    <div data-touch-debug>
      <Input aria-label="Name" placeholder="Your name" size="sm" />
    </div>
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
