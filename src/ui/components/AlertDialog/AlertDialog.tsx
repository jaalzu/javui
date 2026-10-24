"use client";

import { useRef, type ReactNode } from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { cx } from "../../utils/cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import styles from "../Dialog/Dialog.module.css";

/**
 * Root of an alert dialog: a modal that asks for confirmation before a destructive or
 * irreversible action. It shares Dialog's panel styles but behaves like an alert dialog:
 * `role="alertdialog"`, no close on outside click, Escape to close, focus starts on the
 * safest action and returns to the trigger.
 *
 * @example
 * <AlertDialog>
 *   <AlertDialogTrigger variant="danger">Delete project</AlertDialogTrigger>
 *   <AlertDialogContent title="Delete project?" description="This cannot be undone.">
 *     <AlertDialogClose>Cancel</AlertDialogClose>
 *     <AlertDialogClose variant="danger">Delete</AlertDialogClose>
 *   </AlertDialogContent>
 * </AlertDialog>
 */
export const AlertDialog = BaseAlertDialog.Root;

export type AlertDialogTriggerProps = {
  /** Button style of the trigger. @default "primary" */
  variant?: ButtonVariant;
  /** Button size of the trigger. @default "md" */
  size?: ButtonSize;
} & Omit<BaseAlertDialog.Trigger.Props, "render" | "className" | "color">;

/**
 * The button that opens the alert dialog. It is rendered as a `Button`.
 *
 * @example
 * <AlertDialogTrigger variant="danger">Delete project</AlertDialogTrigger>
 */
export function AlertDialogTrigger({
  variant = "primary",
  size = "md",
  children,
  ...rest
}: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger
      render={
        <Button variant={variant} size={size}>
          {children}
        </Button>
      }
      {...rest}
    />
  );
}

export type AlertDialogContentProps = {
  /** Dialog title. Required: it is the accessible name of the dialog. */
  title: ReactNode;
  /** Short explanation of what will happen, announced as the accessible description. */
  description?: ReactNode;
  /** The actions. Put the safe action first (`AlertDialogClose` buttons): it receives initial focus. */
  children?: ReactNode;
  /**
   * Element to focus when the dialog opens. Defaults to the first action, which should be the safe one.
   */
  initialFocus?: BaseAlertDialog.Popup.Props["initialFocus"];
  className?: string;
};

/**
 * The alert dialog panel with its backdrop, title and description. Place it inside
 * `AlertDialog`. It does not close on outside click, so the user must choose an action.
 *
 * @example
 * <AlertDialogContent title="Delete project?" description="This cannot be undone.">
 *   <AlertDialogClose>Cancel</AlertDialogClose>
 *   <AlertDialogClose variant="danger">Delete</AlertDialogClose>
 * </AlertDialogContent>
 */
export function AlertDialogContent({
  title,
  description,
  children,
  initialFocus,
  className,
}: AlertDialogContentProps) {
  const actionsRef = useRef<HTMLDivElement>(null);

  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className={styles.backdrop} />
      <BaseAlertDialog.Popup
        className={cx(styles.popup, className)}
        initialFocus={
          initialFocus ?? (() => actionsRef.current?.querySelector<HTMLElement>("button") ?? true)
        }
      >
        <BaseAlertDialog.Title className={styles.title}>{title}</BaseAlertDialog.Title>
        {description ? (
          <BaseAlertDialog.Description className={styles.description}>
            {description}
          </BaseAlertDialog.Description>
        ) : null}
        {children ? (
          <div ref={actionsRef} className={styles.body}>
            {children}
          </div>
        ) : null}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
}

export type AlertDialogCloseProps = {
  /** Button style. Use `danger` for the destructive action. @default "secondary" */
  variant?: ButtonVariant;
  /** Button size. @default "md" */
  size?: ButtonSize;
} & Omit<BaseAlertDialog.Close.Props, "render" | "className" | "color">;

/**
 * A button that closes the alert dialog. It is rendered as a `Button`.
 *
 * @example
 * <AlertDialogClose>Cancel</AlertDialogClose>
 */
export function AlertDialogClose({
  variant = "secondary",
  size = "md",
  children,
  ...rest
}: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close
      render={
        <Button variant={variant} size={size}>
          {children}
        </Button>
      }
      {...rest}
    />
  );
}
