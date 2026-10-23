import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Collapsible } from "./Collapsible";
import { Text } from "../Text";
import { GearIcon } from "../../icons/icons.generated";

const meta = {
  title: "Navigation/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  args: {
    title: "Advanced settings",
    children: <Text>Only the options most people need are visible.</Text>,
  },
  decorators: [(Story) => <div style={{ maxWidth: "28rem" }}><Story /></div>],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
export const WithIcon: Story = { args: { startIcon: <GearIcon /> } };
export const Disabled: Story = { args: { disabled: true } };
export const Dark: Story = { ...Open, globals: { theme: "dark" } };
export const Light: Story = { ...Open, globals: { theme: "light" } };
