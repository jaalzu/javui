import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Combobox } from ".";
const items = [{ value: "ada", label: "Ada Lovelace" }];
test("renders a combobox", () => { render(<Combobox items={items} aria-label="Assignee" />); expect(screen.getByRole("combobox")).toBeInTheDocument(); });
