import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Accordion } from "./Accordion";

const items = [
  { value: "a", title: "First", content: <p>Alpha</p> },
  { value: "b", title: "Second", content: <p>Beta</p> },
];

describe("Accordion", () => {
  it("renders titles as buttons inside headings, collapsed by default", () => {
    render(<Accordion items={items} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    expect(screen.getByRole("button", { name: "First" })).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a panel on click", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.click(screen.getByRole("button", { name: "First" }));
    expect(screen.getByRole("button", { name: "First" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Alpha")).toBeVisible();
  });

  it("closes the other panel when not `multiple`", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultValue={["a"]} />);
    await user.click(screen.getByRole("button", { name: "Second" }));
    expect(screen.getByRole("button", { name: "First" })).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps several panels open with `multiple`", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} multiple defaultValue={["a"]} />);
    await user.click(screen.getByRole("button", { name: "Second" }));
    expect(screen.getByRole("button", { name: "First" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Second" })).toHaveAttribute("aria-expanded", "true");
  });

  it("disables one item without disabling the rest", async () => {
    const user = userEvent.setup();
    render(<Accordion items={[items[0], { ...items[1], disabled: true }]} />);
    const disabled = screen.getByRole("button", { name: "Second" });
    expect(disabled).toBeDisabled();
    await user.click(disabled);
    expect(disabled).toHaveAttribute("aria-expanded", "false");
  });

  it("disables every item with `disabled`", () => {
    render(<Accordion items={items} disabled />);
    expect(screen.getByRole("button", { name: "First" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Second" })).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Accordion items={items} bordered defaultValue={["a"]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
