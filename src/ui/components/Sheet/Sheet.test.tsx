import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Sheet } from "./Sheet";

describe("Sheet", () => {
  it("opens from the trigger and shows the title", async () => {
    const user = userEvent.setup();
    render(<Sheet trigger="Filters" title="Filters" description="Narrow the results.">Body</Sheet>);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    expect(await screen.findByRole("dialog", { name: "Filters" })).toBeVisible();
    expect(screen.getByText("Narrow the results.")).toBeVisible();
  });

  it("closes from the close button", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Sheet trigger="Filters" title="Filters" defaultOpen onOpenChange={onOpenChange}>Body</Sheet>);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Sheet trigger="Filters" title="Filters" defaultOpen>Body</Sheet>);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    render(<Sheet trigger="Filters" title="Filters" defaultOpen>Body</Sheet>);
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
