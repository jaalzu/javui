import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("exposes a named slider with its value", () => {
    render(<Slider label="Volume" defaultValue={40} />);
    const input = screen.getByRole("slider", { name: "Volume" });
    expect(input).toHaveValue("40");
  });

  it("renders two named thumbs for a range", () => {
    render(<Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />);
    expect(screen.getByRole("slider", { name: "Minimum price" })).toHaveValue("20");
    expect(screen.getByRole("slider", { name: "Maximum price" })).toHaveValue("80");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Slider label="Volume" defaultValue={40} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
