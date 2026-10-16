import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";
import { Input } from "../Input";

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

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Field label="Email" description="Help" error="Required">
        <Input />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
