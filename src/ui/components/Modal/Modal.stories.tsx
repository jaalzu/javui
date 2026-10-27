import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button";
import { Field } from "../Field";
import { Input } from "../Input";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "./Modal";

const meta = {
  title: "Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger variant="secondary">Open settings</ModalTrigger>
      <ModalContent
        title="Notifications"
        description="Choose what you want to hear about."
        actions={<ModalClose>Close</ModalClose>}
      >
        Notification settings would go here.
      </ModalContent>
    </Modal>
  ),
};

export const Decision: Story = {
  name: "Alert dialog",
  render: () => (
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
        Every member loses access immediately.
      </ModalContent>
    </Modal>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Modal size="lg">
      <ModalTrigger variant="secondary">Open large modal</ModalTrigger>
      <ModalContent
        title="Large modal"
        actions={<ModalClose>Close</ModalClose>}
      >
        More room for a form, a table or a longer explanation.
      </ModalContent>
    </Modal>
  ),
};

export const Colors: Story = {
  render: () => (
    <Modal color="warning">
      <ModalTrigger variant="secondary">Open warning modal</ModalTrigger>
      <ModalContent
        title="Storage almost full"
        tagline="Warning"
        actions={<ModalClose>Close</ModalClose>}
      >
        The header is tinted, but the body and footer stay neutral.
      </ModalContent>
    </Modal>
  ),
};

export const Form: Story = {
  render: () => (
    <Modal>
      <ModalTrigger variant="secondary">Edit profile</ModalTrigger>
      <ModalContent
        title="Edit profile"
        actions={
          <>
            <ModalClose>Cancel</ModalClose>
            <Button type="submit" form="modal-story-form">Save changes</Button>
          </>
        }
      >
        <form id="modal-story-form">
          <Field label="Name"><Input autoComplete="name" /></Field>
        </form>
      </ModalContent>
    </Modal>
  ),
};

export const TouchTargets: Story = {
  name: "Touch targets",
  render: () => (
    <div data-touch-debug>
      <Modal defaultOpen>
        <ModalTrigger variant="secondary">Open modal</ModalTrigger>
        <ModalContent
          title="Touch targets"
          actions={<ModalClose>Close</ModalClose>}
        >
          The close and footer buttons keep their comfortable hit areas.
        </ModalContent>
      </Modal>
    </div>
  ),
};

export const OpenOnLoadDark: Story = {
  name: "Open (dark)",
  globals: { theme: "dark" },
  render: () => (
    <Modal defaultOpen>
      <ModalTrigger variant="secondary">Open settings</ModalTrigger>
      <ModalContent
        title="Notifications"
        description="Choose what you want to hear about."
        actions={<ModalClose>Close</ModalClose>}
      >
        Notification settings would go here.
      </ModalContent>
    </Modal>
  ),
};

export const OpenOnLoadLight: Story = {
  name: "Open (light)",
  globals: { theme: "light" },
  render: OpenOnLoadDark.render,
};
