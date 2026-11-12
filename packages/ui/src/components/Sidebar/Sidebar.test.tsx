import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";
import { CheckIcon } from "../../icons/icons.generated";

describe("Sidebar", () => {
  it("renders a named navigation landmark with links and buttons", () => {
    render(
      <Sidebar
        label="Workspace"
        items={[
          { label: "Overview", href: "/", active: true },
          { label: "Settings", onSelect: () => {} },
        ]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Workspace" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Settings" })).toBeVisible();
  });

  it("renders a decorative start icon", () => {
    const { container } = render(
      <Sidebar label="Workspace" items={[{ label: "Overview", href: "/", startIcon: <CheckIcon /> }]} />,
    );
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("data-icon", "start");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("disables a button item", () => {
    const onSelect = vi.fn();
    render(<Sidebar label="Workspace" items={[{ label: "Locked", onSelect, disabled: true }]} />);
    expect(screen.getByRole("button", { name: "Locked" })).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Sidebar label="Workspace" items={[{ label: "Overview", href: "/", active: true }]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
