import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button";
import { Field } from "../Field";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "./Modal";

const meta = {
  title: "Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger variant="secondary">Open settings</ModalTrigger>
      <ModalContent
        title="Notifications"
        closeLabel="Close notifications"
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
        closeLabel="Close delete confirmation"
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
        closeLabel="Close large modal"
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
        closeLabel="Close storage warning"
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
    <Modal size="sm">
      <ModalTrigger variant="secondary">Edit profile</ModalTrigger>
      <ModalContent
        title="Edit profile"
        closeLabel="Close profile"
        description="Make changes to your profile here. Click save when you're done."
        actions={
          <>
            <ModalClose variant="ghost">Cancel</ModalClose>
            <Button size="sm" type="submit" form="modal-story-form">Save changes</Button>
          </>
        }
      >
        <form id="modal-story-form">
          <Stack gap="3">
            <Field label="Name"><Input size="sm" autoComplete="name" /></Field>
            <Field label="Email"><Input size="sm" type="email" autoComplete="email" /></Field>
          </Stack>
        </form>
      </ModalContent>
    </Modal>
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <Modal>
      <ModalTrigger variant="secondary">View conditions and terms</ModalTrigger>
      <ModalContent
        title="Conditions and terms"
        closeLabel="Close terms"
        description="Please review the terms before continuing."
        actions={<ModalClose>Close terms</ModalClose>}
      >
        <Stack gap="4">
          {Array.from({ length: 10 }, (_, index) => (
            <Text key={index} size="sm">
              {index + 1}. These conditions explain how access, content and support are handled.
            </Text>
          ))}
        </Stack>
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
          closeLabel="Close touch targets"
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
        closeLabel="Close notifications"
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
