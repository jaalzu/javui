import { Modal, ModalClose, ModalContent, ModalTrigger, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import { ModalFormExample, ModalNestedExample } from "./ModalExampleScenarios";

export const hero = defineHero(
  `<Modal
  role="alertdialog"
  color="critical"
  description="This permanently removes the project and its data. This cannot be undone."
>
  <ModalTrigger variant="danger">Delete project</ModalTrigger>
  <ModalContent
    title="Delete project?"
    actions={
      <>
        <ModalClose>Cancel</ModalClose>
        <ModalClose variant="danger">Delete</ModalClose>
      </>
    }
  >
    This permanently removes the project and its data.
  </ModalContent>
</Modal>`,
  <Modal
    role="alertdialog"
    color="critical"
    description="This permanently removes the project and its data. This cannot be undone."
  >
    <ModalTrigger variant="danger">Delete project</ModalTrigger>
    <ModalContent
      title="Delete project?"
      actions={
        <>
          <ModalClose>Cancel</ModalClose>
          <ModalClose variant="danger">Delete</ModalClose>
        </>
      }
    >
      This permanently removes the project and its data.
    </ModalContent>
  </Modal>,
);

export const examples: Example[] = [
  ex(
    "Sizes",
    `<Modal size="sm">
  <ModalTrigger variant="secondary">Small</ModalTrigger>
  <ModalContent title="Small modal" actions={<ModalClose>Close</ModalClose>}>
    Compact content.
  </ModalContent>
</Modal>
<Modal size="md">
  <ModalTrigger variant="secondary">Medium</ModalTrigger>
  <ModalContent title="Medium modal" actions={<ModalClose>Close</ModalClose>}>
    The default width.
  </ModalContent>
</Modal>
<Modal size="lg">
  <ModalTrigger variant="secondary">Large</ModalTrigger>
  <ModalContent title="Large modal" actions={<ModalClose>Close</ModalClose>}>
    More room for a form or a table.
  </ModalContent>
</Modal>`,
    <Stack direction="row" gap="3" wrap>
      <Modal size="sm">
        <ModalTrigger variant="secondary">Small</ModalTrigger>
        <ModalContent title="Small modal" actions={<ModalClose>Close</ModalClose>}>
          Compact content.
        </ModalContent>
      </Modal>
      <Modal size="md">
        <ModalTrigger variant="secondary">Medium</ModalTrigger>
        <ModalContent title="Medium modal" actions={<ModalClose>Close</ModalClose>}>
          The default width.
        </ModalContent>
      </Modal>
      <Modal size="lg">
        <ModalTrigger variant="secondary">Large</ModalTrigger>
        <ModalContent title="Large modal" actions={<ModalClose>Close</ModalClose>}>
          More room for a form or a table.
        </ModalContent>
      </Modal>
    </Stack>,
    "Widths come from the container tokens. The panel never grows past the viewport.",
  ),
  ex(
    "Colors",
    `<Modal color="neutral">
  <ModalTrigger variant="secondary">Neutral</ModalTrigger>
  <ModalContent title="Neutral header" actions={<ModalClose>Close</ModalClose>}>
    The default. Use it for content and forms.
  </ModalContent>
</Modal>
<Modal color="warning">
  <ModalTrigger variant="secondary">Warning</ModalTrigger>
  <ModalContent title="Warning header" actions={<ModalClose>Close</ModalClose>}>
    Tints only the header icon, tagline and title.
  </ModalContent>
</Modal>
<Modal role="alertdialog" color="critical" description="This permanently removes the project and its data.">
  <ModalTrigger variant="danger">Critical</ModalTrigger>
  <ModalContent
    title="Delete project?"
    actions={
      <>
        <ModalClose>Cancel</ModalClose>
        <ModalClose variant="danger">Delete</ModalClose>
      </>
    }
  >
    The body and footer stay neutral.
  </ModalContent>
</Modal>`,
    <Stack direction="row" gap="3" wrap>
      <Modal color="neutral">
        <ModalTrigger variant="secondary">Neutral</ModalTrigger>
        <ModalContent title="Neutral header" actions={<ModalClose>Close</ModalClose>}>
          The default. Use it for content and forms.
        </ModalContent>
      </Modal>
      <Modal color="warning">
        <ModalTrigger variant="secondary">Warning</ModalTrigger>
        <ModalContent title="Warning header" actions={<ModalClose>Close</ModalClose>}>
          Tints only the header icon, tagline and title.
        </ModalContent>
      </Modal>
      <Modal
        role="alertdialog"
        color="critical"
        description="This permanently removes the project and its data."
      >
        <ModalTrigger variant="danger">Critical</ModalTrigger>
        <ModalContent
          title="Delete project?"
          actions={
            <>
              <ModalClose>Cancel</ModalClose>
              <ModalClose variant="danger">Delete</ModalClose>
            </>
          }
        >
          The body and footer stay neutral.
        </ModalContent>
      </Modal>
    </Stack>,
    "Each color has its own icon shape. Critical normally goes with role=alertdialog.",
  ),
  ex(
    "Choosing a role",
    `<Modal role="dialog">
  <ModalTrigger variant="secondary">Edit content</ModalTrigger>
  <ModalContent title="Edit content" actions={<ModalClose>Done</ModalClose>}>
    A dialog for content and forms. Outside click closes it.
  </ModalContent>
</Modal>
<Modal role="alertdialog" description="Your unsaved changes will be lost.">
  <ModalTrigger variant="secondary">Ask before discarding</ModalTrigger>
  <ModalContent
    title="Discard changes?"
    actions={
      <>
        <ModalClose>Keep editing</ModalClose>
        <ModalClose variant="danger">Discard</ModalClose>
      </>
    }
  >
    An alert dialog for a decision that interrupts. Outside click never closes it.
  </ModalContent>
</Modal>`,
    <Stack direction="row" gap="3" wrap>
      <Modal role="dialog">
        <ModalTrigger variant="secondary">Edit content</ModalTrigger>
        <ModalContent title="Edit content" actions={<ModalClose>Done</ModalClose>}>
          A dialog for content and forms. Outside click closes it.
        </ModalContent>
      </Modal>
      <Modal role="alertdialog" description="Your unsaved changes will be lost.">
        <ModalTrigger variant="secondary">Ask before discarding</ModalTrigger>
        <ModalContent
          title="Discard changes?"
          actions={
            <>
              <ModalClose>Keep editing</ModalClose>
              <ModalClose variant="danger">Discard</ModalClose>
            </>
          }
        >
          An alert dialog for a decision that interrupts. Outside click never closes it.
        </ModalContent>
      </Modal>
    </Stack>,
    "Choose the role by behavior: dialog for content and forms, alertdialog for a decision that interrupts.",
  ),
  ex(
    "Form with unsaved changes",
    `<Modal
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
    <form id="modal-profile-form" onSubmit={save}>
      <Field label="Name"><Input value={name} onChange={changeName} /></Field>
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
        actions={<><ModalClose>Keep editing</ModalClose><Button variant="danger" onClick={discard}>Discard</Button></>}
      >
        The name change has not been saved.
      </ModalContent>
    </Modal>
  </ModalContent>
</Modal>`,
    <ModalFormExample />,
    "The form lives in the body. onBeforeClose returns false, opens a confirmation, and the submit button targets the form through `form`.",
  ),
  ex(
    "Nested confirmation",
    `<Modal open={open} onOpenChange={setOpen}>
  <ModalTrigger variant="secondary">Project settings</ModalTrigger>
  <ModalContent
    title="Project settings"
    actions={
      <>
        <ModalClose>Close</ModalClose>
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete project</Button>
      </>
    }
  >
    <Text>Deleting the project also removes its members and data.</Text>
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
            <Button variant="danger" onClick={deleteProject}>Delete</Button>
          </>
        }
      >
        Every member loses access immediately.
      </ModalContent>
    </Modal>
  </ModalContent>
</Modal>`,
    <ModalNestedExample />,
    "The confirmation opens on top of the modal that asked for it. The parent stays inert until it closes.",
  ),
];
