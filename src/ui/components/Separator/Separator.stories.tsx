import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Separator } from "./Separator";
import { Stack } from "../Stack";
import { Text } from "../Text";

const meta = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack gap="4">
      <Text>Before</Text>
      <Separator />
      <Text>After</Text>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        minHeight: "var(--space-16)",
      }}
    >
      <Text>Before</Text>
      <Separator orientation="vertical" />
      <Text>After</Text>
    </div>
  ),
};

export const NonDecorative: Story = {
  name: "Non-decorative",
  render: () => (
    <Stack gap="4">
      <Text>Billing</Text>
      <Separator decorative={false} />
      <Text>Shipping</Text>
    </Stack>
  ),
};

export const InList: Story = {
  name: "In a list",
  render: () => (
    <Stack as="ul" gap="3" style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: "20rem" }}>
      {["Profile", "Notifications", "Appearance"].map((item) => (
        <li key={item}>
          <Text>{item}</Text>
          <Separator />
        </li>
      ))}
    </Stack>
  ),
};

export const Dark: Story = { ...Default, globals: { theme: "dark" } };
export const Light: Story = { ...Default, globals: { theme: "light" } };
