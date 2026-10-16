import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("is hidden from assistive technology", () => {
    render(<Skeleton data-testid="s" />);
    expect(screen.getByTestId("s")).toHaveAttribute("aria-hidden", "true");
  });

  it("applies width and height", () => {
    render(<Skeleton data-testid="s" width="12rem" height="2rem" />);
    const el = screen.getByTestId("s");
    expect(el.style.width).toBe("12rem");
    expect(el.style.height).toBe("2rem");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <section aria-busy="true" aria-label="Profile">
        <Skeleton />
      </section>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
