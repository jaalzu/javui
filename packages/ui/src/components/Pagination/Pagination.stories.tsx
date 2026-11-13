import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pagination } from "./Pagination";
import { StateMatrix } from "../../stories/StateMatrix";
import styles from "./Pagination.module.css";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: { page: 2, pageCount: 9, hrefTemplate: "/blog?page={page}" },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FewPages: Story = { args: { page: 1, pageCount: 3 } };

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Page link",
          render: (state) => (
            <a
              href="/blog?page=2"
              className={styles.link}
              data-force={state === "rest" || state === "disabled" ? undefined : state}
              aria-disabled={state === "disabled" || undefined}
            >
              2
            </a>
          ),
        },
        {
          label: "Current page",
          render: (state) => (
            <a
              href="/blog?page=3"
              className={`${styles.link} ${styles.current}`}
              data-force={state === "rest" || state === "disabled" ? undefined : state}
              aria-current="page"
            >
              3
            </a>
          ),
        },
      ]}
    />
  ),
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: (args) => (
    <div data-touch-debug>
      <Pagination {...args} pageCount={3} />
    </div>
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
