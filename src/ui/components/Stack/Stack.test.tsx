import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("stacks in a column with the gap token", () => {
    render(<Stack data-testid="s" gap="2">x</Stack>);
    const el = screen.getByTestId("s");
    expect(el.style.flexDirection).toBe("column");
    expect(el.style.gap).toBe("var(--space-2)");
  });

  it("supports row direction", () => {
    render(<Stack data-testid="s" direction="row">x</Stack>);
    expect(screen.getByTestId("s").style.flexDirection).toBe("row");
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
