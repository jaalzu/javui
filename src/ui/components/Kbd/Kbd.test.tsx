import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Kbd } from "./Kbd";

describe("Kbd", () => {
  it("renders a native kbd element", () => {
    render(<Kbd>K</Kbd>);
    expect(screen.getByText("K").tagName).toBe("KBD");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<p>Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd></p>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
