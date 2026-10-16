import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";

function Trigger() {
  const { show } = useToast();
  return (
    <Button onClick={() => show({ title: "Saved", description: "Your changes are safe.", tone: "success", timeout: 0 })}>
      Save
    </Button>
  );
}

function Example() {
  return (
    <ToastProvider>
      <Trigger />
    </ToastProvider>
  );
}

describe("Toast", () => {
  it("shows nothing until a toast is requested", () => {
    render(<Example />);
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

  it("shows the title and description when show is called", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes are safe.")).toBeInTheDocument();
  });

  it("can be dismissed with a labelled button", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Saved");
    await user.click(screen.getByLabelText("Dismiss"));
    await waitFor(() => expect(screen.queryByText("Saved")).not.toBeInTheDocument(), { timeout: 3000 });
  });

  it("has no accessibility violations with a toast open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Saved");
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
