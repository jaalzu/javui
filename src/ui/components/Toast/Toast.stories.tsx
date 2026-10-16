import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";
import { Stack } from "../Stack";

function Buttons() {
  const { show } = useToast();
  return (
    <Stack direction="row" gap="3" wrap>
      <Button variant="secondary" onClick={() => show({ title: "Copied to clipboard" })}>Neutral</Button>
      <Button variant="secondary" onClick={() => show({ title: "Saved", description: "Your changes are safe.", tone: "success" })}>Success</Button>
      <Button variant="secondary" onClick={() => show({ title: "Could not save", description: "Check your connection.", tone: "danger" })}>Danger</Button>
    </Stack>
  );
}

const meta = {
  title: "Feedback/Toast",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Buttons /> };
export const Dark: Story = { render: () => <Buttons />, globals: { theme: "dark" } };
export const Light: Story = { render: () => <Buttons />, globals: { theme: "light" } };
