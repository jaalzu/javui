import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Table } from "./Table";
import { StateMatrix } from "../../stories/StateMatrix";
import styles from "./Table.module.css";

const meta = {
  title: "Data/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    caption: "Plans",
    columns: [
      { key: "name", header: "Plan" },
      { key: "seats", header: "Seats", align: "end" },
      { key: "price", header: "Price per month", align: "end" },
    ],
    rows: [
      { name: "Free", seats: "1", price: "$0" },
      { name: "Team", seats: "10", price: "$12" },
      { name: "Company", seats: "Unlimited", price: "$48" },
    ],
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const HiddenCaption: Story = { args: { hideCaption: true } };

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Scroll region",
          render: (state) => (
            <div
              className={styles.wrapper}
              role="region"
              aria-label={`Plans ${state}`}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Scrollable region needs keyboard focus.
              tabIndex={0}
              data-force={state === "focus" ? "focus" : undefined}
            >
              <table className={styles.table}>
                <caption className={styles.hidden}>Plans</caption>
                <tbody>
                  <tr>
                    <th scope="row" className={styles.cell}>Free</th>
                    <td className={styles.cell}>$0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...States, globals: { theme: "dark" } };
export const Light: Story = { ...States, globals: { theme: "light" } };
