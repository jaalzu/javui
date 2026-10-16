import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { CodeBlock } from "./CodeBlock";

describe("CodeBlock", () => {
  it("shows the code in a named, focusable region", () => {
    render(<CodeBlock code="bun add x" label="Install" language="bash" />);
    const region = screen.getByRole("region", { name: "Install" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveTextContent("bun add x");
  });

  it("switches the code between tabs and copies the selected one", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<CodeBlock language="bash" label="Install" tabs={[{ label: "bun", code: "bun add x" }, { label: "npm", code: "npm install x" }]} />);
    expect(screen.getByRole("region", { name: "Install (bun)" })).toHaveTextContent("bun add x");
    await user.click(screen.getByRole("tab", { name: "npm" }));
    expect(screen.getByRole("region", { name: "Install (npm)" })).toHaveTextContent("npm install x");
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith("npm install x");
  });

  it("copies the code and announces it", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<CodeBlock code="bun add x" />);
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith("bun add x");
    expect(await screen.findByRole("status")).toHaveTextContent("Copied");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CodeBlock code="bun add x" language="bash" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
