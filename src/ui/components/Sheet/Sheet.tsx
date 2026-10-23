"use client";

import type { ReactNode } from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { XIcon } from "../../icons/icons.generated";
import { cx } from "../../utils/cx";
import { Button } from "../Button";
import styles from "./Sheet.module.css";

export type SheetProps = {
  /** Text of the trigger button. */
  trigger: ReactNode;
  /** Accessible name of the sheet, shown at the top. */
  title: ReactNode;
  /** Optional explanation under the title. */
  description?: ReactNode;
  /** Main content. */
  children?: ReactNode;
  /** Actions shown at the bottom, usually buttons. */
  footer?: ReactNode;
  /** Edge the sheet enters from. @default "right" */
  side?: "left" | "right";
  /** Accessible name of the close button. @default "Close" */
  closeLabel?: string;
  /** Initially open, when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

/**
 * A side sheet for secondary tasks and settings, built on Base UI Drawer. Focus is trapped, Escape
 * closes it, and it can be swiped away on touch. For a centered decision use `Dialog`.
 *
 * @example
 * <Sheet
 *   trigger="Filters"
 *   title="Filters"
 *   description="Narrow the results."
 *   footer={<Button>Apply</Button>}
 * >
 *   <Field label="Status"><Select items={statuses} /></Field>
 * </Sheet>
 */
export function Sheet({
  trigger,
  title,
  description,
  children,
  footer,
  side = "right",
  closeLabel = "Close",
  defaultOpen = false,
  open,
  onOpenChange,
  className,
}: SheetProps) {
  return (
    <BaseDrawer.Root
      swipeDirection={side}
      defaultOpen={open === undefined ? defaultOpen : undefined}
      open={open}
      onOpenChange={onOpenChange ? (value) => onOpenChange(value) : undefined}
    >
      <BaseDrawer.Trigger render={<Button variant="secondary">{trigger}</Button>} />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className={styles.backdrop} />
        <BaseDrawer.Viewport className={styles.viewport} data-side={side}>
          <BaseDrawer.Popup className={cx(styles.popup, className)} data-side={side}>
            <BaseDrawer.Content className={styles.content}>
              <div className={styles.header}>
                <div className={styles.heading}>
                  <BaseDrawer.Title className={styles.title}>{title}</BaseDrawer.Title>
                  {description ? (
                    <BaseDrawer.Description className={styles.description}>
                      {description}
                    </BaseDrawer.Description>
                  ) : null}
                </div>
                <BaseDrawer.Close
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={closeLabel}
                      startIcon={<XIcon />}
                    />
                  }
                />
              </div>
              <div className={styles.body}>{children}</div>
              {footer ? <div className={styles.footer}>{footer}</div> : null}
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
