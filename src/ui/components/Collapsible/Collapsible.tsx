"use client";

import type { ReactElement, ReactNode } from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { cx } from "../../utils/cx";
import styles from "./Collapsible.module.css";

export type CollapsibleProps = {
  /** Content containing a `CollapsibleTrigger` and `CollapsibleContent`. */
  children: ReactNode;
  /** Open at first render, when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Disables the trigger. @default false */
  disabled?: boolean;
  className?: string;
};

/** Root for a single disclosure. Compose it with `CollapsibleTrigger` and `CollapsibleContent`. */
export function Collapsible({ children, defaultOpen = false, open, onOpenChange, disabled = false, className }: CollapsibleProps) {
  return <BaseCollapsible.Root className={cx(styles.root, className)} defaultOpen={open === undefined ? defaultOpen : undefined} open={open} onOpenChange={onOpenChange} disabled={disabled}>{children}</BaseCollapsible.Root>;
}

export type CollapsibleTriggerProps = { children?: ReactNode; className?: string; render?: ReactElement; active?: boolean };

/** Button that toggles its parent `Collapsible`. */
export function CollapsibleTrigger({ children, className, render, active = false }: CollapsibleTriggerProps) {
  return render
    ? <BaseCollapsible.Trigger className={className} render={render}>{children}</BaseCollapsible.Trigger>
    : <BaseCollapsible.Trigger className={cx(styles.trigger, active && styles.activeTrigger, className)}>{children}</BaseCollapsible.Trigger>;
}

export type CollapsibleContentProps = { children: ReactNode; className?: string };

/** Expandable content for its parent `Collapsible`. */
export function CollapsibleContent({ children, className }: CollapsibleContentProps) {
  return <BaseCollapsible.Panel className={cx(styles.panel, className)}><div className={styles.content}>{children}</div></BaseCollapsible.Panel>;
}
