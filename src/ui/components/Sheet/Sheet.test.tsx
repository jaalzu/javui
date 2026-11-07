import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Sheet } from "./Sheet";

describe("Sheet", () => {
  it("opens from the trigger and shows the title", async () => {
    const user = userEvent.setup();
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" description="Narrow the results.">Body</Sheet>);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    expect(await screen.findByRole("dialog", { name: "Filters" })).toBeVisible();
    expect(screen.getByText("Narrow the results.")).toBeVisible();
  });

  it("closes from the close button", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" defaultOpen onOpenChange={onOpenChange}>Body</Sheet>);
    await user.click(screen.getByRole("button", { name: "Close filters" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" defaultOpen>Body</Sheet>);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("dismisses when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" defaultOpen>Body</Sheet>);
    await user.click(document.querySelector('[aria-hidden="true"][data-open][role="presentation"]')!);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("traps focus and returns it to the trigger", async () => {
    const user = userEvent.setup();
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" defaultOpen>Body</Sheet>);
    const trigger = document.querySelector('button[aria-haspopup="dialog"]') as HTMLElement;
    const close = screen.getByRole("button", { name: "Close filters" });
    close.focus();
    await user.tab();
    expect(document.activeElement).not.toBe(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
  });

  it.each([
    ["top", "up", { clientX: 20, clientY: 100 }, { clientX: 20, clientY: 0 }],
    ["right", "right", { clientX: 100, clientY: 20 }, { clientX: 0, clientY: 20 }],
    ["bottom", "down", { clientX: 20, clientY: 0 }, { clientX: 20, clientY: 100 }],
    ["left", "left", { clientX: 0, clientY: 20 }, { clientX: 100, clientY: 20 }],
  ])("configures swipe dismissal from %s", async (side, direction) => {
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" side={side as "top" | "right" | "bottom" | "left"} defaultOpen>Body</Sheet>);
    expect(screen.getByRole("dialog", { name: "Filters" })).toHaveAttribute("data-swipe-direction", direction);
  });

  it("requires and wires the description when provided", () => {
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" description="Narrow the results." defaultOpen>Body</Sheet>);
    const dialog = screen.getByRole("dialog", { name: "Filters" });
    const description = screen.getByText("Narrow the results.");
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
  });

  it("can hide its built-in close button", () => {
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" showCloseButton={false} defaultOpen>Body</Sheet>);
    expect(screen.queryByRole("button", { name: "Close filters" })).not.toBeInTheDocument();
  });

  it("marks the body cross-axis for touch scroll arbitration", () => {
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" defaultOpen>Body</Sheet>);
    expect(within(screen.getByRole("dialog")).getByText("Body")).toHaveAttribute("data-base-ui-swipe-ignore", "y");
  });

  it("has no accessibility violations when open", async () => {
    render(<Sheet trigger="Filters" closeLabel="Close filters" title="Filters" defaultOpen>Body</Sheet>);
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
