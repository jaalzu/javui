import type { ReactNode } from "react";
import { CaretDownIcon, Heading } from "@/ui";
import { CodeBlock } from "@/ui/server";
import type { Example, StageHeight } from "@/docs/example";
import { Demo } from "./Demo";
import styles from "./Examples.module.css";

/** A live preview with a collapsible "View code" underneath. Uses a native `details`, so it works without extra JavaScript. */
export function ExampleFrame({ children, code, full = false, fixed = false, stageHeight }: { children: ReactNode; code?: string; full?: boolean; fixed?: boolean; stageHeight?: StageHeight }) {
  const sizeClass = stageHeight === "sm" ? styles.exampleStageSm : stageHeight === "md" ? styles.exampleStageMd : stageHeight === "lg" ? styles.exampleStageLg : "";
  return (
    <div className={styles.example} data-doc-example>
      <div className={`${styles.exampleStage} ${full ? styles.exampleStageFull : ""} ${fixed ? styles.exampleStageFixed : ""} ${sizeClass}`}>{children}</div>
      {code && (
        <details className={styles.exampleCode}>
          <summary>
            <CaretDownIcon size="sm" className={styles.chev} />
            View code
          </summary>
          <CodeBlock language="tsx" label="Code" code={code} />
        </details>
      )}
    </div>
  );
}

/** The main preview of a component page: its live demo and the first example from the manifest as code. */
export function Preview({ name, code, fixed = false, stageHeight }: { name: string; code?: string; fixed?: boolean; stageHeight?: StageHeight }) {
  return (
    <ExampleFrame code={code} full fixed={fixed} stageHeight={stageHeight}>
      <Demo name={name} />
    </ExampleFrame>
  );
}

/** The cases of each component live next to it; only the page's own examples are loaded. */
const loaders: Record<string, () => Promise<{ examples: Example[] }>> = {
  Accordion: () => import("@/ui/components/Accordion/Accordion.examples"),
  ButtonGroup: () => import("@/ui/components/ButtonGroup/ButtonGroup.examples"),
  AspectRatio: () => import("@/ui/components/AspectRatio/AspectRatio.examples"),
  Button: () => import("@/ui/components/Button/Button.examples"),
  Badge: () => import("@/ui/components/Badge/Badge.examples"),
  Alert: () => import("@/ui/components/Alert/Alert.examples"),
  Modal: () => import("@/ui/components/Modal/Modal.examples"),
  Field: () => import("@/ui/components/Field/Field.examples"),
  Checkbox: () => import("@/ui/components/Checkbox/Checkbox.examples"),
  Switch: () => import("@/ui/components/Switch/Switch.examples"),
  Card: () => import("@/ui/components/Card/Card.examples"),
  Progress: () => import("@/ui/components/Progress/Progress.examples"),
  Slider: () => import("@/ui/components/Slider/Slider.examples"),
  Tabs: () => import("@/ui/components/Tabs/Tabs.examples"),
  Avatar: () => import("@/ui/components/Avatar/Avatar.examples"),
  Text: () => import("@/ui/components/Text/Text.examples"),
};

/** The cases of a component, one section each. Renders nothing when the component has no examples. */
export async function Examples({ name }: { name: string }) {
  const load = loaders[name];
  if (!load) return null;
  const { examples: items } = await load();
  const fixed = name === "Accordion";
  const full = name === "Alert";
  const sections = items.map((e) => (
    <section key={e.title} aria-labelledby={`ex-${e.title.replace(/\W+/g, "-")}`}>
      <Heading as="h3" size={6} id={`ex-${e.title.replace(/\W+/g, "-")}`}>{e.title}</Heading>
      {e.description && <p className={styles.exampleNote}>{e.description}</p>}
      <ExampleFrame code={e.code} full={full} fixed={fixed} stageHeight={e.stageHeight}>{e.node}</ExampleFrame>
    </section>
  ));
  return (
    <>
      <Heading as="h2" size={6}>Examples</Heading>
      {fixed ? <div className={styles.examplesCompact}>{sections}</div> : sections}
    </>
  );
}
