import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Field } from "../Field";
import { Input } from "../Input";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "./Modal";

describe("Modal", () => {
  it("opens a compact dialog with a labelled form control and footer", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Modal>
        <ModalTrigger variant="secondary">Edit profile</ModalTrigger>
        <ModalContent
          title="Edit profile"
          closeLabel="Close profile"
          description="Make changes to your profile here."
          actions={<ModalClose>Save profile</ModalClose>}
        >
          <Field label="Name">
            <Input defaultValue="Ada Lovelace" />
          </Field>
        </ModalContent>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Edit profile" }));

    expect(screen.getByRole("dialog", { name: "Edit profile" })).toBeVisible();
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Ada Lovelace");
    expect(container.ownerDocument.querySelector("footer")).toBeVisible();
  });

  it("keeps the footer available while the body owns overflow", () => {
    const { container } = render(
      <Modal defaultOpen>
        <ModalContent title="Conditions and terms" closeLabel="Close terms" actions={<ModalClose>Close terms</ModalClose>}>
          <p>Long terms content.</p>
        </ModalContent>
      </Modal>,
    );

    const body = container.ownerDocument.querySelector("[class*='body']");
    expect(body).toBeInTheDocument();
    expect(container.ownerDocument.querySelector("footer")).toBeVisible();
  });

  it("has no accessibility violations when open", async () => {
    render(
      <Modal defaultOpen>
        <ModalContent title="Notifications" closeLabel="Close notifications" actions={<ModalClose>Close notifications</ModalClose>}>
          Choose what you want to hear about.
        </ModalContent>
      </Modal>,
    );

    expect(await axe(document.body)).toHaveNoViolations();
  });
});
