import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("limits width with the size token", () => {
    render(<Container data-testid="c" size="md">x</Container>);
    expect(screen.getByTestId("c").style.maxWidth).toBe("var(--container-md)");
  });

  it("renders main as a landmark", () => {
    render(<Container as="main">x</Container>);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Container as="main">x</Container>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
