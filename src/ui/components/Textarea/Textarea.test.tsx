import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Textarea } from "./Textarea";
import { Field } from "../Field";

describe("Textarea", () => {
  it("renders a native textarea", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Message" rows={5} />);
    const el = screen.getByRole("textbox", { name: "Message" });
    expect(el.tagName).toBe("TEXTAREA");
    expect(el).toHaveAttribute("rows", "5");
    await user.type(el, "Hola");
    expect(el).toHaveValue("Hola");
  });

  it("is labelled by Field", () => {
    render(
      <Field label="Message">
        <Textarea />
      </Field>,
    );
    expect(screen.getByRole("textbox", { name: "Message" }).tagName).toBe("TEXTAREA");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Field label="Message">
        <Textarea />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
