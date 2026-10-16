import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its text in a span", () => {
    render(<Badge tone="success">Active</Badge>);
    expect(screen.getByText("Active").tagName).toBe("SPAN");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        <Badge>Neutral</Badge> <Badge tone="danger">Failed</Badge>
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
