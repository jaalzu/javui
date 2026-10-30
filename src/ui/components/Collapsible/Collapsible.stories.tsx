import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./Collapsible";
import { Text } from "../Text";
import { Button } from "../Button";

const meta = { title: "Navigation/Collapsible", component: Collapsible, tags: ["autodocs"], decorators: [(Story) => <div style={{ maxWidth: "28rem" }}><Story /></div>] } satisfies Meta<typeof Collapsible>;
export default meta;
type Story = StoryObj<typeof meta>;
const content = <CollapsibleContent><Text>Only the options most people need are visible.</Text></CollapsibleContent>;
export const Default: Story = { args: { children: null }, render: () => <Collapsible><CollapsibleTrigger>Advanced settings</CollapsibleTrigger>{content}</Collapsible> };
export const Open: Story = { args: { children: null }, render: () => <Collapsible defaultOpen><CollapsibleTrigger>Advanced settings</CollapsibleTrigger>{content}</Collapsible> };
export const CustomTrigger: Story = { args: { children: null }, render: () => <Collapsible><CollapsibleTrigger render={<Button variant="secondary">Show more</Button>} /><CollapsibleContent><Text>Additional content.</Text></CollapsibleContent></Collapsible> };
export const Dark: Story = { ...Open, globals: { theme: "dark" } };
export const Light: Story = { ...Open, globals: { theme: "light" } };
