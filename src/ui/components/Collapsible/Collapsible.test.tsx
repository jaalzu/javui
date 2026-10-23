import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Collapsible } from "./Collapsible";

describe("Collapsible", () => {
  it("is collapsed by default and opens on click", async () => {
    const user = userEvent.setup();
    render(<Collapsible title="Advanced">Hidden content</Collapsible>);
    const trigger = screen.getByRole("button", { name: "Advanced" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Hidden content")).toBeVisible();
  });

  it("notifies about open changes", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Collapsible title="Advanced" onOpenChange={onOpenChange}>Content</Collapsible>);
    await user.click(screen.getByRole("button", { name: "Advanced" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<Collapsible title="Advanced" disabled>Content</Collapsible>);
    const trigger = screen.getByRole("button", { name: "Advanced" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Collapsible title="Advanced" defaultOpen>Content</Collapsible>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
