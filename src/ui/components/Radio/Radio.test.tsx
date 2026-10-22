import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "./Radio";
import { Field } from "../Field";

function Example({ onValueChange }: { onValueChange?: (v: unknown) => void }) {
  return (
    <RadioGroup legend="Plan" defaultValue="free" onValueChange={onValueChange}>
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="team" label="Team" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("renders a labelled group with its options", () => {
    render(<Example />);
    expect(screen.getByRole("radiogroup", { name: "Plan" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "Free" })).toBeChecked();
  });

  it("selects an option on click", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Example onValueChange={onValueChange} />);
    await user.click(screen.getByText("Pro"));
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(onValueChange).toHaveBeenCalled();
  });

  it("moves selection with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Example />);
    screen.getByRole("radio", { name: "Free" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
  });

  it("exposes invalid, required and read-only state directly", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup legend="Plan" defaultValue="free" error="Choose a plan" required readOnly>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    const group = screen.getByRole("radiogroup", { name: /Plan/ });
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAttribute("aria-readonly", "true");
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(group).toHaveAttribute(
      "aria-describedby",
      screen.getByText("Choose a plan").closest("[id]")?.id,
    );
    await user.click(screen.getByText("Pro"));
    expect(screen.getByRole("radio", { name: "Free" })).toBeChecked();
  });

  it("is busy and not interactive while loading", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup legend="Plan" loading>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("aria-busy", "true");
    expect(group).toHaveAttribute("aria-readonly", "true");
    await user.click(screen.getByText("Pro"));
    expect(screen.getByRole("radio", { name: "Pro" })).not.toBeChecked();
  });

  it("inherits validation state from Field", () => {
    render(
      <Field label="Plan" error="Choose a plan" required loading>
        <RadioGroup legend="Plan">
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
        </RadioGroup>
      </Field>,
    );
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAttribute("aria-readonly", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
