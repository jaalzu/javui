import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Tabs } from "./Tabs";

const items = [
  { value: "profile", label: "Profile", content: <p>Profile content</p> },
  { value: "billing", label: "Billing", content: <p>Billing content</p> },
  { value: "team", label: "Team", content: <p>Team content</p> },
];

describe("Tabs", () => {
  it("renders a named tab list with the first tab selected", () => {
    render(<Tabs aria-label="Account" items={items} />);
    expect(screen.getByRole("tablist", { name: "Account" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tab", { name: "Profile" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Profile content");
  });

  it("switches panel on click", async () => {
    const user = userEvent.setup();
    render(<Tabs aria-label="Account" items={items} />);
    await user.click(screen.getByRole("tab", { name: "Billing" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Billing content");
  });

  it("moves between tabs with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Tabs aria-label="Account" items={items} />);
    screen.getByRole("tab", { name: "Profile" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveFocus();
  });

  it("links each tab to its panel", () => {
    render(<Tabs aria-label="Account" items={items} />);
    const tab = screen.getByRole("tab", { name: "Profile" });
    expect(screen.getByRole("tabpanel")).toHaveAccessibleName("Profile");
    expect(tab).toHaveAttribute("aria-controls");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Tabs aria-label="Account" items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
