import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "./Radio";

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

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
