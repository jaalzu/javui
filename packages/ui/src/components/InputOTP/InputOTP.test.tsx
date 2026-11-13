import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../Field";
import { InputOTP } from "./InputOTP";

describe("InputOTP", () => {
  it("names slots from Field and announces character positions", () => {
    render(<Field label="Verification code"><InputOTP /></Field>);
    expect(screen.getByRole("textbox", { name: "Verification code" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Character 2 of 6" })).toBeInTheDocument();
  });

  it("advances focus while typing and completes once", async () => {
    const user = userEvent.setup();
    const onValueComplete = vi.fn();
    render(<InputOTP aria-label="Code" onValueComplete={onValueComplete} />);
    const slots = screen.getAllByRole("textbox");
    await user.type(slots[0], "123456");
    expect(slots[5]).toHaveFocus();
    expect(onValueComplete).toHaveBeenCalledTimes(1);
  });

  it("fills every slot from a paste", async () => {
    const user = userEvent.setup();
    render(<InputOTP aria-label="Code" />);
    await user.click(screen.getAllByRole("textbox")[0]);
    await user.paste("654321");
    expect(screen.getAllByRole("textbox").every((slot, index) => (slot as HTMLInputElement).value === "654321"[index])).toBe(true);
  });

  it("inherits loading from Field", () => {
    render(<Field label="Code" loading><InputOTP /></Field>);
    expect(screen.getByRole("textbox", { name: "Code" })).toHaveAttribute("readonly");
    expect(screen.getByRole("group", { name: "Code" })).toHaveAttribute("aria-busy", "true");
  });

  it("receives disabled and invalid state from Field", () => {
    const { rerender } = render(<Field label="Code" disabled><InputOTP /></Field>);
    expect(screen.getByRole("textbox", { name: "Code" })).toHaveAttribute("data-disabled");
    rerender(<Field label="Code" error="Invalid code"><InputOTP /></Field>);
    expect(screen.getByRole("textbox", { name: "Code" })).toHaveAttribute("data-invalid");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Field label="Code"><InputOTP /></Field>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
