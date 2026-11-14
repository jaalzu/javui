import { Slider } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Slider.examples.module.css";

export const hero = defineHero(
  `<Slider label="Volume" defaultValue={40} />`,
  <div className={styles.stage}><Slider label="Volume" defaultValue={40} /></div>,
);

export const examples: Example[] = [
    ex("Single", `<Slider label="Volume" defaultValue={40} />`, <div className={styles.stage}><Slider label="Volume" defaultValue={40} /></div>),
    ex("Range", `<Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />`, <div className={styles.stage}><Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} /></div>),
    ex("Vertical", `<Slider label="Volume" defaultValue={40} orientation="vertical" />`, <Slider label="Volume" defaultValue={40} orientation="vertical" />, undefined, "lg"),
    ex("Disabled", `<Slider label="Volume" defaultValue={40} disabled />`, <Slider label="Volume" defaultValue={40} disabled />),
];
