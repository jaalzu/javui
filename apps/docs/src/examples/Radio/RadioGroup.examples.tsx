import { FieldSet, Radio, RadioGroup, Stack, VisuallyHidden } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const hiddenLegend = (text: string) => <VisuallyHidden>{text}</VisuallyHidden>;

export const hero = defineHero(
  `<RadioGroup legend="Plan" defaultValue="starter">
  <Radio value="starter" label="Starter" />
  <Radio value="business" label="Business" />
  <Radio value="team" label="Team" />
</RadioGroup>`,
  <Stack align="center" justify="center">
    <RadioGroup legend="Plan" defaultValue="starter">
      <Radio value="starter" label="Starter" />
      <Radio value="business" label="Business" />
      <Radio value="team" label="Team" />
    </RadioGroup>
  </Stack>,
);

export const examples: Example[] = [
  ex(
    "Basic",
    `<RadioGroup legend="Plan" defaultValue="option-one">
  <Radio value="option-one" label="Option One" />
  <Radio value="option-two" label="Option Two" />
</RadioGroup>`,
    <Stack align="center" justify="center">
      <RadioGroup legend="Plan" defaultValue="option-one">
        <Radio value="option-one" label="Option One" />
        <Radio value="option-two" label="Option Two" />
      </RadioGroup>
    </Stack>,
    "One option is selected at a time, and the whole label is clickable.",
  ),
  ex(
    "Description",
    `<RadioGroup legend={<VisuallyHidden>Notification frequency</VisuallyHidden>} defaultValue="weekly">
  <Radio value="daily" label="Daily" description="A short summary every morning." />
  <Radio value="weekly" label="Weekly" description="A digest every Monday." />
</RadioGroup>`,
    <Stack align="center" justify="center">
      <RadioGroup legend={hiddenLegend("Notification frequency")} defaultValue="weekly">
        <Radio value="daily" label="Daily" description="A short summary every morning." />
        <Radio value="weekly" label="Weekly" description="A digest every Monday." />
      </RadioGroup>
    </Stack>,
    "Supporting text stays with each option while the group remains visually simple.",
  ),
  ex(
    "Fieldset",
    `<FieldSet legend="Delivery preferences" description="Select one delivery method.">
  <RadioGroup legend={<VisuallyHidden>Delivery method</VisuallyHidden>} defaultValue="email">
    <Radio value="email" label="Email" />
    <Radio value="push" label="Push notification" />
  </RadioGroup>
</FieldSet>`,
    <Stack align="center" justify="center">
      <FieldSet legend="Delivery preferences" description="Select one delivery method.">
        <RadioGroup legend={hiddenLegend("Delivery method")} defaultValue="email">
          <Radio value="email" label="Email" />
          <Radio value="push" label="Push notification" />
        </RadioGroup>
      </FieldSet>
    </Stack>,
    "FieldSet provides the section context; the inner group keeps its accessible legend without repeating it visually.",
  ),
  ex(
    "Disabled",
    `<RadioGroup legend={<VisuallyHidden>Available options</VisuallyHidden>} defaultValue="starter" disabled>
  <Radio value="starter" label="Starter" />
  <Radio value="business" label="Business" />
</RadioGroup>`,
    <Stack align="center" justify="center">
      <RadioGroup legend={hiddenLegend("Available options")} defaultValue="starter" disabled>
        <Radio value="starter" label="Starter" />
        <Radio value="business" label="Business" />
      </RadioGroup>
    </Stack>,
    "Disable the group when the choice is unavailable in the current state.",
  ),
  ex(
    "Invalid",
    `<RadioGroup legend={<VisuallyHidden>Plan</VisuallyHidden>} aria-invalid="true">
  <Radio value="starter" label="Starter" />
  <Radio value="business" label="Business" />
</RadioGroup>`,
    <Stack align="center" justify="center">
      <RadioGroup legend={hiddenLegend("Plan")} aria-invalid="true">
        <Radio value="starter" label="Starter" />
        <Radio value="business" label="Business" />
      </RadioGroup>
    </Stack>,
    "Invalid radios and labels use a stronger danger treatment without an extra error sentence.",
  ),
  ex(
    "Choice card",
    `<RadioGroup legend="Plan" defaultValue="business">
  <Radio value="starter" label="Starter" description="For personal projects." variant="card" />
  <Radio value="business" label="Business" description="For growing teams." variant="card" />
</RadioGroup>`,
    <Stack align="center" justify="center">
      <RadioGroup legend="Plan" defaultValue="business">
        <Radio value="starter" label="Starter" description="For personal projects." variant="card" />
        <Radio value="business" label="Business" description="For growing teams." variant="card" />
      </RadioGroup>
    </Stack>,
    "The selected choice card keeps a visible surface instead of becoming transparent.",
  ),
];
