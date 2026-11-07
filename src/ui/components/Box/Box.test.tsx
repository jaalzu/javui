import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Box } from "./Box";

describe("Box", () => {
  it("renders a semantic element with its size and surface classes", () => {
    render(<Box as="section" size="sm" surface="sunken" data-testid="box">Content</Box>);
    const element = screen.getByTestId("box");
    expect(element.tagName).toBe("SECTION");
    expect(element.className).toContain("size-sm");
    expect(element.className).toContain("surface-sunken");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Box>Content</Box>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
