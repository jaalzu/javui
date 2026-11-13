import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";
import { Switch } from "../Switch";

describe("Field", () => {
  it("labels the control", () => {
    render(
      <Field label="Email">
        <Input type="email" />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("links the description to the control", () => {
    render(
      <Field label="Email" description="We never share it.">
        <Input />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("We never share it.");
  });

  it("marks the control invalid and links the error", () => {
    render(
      <Field label="Email" error="Enter a valid email">
        <Input />
      </Field>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter a valid email");
  });

  it("prints Required and marks the control required", () => {
    render(
      <Field label="Email" required>
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText(/Email/)).toBeRequired();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("forwards readOnly without dimming the control", () => {
    render(
      <Field label="API key" readOnly>
        <Input defaultValue="sk-live" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });

  it("forwards loading as readOnly with aria-busy", () => {
    render(
      <Field label="Tax ID" loading>
        <Input />
      </Field>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-busy", "true");
    expect(input).toHaveAttribute("readonly");
  });

  it("accepts a control that labels itself", () => {
    render(
      <Field error="Accept the terms">
        <Checkbox label="Accept terms" />
      </Field>,
    );
    const checkbox = screen.getByRole("checkbox", { name: /Accept terms/ });
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAccessibleDescription("Accept the terms");
    expect(screen.getAllByText("Accept terms")).toHaveLength(1);
  });

  it("lets a labelled control print Required in a label-less Field", () => {
    render(
      <Field required>
        <Switch label="Notifications" />
      </Field>,
    );
    const control = screen.getByRole("switch", { name: /Notifications Required/ });
    expect(control).toHaveAttribute("aria-required", "true");
    expect(screen.getAllByText("Required")).toHaveLength(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Field label="Email" description="Help" error="Required" required>
        <Input />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
