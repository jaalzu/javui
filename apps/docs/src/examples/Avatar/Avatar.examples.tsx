import { Avatar, AvatarGroup, CheckIcon, GearIcon, Stack } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Stack direction="row" gap="3" align="center">
  <Avatar name="Ada Lovelace" />
  <Avatar name="Grace Hopper" src="/avatars/avatar-1.svg" />
  <Avatar name="Alan Turing" status="online" />
  <AvatarGroup aria-label="Project members">
    <Avatar name="Ada Lovelace" />
    <Avatar name="Grace Hopper" />
    <Avatar name="Alan Turing" />
    <Avatar name="Katherine Johnson" />
  </AvatarGroup>
</Stack>`,
  <Stack direction="row" gap="3" align="center">
    <Avatar name="Ada Lovelace" />
    <Avatar name="Grace Hopper" src="/avatars/avatar-4.svg" />
    <Avatar name="Alan Turing" status="online" />
    <AvatarGroup aria-label="Project members">
      <Avatar outline={false} name="Ada Lovelace" src="/avatars/avatar-1.svg" />
      <Avatar outline={false} name="Grace Hopper" src="/avatars/avatar-2.svg" />
      <Avatar outline={false} name="Alan Turing" src="/avatars/avatar-3.svg" />
    </AvatarGroup>
  </Stack>,
);

export const examples: Example[] = [
  ex(
    "Sizes",
    `<Avatar name="Ada Lovelace" size="xs" />
<Avatar name="Ada Lovelace" size="sm" />
<Avatar name="Ada Lovelace" />
<Avatar name="Ada Lovelace" size="lg" />
<Avatar name="Ada Lovelace" size="xl" />`,
    <Stack direction="row" gap="3" align="center">
      <Avatar name="Ada Lovelace" size="xs" />
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Ada Lovelace" />
      <Avatar name="Ada Lovelace" size="lg" />
      <Avatar name="Ada Lovelace" size="xl" />
    </Stack>,
    "Use the size prop to change the size of the avatar.",
  ),
  ex(
    "Badge",
    `<Avatar name="Ada Lovelace" status="online" />
<Avatar name="Grace Hopper" status="away" />
<Avatar name="Alan Turing" status="busy" />
<Avatar name="Katherine Johnson" status="offline" />`,
    <Stack direction="row" gap="3" align="center">
      <Avatar name="Ada Lovelace" status="online" />
      <Avatar name="Grace Hopper" status="away" />
      <Avatar name="Alan Turing" status="busy" />
      <Avatar name="Katherine Johnson" status="offline" />
    </Stack>,
    "You can add a badge to the avatar. The badge is placed at the bottom right of the avatar",
  ),
  ex(
    "Avatar badge",
    `<Avatar name="Ada Lovelace" badge={<CheckIcon />} badgeLabel="Verified" />
<Avatar name="Grace Hopper" badge={<GearIcon />} badgeLabel="Settings" />`,
    <Stack direction="row" gap="3" align="center">
      <Avatar
        name="Ada Lovelace"
        badge={<CheckIcon />}
        badgeLabel="Verified"
        src="/avatars/avatar-2.svg"
      />
      <Avatar
        name="Grace Hopper"
        badge={<GearIcon />}
        badgeLabel="Settings"
        src="/avatars/avatar-1.svg"
      />
    </Stack>,
    "You can also place an icon inside the AvatarBadge",
  ),
  ex(
    "AvatarGroup",
    `<Stack direction="row" gap="4" align="center">
  <AvatarGroup max={3} aria-label="Project members">
    <Avatar name="Ada Lovelace" />
    <Avatar name="Grace Hopper" />
    <Avatar name="Alan Turing" />
    <Avatar name="Katherine Johnson" />
    <Avatar name="Margaret Hamilton" />
  </AvatarGroup>
  <AvatarGroup max={3} aria-label="Project contributors">
    <Avatar name="Ada Lovelace" src="/avatars/avatar-1.svg" />
    <Avatar name="Grace Hopper" src="/avatars/avatar-2.svg" />
    <Avatar name="Alan Turing" src="/avatars/avatar-3.svg" />
    <Avatar name="Katherine Johnson" src="/avatars/avatar-4.svg" />
    <Avatar name="Margaret Hamilton" src="/avatars/avatar-1.svg" />
  </AvatarGroup>
</Stack>`,
    <Stack direction="row" gap="4" align="center">
      <AvatarGroup max={3} aria-label="Project members">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
        <Avatar name="Katherine Johnson" />
        <Avatar name="Margaret Hamilton" />
      </AvatarGroup>
      <AvatarGroup max={3} aria-label="Project contributors">
        <Avatar name="Ada Lovelace" src="/avatars/avatar-1.svg" />
        <Avatar name="Grace Hopper" src="/avatars/avatar-2.svg" />
        <Avatar name="Alan Turing" src="/avatars/avatar-3.svg" />
        <Avatar name="Katherine Johnson" src="/avatars/avatar-4.svg" />
        <Avatar name="Margaret Hamilton" src="/avatars/avatar-1.svg" />
      </AvatarGroup>
    </Stack>,
    "Use the AvatarGroup to add a group of avatars and AvatarGroupCount to add a N count to the group",
  ),
  ex(
    "Outline",
    `<Avatar name="Ada Lovelace" />
<Avatar name="Grace Hopper" outline={false} />
<Avatar name="Alan Turing" src="/avatars/avatar-1.svg" />
<Avatar name="Katherine Johnson" src="/avatars/avatar-2.svg" outline={false} />`,
    <Stack direction="row" gap="3" align="center">
      <Avatar name="Ada Lovelace" />
      <Avatar name="Grace Hopper" outline={false} />
      <Avatar name="Alan Turing" src="/avatars/avatar-1.svg" />
      <Avatar
        name="Katherine Johnson"
        src="/avatars/avatar-2.svg"
        outline={false}
      />
    </Stack>,
  ),
];
