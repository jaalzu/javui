import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "./Link";
import { Text } from "../Text";

const meta = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { href: "#", children: "Read the docs" },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InText: Story = {
  render: (args) => (
    <Text>
      Learn more in the <Link {...args} /> before you start.
    </Text>
  ),
};
export const Muted: Story = { args: { tone: "muted" } };
export const Inherit: Story = { args: { tone: "inherit" } };
export const Dark: Story = { globals: { theme: "dark" } };
export const Light: Story = { globals: { theme: "light" } };
