import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { ArrowRightIcon, CheckIcon } from "../../icons/icons.generated";

describe("Button loading", () => {
  it("shows busy state, keeps the label and ignores clicks", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button loading onClick={onClick}>Saving</Button>);
    const el = screen.getByRole("button", { name: "Saving" });
    expect(el).toHaveAttribute("aria-busy", "true");
    await user.click(el);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("Button", () => {
  it("renders a native button that does not submit by default", () => {
    render(<Button>Save</Button>);
    const el = screen.getByRole("button", { name: "Save" });
    expect(el.tagName).toBe("BUTTON");
    expect(el).toHaveAttribute("type", "button");
  });

  it("can be a submit button when asked", () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("calls onClick with mouse and keyboard", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole("button"));
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders start and end icon slots and marks them decorative", () => {
    const { rerender } = render(
      <Button startIcon={<CheckIcon />}>Done</Button>,
    );
    const button = screen.getByRole("button", { name: "Done" });
    expect(button).toHaveAttribute("data-icon", "start");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");

    rerender(
      <Button startIcon={<CheckIcon />} endIcon={<ArrowRightIcon />}>
        Next
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("data-icon", "both");
  });

  it("marks an icon-only button as only and counts loading as an icon", () => {
    const { rerender } = render(
      <Button aria-label="Done" startIcon={<CheckIcon />} />,
    );
    expect(screen.getByRole("button", { name: "Done" })).toHaveAttribute("data-icon", "only");

    rerender(<Button loading>Saving</Button>);
    const saving = screen.getByRole("button", { name: "Saving" });
    expect(saving).toHaveAttribute("data-icon", "start");
    expect(screen.getByText("Saving")).toBeVisible();
    expect(saving.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger" disabled>Delete</Button>
        <Button aria-label="Done" startIcon={<CheckIcon />} />
        <Button variant="secondary" startIcon={<CheckIcon />} endIcon={<ArrowRightIcon />}>Next</Button>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
