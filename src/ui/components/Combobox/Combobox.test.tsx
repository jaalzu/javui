import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";
import { Field } from "../Field";
import { CheckIcon } from "../../icons/icons.generated";

const items = [
  { value: "ada", label: "Ada Lovelace", description: "Engineering" },
  { value: "grace", label: "Grace Hopper", description: "Research" },
  { value: "alan", label: "Alan Turing", description: "Engineering" },
];

describe("Combobox", () => {
  it("renders a combobox named by its label", () => {
    render(<Combobox label="Assignee" placeholder="Search people" items={items} />);
    expect(screen.getByRole("combobox", { name: /Assignee/ })).toBeVisible();
  });

  it("is named by Field when used inside it", () => {
    render(
      <Field label="Assignee">
        <Combobox items={items} />
      </Field>,
    );
    expect(screen.getByRole("combobox", { name: /Assignee/ })).toBeVisible();
  });

  it("opens, lists options and selects one", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox label="Assignee" items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox"));
    expect(await screen.findAllByRole("option")).toHaveLength(3);
    await user.click(screen.getByRole("option", { name: /Grace Hopper/ }));
    expect(onValueChange).toHaveBeenCalledWith("grace");
  });

  it("filters options by typing", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Assignee" items={items} />);
    await user.type(screen.getByRole("combobox"), "turing");
    expect(await screen.findByRole("option", { name: /Alan Turing/ })).toBeVisible();
    expect(screen.queryByRole("option", { name: /Ada Lovelace/ })).not.toBeInTheDocument();
  });

  it("shows the empty message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Assignee" items={items} emptyMessage="No people found." />);
    await user.type(screen.getByRole("combobox"), "zzz");
    expect(await screen.findByText("No people found.")).toBeVisible();
  });

  it("renders icon slots and marks them decorative", () => {
    const { container } = render(
      <Combobox label="Assignee" items={items} startIcon={<CheckIcon />} />,
    );
    expect(screen.getByRole("combobox")).toBeVisible();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("is read-only and busy while loading", () => {
    render(<Combobox label="Assignee" items={items} loading defaultValue="ada" />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-busy", "true");
  });

  it("has no accessibility violations when closed", async () => {
    const { container } = render(<Combobox label="Assignee" items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
