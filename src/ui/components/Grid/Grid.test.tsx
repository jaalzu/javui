import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("turns a number into equal columns", () => {
    render(<Grid data-testid="g" columns={3}>x</Grid>);
    expect(screen.getByTestId("g").style.getPropertyValue("--grid-columns")).toBe("repeat(3, minmax(0, 1fr))");
  });

  it("accepts a full template string", () => {
    render(<Grid data-testid="g" columns="2fr 1fr">x</Grid>);
    expect(screen.getByTestId("g").style.getPropertyValue("--grid-columns")).toBe("2fr 1fr");
  });

  it("sets per-breakpoint columns from an object", () => {
    render(
      <Grid data-testid="g" columns={{ base: 1, md: 2, lg: 4 }}>
        x
      </Grid>,
    );
    const el = screen.getByTestId("g");
    expect(el.style.getPropertyValue("--grid-columns")).toBe("repeat(1, minmax(0, 1fr))");
    expect(el.style.getPropertyValue("--grid-columns-md")).toBe("repeat(2, minmax(0, 1fr))");
    expect(el.style.getPropertyValue("--grid-columns-lg")).toBe("repeat(4, minmax(0, 1fr))");
  });

  it("sets auto-fit columns from minColumnWidth and overrides columns", () => {
    render(
      <Grid data-testid="g" columns={3} minColumnWidth="16rem">
        x
      </Grid>,
    );
    const el = screen.getByTestId("g");
    expect(el.style.getPropertyValue("--grid-columns")).toBe(
      "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
    );
  });

  it("keeps list semantics when rendered as ul", () => {
    render(
      <Grid as="ul" columns={2}>
        <li>One</li>
        <li>Two</li>
      </Grid>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Grid columns={2}><div>a</div><div>b</div></Grid>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
