import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("turns a number into equal columns", () => {
    render(<Grid data-testid="g" columns={3}>x</Grid>);
    expect(screen.getByTestId("g").style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");
  });

  it("accepts a full template string", () => {
    render(<Grid data-testid="g" columns="2fr 1fr">x</Grid>);
    expect(screen.getByTestId("g").style.gridTemplateColumns).toBe("2fr 1fr");
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
