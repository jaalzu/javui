import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip, TooltipProvider } from "./Tooltip";
import { Button } from "../Button";
import { Stack } from "../Stack";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <TooltipProvider><div style={{ padding: "var(--space-12)" }}><Story /></div></TooltipProvider>],
  args: { content: "Bold", children: <Button aria-label="Bold" variant="secondary">B</Button> },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sides: Story = {
  render: () => (
    <Stack direction="row" gap="6" justify="center">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
          <Button variant="secondary">{side}</Button>
        </Tooltip>
      ))}
    </Stack>
  ),
};

export const Dark: Story = { globals: { theme: "dark" } };
