import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { NameValueList } from "./NameValueList";

describe("NameValueList", () => {
  it("renders data pairs as terms and definitions", () => {
    render(<NameValueList items={[{ label: "Plan", value: "Pro" }]} />);
    expect(screen.getByRole("term")).toHaveTextContent("Plan");
    expect(screen.getByRole("definition")).toHaveTextContent("Pro");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<NameValueList items={[{ label: "Plan", value: "Pro" }]} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
