import { Avatar, AvatarGroup, CheckIcon, GearIcon, Stack } from "@/ui";
import { ex, type Example } from "@/docs/example";

export const examples: Example[] = [
    ex("Sizes", `<Avatar name="Ada Lovelace" size="sm" />
<Avatar name="Ada Lovelace" />
<Avatar name="Ada Lovelace" size="lg" />`, <Stack direction="row" gap="3" align="center"><Avatar name="Ada Lovelace" size="sm" /><Avatar name="Ada Lovelace" /><Avatar name="Ada Lovelace" size="lg" /></Stack>),
    ex(
      "Status",
      `<Avatar name="Ada Lovelace" status="online" />
<Avatar name="Grace Hopper" status="away" />
<Avatar name="Alan Turing" status="busy" />
<Avatar name="Katherine Johnson" status="offline" />`,
      <Stack direction="row" gap="3" align="center"><Avatar name="Ada Lovelace" status="online" /><Avatar name="Grace Hopper" status="away" /><Avatar name="Alan Turing" status="busy" /><Avatar name="Katherine Johnson" status="offline" /></Stack>,
      "Each status has its own shape, and the state is appended to the accessible name.",
    ),
    ex(
      "Badge",
      `<Avatar name="Ada Lovelace" badge={<CheckIcon />} badgeLabel="Verified" />`,
      <Avatar name="Ada Lovelace" badge={<CheckIcon />} badgeLabel="Verified" />,
      "The badge label is required and appended to the accessible name.",
    ),
    ex(
      "Icon fallback",
      `<Avatar name="Build bot" icon={<GearIcon />} />`,
      <Avatar name="Build bot" icon={<GearIcon />} />,
      "Replaces the initials for bots or organizations while the name stays the accessible name.",
    ),
    ex(
      "AvatarGroup",
      `<AvatarGroup max={3} aria-label="Project members">
  <Avatar name="Ada Lovelace" />
  <Avatar name="Grace Hopper" />
  <Avatar name="Alan Turing" />
  <Avatar name="Katherine Johnson" />
  <Avatar name="Margaret Hamilton" />
</AvatarGroup>`,
      <AvatarGroup max={3} aria-label="Project members"><Avatar name="Ada Lovelace" /><Avatar name="Grace Hopper" /><Avatar name="Alan Turing" /><Avatar name="Katherine Johnson" /><Avatar name="Margaret Hamilton" /></AvatarGroup>,
      "Overlapping avatars share one size and collapse the rest into an accessible +N item.",
    ),
    ex("Sizes", `<Avatar name="Ada Lovelace" size="sm" />\n<Avatar name="Ada Lovelace" />\n<Avatar name="Ada Lovelace" size="lg" />`, <Stack direction="row" gap="3" align="center"><Avatar name="Ada Lovelace" size="sm" /><Avatar name="Ada Lovelace" /><Avatar name="Ada Lovelace" size="lg" /></Stack>),
];
