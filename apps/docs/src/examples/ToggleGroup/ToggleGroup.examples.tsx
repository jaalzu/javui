import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@javui/ui";
import { Stack, ToggleGroup, ToggleGroupItem } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import { ToggleGroupFontWeightExample } from "./ToggleGroupFontWeightExample";

const iconItems = [
  { value: "bold", icon: <TextBIcon />, label: "Bold" },
  { value: "italic", icon: <TextItalicIcon />, label: "Italic" },
  { value: "underline", icon: <TextUnderlineIcon />, label: "Underline" },
];

const iconGroup = (multiple = false, showLabels = false) => (
  <ToggleGroup
    aria-label="Text style"
    multiple={multiple}
    defaultValue={["bold"]}
  >
    {iconItems.map((item) => (
      <ToggleGroupItem
        key={item.value}
        value={item.value}
        startIcon={item.icon}
        aria-label={showLabels ? undefined : item.label}
      >
        {showLabels ? item.label : null}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);

export const hero = defineHero(
  `<ToggleGroup aria-label="Text style" multiple defaultValue={["bold"]}>
  <ToggleGroupItem value="bold" startIcon={<TextBIcon />}>Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic" startIcon={<TextItalicIcon />}>Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline" startIcon={<TextUnderlineIcon />}>Underline</ToggleGroupItem>
</ToggleGroup>`,
  iconGroup(true, true),
);

export const examples: Example[] = [
  ex(
    "Spacing",
    `<Stack gap="4">
  <ToggleGroup aria-label="Connected" spacing="none">...</ToggleGroup>
  <ToggleGroup aria-label="Compact" spacing="sm">...</ToggleGroup>
  <ToggleGroup aria-label="Default" spacing="md">...</ToggleGroup>
</Stack>`,
    <Stack gap="4">
      {(["none", "sm", "md"] as const).map((spacing) => (
        <ToggleGroup key={spacing} aria-label={`${spacing} spacing`} spacing={spacing}>
          {iconItems.map((item) => (
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              startIcon={item.icon}
              aria-label={item.label}
            />
          ))}
        </ToggleGroup>
      ))}
    </Stack>,
    "`spacing` sets the space between items. `none` removes the gap.",
  ),
  ex(
    "Vertical",
    `<ToggleGroup aria-label="Text style" multiple variant="default" orientation="vertical" defaultValue={["bold"]}>
  <ToggleGroupItem value="bold" startIcon={<TextBIcon />} aria-label="Bold" />
  <ToggleGroupItem value="italic" startIcon={<TextItalicIcon />} aria-label="Italic" />
  <ToggleGroupItem value="underline" startIcon={<TextUnderlineIcon />} aria-label="Underline" />
</ToggleGroup>`,
    <ToggleGroup aria-label="Text style" multiple variant="default" orientation="vertical" defaultValue={["bold"]}>
      {iconItems.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          startIcon={item.icon}
          aria-label={item.label}
        />
      ))}
    </ToggleGroup>,
    "Use `orientation=\"vertical\"` for vertical toggle groups.",
  ),
  ex(
    "Sizes",
    `<Stack gap="3">
  <ToggleGroup size="xs" aria-label="Extra small">...</ToggleGroup>
  <ToggleGroup size="sm" aria-label="Small">...</ToggleGroup>
  <ToggleGroup size="md" aria-label="Medium">...</ToggleGroup>
  <ToggleGroup size="lg" aria-label="Large">...</ToggleGroup>
</Stack>`,
    <Stack gap="3">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <ToggleGroup key={size} size={size} aria-label={`${size} text style`} defaultValue={["bold"]}>
          {iconItems.map((item) => (
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              startIcon={item.icon}
              aria-label={item.label}
            />
          ))}
        </ToggleGroup>
      ))}
    </Stack>,
    "Every item inherits the group's size, so you set it once.",
  ),
  ex(
    "Disabled",
    `<ToggleGroup aria-label="Text style" variant="default" disabled>
  <ToggleGroupItem value="bold" startIcon={<TextBIcon />} aria-label="Bold" />
  <ToggleGroupItem value="italic" startIcon={<TextItalicIcon />} aria-label="Italic" />
  <ToggleGroupItem value="underline" startIcon={<TextUnderlineIcon />} aria-label="Underline" />
</ToggleGroup>`,
    <ToggleGroup aria-label="Text style" variant="default" disabled>
      {iconItems.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          startIcon={item.icon}
          aria-label={item.label}
        />
      ))}
    </ToggleGroup>,
  ),
  ex(
    "Custom",
    `import { ToggleGroupFontWeightExample } from "./ToggleGroupFontWeightExample"

<ToggleGroupFontWeightExample />`,
    <ToggleGroupFontWeightExample />,
    "Combine a controlled toggle group with a Field label and description.",
  ),
];
