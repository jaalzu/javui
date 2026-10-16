import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "./Select";
import { Field } from "../Field";

const items = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
  { value: "py", label: "Paraguay", disabled: true },
];

const meta = {
  title: "Controls/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Country", placeholder: "Choose one", items },
  decorators: [(Story) => <div style={{ maxWidth: "20rem", minHeight: "16rem" }}><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDefaultValue: Story = { args: { defaultValue: "uy" } };
export const InsideField: Story = {
  args: { label: undefined },
  render: (args) => (
    <Field label="Country" description="Where you live.">
      <Select {...args} />
    </Field>
  ),
};
export const Disabled: Story = { args: { disabled: true } };
export const Dark: Story = { globals: { theme: "dark" } };
export const Light: Story = { globals: { theme: "light" } };
