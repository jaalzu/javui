import { Button, Field, Input, Sheet, Stack, Text } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Sheet
  trigger="Open filters"
  closeLabel="Close filters"
  title="Filters"
  description="Narrow the results."
  footer={<Button size="sm">Apply filters</Button>}
>
  <Field label="Search">
    <Input placeholder="Search projects" />
  </Field>
</Sheet>`,
  <Sheet
    trigger="Open filters"
    closeLabel="Close filters"
    title="Filters"
    description="Narrow the results."
    footer={<Button size="sm">Apply filters</Button>}
  >
    <Field label="Search">
      <Input placeholder="Search projects" />
    </Field>
  </Sheet>,
);

export const examples: Example[] = [
  ex(
    "Form sheet",
    `<Sheet
  trigger="Open profile sheet"
  title="Edit profile"
  description="Make changes to your profile here."
  footer={<Button size="sm">Save profile</Button>}
>
  <Field label="Name">
    <Input defaultValue="Ada Lovelace" />
  </Field>
</Sheet>`,
    <Sheet
      trigger="Open profile sheet"
      closeLabel="Close profile sheet"
      title="Edit profile"
      description="Make changes to your profile here."
      footer={<Button size="sm">Save profile</Button>}
    >
      <Field label="Name">
        <Input defaultValue="Ada Lovelace" />
      </Field>
    </Sheet>,
    "Use a sheet for secondary tasks that can stay beside the page context.",
  ),
  ex(
    "Sides",
    `<Stack direction="row" gap="2" wrap>
  <Sheet trigger="Top" side="top" title="Workspace notifications"
    description="Decide how this workspace keeps everyone informed."
    closeLabel="Close top" footer={<Button size="sm">Save preferences</Button>}>
    <Stack gap="4">
      <Text>This sheet explains the notification defaults for the current workspace.</Text>
      <Text>Product updates are sent when a feature reaches general availability.</Text>
      <Text>Digest emails summarize activity from the last seven days.</Text>
    </Stack>
  </Sheet>
  <Sheet trigger="Right" side="right" title="Project access"
    description="Review who can see and edit this project."
    closeLabel="Close right" footer={<Button size="sm">Update access</Button>}>
    <Stack gap="4">
      <Text>This panel lists the people and groups with access to the project.</Text>
      <Text>Editors can change files, comments and project settings.</Text>
      <Text>When you remove access, the change applies immediately.</Text>
    </Stack>
  </Sheet>
  <Sheet trigger="Bottom" side="bottom" title="Export workspace data"
    description="Download a copy of everything in this workspace."
    closeLabel="Close bottom" footer={<Button size="sm">Start export</Button>}>
    <Stack gap="4">
      <Text>The export includes projects, comments, attachments and membership history.</Text>
      <Text>Large workspaces are prepared in the background.</Text>
      <Text>Exports exclude passwords, tokens and items past their retention window.</Text>
    </Stack>
  </Sheet>
  <Sheet trigger="Left" side="left" title="Account settings"
    description="Manage the details connected to your profile."
    closeLabel="Close left" footer={<Button size="sm">Save changes</Button>}>
    <Stack gap="4">
      <Text>Your display name and photo appear next to every comment and mention.</Text>
      <Text>Email addresses are used for sign-in, security alerts and invitations.</Text>
      <Text>Language and timezone affect dates and the order of weekly summaries.</Text>
    </Stack>
  </Sheet>
