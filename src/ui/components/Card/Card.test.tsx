import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders a div by default", () => {
    render(<Card data-testid="c">x</Card>);
    expect(screen.getByTestId("c").tagName).toBe("DIV");
  });

  it("renders the semantic element from `as`", () => {
    render(<Card as="article" aria-label="Post">x</Card>);
    expect(screen.getByRole("article", { name: "Post" })).toBeInTheDocument();
  });

  it("applies the padding token", () => {
    render(<Card data-testid="c" padding="8">x</Card>);
    expect(screen.getByTestId("c").style.padding).toBe("var(--space-8)");
  });

  it("works as a list item", () => {
    render(<ul><Card as="li">one</Card></ul>);
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Card as="section" aria-label="Info" variant="surface">x</Card>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
