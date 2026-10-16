import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["body-lg", "body", "body-sm", "label", "caption", "code"] },
    tone: { control: "select", options: ["default", "muted", "subtle", "danger", "success"] },
    as: { control: "select", options: ["p", "span", "label", "strong", "em", "small", "div", "code"] },
  },
  args: { children: "The quick brown fox jumps over the lazy dog." },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-3)" }}>
      <Text variant="body-lg">body-lg: lead text for introductions.</Text>
      <Text variant="body">body: default paragraph text.</Text>
      <Text variant="body-sm">body-sm: supporting text.</Text>
      <Text variant="label">label: form label or control text</Text>
      <Text variant="caption">caption: helper text and metadata</Text>
      <Text variant="code">code: const x = 1;</Text>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <Text tone="default">default</Text>
      <Text tone="muted">muted</Text>
      <Text tone="subtle">subtle (non-essential info only)</Text>
      <Text tone="danger">danger</Text>
      <Text tone="success">success</Text>
    </div>
  ),
};

export const AsLabel: Story = {
  name: "As a form label",
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-1)", maxWidth: "20rem" }}>
      <Text as="label" htmlFor="story-email" variant="label">Email</Text>
      <input id="story-email" type="email" style={{ font: "inherit", padding: "var(--space-2)" }} />
    </div>
  ),
};

export const Dark: Story = {
  globals: { theme: "dark" },
  render: Tones.render,
};

export const Light: Story = {
  globals: { theme: "light" },
  render: Tones.render,
};
