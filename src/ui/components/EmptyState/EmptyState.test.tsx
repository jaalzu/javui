import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";

describe("EmptyState", () => {
  it("renders the title as a heading and the description", () => {
    render(<EmptyState title="No reports yet" description="Connect a source." />);
    expect(screen.getByRole("heading", { level: 3, name: "No reports yet" })).toBeVisible();
    expect(screen.getByText("Connect a source.")).toBeVisible();
  });

  it("uses the requested heading level", () => {
    render(<EmptyState as="h2" title="Nothing here" description="Add something to get started." />);
    expect(screen.getByRole("heading", { level: 2, name: "Nothing here" })).toBeVisible();
  });

  it("renders an action", () => {
    render(<EmptyState title="Empty" description="Add something to get started." actions={<Button>Create</Button>} />);
    expect(screen.getByRole("button", { name: "Create" })).toBeVisible();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <EmptyState title="No reports yet" description="Connect a source." actions={<Button>Create</Button>} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("uses a div without a title and hides the illustration at xs", () => {
    const { container } = render(<EmptyState size="xs" description="Nothing to show yet." illustration={<svg data-testid="illustration" />} />);
    expect(container.querySelector("section")).not.toBeInTheDocument();
    expect(screen.queryByTestId("illustration")).not.toBeInTheDocument();
  });
});
