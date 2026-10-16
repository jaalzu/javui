import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";
import { Field } from "../Field";

const items = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
];

describe("Select", () => {
  it("renders a combobox named by its label with the placeholder", () => {
    render(<Select label="Country" placeholder="Choose one" items={items} />);
    const trigger = screen.getByRole("combobox", { name: /Country/ });
    expect(trigger).toHaveTextContent("Choose one");
  });

  it("is named by Field when used inside it", () => {
    render(
      <Field label="Country">
        <Select items={items} placeholder="Choose one" />
      </Field>,
    );
    expect(screen.getByRole("combobox", { name: /Country/ })).toBeInTheDocument();
  });

  it("opens, lists options and selects one", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Select label="Country" items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox"));
    expect(await screen.findAllByRole("option")).toHaveLength(3);
    await user.click(screen.getByRole("option", { name: "Uruguay" }));
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls[0][0]).toBe("uy");
  });

  it("has no accessibility violations when closed", async () => {
    const { container } = render(<Select label="Country" items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
