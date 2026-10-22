import type { ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cx } from "../../utils/cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import styles from "./Dialog.module.css";

/**
 * Root of a modal dialog. Holds the open state; use `open` and `onOpenChange` to control it,
 * or `defaultOpen` to leave it uncontrolled. Built on Base UI Dialog (focus trap, Escape to close,
 * focus return and scroll lock come from there).
 *
 * @example
 * <Dialog>
 *   <DialogTrigger>Delete project</DialogTrigger>
 *   <DialogContent title="Delete project?" description="This cannot be undone.">
 *     <DialogClose>Cancel</DialogClose>
 *   </DialogContent>
 * </Dialog>
 */
export const Dialog = BaseDialog.Root;

export type DialogTriggerProps = {
  /** Button style of the trigger. @default "primary" */
  variant?: ButtonVariant;
  /** Button size of the trigger. @default "md" */
  size?: ButtonSize;
} & Omit<BaseDialog.Trigger.Props, "render" | "className" | "color">;

/** The button that opens the dialog. It is rendered as a `Button`. */
export function DialogTrigger({ variant = "primary", size = "md", children, ...rest }: DialogTriggerProps) {
  return (
    <BaseDialog.Trigger
      render={
        <Button variant={variant} size={size}>
          {children}
        </Button>
      }
      {...rest}
    />
  );
}

export type DialogContentProps = {
  /** Dialog title. Required: it is the accessible name of the dialog. */
  title: ReactNode;
  /** Short explanation, announced as the accessible description. */
  description?: ReactNode;
  /** Body and actions. Put `DialogClose` buttons here. */
  children?: ReactNode;
  className?: string;
};

/**
 * The dialog panel with its backdrop, title and description.
 * Place it inside `Dialog`.
 */
export function DialogContent({ title, description, children, className }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={styles.backdrop} />
      <BaseDialog.Popup className={cx(styles.popup, className)}>
        <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
        {description ? <BaseDialog.Description className={styles.description}>{description}</BaseDialog.Description> : null}
        {children ? <div className={styles.body}>{children}</div> : null}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export type DialogCloseProps = {
  /** Button style. @default "secondary" */
  variant?: ButtonVariant;
  /** Button size. @default "md" */
  size?: ButtonSize;
} & Omit<BaseDialog.Close.Props, "render" | "className" | "color">;

/** A button that closes the dialog. It is rendered as a `Button`. */
export function DialogClose({ variant = "secondary", size = "md", children, ...rest }: DialogCloseProps) {
  return (
    <BaseDialog.Close
      render={
        <Button variant={variant} size={size}>
          {children}
        </Button>
      }
      {...rest}
    />
  );
}
