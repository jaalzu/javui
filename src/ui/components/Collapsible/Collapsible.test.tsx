import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./Collapsible";

describe("Collapsible", () => {
  it("is collapsed by default and opens on click", async () => {
    const user = userEvent.setup();
    render(<Collapsible><CollapsibleTrigger>Advanced</CollapsibleTrigger><CollapsibleContent>Hidden content</CollapsibleContent></Collapsible>);
    const trigger = screen.getByRole("button", { name: "Advanced" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Hidden content")).toBeVisible();
  });

  it("notifies about open changes", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Collapsible onOpenChange={onOpenChange}><CollapsibleTrigger>Advanced</CollapsibleTrigger><CollapsibleContent>Content</CollapsibleContent></Collapsible>);
    await user.click(screen.getByRole("button", { name: "Advanced" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<Collapsible disabled><CollapsibleTrigger>Advanced</CollapsibleTrigger><CollapsibleContent>Content</CollapsibleContent></Collapsible>);
    const trigger = screen.getByRole("button", { name: "Advanced" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Collapsible defaultOpen><CollapsibleTrigger>Advanced</CollapsibleTrigger><CollapsibleContent>Content</CollapsibleContent></Collapsible>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
