import { Slider } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Slider label="Volume" defaultValue={40} />`,
  <Slider label="Volume" defaultValue={40} />,
);

export const examples: Example[] = [
    ex("Single", `<Slider label="Volume" defaultValue={40} />`, <Slider label="Volume" defaultValue={40} />),
    ex("Range", `<Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />`, <Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />),
    ex("Vertical", `<Slider label="Volume" defaultValue={40} orientation="vertical" />`, <Slider label="Volume" defaultValue={40} orientation="vertical" />, undefined, "lg"),
    ex("Disabled", `<Slider label="Volume" defaultValue={40} disabled />`, <Slider label="Volume" defaultValue={40} disabled />),
];
