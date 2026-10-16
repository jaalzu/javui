import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("is one image named after the person", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeInTheDocument();
  });

  it("shows initials as the fallback, hidden from assistive technology", () => {
    render(<Avatar name="Ada Lovelace" />);
    const initials = screen.getByText("AL");
    expect(initials).toHaveAttribute("aria-hidden", "true");
  });

  it("uses one letter for a single name", () => {
    render(<Avatar name="Prince" />);
    expect(screen.getByText("P")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<div><Avatar name="Ada Lovelace" /><Avatar name="Grace Hopper" src="/none.png" size="lg" /></div>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
