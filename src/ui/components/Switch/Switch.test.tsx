import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Switch } from "./Switch";
import { Field } from "../Field";

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

  it("exposes invalid, required and read-only state directly", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" error="Turn this on" required readOnly />);
    const control = screen.getByRole("switch", { name: /Notifications/ });
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAttribute("aria-required", "true");
    expect(control).toHaveAttribute("aria-readonly", "true");
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(control).toHaveAttribute(
      "aria-describedby",
      screen.getByText("Turn this on").closest("[id]")?.id,
    );
    await user.click(screen.getByText(/Notifications/));
    expect(control).not.toBeChecked();
  });

  it("is busy and not interactive while loading", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" loading />);
    const control = screen.getByRole("switch");
    expect(control).toHaveAttribute("aria-busy", "true");
    expect(control).toHaveAttribute("aria-readonly", "true");
    await user.click(screen.getByText("Notifications"));
    expect(control).not.toBeChecked();
  });

  it("inherits validation state from Field", () => {
    render(
      <Field label="Notifications" error="Turn this on" required loading>
        <Switch label="Notifications" />
      </Field>,
    );
    const control = screen.getByRole("switch");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAttribute("aria-required", "true");
    expect(control).toHaveAttribute("aria-readonly", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Switch label="Dark mode" defaultChecked />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
