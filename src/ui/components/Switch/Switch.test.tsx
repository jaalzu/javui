import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("is a switch named by its label", () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByRole("switch", { name: "Dark mode" })).not.toBeChecked();
  });

  it("toggles with click and keyboard", async () => {
    const user = userEvent.setup();
    render(<Switch label="Dark mode" />);
    await user.click(screen.getByText("Dark mode"));
    expect(screen.getByRole("switch")).toBeChecked();
    screen.getByRole("switch").focus();
    await user.keyboard(" ");
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Switch label="Dark mode" defaultChecked />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
