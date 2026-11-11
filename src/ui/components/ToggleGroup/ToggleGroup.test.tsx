import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

describe("ToggleGroup", () => {
  it("renders a named group of toggle items", () => {
    render(
      <ToggleGroup aria-label="View" defaultValue={["list"]}>
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="board">Board</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("group", { name: "View" })).toBeVisible();
    expect(screen.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Board" })).toHaveAttribute("aria-pressed", "false");
  });

  it("supports multiple selection and reports the selected values", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ToggleGroup aria-label="Formatting" multiple onValueChange={onValueChange}>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );
    await user.click(screen.getByRole("button", { name: "Bold" }));
    expect(onValueChange).toHaveBeenCalledWith(["bold"], expect.anything());
  });

  it("supports spacing, orientation and disabled state", () => {
    render(
      <ToggleGroup aria-label="View" orientation="vertical" spacing="none" disabled>
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="board">Board</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("button", { name: "List" })).toBeDisabled();
    expect(screen.getByRole("group")).toHaveAttribute("data-spacing", "none");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ToggleGroup aria-label="View">
        <ToggleGroupItem value="list" aria-label="List view" />
        <ToggleGroupItem value="board" aria-label="Board view" />
      </ToggleGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
