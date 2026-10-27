import { Button, CheckIcon, Stack } from "@/ui";
import { ex, type Example } from "@/docs/example";

const check = <CheckIcon />;

export const examples: Example[] = [
    ex("Primary", `<Button>Save</Button>`, <Button>Save</Button>, "The main action of a view. Use only one."),
    ex("Secondary", `<Button variant="secondary">Cancel</Button>`, <Button variant="secondary">Cancel</Button>),
    ex("Ghost", `<Button variant="ghost">Skip</Button>`, <Button variant="ghost">Skip</Button>, "Low emphasis, for actions that should not compete."),
    ex("Outline", `<Button variant="outline">Learn more</Button>`, <Button variant="outline">Learn more</Button>, "A transparent button with a visible border."),
    ex("Accent", `<Button variant="accent">Upgrade</Button>`, <Button variant="accent">Upgrade</Button>, "Brand emphasis. This is the color you change for your brand."),
    ex("Danger", `<Button variant="danger">Delete</Button>`, <Button variant="danger">Delete</Button>, "Destructive actions."),
    ex(
      "Size",
      `<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`,
      <Stack direction="row" gap="3" align="center" wrap><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></Stack>,
    ),
    ex("Disabled", `<Button disabled>Disabled</Button>`, <Button disabled>Disabled</Button>),
    ex(
      "Loading",
      `<Button loading>Saving</Button>`,
      <Button loading>Saving</Button>,
      "Shows a spinner and ignores clicks while an action runs. It keeps its label and stays focusable.",
    ),
    ex(
      "With icon",
      `<Button variant="secondary" startIcon={<CheckIcon />}>Done</Button>`,
      <Button variant="secondary" startIcon={check}>Done</Button>,
      "Icons are decorative when there is text next to them.",
    ),
    ex(
      "Icon only",
      `<Button variant="secondary" aria-label="Done" startIcon={<CheckIcon />} />`,
      <Button variant="secondary" aria-label="Done" startIcon={check} />,
      "Always give an icon-only button an accessible name.",
    ),
];
