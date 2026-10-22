import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slider } from "./Slider";
import { StateMatrix } from "../../stories/StateMatrix";
import {
  ValidationMatrix,
  validationControlProps,
  validationFieldProps,
} from "../../stories/ValidationMatrix";
import styles from "./Slider.module.css";

const meta = {
  title: "Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: { label: "Volume", defaultValue: 40 },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Range: Story = {
  args: { label: "Price", defaultValue: [20, 80], thumbLabels: ["Minimum price", "Maximum price"] },
};
export const Disabled: Story = { args: { disabled: true } };
export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Thumb",
          render: (state) => (
            <div className={styles.root} data-disabled={state === "disabled" ? "" : undefined}>
              <div className={styles.control}>
                <div className={styles.track}>
                  <div className={styles.indicator} style={{ width: "50%" }} />
                  <div
                    className={styles.thumb}
                    data-force={state === "rest" || state === "disabled" ? undefined : state}
                  />
                </div>
              </div>
            </div>
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
      <Slider {...args} />
    </div>
  ),
};

export const ValidationStates: Story = {
  name: "Validation states",
  render: () => (
    <ValidationMatrix
      rows={[
        {
          label: "Slider",
          render: (state) => (
            <Slider
              label="Volume"
              defaultValue={40}
              {...validationFieldProps(state)}
              {...validationControlProps(state)}
            />
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...ValidationStates, globals: { theme: "dark" } };
export const Light: Story = { ...ValidationStates, globals: { theme: "light" } };
