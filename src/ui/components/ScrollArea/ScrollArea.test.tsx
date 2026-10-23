import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders a named, focusable scroll region", () => {
    render(<ScrollArea label="Activity"><p>Entry</p></ScrollArea>);
    const region = screen.getByRole("region", { name: "Activity" });
    expect(region).toBeVisible();
    expect(region).toHaveAttribute("tabindex", "0");
    expect(screen.getByText("Entry")).toBeVisible();
  });

  it("omits the region role when there is no label", () => {
    const { container } = render(<ScrollArea><p>Entry</p></ScrollArea>);
    expect(container.querySelector("[role='region']")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ScrollArea label="Activity"><p>Entry</p></ScrollArea>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
