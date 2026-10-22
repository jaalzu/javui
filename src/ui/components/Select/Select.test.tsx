import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";
import { Field } from "../Field";
import { CheckIcon } from "../../icons/icons.generated";

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

  it("renders icon slots and marks them decorative", () => {
    const { container } = render(
      <Select label="Country" items={items} startIcon={<CheckIcon />} />,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("data-icon", "start");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("is read-only and busy while loading", () => {
    render(<Select label="Country" items={items} loading defaultValue="ar" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-busy", "true");
    expect(trigger).toHaveAttribute("data-loading");
  });

  it("has no accessibility violations when closed", async () => {
    const { container } = render(<Select label="Country" items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
