import type { ReactNode } from "react";
import { CaretDownIcon, Heading } from "@/ui";
import { CodeBlock } from "@/ui/server";
import type { Example, Hero, StageHeight } from "@/docs/example";
import manifest from "../../../public/agent/manifest.json";
import shell from "@/app/_shell/shell.module.css";
import styles from "./Examples.module.css";

const centeredExamples = new Set(["Alert", "Avatar", "Badge", "Breadcrumb", "Button", "Checkbox", "Input", "InputGroup", "InputOTP", "Kbd", "Label", "Link", "Menu", "Textarea", "Select", "Combobox"]);
const constrainedExamples = new Set(["Input", "InputGroup", "InputOTP", "Textarea", "Select", "Combobox"]);

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

  return `import { ${used.join(", ")} } from "@/ui";\n\n${code}`;
}

/** A live preview with a collapsible "View code" underneath. Uses a native `details`, so it works without extra JavaScript. */
export function ExampleFrame({ name, children, code, full = false, fixed = false, center = false, constrained = false, stageHeight }: { name: string; children: ReactNode; code?: string; full?: boolean; fixed?: boolean; center?: boolean; constrained?: boolean; stageHeight?: StageHeight }) {
  const sizeClass = stageHeight === "sm" ? styles.exampleStageSm : stageHeight === "md" ? styles.exampleStageMd : stageHeight === "lg" ? styles.exampleStageLg : "";
  return (
    <div className={styles.example} data-doc-example>
      <div className={`${styles.exampleStage} ${full ? styles.exampleStageFull : ""} ${fixed ? styles.exampleStageFixed : ""} ${center ? styles.exampleStageCentered : ""} ${constrained ? styles.exampleStageConstrained : ""} ${sizeClass}`}>{children}</div>
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
  Accordion: () => import("@/ui/components/Accordion/Accordion.examples"),
  Alert: () => import("@/ui/components/Alert/Alert.examples"),
  AspectRatio: () => import("@/ui/components/AspectRatio/AspectRatio.examples"),
  Avatar: () => import("@/ui/components/Avatar/Avatar.examples"),
  Badge: () => import("@/ui/components/Badge/Badge.examples"),
  Breadcrumb: () => import("@/ui/components/Breadcrumb/Breadcrumb.examples"),
  Button: () => import("@/ui/components/Button/Button.examples"),
  ButtonGroup: () => import("@/ui/components/ButtonGroup/ButtonGroup.examples"),
  Box: () => import("@/ui/components/Box/Box.examples"),
  DescriptionList: () => import("@/ui/components/DescriptionList/DescriptionList.examples"),
  Card: () => import("@/ui/components/Card/Card.examples"),
  Container: () => import("@/ui/components/Container/Container.examples"),
  Checkbox: () => import("@/ui/components/Checkbox/Checkbox.examples"),
  CodeBlock: () => import("@/ui/components/CodeBlock/CodeBlock.examples"),
  Collapsible: () => import("@/ui/components/Collapsible/Collapsible.examples"),
  Combobox: () => import("@/ui/components/Combobox/Combobox.examples"),
  EmptyState: () => import("@/ui/components/EmptyState/EmptyState.examples"),
  Field: () => import("@/ui/components/Field/Field.examples"),
  Grid: () => import("@/ui/components/Grid/Grid.examples"),
  Heading: () => import("@/ui/typography/Heading/Heading.examples"),
  Icon: () => import("@/ui/components/Icon/Icon.examples"),
  Input: () => import("@/ui/components/Input/Input.examples"),
  InputGroup: () => import("@/ui/components/InputGroup/InputGroup.examples"),
  InputOTP: () => import("@/ui/components/InputOTP/InputOTP.examples"),
  Kbd: () => import("@/ui/components/Kbd/Kbd.examples"),
  Label: () => import("@/ui/components/Label/Label.examples"),
  Link: () => import("@/ui/components/Link/Link.examples"),
  Menu: () => import("@/ui/components/Menu/Menu.examples"),
  Modal: () => import("@/ui/components/Modal/Modal.examples"),
  NameValueList: () => import("@/ui/components/NameValueList/NameValueList.examples"),
  Pagination: () => import("@/ui/components/Pagination/Pagination.examples"),
  Popover: () => import("@/ui/components/Popover/Popover.examples"),
  Progress: () => import("@/ui/components/Progress/Progress.examples"),
  RadioGroup: () => import("@/ui/components/Radio/RadioGroup.examples"),
  ScrollArea: () => import("@/ui/components/ScrollArea/ScrollArea.examples"),
  Separator: () => import("@/ui/components/Separator/Separator.examples"),
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
