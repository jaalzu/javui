"use client";

import {
  Button,
  Field,
  Input,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
  Select,
} from "@javui/ui";

export default function ClientShowcase() {
  return (
    <section>
      <Button>Client button</Button>
      <Field label="Name">
        <Input />
      </Field>
      <Field label="Choice">
        <Select items={[{ value: "one", label: "One" }]} placeholder="Choose" />
      </Field>
      <Modal>
        <ModalTrigger>Open modal</ModalTrigger>
        <ModalContent
          closeLabel="Cerrar"
          title="Consumer modal"
          actions={<ModalClose>Close</ModalClose>}
        >
          Client content
        </ModalContent>
      </Modal>
    </section>
  );
}
