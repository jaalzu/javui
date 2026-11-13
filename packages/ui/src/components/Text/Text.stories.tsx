import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["body", "label", "caption", "emphasis", "code"] },
    size: { control: "select", options: ["lg", "base", "sm", "xs"] },
    weight: { control: "select", options: ["regular", "medium", "semibold"] },
    casing: { control: "select", options: ["normal", "uppercase"] },
    tone: {
      control: "select",
      options: ["default", "muted", "subtle", "brand", "success", "warning", "info", "danger"],
    },
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
      <Text size="lg">body lg: lead text for introductions.</Text>
      <Text>body base: default paragraph text.</Text>
      <Text size="sm">body sm: supporting text.</Text>
      <Text variant="label">label: form label or control text</Text>
      <Text variant="caption" size="lg">caption lg: helper text and metadata</Text>
      <Text variant="caption">caption base: 11px helper text</Text>
      <Text variant="caption" size="sm">caption sm: 10px helper text</Text>
      <Text variant="emphasis">emphasis: a serif lead sentence.</Text>
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
      <Text tone="brand">brand</Text>
      <Text tone="success">success</Text>
      <Text tone="warning">warning</Text>
      <Text tone="info">info</Text>
      <Text tone="danger">danger</Text>
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
