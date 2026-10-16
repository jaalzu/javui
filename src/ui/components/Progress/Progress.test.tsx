import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("exposes a named progressbar with its value", () => {
    render(<Progress label="Uploading" value={40} />);
    const bar = screen.getByRole("progressbar", { name: "Uploading" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
  });

  it("has no aria-valuenow when indeterminate", () => {
    render(<Progress label="Working" value={null} />);
    expect(screen.getByRole("progressbar", { name: "Working" })).not.toHaveAttribute("aria-valuenow");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Progress label="Uploading" value={40} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
