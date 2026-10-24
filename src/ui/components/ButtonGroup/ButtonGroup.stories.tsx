import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button";
import { Menu } from "../Menu";
import { ButtonGroup } from "./ButtonGroup";
import { ButtonGroupSeparator } from "./ButtonGroupSeparator";

const meta = {
  title: "Atoms/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Document actions",
    children: (
      <>
        <Button variant="outline">Save draft</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="outline">Publish</Button>
      </>
    ),
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    children: (
      <>
        <Button variant="outline">Save draft</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="outline">Publish</Button>
      </>
    ),
  },
};

export const WithSeparator: Story = {
  args: {
    "aria-label": "Export",
    children: (
      <>
        <Button variant="secondary">CSV</Button>
        <Button variant="secondary">JSON</Button>
        <ButtonGroupSeparator />
        <Button variant="secondary">More</Button>
      </>
    ),
  },
};

export const SplitButton: Story = {
  args: {
    "aria-label": "Deploy",
    children: (
      <>
        <Button>Deploy</Button>
        <Menu
          label="Options"
          variant="primary"
          items={[
            { label: "Deploy to staging", onSelect: () => {} },
            { label: "Deploy to production", onSelect: () => {} },
          ]}
        />
      </>
    ),
  },
};

export const Dark: Story = { globals: { theme: "dark" } };

export const Light: Story = { globals: { theme: "light" } };
