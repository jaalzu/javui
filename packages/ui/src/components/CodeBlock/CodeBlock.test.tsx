import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { CodeBlockView } from "./CodeBlockView";

describe("CodeBlock", () => {
  it("shows the code in a named, focusable region", () => {
    render(<CodeBlockView code="bun add x" label="Install" language="bash" />);
    const region = screen.getByRole("region", { name: "Install" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveTextContent("bun add x");
  });

  it("switches the code between tabs and copies the selected one", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<CodeBlockView language="bash" label="Install" tabs={[{ label: "bun", code: "bun add x" }, { label: "npm", code: "npm install x" }]} />);
    expect(screen.getByRole("region", { name: "Install (bun)" })).toHaveTextContent("bun add x");
    await user.click(screen.getByRole("tab", { name: "npm" }));
    expect(screen.getByRole("region", { name: "Install (npm)" })).toHaveTextContent("npm install x");
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith("npm install x");
  });

  it("copies the code and announces it", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<CodeBlockView code="bun add x" />);
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith("bun add x");
    expect(await screen.findByRole("status")).toHaveTextContent("Copied");
  });

  it("marks the requested lines without rendering line numbers", () => {
    const { container } = render(<CodeBlockView code={"one\ntwo\nthree"} highlightLines={[2]} />);
    const marked = container.querySelectorAll("[data-highlight]");
    expect(marked).toHaveLength(1);
    expect(marked[0]).toHaveTextContent("two");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CodeBlockView code="bun add x" language="bash" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
