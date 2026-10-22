import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Breadcrumb } from "./Breadcrumb";
import { StateMatrix } from "../../stories/StateMatrix";
import { ArrowRightIcon, FileTextIcon } from "../../icons/icons.generated";
import styles from "./Breadcrumb.module.css";

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "Docs", href: "/docs" },
      { label: "Components", href: "/docs/components" },
      { label: "Button" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIcons: Story = {
  args: {
    items: [
      { label: "Docs", href: "/docs", startIcon: <FileTextIcon /> },
      { label: "Components", href: "/docs/components", endIcon: <ArrowRightIcon /> },
      { label: "Button" },
    ],
  },
};

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Link",
          render: (state) => (
            <a
              href="/docs"
              className={styles.link}
              data-force={state === "rest" || state === "disabled" ? undefined : state}
              aria-disabled={state === "disabled" || undefined}
            >
              Docs
            </a>
          ),
        },
        {
          label: "Current",
          render: () => (
            <span className={styles.current} aria-current="page">
              Button
            </span>
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
