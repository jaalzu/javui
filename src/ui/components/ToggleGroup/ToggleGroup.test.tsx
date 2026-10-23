import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { ToggleGroup } from "./ToggleGroup";

const items = [
  { value: "list", label: "List" },
  { value: "board", label: "Board" },
];

describe("ToggleGroup", () => {
  it("renders a named group of toggles with the default selected", () => {
    render(<ToggleGroup label="View" items={items} defaultValue="list" />);
    expect(screen.getByRole("group", { name: "View" })).toBeVisible();
    expect(screen.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Board" })).toHaveAttribute("aria-pressed", "false");
  });

  it("changes selection and calls onValueChange", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<ToggleGroup label="View" items={items} defaultValue="list" onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Board" }));
    expect(onValueChange).toHaveBeenCalledWith("board");
    expect(screen.getByRole("button", { name: "Board" })).toHaveAttribute("aria-pressed", "true");
  });

  it("disables the group", () => {
    render(<ToggleGroup label="View" items={items} disabled />);
    expect(screen.getByRole("button", { name: "List" })).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ToggleGroup label="View" items={items} defaultValue="list" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
