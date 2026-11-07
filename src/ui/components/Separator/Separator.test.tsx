import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("is decorative and horizontal by default", () => {
    const { container } = render(<Separator />);
    const separator = container.firstElementChild;
    expect(separator).toHaveAttribute("role", "presentation");
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
  });

  it("exposes the separator role and orientation when not decorative", () => {
    render(<Separator orientation="vertical" decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Separator />
        <Separator decorative={false} />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
