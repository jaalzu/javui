import type { ReactNode } from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { CaretDownIcon } from "../../icons/icons.generated";
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
  /** Icon after the title, before the chevron. Pass a generated icon without `size`. */
  endIcon?: ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  /** The items, in order. */
  items: AccordionItem[];
  /** Allow several panels open at once. @default false */
  multiple?: boolean;
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
 *
 * @example
 * <Accordion items={[
 *   { value: "a", title: "Is it accessible?", content: <p>Yes.</p> },
 *   { value: "b", title: "Is it themeable?", content: <p>Yes.</p> },
 * ]} />
 */
export function Accordion({ items, multiple = false, defaultValue, value, onValueChange, className }: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cx(styles.root, className)}
      multiple={multiple}
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
                <span>{item.title}</span>
                <IconSlot>{item.endIcon}</IconSlot>
              </span>
              <IconSlot className={styles.chevron}>
                <CaretDownIcon />
              </IconSlot>
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
