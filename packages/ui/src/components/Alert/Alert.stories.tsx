import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert } from "./Alert";
import { Stack } from "../Stack";
import { ArrowRightIcon, InfoIcon } from "../../icons/icons.generated";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Heads up", children: "Your changes are saved locally until you sync." },
  decorators: [(Story) => <div style={{ maxWidth: "32rem" }}><Story /></div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const WithIcons: Story = {
  args: { startIcon: <InfoIcon />, endIcon: <ArrowRightIcon /> },
};
export const Tones: Story = {
  render: () => (
    <Stack gap="3">
      <Alert title="Note">A general message on the page.</Alert>
      <Alert tone="info" title="Info">Relevant information about the page.</Alert>
      <Alert tone="success" title="Saved">Your changes were saved.</Alert>
      <Alert tone="warning" title="Careful">This action affects other people.</Alert>
      <Alert tone="error" title="Payment failed">Check your card details and try again.</Alert>
    </Stack>
  ),
};
export const Dark: Story = { ...Tones, globals: { theme: "dark" } };
export const Light: Story = { ...Tones, globals: { theme: "light" } };
