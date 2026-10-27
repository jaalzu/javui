import { Progress } from "@/ui";
import { ex, type Example } from "@/docs/example";

export const examples: Example[] = [
    ex("Determinate", `<Progress label="Uploading" value={40} />`, <Progress label="Uploading" value={40} />),
    ex("Indeterminate", `<Progress label="Working" value={null} />`, <Progress label="Working" value={null} />, "Use null when you do not know how long it will take."),
];
