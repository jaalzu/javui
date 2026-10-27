import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { CheckIcon } from "../../icons/icons.generated";

describe("Icon", () => {
  it("is decorative without a label", () => {
    const { container } = render(<CheckIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("is an image with a name when labelled", () => {
    render(<CheckIcon label="Success" />);
    const img = screen.getByRole("img", { name: "Success" });
    expect(img).toHaveAttribute("role", "img");
    expect(img).toHaveAttribute("aria-label", "Success");
    expect(img).not.toHaveAttribute("aria-hidden");
  });

  it("renders on the Phosphor 256 grid", () => {
    const { container } = render(<CheckIcon />);
    expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 256 256");
  });

  it("switches the glyph between regular and fill", () => {
    const { container } = render(
      <>
        <CheckIcon />
        <CheckIcon weight="fill" />
      </>,
    );
    const [regular, fill] = container.querySelectorAll("path");
    expect(regular.getAttribute("d")).not.toEqual(fill.getAttribute("d"));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CheckIcon label="Success" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
