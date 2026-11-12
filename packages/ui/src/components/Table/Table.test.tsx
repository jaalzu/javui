import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Table } from "./Table";

const columns = [
  { key: "name", header: "Plan" },
  { key: "price", header: "Price", align: "end" as const },
];
const rows = [
  { name: "Free", price: "$0" },
  { name: "Pro", price: "$12" },
];

describe("Table", () => {
  it("renders a captioned table with column and row headers", () => {
    render(<Table caption="Plans" columns={columns} rows={rows} />);
    expect(screen.getByRole("table", { name: "Plans" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getByRole("rowheader", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "$12" })).toBeInTheDocument();
  });

  it("makes the scroll wrapper a focusable named region", () => {
    render(<Table caption="Plans" columns={columns} rows={rows} />);
    const region = screen.getByRole("region", { name: "Plans" });
    expect(region).toHaveAttribute("tabindex", "0");
  });

  it("keeps a hidden caption available as the table name", () => {
    render(<Table caption="Plans" hideCaption columns={columns} rows={rows} />);
    expect(screen.getByRole("table", { name: "Plans" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Table caption="Plans" columns={columns} rows={rows} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
