import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { AlertDialog, AlertDialogClose, AlertDialogContent, AlertDialogTrigger } from "./AlertDialog";

function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete project</AlertDialogTrigger>
      <AlertDialogContent title="Delete project?" description="This cannot be undone.">
        <AlertDialogClose>Cancel</AlertDialogClose>
        <AlertDialogClose variant="danger">Delete</AlertDialogClose>
      </AlertDialogContent>
    </AlertDialog>
  );
}

describe("AlertDialog", () => {
  it("is closed until the trigger is used", () => {
    render(<Example />);
    expect(screen.getByRole("button", { name: "Delete project" })).toBeInTheDocument();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("opens an alert dialog named by its title and described by its description", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    const dialog = await screen.findByRole("alertdialog", { name: "Delete project?" });
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
  });

  it("focuses the safe action first", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await screen.findByRole("alertdialog");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
  });

  it("does not close on outside click", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await screen.findByRole("alertdialog");
    await user.click(document.body);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("closes with the close button", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await user.click(await screen.findByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("closes with Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Delete project" });
    await user.click(trigger);
    await screen.findByRole("alertdialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await screen.findByRole("alertdialog");
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
