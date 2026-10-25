import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("limits width with the size token", () => {
    render(<Container data-testid="c" size="md">x</Container>);
    expect(screen.getByTestId("c").style.getPropertyValue("--container-max")).toBe("var(--container-md)");
  });

  it("sets the padding variable only when padding is passed", () => {
    render(<Container data-testid="c" padding="4">x</Container>);
    expect(screen.getByTestId("c").style.getPropertyValue("--container-padding")).toBe("var(--space-4)");
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
