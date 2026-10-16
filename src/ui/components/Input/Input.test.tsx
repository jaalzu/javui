import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders a native input and accepts typing", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Name" />);
    const el = screen.getByRole("textbox", { name: "Name" });
    expect(el.tagName).toBe("INPUT");
    await user.type(el, "Ada");
    expect(el).toHaveValue("Ada");
  });

  it("passes native attributes through", () => {
    render(<Input aria-label="Email" type="email" autoComplete="email" placeholder="you@example.com" />);
    const el = screen.getByRole("textbox");
    expect(el).toHaveAttribute("type", "email");
    expect(el).toHaveAttribute("autocomplete", "email");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input aria-label="Name" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
