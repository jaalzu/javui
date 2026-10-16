import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders links built from the template and marks the current page", () => {
    render(<Pagination page={2} pageCount={4} hrefTemplate="/blog?page={page}" />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Page 3" })).toHaveAttribute("href", "/blog?page=3");
    expect(screen.getByRole("link", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
  });

  it("omits Previous on the first page and Next on the last", () => {
    const { rerender } = render(<Pagination page={1} pageCount={3} hrefTemplate="/p/{page}" />);
    expect(screen.queryByRole("link", { name: "Previous" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute("href", "/p/2");
    rerender(<Pagination page={3} pageCount={3} hrefTemplate="/p/{page}" />);
    expect(screen.queryByRole("link", { name: "Next" })).not.toBeInTheDocument();
  });

  it("collapses long ranges but keeps first, last and neighbours", () => {
    render(<Pagination page={10} pageCount={20} hrefTemplate="/p/{page}" />);
    for (const n of [1, 9, 10, 11, 20]) expect(screen.getByRole("link", { name: `Page ${n}` })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Page 5" })).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Pagination page={2} pageCount={9} hrefTemplate="/p/{page}" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
