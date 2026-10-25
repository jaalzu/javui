import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders an h2 by default", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "Title" })).toBeInTheDocument();
  });

  it.each(["h1", "h2", "h3", "h4", "h5", "h6"] as const)("renders %s from `as`", (as) => {
    render(<Heading as={as}>Title</Heading>);
    expect(screen.getByRole("heading", { level: Number(as[1]) })).toBeInTheDocument();
  });

  it("keeps the level when `size` changes the look", () => {
    render(<Heading as="h2" size={1}>Looks big</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("passes through native attributes and className", () => {
    render(<Heading id="t" className="extra">Title</Heading>);
    const el = screen.getByRole("heading");
    expect(el).toHaveAttribute("id", "t");
    expect(el).toHaveClass("extra");
  });

  it("derives a stable id from the text when none is given", () => {
    render(<Heading>When to use it</Heading>);
    expect(screen.getByRole("heading")).toHaveAttribute("id", "when-to-use-it");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <main>
        <Heading as="h1">Page</Heading>
        <Heading as="h2" size={6}>Section</Heading>
      </main>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
