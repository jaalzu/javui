"use client";

import { useState } from "react";
import {
  Button,
  Field,
  Input,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
  Stack,
  Text,
} from "@/ui";

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
        size="sm"
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
          closeLabel="Close profile"
          description="Make changes to your profile here. Click save when you're done."
          actions={
            <>
              <ModalClose variant="ghost">Cancel</ModalClose>
              <Button size="sm" type="submit" form="modal-profile-form">Save changes</Button>
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
            <Stack gap="3">
              <Field label="Name">
                <Input
                  size="sm"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field label="Email">
                <Input size="sm" type="email" autoComplete="email" defaultValue="ada@example.com" />
              </Field>
            </Stack>
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
              closeLabel="Close discard confirmation"
              actions={
                <>
                  <ModalClose variant="ghost">Keep editing</ModalClose>
                  <Button
                    size="sm"
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
/** A long body that keeps the modal footer visible while the terms scroll. */
export function ModalTermsExample() {
  return (
    <Modal size="sm">
      <ModalTrigger variant="secondary">View conditions and terms</ModalTrigger>
      <ModalContent
        title="Conditions and terms"
        closeLabel="Close terms"
        description="Please review the terms before continuing."
        actions={<ModalClose>Close terms</ModalClose>}
      >
        <Stack gap="4">
          {Array.from({ length: 10 }, (_, index) => (
            <section key={index}>
              <Text weight="medium">{index + 1}. General conditions</Text>
              <Text size="sm" tone="muted">
                By continuing, you agree to use the service responsibly and to keep your account
                information accurate. These conditions explain how access, content and support are
                handled.
              </Text>
            </section>
          ))}
        </Stack>
      </ModalContent>
    </Modal>
  );
}
