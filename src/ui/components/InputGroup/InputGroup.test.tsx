import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Field } from "../Field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "./InputGroup";

describe("InputGroup", () => {
  it("keeps the input first in the DOM and exposes the Field label", () => {
    render(<Field label="Amount"><InputGroup><InputGroupInput /><InputGroupAddon><InputGroupText>USD</InputGroupText></InputGroupAddon></InputGroup></Field>);
    expect(screen.getByRole("textbox", { name: "Amount" })).toBe(screen.getByRole("textbox").parentElement?.firstElementChild);
  });

  it("focuses the input when non-interactive addon content is pressed", async () => {
    const user = userEvent.setup();
    render(<InputGroup><InputGroupInput aria-label="Amount" /><InputGroupAddon><InputGroupText>USD</InputGroupText></InputGroupAddon></InputGroup>);
    await user.click(screen.getByText("USD"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("does not steal focus from the input when the addon is a button", async () => {
    const user = userEvent.setup();
    render(<InputGroup><InputGroupInput aria-label="Amount" /><InputGroupAddon align="end"><InputGroupButton aria-label="Clear">Clear</InputGroupButton></InputGroupAddon></InputGroup>);
    const input = screen.getByRole("textbox");
    input.focus();
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByRole("button", { name: "Clear" })).toHaveAccessibleName("Clear");
  });

  it("inherits loading from Field", () => {
    render(<Field label="Amount" loading><InputGroup><InputGroupInput /></InputGroup></Field>);
    expect(screen.getByRole("textbox", { name: "Amount" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("textbox", { name: "Amount" })).toHaveAttribute("readonly");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Field label="Amount"><InputGroup><InputGroupInput /><InputGroupAddon><InputGroupText>USD</InputGroupText></InputGroupAddon></InputGroup></Field>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
