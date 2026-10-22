import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./Textarea";
import { Field } from "../Field";
import { StateMatrix, forceProps } from "../../stories/StateMatrix";
import {
  ValidationMatrix,
  validationControlProps,
  validationFieldProps,
} from "../../stories/ValidationMatrix";
import { PencilSimpleIcon } from "../../icons/icons.generated";

const meta = {
  title: "Controls/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { "aria-label": "Message", placeholder: "Write a message" },
  decorators: [(Story) => <div style={{ maxWidth: "24rem" }}><Story /></div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tall: Story = { args: { rows: 6 } };
export const WithIcon: Story = { args: { startIcon: <PencilSimpleIcon /> } };

export const States: Story = {
  render: () => (
    <StateMatrix
      rows={[
        {
          label: "Textarea",
          render: (state) => (
            <Textarea
              aria-label={`Message ${state}`}
              placeholder="Write a message"
              rows={2}
              {...forceProps(state)}
            />
          ),
        },
      ]}
    />
  ),
};

export const ValidationStates: Story = {
  name: "Validation states",
  render: () => (
    <ValidationMatrix
      rows={[
        {
          label: "Textarea",
          render: (state) => (
            <Field label="Message" {...validationFieldProps(state)}>
              <Textarea
                rows={2}
                placeholder="Write a message"
                {...validationControlProps(state)}
              />
            </Field>
          ),
        },
      ]}
    />
  ),
};

export const Dark: Story = { ...ValidationStates, globals: { theme: "dark" } };
export const Light: Story = { ...ValidationStates, globals: { theme: "light" } };
