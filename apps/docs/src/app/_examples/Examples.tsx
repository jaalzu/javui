import type { ReactNode } from "react";
import { CaretDownIcon, Heading } from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import type { Example, Hero, StageHeight } from "@/docs/example";
import manifest from "../../../public/agent/manifest.json";
import shell from "@/app/_shell/shell.module.css";
import styles from "./Examples.module.css";

const centeredExamples = new Set(["Alert", "Avatar", "Badge", "Breadcrumb", "Button", "Checkbox", "Input", "InputGroup", "InputOTP", "Kbd", "Label", "Link", "Menu", "Modal", "Pagination", "Popover", "RadioGroup", "Separator", "Sheet", "Spinner", "Textarea", "Select", "Combobox", "Switch", "Toggle", "ToggleGroup", "Tooltip"]);
const constrainedExamples = new Set(["Input", "InputGroup", "InputOTP", "Textarea", "Select", "Combobox"]);
const cardSurfaceExamples = new Set(["Table"]);

const componentImports = new Map(
  [...manifest.components, ...manifest.providersAndHooks, ...manifest.components.flatMap((entry) => entry.parts ?? [])]
    .map((entry) => [entry.name, entry.import]),
);

function codeWithImport(name: string, code: string) {
  if (/^\s*import\s/m.test(code)) return code;

  const used = [...code.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)]
    .map((match) => match[1])
    .filter((value, index, values) => values.indexOf(value) === index)
    .filter((value) => componentImports.has(value) || value.endsWith("Icon"));

  if (!used.length) {
    const componentImport = componentImports.get(name);
    return componentImport ? `${componentImport}\n\n${code}` : code;
  }

  return `import { ${used.join(", ")} } from "@javui/ui";\n\n${code}`;
}

/** A live preview with a collapsible "View code" underneath. Uses a native `details`, so it works without extra JavaScript. */
export function ExampleFrame({ name, children, code, full = false, fixed = false, center = false, constrained = false, stageHeight }: { name: string; children: ReactNode; code?: string; full?: boolean; fixed?: boolean; center?: boolean; constrained?: boolean; stageHeight?: StageHeight }) {
  const sizeClass = stageHeight === "sm" ? styles.exampleStageSm : stageHeight === "md" ? styles.exampleStageMd : stageHeight === "lg" ? styles.exampleStageLg : "";
  return (
    <div className={styles.example} data-doc-example>
      <div className={`${styles.exampleStage} ${full ? styles.exampleStageFull : ""} ${fixed ? styles.exampleStageFixed : ""} ${center ? styles.exampleStageCentered : ""} ${constrained ? styles.exampleStageConstrained : ""} ${sizeClass}`} data-surface={cardSurfaceExamples.has(name) ? "card" : undefined}>{children}</div>
      {code && (
        <details className={styles.exampleCode}>
          <summary>
            <CaretDownIcon size="sm" className={styles.chev} />
            View code
          </summary>
          <CodeBlock language="tsx" label="Code" code={codeWithImport(name, code)} minimal lineNumbers />
        </details>
      )}
    </div>
  );
}

type ExamplesModule = { hero?: Hero; examples: Example[]; extras?: ReactNode };

