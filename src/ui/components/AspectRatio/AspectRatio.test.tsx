import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders a div by default", () => {
    render(<AspectRatio data-testid="a">x</AspectRatio>);
    expect(screen.getByTestId("a").tagName).toBe("DIV");
  });

  it("sets the ratio through a CSS variable", () => {
    render(<AspectRatio data-testid="a" ratio={16 / 9}>x</AspectRatio>);
    expect(screen.getByTestId("a").style.getPropertyValue("--aspect-ratio")).toBe(String(16 / 9));
  });

  it("defaults to a square ratio", () => {
    render(<AspectRatio data-testid="a">x</AspectRatio>);
    expect(screen.getByTestId("a").style.getPropertyValue("--aspect-ratio")).toBe("1");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Local fixture for the test. */}
        <img src="/window.svg" alt="A window" width="640" height="360" />
      </AspectRatio>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
