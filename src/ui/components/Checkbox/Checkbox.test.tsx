import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("is a checkbox named by its label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).not.toBeChecked();
  });

  it("toggles with a click on the label and with the Space key", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByText("Accept terms"));
    expect(screen.getByRole("checkbox")).toBeChecked();
    screen.getByRole("checkbox").focus();
    await user.keyboard(" ");
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
  });

  it("reports the mixed state when indeterminate", () => {
    render(<Checkbox label="Select all" indeterminate />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Checkbox label="One" defaultChecked />
        <Checkbox label="Two" disabled />
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
