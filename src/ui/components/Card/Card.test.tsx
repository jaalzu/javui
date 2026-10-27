import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

describe("Card", () => {
  it("renders a div by default", () => {
    render(<Card data-testid="c">x</Card>);
    expect(screen.getByTestId("c").tagName).toBe("DIV");
  });

  it("renders the semantic element from `as`", () => {
    render(<Card as="article" aria-label="Post">x</Card>);
    expect(screen.getByRole("article", { name: "Post" })).toBeInTheDocument();
  });

  it("switches the spacing token with `size`", () => {
    render(
      <Card data-testid="default">
        <CardContent>default</CardContent>
      </Card>,
    );
    render(
      <Card data-testid="small" size="sm">
        <CardContent>small</CardContent>
      </Card>,
    );
    expect(screen.getByTestId("default").className).not.toContain("sm");
    expect(screen.getByTestId("small").className).toContain("sm");
  });

  it("composes its parts", () => {
    render(
      <Card as="article" aria-label="Release">
        <CardHeader>
          <CardTitle>Version 2</CardTitle>
          <CardDescription>New parts</CardDescription>
          <CardAction>
            <button type="button">Share</button>
          </CardAction>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Version 2", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("New parts")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("works as a list item", () => {
    render(<ul><Card as="li">one</Card></ul>);
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Card as="section" aria-label="Info" variant="surface">
        <CardHeader>
          <CardTitle>Info</CardTitle>
          <CardDescription>Details</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
