import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Box } from "./Box";

describe("Box", () => {
  it("renders a div by default", () => {
    render(<Box data-testid="b">x</Box>);
    expect(screen.getByTestId("b").tagName).toBe("DIV");
  });

  it("renders the semantic element from `as`", () => {
    render(<Box as="nav" aria-label="Main">x</Box>);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("applies spacing tokens as CSS variables", () => {
    render(<Box data-testid="b" padding="4" paddingX="6" radius="lg">x</Box>);
    const el = screen.getByTestId("b");
    expect(el.style.padding).toBe("var(--space-4)");
    expect(el.style.paddingInline).toBe("var(--space-6)");
    expect(el.style.borderRadius).toBe("var(--radius-lg)");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Box as="section" aria-label="Info" surface bordered>x</Box>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
