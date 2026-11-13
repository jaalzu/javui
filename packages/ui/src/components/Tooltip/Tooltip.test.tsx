import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

describe("Tooltip", () => {
  // Base UI does not give the popup role="tooltip" or link it to the trigger: the trigger must carry its own name.
  it("keeps the trigger's own accessible name", () => {
    render(
      <Tooltip content="Bold">
        <Button aria-label="Bold" variant="ghost">B</Button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
    expect(screen.queryByText("Bold")).not.toBeInTheDocument();
  });

  it("shows on keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Bold text">
        <Button aria-label="Bold" variant="ghost">B</Button>
      </Tooltip>,
    );
    await user.tab();
    expect(await screen.findByText("Bold text")).toBeInTheDocument();
  });

  it("hides on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Bold text">
        <Button aria-label="Bold" variant="ghost">B</Button>
      </Tooltip>,
    );
    await user.tab();
    await screen.findByText("Bold text");
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Bold text")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Tooltip content="Bold">
        <Button aria-label="Bold" variant="ghost">B</Button>
      </Tooltip>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
