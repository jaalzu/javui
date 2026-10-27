import type { ReactNode } from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cx } from "../../utils/cx";
import { iconPosition } from "../../utils/iconPosition";
import { IconSlot } from "../Icon/IconSlot";
import styles from "./Accordion.module.css";

export type AccordionItem = {
  /** Unique id of the item, used for `value` and `defaultValue`. */
  value: string;
  /** Visible title. It is the button that opens the panel, so keep it short. */
  title: ReactNode;
  /** Content of the panel. */
  content: ReactNode;
  /** Icon before the title. Pass a generated icon without `size`; the trigger sizes it. */
  startIcon?: ReactNode;
  /** Icon after the title, before the plus/minus sign. Pass a generated icon without `size`. */
  endIcon?: ReactNode;
  /** Disables only this item. */
  disabled?: boolean;
};

export type AccordionProps = {
  /** The items, in order. */
  items: AccordionItem[];
  /** Allow several panels open at once. @default false */
  multiple?: boolean;
  /** Disable every item. A per-item `disabled` still applies on top. @default false */
  disabled?: boolean;
  /** Draw a border and rounded corners around the whole list, not only between items. @default false */
  bordered?: boolean;
  /** Ids of the panels open at first. */
  defaultValue?: string[];
  /** Ids of the open panels, when you control it. */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
};

/**
 * Collapsible sections built on Base UI Accordion. Each title is a button inside an `h3`
 * (`aria-expanded` and `aria-controls` come from Base UI). Pass `items` instead of composing parts.
 * The plus/minus sign sits at the end: its vertical stroke collapses while opening.
 *
 * @example
 * <Accordion items={[
 *   { value: "a", title: "Is it accessible?", content: <p>Yes.</p> },
 *   { value: "b", title: "Is it themeable?", content: <p>Yes.</p> },
 * ]} />
 *
 * @example
 * <Accordion
 *   multiple
 *   bordered
 *   items={[{ value: "a", title: "Open several", content: <p>Yes.</p> }]}
 * />
 */
export function Accordion({
  items,
  multiple = false,
  disabled = false,
  bordered = false,
  defaultValue,
  value,
  onValueChange,
  className,
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cx(styles.root, bordered && styles.bordered, className)}
      multiple={multiple}
      disabled={disabled}
      defaultValue={value === undefined ? defaultValue : undefined}
      value={value}
      onValueChange={onValueChange ? (v) => onValueChange(v as string[]) : undefined}
    >
      {items.map((item) => (
        <BaseAccordion.Item key={item.value} value={item.value} disabled={item.disabled} className={styles.item}>
          <BaseAccordion.Header className={styles.header}>
            <BaseAccordion.Trigger
              className={styles.trigger}
              data-icon={iconPosition({
                startIcon: item.startIcon,
                endIcon: item.endIcon,
              })}
            >
              <span className={styles.label}>
                <IconSlot>{item.startIcon}</IconSlot>
                <span className={styles.title}>{item.title}</span>
                <IconSlot>{item.endIcon}</IconSlot>
              </span>
              <span className={styles.indicator} aria-hidden="true">
                <span className={styles.indicatorBar} />
                <span className={styles.indicatorBarVertical} />
              </span>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className={styles.panel}>
            <div className={styles.content}>{item.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
