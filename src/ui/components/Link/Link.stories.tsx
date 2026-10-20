import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "./Link";
import { Text } from "../Text";
import { StateMatrix } from "../../stories/StateMatrix";
import { ArrowRightIcon } from "../../icons/icons.generated";

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
export const WithIcon: Story = { args: { endIcon: <ArrowRightIcon /> } };
export const InText: Story = {
  render: (args) => (
    <Text>
      Learn more in the <Link {...args} /> before you start.
    </Text>
  ),
};
export const TouchTargets: Story = {
  name: "Touch targets",
  render: () => (
    <div data-touch-debug>
      <Link href="#" standalone>Read the docs</Link>
    </div>
  ),
};
export const Muted: Story = { args: { tone: "muted" } };
export const Inherit: Story = { args: { tone: "inherit" } };

const tones = ["default", "muted", "inherit"] as const;

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={tones.map((tone) => ({
        label: tone,
        render: (state) => (
          <Link
            href="#"
            tone={tone === "default" ? undefined : tone}
            data-force={state === "rest" || state === "disabled" ? undefined : state}
            data-disabled={state === "disabled" ? "" : undefined}
            aria-disabled={state === "disabled" || undefined}
          >
            Read the docs
          </Link>
        ),
      }))}
    />
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
