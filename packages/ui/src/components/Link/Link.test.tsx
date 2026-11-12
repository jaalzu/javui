import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("renders a native anchor with its href", () => {
    render(<Link href="/docs">Docs</Link>);
    const el = screen.getByRole("link", { name: "Docs" });
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/docs");
  });

  it("passes native attributes through", () => {
    render(<Link href="https://example.com" target="_blank" rel="noopener noreferrer">Out</Link>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<p><Link href="/docs">Docs</Link></p>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