/** The hero showcase of each component. The cases live next to the component that owns them. */
const loaders: Record<string, () => Promise<ExamplesModule>> = {
  Accordion: () => import("@/examples/Accordion/Accordion.examples"),
  Alert: () => import("@/examples/Alert/Alert.examples"),
  AspectRatio: () => import("@/examples/AspectRatio/AspectRatio.examples"),
  Avatar: () => import("@/examples/Avatar/Avatar.examples"),
  Badge: () => import("@/examples/Badge/Badge.examples"),
  Breadcrumb: () => import("@/examples/Breadcrumb/Breadcrumb.examples"),
  Button: () => import("@/examples/Button/Button.examples"),
  ButtonGroup: () => import("@/examples/ButtonGroup/ButtonGroup.examples"),
  Box: () => import("@/examples/Box/Box.examples"),
  DescriptionList: () => import("@/examples/DescriptionList/DescriptionList.examples"),
  Card: () => import("@/examples/Card/Card.examples"),
  Container: () => import("@/examples/Container/Container.examples"),
  Checkbox: () => import("@/examples/Checkbox/Checkbox.examples"),
  CodeBlock: () => import("@/examples/CodeBlock/CodeBlock.examples"),
  Collapsible: () => import("@/examples/Collapsible/Collapsible.examples"),
  Combobox: () => import("@/examples/Combobox/Combobox.examples"),
  EmptyState: () => import("@/examples/EmptyState/EmptyState.examples"),
  Field: () => import("@/examples/Field/Field.examples"),
  Grid: () => import("@/examples/Grid/Grid.examples"),
  Heading: () => import("@/examples/Heading/Heading.examples"),
  Icon: () => import("@/examples/Icon/Icon.examples"),
  Input: () => import("@/examples/Input/Input.examples"),
  InputGroup: () => import("@/examples/InputGroup/InputGroup.examples"),
  InputOTP: () => import("@/examples/InputOTP/InputOTP.examples"),
  Kbd: () => import("@/examples/Kbd/Kbd.examples"),
  Label: () => import("@/examples/Label/Label.examples"),
  Link: () => import("@/examples/Link/Link.examples"),
  Menu: () => import("@/examples/Menu/Menu.examples"),
  Modal: () => import("@/examples/Modal/Modal.examples"),
  NameValueList: () => import("@/examples/NameValueList/NameValueList.examples"),
  Pagination: () => import("@/examples/Pagination/Pagination.examples"),
  Popover: () => import("@/examples/Popover/Popover.examples"),
  Progress: () => import("@/examples/Progress/Progress.examples"),
  RadioGroup: () => import("@/examples/Radio/RadioGroup.examples"),
  ScrollArea: () => import("@/examples/ScrollArea/ScrollArea.examples"),
  Separator: () => import("@/examples/Separator/Separator.examples"),
  Select: () => import("@/examples/Select/Select.examples"),
  Sheet: () => import("@/examples/Sheet/Sheet.examples"),
  Skeleton: () => import("@/examples/Skeleton/Skeleton.examples"),
  Slider: () => import("@/examples/Slider/Slider.examples"),
  Spinner: () => import("@/examples/Spinner/Spinner.examples"),
  Stack: () => import("@/examples/Stack/Stack.examples"),
  Switch: () => import("@/examples/Switch/Switch.examples"),
  Table: () => import("@/examples/Table/Table.examples"),
  Tabs: () => import("@/examples/Tabs/Tabs.examples"),
  Text: () => import("@/examples/Text/Text.examples"),
  Textarea: () => import("@/examples/Textarea/Textarea.examples"),
  Toggle: () => import("@/examples/Toggle/Toggle.examples"),
  ToggleGroup: () => import("@/examples/ToggleGroup/ToggleGroup.examples"),
  Tooltip: () => import("@/examples/Tooltip/Tooltip.examples"),
  VisuallyHidden: () => import("@/examples/VisuallyHidden/VisuallyHidden.examples"),
  useToast: () => import("@/examples/Toast/Toast.examples"),
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
      <ExampleFrame name={name} code={hero.code} full center={centeredExamples.has(name)} constrained={constrainedExamples.has(name)} fixed={hero.fixed} stageHeight={hero.stageHeight}>
        {hero.node}
      </ExampleFrame>
    </>
  );
}

/** The cases of a component, one section each. Renders nothing when the component has no examples. */
export async function Examples({ name }: { name: string }) {
  const load = loaders[name];
  if (!load) return null;
  const { examples: items, extras } = await load();
  if (!items.length) return null;
  const fixed = name === "Accordion";
  const full = name === "Alert";
  const sections = items.map((e) => {
    const id = `ex-${e.title.replace(/\W+/g, "-")}`;
    return (
      <section key={e.title} className={styles.exampleSection} aria-labelledby={id}>
        <Heading as="h3" size={6} id={id}>{e.title}</Heading>
        {e.description && <p className={styles.exampleNote}>{e.description}</p>}
        <ExampleFrame name={name} code={e.code} full={full} center={centeredExamples.has(name)} constrained={constrainedExamples.has(name)} fixed={fixed} stageHeight={e.stageHeight}>{e.node}</ExampleFrame>
      </section>
    );
  });
  return (
    <>
      {extras}
      {fixed ? <div className={styles.examplesCompact}>{sections}</div> : sections}
    </>
  );
}
