import { Modal, ModalClose, ModalContent, ModalTrigger, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import { ModalFormExample, ModalTermsExample } from "./ModalExampleScenarios";

export const hero = defineHero(
  `<Modal
  role="alertdialog"
  color="critical"
  description="This permanently removes the project and its data. This cannot be undone."
>
  <ModalTrigger variant="danger">Delete project</ModalTrigger>
  <ModalContent
    title="Delete project?"
    closeLabel="Close delete confirmation"
    actions={
      <>
        <ModalClose>Cancel</ModalClose>
        <ModalClose variant="danger">Delete</ModalClose>
      </>
    }
  />
</Modal>`,
  <Modal
    role="alertdialog"
    color="critical"
    description="This permanently removes the project and its data. This cannot be undone."
  >
    <ModalTrigger variant="danger">Delete project</ModalTrigger>
    <ModalContent
      title="Delete project?"
      closeLabel="Close delete confirmation"
      actions={
        <>
          <ModalClose>Cancel</ModalClose>
          <ModalClose variant="danger">Delete</ModalClose>
        </>
      }
    />
  </Modal>,
);

export const examples: Example[] = [
  ex(
    "Sizes",
    `<Modal size="xs">
  <ModalTrigger variant="secondary">Extra small</ModalTrigger>
  <ModalContent title="Extra-small modal" closeLabel="Close extra-small modal" actions={<ModalClose>Close</ModalClose>}>
    A compact confirmation.
  </ModalContent>
</Modal>
<Modal size="sm">
  <ModalTrigger variant="secondary">Small</ModalTrigger>
  <ModalContent title="Small modal" closeLabel="Close small modal" actions={<ModalClose>Close</ModalClose>}>
    Compact content.
  </ModalContent>
</Modal>
<Modal size="md">
  <ModalTrigger variant="secondary">Medium</ModalTrigger>
  <ModalContent title="Medium modal" closeLabel="Close medium modal" actions={<ModalClose>Close</ModalClose>}>
    The default width.
  </ModalContent>
</Modal>
<Modal size="lg">
  <ModalTrigger variant="secondary">Large</ModalTrigger>
  <ModalContent title="Large modal" closeLabel="Close large modal" actions={<ModalClose>Close</ModalClose>}>
    More room for a form or a table.
  </ModalContent>
</Modal>
<Modal size="xl">
  <ModalTrigger variant="secondary">Extra large</ModalTrigger>
  <ModalContent title="Extra-large modal" closeLabel="Close extra-large modal" actions={<ModalClose>Close</ModalClose>}>
    Extra room for complex forms and tables.
  </ModalContent>
</Modal>`,
    <Stack direction="row" gap="3" wrap>
      <Modal size="xs">
        <ModalTrigger variant="secondary">Extra small</ModalTrigger>
        <ModalContent title="Extra-small modal" closeLabel="Close extra-small modal" actions={<ModalClose>Close</ModalClose>}>
          A compact confirmation.
        </ModalContent>
      </Modal>
      <Modal size="sm">
        <ModalTrigger variant="secondary">Small</ModalTrigger>
        <ModalContent title="Small modal" closeLabel="Close small modal" actions={<ModalClose>Close</ModalClose>}>
          Compact content.
        </ModalContent>
      </Modal>
      <Modal size="md">
        <ModalTrigger variant="secondary">Medium</ModalTrigger>
        <ModalContent title="Medium modal" closeLabel="Close medium modal" actions={<ModalClose>Close</ModalClose>}>
          The default width.
        </ModalContent>
      </Modal>
      <Modal size="lg">
        <ModalTrigger variant="secondary">Large</ModalTrigger>
        <ModalContent title="Large modal" closeLabel="Close large modal" actions={<ModalClose>Close</ModalClose>}>
          More room for a form or a table.
        </ModalContent>
      </Modal>
      <Modal size="xl">
        <ModalTrigger variant="secondary">Extra large</ModalTrigger>
        <ModalContent title="Extra-large modal" closeLabel="Close extra-large modal" actions={<ModalClose>Close</ModalClose>}>
          Extra room for complex forms and tables.
        </ModalContent>
      </Modal>
    </Stack>,
    "Widths come from the layout width tokens. Color never changes the panel size, and xs/xl extend the scale.",
  ),
  ex(
    "Colors",
    `<Modal color="neutral">
  <ModalTrigger variant="secondary">Neutral</ModalTrigger>
  <ModalContent title="Neutral header" closeLabel="Close neutral modal" actions={<ModalClose>Close</ModalClose>}>
    The default. Use it for content and forms.
  </ModalContent>
</Modal>
<Modal color="warning">
  <ModalTrigger variant="secondary">Warning</ModalTrigger>
  <ModalContent title="Warning header" closeLabel="Close warning modal" actions={<ModalClose>Close</ModalClose>}>
    Tints the header tagline and title without changing the modal size.
  </ModalContent>
</Modal>
<Modal role="alertdialog" color="critical" description="This permanently removes the project and its data.">
  <ModalTrigger variant="danger">Critical</ModalTrigger>
  <ModalContent
    title="Delete project?"
    closeLabel="Close delete confirmation"
    actions={
      <>
        <ModalClose>Cancel</ModalClose>
        <ModalClose variant="danger">Delete</ModalClose>
      </>
    }
  />
</Modal>
<Modal color="brand">
  <ModalTrigger variant="accent">Custom</ModalTrigger>
  <ModalContent title="Custom color" closeLabel="Close custom color modal" actions={<ModalClose>Close</ModalClose>}>
    The title uses the custom brand color too.
  </ModalContent>
</Modal>`,
    <Stack direction="row" gap="3" wrap>
      <Modal color="neutral">
        <ModalTrigger variant="secondary">Neutral</ModalTrigger>
        <ModalContent title="Neutral header" closeLabel="Close neutral modal" actions={<ModalClose>Close</ModalClose>}>
          The default. Use it for content and forms.
        </ModalContent>
      </Modal>
      <Modal color="warning">
        <ModalTrigger variant="secondary">Warning</ModalTrigger>
        <ModalContent title="Warning header" closeLabel="Close warning modal" actions={<ModalClose>Close</ModalClose>}>
          Tints the header tagline and title without changing the modal size.
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
          closeLabel="Close delete confirmation"
          actions={
            <>
              <ModalClose>Cancel</ModalClose>
              <ModalClose variant="danger">Delete</ModalClose>
            </>
          }
        />
      </Modal>
      <Modal color="brand">
        <ModalTrigger variant="accent">Custom</ModalTrigger>
        <ModalContent
          title="Custom color"
          closeLabel="Close custom color modal"
          actions={<ModalClose>Close</ModalClose>}
        >
          The title uses the custom brand color too.
        </ModalContent>
      </Modal>
    </Stack>,
    "Color changes only the header tone; the custom example colors its title with the brand tone too.",
  ),
  ex(
    "Choosing a role",
    `<Modal role="dialog">
  <ModalTrigger variant="secondary">Edit content</ModalTrigger>
  <ModalContent title="Edit content" closeLabel="Close edit content" actions={<ModalClose>Done</ModalClose>}>
    A dialog for content and forms. Outside click closes it.
  </ModalContent>
</Modal>
<Modal role="alertdialog" description="Your unsaved changes will be lost.">
  <ModalTrigger variant="secondary">Ask before discarding</ModalTrigger>
  <ModalContent
    title="Discard changes?"
    closeLabel="Close discard confirmation"
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
        <ModalContent title="Edit content" closeLabel="Close edit content" actions={<ModalClose>Done</ModalClose>}>
          A dialog for content and forms. Outside click closes it.
        </ModalContent>
      </Modal>
      <Modal role="alertdialog" description="Your unsaved changes will be lost.">
        <ModalTrigger variant="secondary">Ask before discarding</ModalTrigger>
        <ModalContent
          title="Discard changes?"
          closeLabel="Close discard confirmation"
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
    `<Modal size="sm"
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
    actions={
      <>
        <ModalClose variant="ghost">Cancel</ModalClose>
        <Button size="sm" type="submit" form="modal-profile-form">Save changes</Button>
      </>
    }
  >
    <form id="modal-profile-form" onSubmit={save}>
      <Stack gap="3">
        <Field label="Name"><Input size="sm" value={name} onChange={changeName} /></Field>
        <Field label="Email"><Input size="sm" type="email" autoComplete="email" /></Field>
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
        actions={<><ModalClose variant="ghost">Keep editing</ModalClose><Button size="sm" variant="danger" onClick={discard}>Discard</Button></>}
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
    "Scrollable content with sticky footer",
    `<Modal size="sm">
  <ModalTrigger variant="secondary">View conditions and terms</ModalTrigger>
  <ModalContent
    title="Conditions and terms"
    closeLabel="Close terms"
    description="Please review the terms before continuing."
    actions={<ModalClose>Close terms</ModalClose>}
  >
    <Stack gap="4">
      <Text>By continuing, you agree to these conditions.</Text>
      <Text>Keep your account information accurate.</Text>
      <Text>Use the service responsibly.</Text>
      <Text>Review all sections before continuing.</Text>
    </Stack>
  </ModalContent>
</Modal>`,
    <ModalTermsExample />,
    "Long content scrolls inside the body while the footer remains visible and reachable.",
    "lg",
  ),
];
