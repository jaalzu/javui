import type { ReactNode } from "react";
import { CaretDownIcon, Heading } from "@/ui";
import { CodeBlock } from "@/ui/server";
import type { Example, Hero, StageHeight } from "@/docs/example";
import shell from "@/app/_shell/shell.module.css";
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

type ExamplesModule = { hero?: Hero; examples: Example[] };

/** The hero showcase of each component. The cases live next to the component that owns them. */
const loaders: Record<string, () => Promise<ExamplesModule>> = {
  Accordion: () => import("@/ui/components/Accordion/Accordion.examples"),
  Alert: () => import("@/ui/components/Alert/Alert.examples"),
  AspectRatio: () => import("@/ui/components/AspectRatio/AspectRatio.examples"),
  Avatar: () => import("@/ui/components/Avatar/Avatar.examples"),
  Badge: () => import("@/ui/components/Badge/Badge.examples"),
  Breadcrumb: () => import("@/ui/components/Breadcrumb/Breadcrumb.examples"),
  Button: () => import("@/ui/components/Button/Button.examples"),
  ButtonGroup: () => import("@/ui/components/ButtonGroup/ButtonGroup.examples"),
  Card: () => import("@/ui/components/Card/Card.examples"),
  Checkbox: () => import("@/ui/components/Checkbox/Checkbox.examples"),
  CodeBlock: () => import("@/ui/components/CodeBlock/CodeBlock.examples"),
  Collapsible: () => import("@/ui/components/Collapsible/Collapsible.examples"),
  Combobox: () => import("@/ui/components/Combobox/Combobox.examples"),
  Container: () => import("@/ui/components/Container/Container.examples"),
  EmptyState: () => import("@/ui/components/EmptyState/EmptyState.examples"),
  Field: () => import("@/ui/components/Field/Field.examples"),
  Grid: () => import("@/ui/components/Grid/Grid.examples"),
  Heading: () => import("@/ui/components/Heading/Heading.examples"),
  Icon: () => import("@/ui/components/Icon/Icon.examples"),
  Input: () => import("@/ui/components/Input/Input.examples"),
  Kbd: () => import("@/ui/components/Kbd/Kbd.examples"),
  Label: () => import("@/ui/components/Label/Label.examples"),
  Link: () => import("@/ui/components/Link/Link.examples"),
  Menu: () => import("@/ui/components/Menu/Menu.examples"),
  Modal: () => import("@/ui/components/Modal/Modal.examples"),
  Pagination: () => import("@/ui/components/Pagination/Pagination.examples"),
  Popover: () => import("@/ui/components/Popover/Popover.examples"),
  Progress: () => import("@/ui/components/Progress/Progress.examples"),
  RadioGroup: () => import("@/ui/components/Radio/RadioGroup.examples"),
  ScrollArea: () => import("@/ui/components/ScrollArea/ScrollArea.examples"),
  Select: () => import("@/ui/components/Select/Select.examples"),
  Sheet: () => import("@/ui/components/Sheet/Sheet.examples"),
  Sidebar: () => import("@/ui/components/Sidebar/Sidebar.examples"),
  Skeleton: () => import("@/ui/components/Skeleton/Skeleton.examples"),
  Slider: () => import("@/ui/components/Slider/Slider.examples"),
  Spinner: () => import("@/ui/components/Spinner/Spinner.examples"),
  Stack: () => import("@/ui/components/Stack/Stack.examples"),
  Switch: () => import("@/ui/components/Switch/Switch.examples"),
  Table: () => import("@/ui/components/Table/Table.examples"),
  Tabs: () => import("@/ui/components/Tabs/Tabs.examples"),
  Text: () => import("@/ui/components/Text/Text.examples"),
  Textarea: () => import("@/ui/components/Textarea/Textarea.examples"),
  ToggleGroup: () => import("@/ui/components/ToggleGroup/ToggleGroup.examples"),
  Tooltip: () => import("@/ui/components/Tooltip/Tooltip.examples"),
  VisuallyHidden: () => import("@/ui/components/VisuallyHidden/VisuallyHidden.examples"),
  useToast: () => import("@/ui/components/Toast/Toast.examples"),
};

/** The hero of a component page: title and subtitle come from the page header; the showcase comes from the component's own examples. */
export async function Preview({ name }: { name: string }) {
  const load = loaders[name];
  if (!load) return null;
  const { hero } = await load();
  if (!hero) return null;
  return (
    <>
      <Heading as="h2" className={shell.srOnly} data-doc-skip>Preview</Heading>
      <ExampleFrame code={hero.code} full fixed={hero.fixed} stageHeight={hero.stageHeight}>
        {hero.node}
      </ExampleFrame>
    </>
  );
}

/** The cases of a component, one section each. Renders nothing when the component has no examples. */
export async function Examples({ name }: { name: string }) {
  const load = loaders[name];
  if (!load) return null;
  const { examples: items } = await load();
  if (!items.length) return null;
  const fixed = name === "Accordion";
  const full = name === "Alert";
  const sections = items.map((e) => {
    const id = `ex-${e.title.replace(/\W+/g, "-")}`;
    return (
      <section key={e.title} aria-labelledby={id}>
        <Heading as="h3" size={6} id={id}>{e.title}</Heading>
        {e.description && <p className={styles.exampleNote}>{e.description}</p>}
        <ExampleFrame code={e.code} full={full} fixed={fixed} stageHeight={e.stageHeight}>{e.node}</ExampleFrame>
      </section>
    );
  });
  return (
    <>
      <Heading as="h2" size={6}>Examples</Heading>
      {fixed ? <div className={styles.examplesCompact}>{sections}</div> : sections}
    </>
  );
}
