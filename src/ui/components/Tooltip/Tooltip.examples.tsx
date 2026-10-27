import { Button, CheckIcon, Tooltip } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Tooltip content="Saved">
  <Button variant="secondary" aria-label="Saved" startIcon={<CheckIcon />} />
</Tooltip>`,
  <Tooltip content="Saved">
    <Button variant="secondary" aria-label="Saved" startIcon={<CheckIcon />} />
  </Tooltip>,
);

export const examples: Example[] = [];
