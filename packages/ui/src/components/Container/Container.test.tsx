import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("sets a token-based max width and gutter", () => {
    render(<Container data-testid="container">Content</Container>);
    const element = screen.getByTestId("container");
    expect(element.style.getPropertyValue("--container-max-width")).toBe("var(--container-xl)");
    expect(element.style.getPropertyValue("--container-gutter")).toBe("var(--space-4)");
  });

  it("supports responsive size and gutter", () => {
    render(
      <Container data-testid="container" size={{ base: "sm", lg: "lg" }} gutter={{ base: "4", md: "8" }}>
        Content
      </Container>,
    );
    const element = screen.getByTestId("container");
    expect(element.style.getPropertyValue("--container-max-width")).toBe("var(--container-sm)");
    expect(element.style.getPropertyValue("--container-max-width-lg")).toBe("var(--container-lg)");
    expect(element.style.getPropertyValue("--container-gutter-md")).toBe("var(--space-8)");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Container as="main">Content</Container>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
