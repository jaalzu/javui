import { Field, Stack, Textarea } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Field label="Message">
  <Textarea rows={3} />
</Field>`,
  <Field label="Message">
    <Textarea rows={3} />
  </Field>,
);

export const examples: Example[] = [
  ex(
    "Default",
    `<Field label="Message">
  <Textarea rows={3} placeholder="Write your message…" />
</Field>`,
    <Field label="Message">
      <Textarea rows={3} placeholder="Write your message…" />
    </Field>,
  ),
  ex(
    "With description",
    `<Field label="Bio" description="Up to 200 characters.">
  <Textarea rows={4} maxLength={200} />
</Field>`,
    <Field label="Bio" description="Up to 200 characters.">
      <Textarea rows={4} maxLength={200} />
    </Field>,
  ),
  ex(
    "Inline",
    `<Textarea variant="inline" aria-label="Comment" placeholder="Add a comment…" />`,
    <Textarea
      variant="inline"
      aria-label="Comment"
      placeholder="Add a comment…"
    />,
    "Invisible at rest. Hover and focus show the same background as Input.",
  ),
  ex(
    "Ghost",
    `<Textarea variant="ghost" aria-label="Note" placeholder="Write a note…" />`,
    <Textarea variant="ghost" aria-label="Note" placeholder="Write a note…" />,
    "No background and no hover. Only the focus ring shows when the field is active.",
  ),
  ex(
    "Auto grow",
    `<Textarea resize="auto" rows={2} aria-label="Notes" placeholder="Keeps growing as you type…" />`,
    <Textarea
      resize="auto"
      rows={2}
      aria-label="Notes"
      placeholder="Keeps growing as you type…"
    />,
    '`resize="auto"` grows with the content. `rows` sets the minimum height.',
  ),
  ex(
    "Resize",
    `<Stack gap="4">
  <Field label="Vertical (default)"><Textarea resize="vertical" /></Field>
  <Field label="None"><Textarea resize="none" /></Field>
</Stack>`,
    <Stack gap="4">
      <Field label="Vertical (default)">
        <Textarea resize="vertical" />
      </Field>
      <Field label="None">
        <Textarea resize="none" />
      </Field>
    </Stack>,
  ),
  ex(
    "Required",
    `<Field label={<><span>Message</span> <span style={{ color: "var(--color-danger-foreground)" }} aria-hidden="true">*</span></>}>
  <Textarea rows={3} required />
</Field>`,
    <Field label={<><span>Message</span> <span style={{ color: "var(--color-danger-foreground)" }} aria-hidden="true">*</span></>}>
      <Textarea rows={3} required />
    </Field>,
  ),
  ex(
    "Invalid",
    `<Field label="Message" error="Write at least 20 characters.">
  <Textarea rows={3} defaultValue="Too short" />
</Field>`,
    <Field label="Message" error="Write at least 20 characters.">
      <Textarea rows={3} defaultValue="Too short" />
    </Field>,
    "Pass `error` to the Field so the message is announced and linked to the textarea.",
  ),
  ex(
    "Read only",
    `<Field label="Notes" readOnly>
  <Textarea defaultValue="Locked for review." />
</Field>`,
    <Field label="Notes" readOnly>
      <Textarea defaultValue="Locked for review." />
    </Field>,
  ),
  ex(
    "Loading",
    `<Field label="Summary" loading>
  <Textarea defaultValue="Generating a summary…" />
</Field>`,
    <Field label="Summary" loading>
      <Textarea defaultValue="Generating a summary…" />
    </Field>,
  ),
  ex(
    "Disabled",
    `<Field label="Message">
  <Textarea disabled defaultValue="You can't edit this." />
</Field>`,
    <Field label="Message">
      <Textarea disabled defaultValue="You can't edit this." />
    </Field>,
  ),
];
