import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("sets a plain gap as a single CSS variable", () => {
    render(<Stack data-testid="s" gap="2">x</Stack>);
    const el = screen.getByTestId("s");
    expect(el.style.getPropertyValue("--stack-gap")).toBe("var(--space-2)");
    expect(el.style.getPropertyValue("--stack-gap-md")).toBe("");
  });

  it("sets per-breakpoint variables from an object", () => {
    render(
      <Stack data-testid="s" gap={{ base: "2", md: "6" }}>
        x
      </Stack>,
    );
    expect(screen.getByTestId("s").style.getPropertyValue("--stack-gap-md")).toBe("var(--space-6)");
  });

  it("renders without a base value", () => {
    render(
      <Stack data-testid="s" direction={{ md: "row" }}>
        x
      </Stack>,
    );
    const el = screen.getByTestId("s");
    expect(el.style.getPropertyValue("--stack-direction-md")).toBe("row");
    expect(el.style.getPropertyValue("--stack-direction")).toBe("");
  });

  it("keeps list semantics when rendered as ul", () => {
    render(
      <Stack as="ul">
        <li>One</li>
        <li>Two</li>
      </Stack>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Stack as="ul">
        <li>One</li>
        <li>Two</li>
      </Stack>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
