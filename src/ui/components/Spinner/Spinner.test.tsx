import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("is a status region with the default label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("uses a custom label", () => {
    render(<Spinner label="Saving changes" />);
    expect(screen.getByRole("status")).toHaveTextContent("Saving changes");
  });

  it("is decorative and silent when the label is empty", () => {
    render(<Spinner label="" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    const spinner = document.querySelector("[aria-hidden='true']");
    expect(spinner).toBeInTheDocument();
    expect(spinner).not.toHaveTextContent("Loading");
  });

  it("draws twelve bars inside the hidden decorative layer", () => {
    const { container } = render(<Spinner label="Loading" />);
    const bars = container.querySelector("[aria-hidden='true']");
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(bars?.children).toHaveLength(12);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
