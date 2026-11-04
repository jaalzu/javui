import { Button, Field, Input, Sheet, Stack, Text } from "@/ui";
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
  <Sheet trigger="Top" side="top" title="Top" closeLabel="Close top">
    <Text>Top</Text>
  </Sheet>
  <Sheet trigger="Right" side="right" title="Right" closeLabel="Close right">
    <Text>Right</Text>
  </Sheet>
  <Sheet trigger="Bottom" side="bottom" title="Bottom" closeLabel="Close bottom">
    <Text>Bottom</Text>
  </Sheet>
  <Sheet trigger="Left" side="left" title="Left" closeLabel="Close left">
    <Text>Left</Text>
  </Sheet>
</Stack>`,
    <Stack direction="row" gap="2" wrap>
      <Sheet trigger="Top" side="top" title="Top" closeLabel="Close top">
        <Text>Top</Text>
      </Sheet>
      <Sheet trigger="Right" side="right" title="Right" closeLabel="Close right">
        <Text>Right</Text>
      </Sheet>
      <Sheet trigger="Bottom" side="bottom" title="Bottom" closeLabel="Close bottom">
        <Text>Bottom</Text>
      </Sheet>
      <Sheet trigger="Left" side="left" title="Left" closeLabel="Close left">
        <Text>Left</Text>
      </Sheet>
    </Stack>,
    "Choose a side.",
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
