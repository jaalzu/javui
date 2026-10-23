import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
  it("renders a label associated with a control", () => {
    render(<Label htmlFor="email">Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
  });

  it("spells out the required state", () => {
    render(<Label htmlFor="name" required>Name</Label>);
    expect(screen.getByText("Required")).toBeVisible();
  });

  it("marks the disabled state", () => {
    render(<Label htmlFor="name" disabled>Name</Label>);
    expect(screen.getByText("Name")).toHaveAttribute("data-disabled");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Label htmlFor="email">Email</Label>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
