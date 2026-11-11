import { FloppyDiskIcon, TextBIcon, TextItalicIcon } from "@/ui/icons/icons.generated";
import { Stack, Toggle } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Toggle variant="outline" startIcon={<FloppyDiskIcon size="sm" />}>Save</Toggle>`,
  <Toggle variant="outline" startIcon={<FloppyDiskIcon size="sm" />}>Save</Toggle>,
);

export const examples: Example[] = [
  ex(
    "Outline",
    `<Stack direction="row" gap="3">
  <Toggle variant="outline" startIcon={<TextBIcon />}>Bold</Toggle>
  <Toggle variant="outline" startIcon={<TextItalicIcon />}>Italic</Toggle>
</Stack>`,
    <Stack direction="row" gap="3">
      <Toggle variant="outline" startIcon={<TextBIcon />}>Bold</Toggle>
      <Toggle variant="outline" startIcon={<TextItalicIcon />}>Italic</Toggle>
    </Stack>,
    "Use the outline treatment when the toggle needs a visible boundary.",
  ),
  ex(
    "With text",
    `<Toggle startIcon={<TextItalicIcon />}>Italic</Toggle>`,
    <Toggle startIcon={<TextItalicIcon />}>Italic</Toggle>,
    "The default treatment is borderless.",
  ),
  ex(
    "Sizes",
    `<Stack direction="row" gap="3" align="center" wrap>
  <Toggle variant="outline" size="xs">XS</Toggle>
  <Toggle variant="outline" size="sm">SM</Toggle>
  <Toggle variant="outline" size="md">MD</Toggle>
  <Toggle variant="outline" size="lg">LG</Toggle>
</Stack>`,
    <Stack direction="row" gap="3" align="center" wrap>
      <Toggle variant="outline" size="xs">XS</Toggle>
      <Toggle variant="outline" size="sm">SM</Toggle>
      <Toggle variant="outline" size="md">MD</Toggle>
      <Toggle variant="outline" size="lg">LG</Toggle>
    </Stack>,
    "Sizes follow `Button`.",
  ),
  ex(
    "Disabled",
    `<Stack direction="row" gap="3">
  <Toggle variant="outline" disabled>Off</Toggle>
  <Toggle variant="outline" disabled defaultPressed>On</Toggle>
</Stack>`,
    <Stack direction="row" gap="3">
      <Toggle variant="outline" disabled>Off</Toggle>
      <Toggle variant="outline" disabled defaultPressed>On</Toggle>
    </Stack>,
  ),
];
