import { Radio, RadioGroup } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<RadioGroup legend="Plan" defaultValue="free">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="team" label="Team" />
</RadioGroup>`,
  <RadioGroup legend="Plan" defaultValue="free">
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" />
    <Radio value="team" label="Team" />
  </RadioGroup>,
);

export const examples: Example[] = [];
