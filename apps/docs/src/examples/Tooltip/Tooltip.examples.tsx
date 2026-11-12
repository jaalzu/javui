import { Button, CheckIcon, Kbd, Stack, Tooltip } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Tooltip.examples.module.css";

export const hero = defineHero(
  `<Tooltip content="Saved">
  <Button variant="secondary" aria-label="Saved" startIcon={<CheckIcon />} />
</Tooltip>`,
  <Tooltip content="Saved">
    <Button variant="secondary" aria-label="Saved" startIcon={<CheckIcon />} />
  </Tooltip>,
);

export const examples: Example[] = [
  ex(
    "Default",
    `<Tooltip content="Add to library">
  <Button variant="secondary">Hover</Button>
</Tooltip>`,
    <Tooltip content="Add to library">
      <Button variant="secondary">Hover</Button>
    </Tooltip>,
    "Appears on hover and on keyboard focus. The trigger keeps its own accessible name.",
  ),
  ex(
    "Side",
    `<Stack direction="row" gap="3" wrap>
  <Tooltip content="Add to library" side="left"><Button variant="secondary">Left</Button></Tooltip>
  <Tooltip content="Add to library" side="top"><Button variant="secondary">Top</Button></Tooltip>
  <Tooltip content="Add to library" side="bottom"><Button variant="secondary">Bottom</Button></Tooltip>
  <Tooltip content="Add to library" side="right"><Button variant="secondary">Right</Button></Tooltip>
</Stack>`,
    <Stack direction="row" gap="3" wrap>
      {(["left", "top", "bottom", "right"] as const).map((side) => (
        <Tooltip key={side} content="Add to library" side={side}>
          <Button variant="secondary">
            {side[0].toUpperCase() + side.slice(1)}
          </Button>
        </Tooltip>
      ))}
    </Stack>,
    "`side` is the preferred side. If there is no room, the tooltip flips to the opposite one.",
  ),
  ex(
    "With keyboard shortcut",
    `<Tooltip content={<span className={styles.shortcut}>Save Changes <Kbd variant="inverted">S</Kbd></span>}>
  <Button variant="secondary">Save</Button>
</Tooltip>`,
    <Tooltip
      content={
        <span className={styles.shortcut}>
          Save Changes <Kbd variant="inverted">S</Kbd>
        </span>
      }
    >
      <Button variant="secondary">Save</Button>
    </Tooltip>,
    "`content` accepts any node, so a shortcut can sit next to the label.",
  ),
  ex(
    "Delay",
    `<Stack direction="row" gap="3">
  <Tooltip content="Opens instantly" delay={0}><Button variant="secondary">No delay</Button></Tooltip>
  <Tooltip content="Opens after 1 second" delay={1000}><Button variant="secondary">1s delay</Button></Tooltip>
</Stack>`,
    <Stack direction="row" gap="3">
      <Tooltip content="Opens instantly" delay={0}>
        <Button variant="secondary">No delay</Button>
      </Tooltip>
      <Tooltip content="Opens after 1 second" delay={1000}>
        <Button variant="secondary">1s delay</Button>
      </Tooltip>
    </Stack>,
    "The first tooltip waits `delay`. Moving to another one right after opens it instantly. Set a default once with `TooltipProvider`.",
  ),
  ex(
    "Disabled button",
    `<Tooltip content="This feature is not available yet">
  <span>
    <Button variant="secondary" disabled>Disabled</Button>
  </span>
</Tooltip>`,
    <Tooltip content="This feature is not available yet">
      <span className={styles.disabledWrapper}>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </span>
    </Tooltip>,
    "A disabled button does not receive hover or focus. Wrap it in a focusable `span` so the tooltip can open.",
  ),
];
