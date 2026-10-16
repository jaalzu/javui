import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

const check = <path d="M5 12l5 5L20 7" />;

describe("Icon", () => {
  it("is decorative without a label", () => {
    const { container } = render(<Icon>{check}</Icon>);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("is an image with a name when labelled", () => {
    render(<Icon label="Success">{check}</Icon>);
    const img = screen.getByRole("img", { name: "Success" });
    expect(img).not.toHaveAttribute("aria-hidden");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Icon label="Success">{check}</Icon>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
