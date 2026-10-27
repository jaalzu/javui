import { defineHero, type Example } from "@/docs/example";
import { ToastDemo } from "./ToastDemo";

export const hero = defineHero(
  `<Button onClick={() => show({ title: "Saved", tone: "success" })}>
  Show a toast
</Button>`,
  <ToastDemo />,
);

export const examples: Example[] = [];
