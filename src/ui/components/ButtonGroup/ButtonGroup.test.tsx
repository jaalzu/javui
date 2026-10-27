import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import { Input } from "../Input";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "../Modal";
import { ButtonGroup } from "./ButtonGroup";
import { ButtonGroupSeparator } from "./ButtonGroupSeparator";
import { ButtonGroupText } from "./ButtonGroupText";

describe("ButtonGroup", () => {
  it("renders a horizontal group by default", () => {
    render(
      <ButtonGroup aria-label="Actions">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Actions" });
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(group).not.toHaveAttribute("data-stack-below");
  });

  it("renders a vertical group", () => {
    render(
      <ButtonGroup aria-label="Actions" orientation="vertical">
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group", { name: "Actions" })).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
  });

  it("marks the breakpoint used by stackBelow", () => {
    const { rerender } = render(
      <ButtonGroup aria-label="Actions" stackBelow="sm">
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group", { name: "Actions" })).toHaveAttribute(
      "data-stack-below",
      "sm",
    );

    rerender(
      <ButtonGroup aria-label="Actions" stackBelow="md">
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group", { name: "Actions" })).toHaveAttribute(
      "data-stack-below",
      "md",
    );
  });

  it("renders an accessible separator", () => {
    render(
      <ButtonGroup aria-label="Export">
        <Button variant="secondary">CSV</Button>
        <ButtonGroupSeparator />
        <Button variant="secondary">JSON</Button>
      </ButtonGroup>,
    );
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  it("renders a non-interactive text addon", () => {
    render(
      <ButtonGroup aria-label="Domain">
        <ButtonGroupText>https://</ButtonGroupText>
        <Input aria-label="Domain" placeholder="example.com" />
      </ButtonGroup>,
    );
    const addon = screen.getByText("https://");
    expect(addon).toHaveAttribute("data-button-group-text");
    expect(addon.tagName).toBe("DIV");
    expect(screen.getByRole("group", { name: "Domain" })).toContainElement(addon);
  });

  it("keeps nested groups separate", () => {
    render(
      <ButtonGroup aria-label="Outer">
        <ButtonGroup aria-label="Text style">
          <Button variant="secondary">Bold</Button>
          <Button variant="secondary">Italic</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Alignment">
          <Button variant="secondary">Left</Button>
          <Button variant="secondary">Center</Button>
        </ButtonGroup>
      </ButtonGroup>,
    );
    const outer = screen.getByRole("group", { name: "Outer" });
    expect(outer).toContainElement(screen.getByRole("group", { name: "Text style" }));
    expect(outer).toContainElement(screen.getByRole("group", { name: "Alignment" }));
  });

  it("applies pill and xs to the children without adding group props", () => {
    render(
      <ButtonGroup aria-label="Shapes">
        <Button pill variant="secondary">Pill one</Button>
        <Button pill variant="secondary">Pill two</Button>
        <Button size="xs" variant="secondary">XS one</Button>
        <Button size="xs" variant="secondary">XS two</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("button", { name: "Pill one" })).toHaveAttribute(
      "data-variant",
      "secondary",
    );
    expect(screen.getByRole("button", { name: "XS two" })).toHaveAttribute(
      "data-variant",
      "secondary",
    );
  });

  it("keeps a modal trigger in place when the modal opens", async () => {
    const user = userEvent.setup();
    render(
      <ButtonGroup aria-label="Actions">
        <Button variant="secondary">Rename</Button>
        <Modal>
          <ModalTrigger variant="secondary">Open settings</ModalTrigger>
          <ModalContent
            title="Settings"
            actions={<ModalClose>Close</ModalClose>}
          >
            Settings body.
          </ModalContent>
        </Modal>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Actions" });
    const trigger = screen.getByRole("button", { name: "Open settings" });

    await user.click(trigger);

    expect(group).toContainElement(trigger);
    expect(trigger).toHaveAttribute("data-variant", "secondary");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ButtonGroup aria-label="Actions">
        <ButtonGroupText>USD</ButtonGroupText>
        <Button>One</Button>
        <ButtonGroupSeparator />
        <Button>Two</Button>
      </ButtonGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
