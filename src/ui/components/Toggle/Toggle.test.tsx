import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("toggles pressed state", async () => {
    const user = userEvent.setup();
    render(<Toggle>Bold</Toggle>);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("supports icon-only controls and button sizes", () => {
    render(<Toggle size="lg" aria-label="Bold" startIcon={<span>+</span>} />);
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("data-icon", "only");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Toggle>Bold</Toggle>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
