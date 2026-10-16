import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Menu } from "./Menu";

function setup(onSelect = vi.fn()) {
  render(
    <Menu
      label="Account"
      items={[
        { label: "Profile", href: "/profile" },
        { label: "Rename", onSelect },
        { type: "separator" },
        { label: "Delete", onSelect: () => {}, destructive: true },
        { label: "Archive", disabled: true },
      ]}
    />,
  );
  return onSelect;
}

describe("Menu", () => {
  it("is a button that opens a menu of items", async () => {
    const user = userEvent.setup();
    setup();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Account" }));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(4);
  });

  it("renders href items as real links", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: "Account" }));
    const link = await screen.findByRole("menuitem", { name: "Profile" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/profile");
  });

  it("runs onSelect when an action is chosen with the mouse", async () => {
    const user = userEvent.setup();
    const onSelect = setup();
    await user.click(screen.getByRole("button", { name: "Account" }));
    await user.click(await screen.findByRole("menuitem", { name: "Rename" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("works with the keyboard", async () => {
    const user = userEvent.setup();
    const onSelect = setup();
    screen.getByRole("button", { name: "Account" }).focus();
    await user.keyboard("{Enter}");
    await screen.findByRole("menu");
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: "Account" }));
    await screen.findByRole("menu");
    // The popup is portaled outside any landmark in this isolated render; the page owns the landmarks.
    expect(await axe(document.body, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });
});
