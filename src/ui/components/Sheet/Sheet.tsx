"use client";

import type { ReactNode } from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { XIcon } from "../../icons/icons.generated";
import { cx } from "../../utils/cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import styles from "./Sheet.module.css";

export type SheetProps = {
  /** Text of the trigger button. */
  trigger: ReactNode;
  /** Button style of the trigger. @default "secondary" */
  triggerVariant?: ButtonVariant;
  /** Button size of the trigger. @default "sm" */
  triggerSize?: ButtonSize;
  /** Accessible name of the sheet, shown at the top. */
  title: ReactNode;
  /** Optional explanation under the title. */
  description?: ReactNode;
  /** Main content. */
  children?: ReactNode;
  /** Actions shown at the bottom, usually buttons. Each direct child fills the sheet width. */
  footer?: ReactNode;
  /** Edge the sheet enters from. @default "right" */
  side?: "top" | "right" | "bottom" | "left";
  /** Whether to render the built-in close button. @default true */
  showCloseButton?: boolean;
  /** Accessible name of the close button. Keep the copy in the consuming example. */
  closeLabel: string;
  /** Initially open, when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

/**
 * A side sheet for secondary tasks and settings, built on Base UI Drawer. Left and right keep a
 * fixed side width; top and bottom span the viewport width and fit their content height. Focus is
 * trapped, Escape closes it, and it can be swiped away on touch. The footer stacks its actions,
 * and every action fills the available width. For a centered decision use `Modal`.
 *
 * @example
 * <Sheet
 *   trigger="Filters"
 *   closeLabel="Close filters"
 *   title="Filters"
 *   description="Narrow the results."
 *   footer={<Button>Apply</Button>}
 * >
 *   <Field label="Status"><Select items={statuses} /></Field>
 * </Sheet>
 */
export function Sheet({
  trigger,
  triggerVariant = "secondary",
  triggerSize = "sm",
  title,
  description,
  children,
  footer,
  side = "right",
  showCloseButton = true,
  closeLabel,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
}: SheetProps) {
  return (
    <BaseDrawer.Root
      swipeDirection={side === "top" ? "up" : side === "bottom" ? "down" : side}
      modal
      defaultOpen={open === undefined ? defaultOpen : undefined}
      open={open}
      onOpenChange={onOpenChange ? (value) => onOpenChange(value) : undefined}
    >
      <BaseDrawer.Trigger
        render={
          <Button variant={triggerVariant} size={triggerSize}>
            {trigger}
          </Button>
        }
      />
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
                {showCloseButton ? (
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
                ) : null}
              </div>
              <div
                className={styles.body}
                data-base-ui-swipe-ignore={side === "top" || side === "bottom" ? "x" : "y"}
              >
                {children}
              </div>
              {footer ? <footer className={styles.footer}>{footer}</footer> : null}
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
