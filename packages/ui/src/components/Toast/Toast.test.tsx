import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Toast, useToast } from "./Toast";
import { Button } from "../Button";

function Trigger() {
  const { show } = useToast();
  return (
    <Button onClick={() => show({ title: "Saved", description: "Your changes are safe.", type: "success", timeout: 0 })}>
      Save
    </Button>
  );
}

function Example() {
  return (
    <Toast>
      <Trigger />
    </Toast>
  );
}

function ActionTrigger() {
  const { show, close } = useToast();
  return (
    <Button
      onClick={() => {
        const id = show({
          title: "Event created",
          timeout: 0,
          actionProps: { children: "Undo", onClick: () => close(id) },
        });
      }}
    >
      Create event
    </Button>
  );
}

function PromiseTrigger() {
  const { promise } = useToast();
  return (
    <Button
      onClick={() =>
        promise(Promise.resolve("done"), {
          loading: "Saving…",
          success: "Changes saved",
          error: "Could not save",
        })
      }
    >
      Save changes
    </Button>
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

  it("renders an action that can close its toast", async () => {
    const user = userEvent.setup();
    render(
      <Toast>
        <ActionTrigger />
      </Toast>,
    );
    await user.click(screen.getByRole("button", { name: "Create event" }));
    await user.click(await screen.findByRole("button", { name: "Undo" }));
    await waitFor(() => expect(screen.queryByText("Event created")).not.toBeInTheDocument(), { timeout: 3000 });
  });

  it("moves one toast from loading to success with promise", async () => {
    const user = userEvent.setup();
    render(
      <Toast>
        <PromiseTrigger />
      </Toast>,
    );
    await user.click(screen.getByRole("button", { name: "Save changes" }));
    expect(await screen.findByText("Changes saved")).toBeInTheDocument();
    expect(screen.queryByText("Saving…")).not.toBeInTheDocument();
  });

  it("has no accessibility violations with a toast open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Saved");
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
