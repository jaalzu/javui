import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Slider } from "./Slider";
import { Field } from "../Field";

describe("Slider", () => {
  it("exposes a named slider with its value", () => {
    render(<Slider label="Volume" defaultValue={40} />);
    const input = screen.getByRole("slider", { name: /Volume/ });
    expect(input).toHaveValue("40");
  });

  it("renders two named thumbs for a range", () => {
    render(<Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />);
    expect(screen.getByRole("slider", { name: "Minimum price" })).toHaveValue("20");
    expect(screen.getByRole("slider", { name: "Maximum price" })).toHaveValue("80");
  });

  it("exposes invalid, required and read-only state directly", async () => {
    const user = userEvent.setup();
    render(
      <Slider label="Volume" defaultValue={40} error="Out of range" required readOnly />,
    );
    const slider = screen.getByRole("slider", { name: /Volume/ });
    expect(slider).toHaveAttribute("aria-invalid", "true");
    expect(slider).toHaveAttribute("aria-required", "true");
    expect(slider).toHaveAttribute("aria-readonly", "true");
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(slider).toHaveAttribute(
      "aria-describedby",
      screen.getByText("Out of range").closest("[id]")?.id,
    );
    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(slider).toHaveValue("40");
  });

  it("is busy and not interactive while loading", async () => {
    render(<Slider label="Volume" defaultValue={40} loading />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-busy", "true");
    expect(slider).toHaveAttribute("aria-readonly", "true");
  });

  it("inherits validation state from Field", () => {
    render(
      <Field label="Volume" error="Out of range" required loading>
        <Slider label="Volume" defaultValue={40} />
      </Field>,
    );
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-invalid", "true");
    expect(slider).toHaveAttribute("aria-required", "true");
    expect(slider).toHaveAttribute("aria-readonly", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Slider label="Volume" defaultValue={40} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
