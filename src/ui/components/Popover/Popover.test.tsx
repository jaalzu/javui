import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./Popover";
import { Field } from "../Field";
import { Input } from "../Input";
import { QuestionIcon } from "../../icons/icons.generated";

function Example() {
  return (
    <Popover>
      <PopoverTrigger>Filters</PopoverTrigger>
      <PopoverContent title="Filters" description="Narrow the results.">
        <PopoverClose>Done</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("is closed until the trigger is used", () => {
    render(<Example />);
    expect(screen.getByRole("button", { name: "Filters" })).toBeInTheDocument();
    expect(screen.queryByText("Narrow the results.")).not.toBeInTheDocument();
  });

  it("opens a panel named by its title", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    const panel = await screen.findByRole("dialog", { name: "Filters" });
    expect(panel).toHaveAccessibleDescription("Narrow the results.");
  });

  it("closes with its close button and with Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    await user.click(await screen.findByRole("button", { name: "Done" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("focuses the first field and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Rename tag</PopoverTrigger>
        <PopoverContent title="Rename tag" description="Choose a name.">
          <Field label="Tag name"><Input defaultValue="Important" /></Field>
          <PopoverClose>Cancel</PopoverClose>
        </PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: "Rename tag" });
    await user.click(trigger);
    expect(await screen.findByRole("textbox", { name: "Tag name" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(trigger).toHaveFocus();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Example />
        <button type="button">Outside</button>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("gives an icon-only trigger an accessible name", () => {
    render(
      <Popover>
        <PopoverTrigger startIcon={<QuestionIcon />} aria-label="How tags work" />
        <PopoverContent title="How tags work">Short help.</PopoverContent>
      </Popover>,
    );
    expect(screen.getByRole("button", { name: "How tags work" })).toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
