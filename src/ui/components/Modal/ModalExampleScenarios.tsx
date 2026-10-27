"use client";

import { useState } from "react";
import { Button, Field, Input, Modal, ModalClose, ModalContent, ModalTrigger } from "@/ui";

/** A form protected by onBeforeClose: leaving with unsaved changes opens a nested confirmation. */
export function ModalFormExample() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [name, setName] = useState("Ada Lovelace");
  const [savedName, setSavedName] = useState("Ada Lovelace");
  const dirty = name !== savedName;

  return (
    <>
      <Modal
        open={open}
        onOpenChange={setOpen}
        onBeforeClose={() => {
          if (!dirty) return true;
          setConfirmOpen(true);
          return false;
        }}
      >
        <ModalTrigger variant="secondary">Edit profile</ModalTrigger>
        <ModalContent
          title="Edit profile"
          actions={
            <>
              <ModalClose>Cancel</ModalClose>
              <Button type="submit" form="modal-profile-form">Save changes</Button>
            </>
          }
        >
          <form
            id="modal-profile-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSavedName(name);
              setOpen(false);
            }}
          >
            <Field label="Name" description="Shown on your profile.">
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </Field>
          </form>

          <Modal
            role="alertdialog"
            color="critical"
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            description="Your unsaved changes will be lost."
          >
            <ModalContent
              title="Discard changes?"
              actions={
                <>
                  <ModalClose>Keep editing</ModalClose>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setName(savedName);
                      setConfirmOpen(false);
                      setOpen(false);
                    }}
                  >
                    Discard
                  </Button>
                </>
              }
            >
              The name change has not been saved.
            </ModalContent>
          </Modal>
        </ModalContent>
      </Modal>
    </>
  );
}

/** A parent modal that opens a confirmation modal on top of itself. */
export function ModalNestedExample() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger variant="secondary">Project settings</ModalTrigger>
        <ModalContent
          title="Project settings"
          tagline="Danger zone"
          actions={
            <>
              <ModalClose>Close</ModalClose>
              <Button variant="danger" onClick={() => setConfirmOpen(true)}>
                Delete project
              </Button>
            </>
          }
        >
          Deleting the project also removes its members and data.

          <Modal
            role="alertdialog"
            color="critical"
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            description="This permanently removes the project and its data. This cannot be undone."
          >
            <ModalContent
              title="Delete project?"
              actions={
                <>
                  <ModalClose>Cancel</ModalClose>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setConfirmOpen(false);
                      setOpen(false);
                    }}
                  >
                    Delete
                  </Button>
                </>
              }
            >
              Every member loses access immediately.
            </ModalContent>
          </Modal>
        </ModalContent>
      </Modal>
    </>
  );
}
