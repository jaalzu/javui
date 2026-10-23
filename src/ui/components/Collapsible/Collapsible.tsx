"use client";

import type { ReactNode } from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { CaretDownIcon } from "../../icons/icons.generated";
import { cx } from "../../utils/cx";
import { iconPosition } from "../../utils/iconPosition";
import { IconSlot } from "../Icon/IconSlot";
import styles from "./Collapsible.module.css";

export type CollapsibleProps = {
  /** Visible title. It is the button that opens the panel. */
  title: ReactNode;
  /** Panel content. */
  children: ReactNode;
  /** Open at first render, when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Disables the trigger. @default false */
  disabled?: boolean;
  /** Icon before the title. Pass a generated icon without `size`; the trigger sizes it. */
  startIcon?: ReactNode;
  /** Icon after the title, before the chevron. Pass a generated icon without `size`. */
  endIcon?: ReactNode;
  className?: string;
};

/**
 * One section that expands and collapses, built on Base UI Collapsible. For a set of sections
 * use `Accordion`; use this for a single disclosure, such as advanced options.
 *
 * @example
 * <Collapsible title="Advanced settings">
 *   <p>Only the options most people need are visible.</p>
 * </Collapsible>
 */
export function Collapsible({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  disabled = false,
  startIcon,
  endIcon,
  className,
}: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      className={cx(styles.root, className)}
      defaultOpen={open === undefined ? defaultOpen : undefined}
      open={open}
      onOpenChange={onOpenChange ? (value) => onOpenChange(value) : undefined}
      disabled={disabled}
    >
      <BaseCollapsible.Trigger
        className={styles.trigger}
        data-icon={iconPosition({ startIcon, endIcon })}
      >
        <span className={styles.label}>
          <IconSlot>{startIcon}</IconSlot>
          <span>{title}</span>
          <IconSlot>{endIcon}</IconSlot>
        </span>
        <IconSlot className={styles.chevron}>
          <CaretDownIcon />
        </IconSlot>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className={styles.panel}>
        <div className={styles.content}>{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
