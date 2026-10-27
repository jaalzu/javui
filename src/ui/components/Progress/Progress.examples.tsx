import { Progress } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Progress label="Uploading" value={40} />`,
  <Progress label="Uploading" value={40} />,
);

export const examples: Example[] = [
    ex("Determinate", `<Progress label="Uploading" value={40} />`, <Progress label="Uploading" value={40} />),
    ex("Indeterminate", `<Progress label="Working" value={null} />`, <Progress label="Working" value={null} />, "Use null when you do not know how long it will take."),
];