</Stack>`,
    <Stack direction="row" gap="2" wrap>
      <Sheet
        trigger="Top"
        side="top"
        title="Workspace notifications"
        description="Decide how this workspace keeps everyone informed."
        closeLabel="Close top"
        footer={<Button size="sm">Save preferences</Button>}
      >
        <Stack gap="4">
          <Text>This sheet explains the notification defaults for the current workspace. Changes apply to every member who has not chosen personal preferences yet.</Text>
          <Text>Product updates are sent when a feature reaches general availability. Security notices are always delivered and cannot be turned off because they affect access to your account.</Text>
          <Text>Digest emails summarize activity from the last seven days. They arrive on Monday morning in the timezone configured for the workspace, and they include only projects you can already access.</Text>
        </Stack>
      </Sheet>
      <Sheet
        trigger="Right"
        side="right"
        title="Project access"
        description="Review who can see and edit this project."
        closeLabel="Close right"
        footer={<Button size="sm">Update access</Button>}
      >
        <Stack gap="4">
          <Text>This panel lists the people and groups with access to the project, including inherited access from the parent workspace and any exceptions granted for this project alone.</Text>
          <Text>Editors can change files, comments and project settings. Viewers can read everything but cannot leave feedback or download source files until an editor enables sharing for their account.</Text>
          <Text>When you remove access, the change applies immediately. Sessions that are already open close on the next request, and any links created by that person stop working.</Text>
        </Stack>
      </Sheet>
      <Sheet
        trigger="Bottom"
        side="bottom"
        title="Export workspace data"
        description="Download a copy of everything in this workspace."
        closeLabel="Close bottom"
        footer={<Button size="sm">Start export</Button>}
      >
        <Stack gap="4">
          <Text>The export includes projects, comments, attachments and a history of membership changes. Files are packaged in an archive that can be opened with any standard tool.</Text>
          <Text>Large workspaces are prepared in the background. When the archive is ready, we send one email with a link that stays valid for seven days, and we never attach the archive directly.</Text>
          <Text>Exports exclude passwords, authentication tokens and deleted items that have already passed the retention window. If you need an audit record, request it from the security page instead.</Text>
        </Stack>
      </Sheet>
      <Sheet
        trigger="Left"
        side="left"
        title="Account settings"
        description="Manage the details connected to your profile."
        closeLabel="Close left"
        footer={<Button size="sm">Save changes</Button>}
      >
        <Stack gap="4">
          <Text>Your display name and photo appear next to every comment, mention and review. They are visible to everyone who shares a workspace with you, even when a project is private.</Text>
          <Text>Email addresses are used for sign-in, security alerts and workspace invitations. Add a second address before removing the original one so you never lose access to the account.</Text>
          <Text>Language and timezone affect dates, notifications and the order in which weekly summaries are sent. They do not change the language of content written by other people.</Text>
        </Stack>
      </Sheet>
    </Stack>,
    "Sheets can enter from any edge. Keep the title, subtitle and body copy together so the panel reads as one task.",
  ),
  ex(
    "Without a close button",
    `<Sheet
  trigger="Open compact sheet"
  title="Compact sheet"
  showCloseButton={false}
  closeLabel="Close compact sheet"
>
  <Text>Close with Escape, outside click, or the action below.</Text>
</Sheet>`,
    <Sheet
      trigger="Open compact sheet"
      title="Compact sheet"
      showCloseButton={false}
      closeLabel="Close compact sheet"
      footer={<Button size="sm">Done</Button>}
    >
      <Text>Close with Escape, outside click, or the action below.</Text>
    </Sheet>,
    "The built-in close button can be omitted when the footer owns the action.",
  ),
  ex(
    "Scrollable body with fixed footer",
    `<Sheet
  trigger="Open project details"
  title="Project details"
  footer={<Button size="sm">Done</Button>}
>
  <Stack gap="4">
    <Text>Long content scrolls in the sheet body.</Text>
    <Text>The footer stays visible while you review it.</Text>
  </Stack>
</Sheet>`,
    <Sheet
      trigger="Open project details"
      closeLabel="Close project details"
      title="Project details"
      footer={<Button size="sm">Done</Button>}
    >
      <Stack gap="4">
        {Array.from({ length: 8 }, (_, index) => (
          <Text key={index} size="sm">
            {index + 1}. Project details remain available while the body scrolls.
          </Text>
        ))}
      </Stack>
    </Sheet>,
    "The sheet uses the same header/body/footer rhythm as Modal, with the footer kept outside the scroll region.",
  ),
];
