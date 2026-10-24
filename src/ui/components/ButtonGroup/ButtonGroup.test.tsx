import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import { ButtonGroup } from "./ButtonGroup";
import { ButtonGroupSeparator } from "./ButtonGroupSeparator";

describe("ButtonGroup", () => {
  it("renders a horizontal group by default", () => {
    render(
      <ButtonGroup aria-label="Actions">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Actions" });
    expect(group).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders a vertical group", () => {
    render(
      <ButtonGroup aria-label="Actions" orientation="vertical">
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group", { name: "Actions" })).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
  });

  it("renders an accessible separator", () => {
    render(
      <ButtonGroup aria-label="Export">
        <Button variant="secondary">CSV</Button>
        <ButtonGroupSeparator />
        <Button variant="secondary">JSON</Button>
      </ButtonGroup>,
    );
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ButtonGroup aria-label="Actions">
        <Button>One</Button>
        <ButtonGroupSeparator />
        <Button>Two</Button>
      </ButtonGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
