import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a native hr with the separator role", () => {
    render(<Divider />);
    const el = screen.getByRole("separator");
    expect(el.tagName).toBe("HR");
    expect(el).not.toHaveAttribute("aria-orientation");
  });

  it("sets aria-orientation when vertical", () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<main><Divider /></main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
