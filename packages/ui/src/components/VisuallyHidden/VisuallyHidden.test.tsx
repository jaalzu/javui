import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  it("keeps the content in the accessibility tree", () => {
    render(
      <button>
        <VisuallyHidden>Close</VisuallyHidden>
      </button>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("does not use display:none or aria-hidden", () => {
    render(<VisuallyHidden data-testid="v">Hidden</VisuallyHidden>);
    const el = screen.getByTestId("v");
    expect(el).not.toHaveAttribute("aria-hidden");
    expect(el.style.display).not.toBe("none");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <button>
        <VisuallyHidden>Close</VisuallyHidden>
      </button>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
