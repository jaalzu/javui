"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { cx } from "../../utils/cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import { InfoIcon, WarningIcon, XCircleIcon, XIcon } from "../../icons/icons.generated";
import styles from "./Modal.module.css";

export type ModalRole = "dialog" | "alertdialog";
export type ModalSize = "sm" | "md" | "lg";
export type ModalColor = "neutral" | "warning" | "critical";

type ModalContextValue = {
  role: ModalRole;
  size: ModalSize;
  color: ModalColor;
  dismissible: boolean;
  description?: ReactNode;
  returnFocusTo?: RefObject<HTMLElement | null> | string;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const value = useContext(ModalContext);
  if (!value) throw new Error("Modal parts must be used inside Modal.");
  return value;
}

type ModalCommonProps = {
  /** Whether the modal is open. Use it with `onOpenChange` for a controlled modal. */
  open?: boolean;
  /** Whether the modal starts open when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state. It covers both opening and closing; there are no separate callbacks. */
  onOpenChange?: (open: boolean) => void;
  /** Width of the panel, from the container tokens. @default "md" */
  size?: ModalSize;
  /** Tints the header icon, tagline and title. Behavior does not change; use `role` for that. @default "neutral" */
  color?: ModalColor;
  /**
   * Shows the close button and allows Escape and outside click to close. When false, keep at least one
   * footer action so the user has a way out. @default true
   */
  dismissible?: boolean;
  /**
   * Runs before every close. Return false (or a promise of false) to keep the modal open. Use it to
   * protect a form with unsaved changes, then open a confirmation with `role="alertdialog"`.
   * `onOpenChange` is still called once the close is allowed.
   */
  onBeforeClose?: () => boolean | Promise<boolean>;
  /**
   * Where focus returns when the original trigger no longer exists. Pass an element ref or an id.
   * Rare: the trigger is the normal return target.
   */
  returnFocusTo?: RefObject<HTMLElement | null> | string;
  /** Description announced as the accessible description. Required for `role="alertdialog"`. */
  description?: ReactNode;
  /** `ModalTrigger` and `ModalContent`. */
  children?: ReactNode;
};

export type ModalProps = ModalCommonProps &
  (
    | { /** Behavior only. Use dialog for content and forms. @default "dialog" */ role?: "dialog" }
    | {
        /** Behavior only. Use alertdialog for a decision that interrupts. */
        role: "alertdialog";
        /** Alert dialogs need a description: it is part of the accessible name and explains the decision. */
        description: ReactNode;
      }
  );

/**
 * The root of a modal. Use `role="dialog"` for content and forms, or `role="alertdialog"` for a
 * decision that interrupts. The parts share one implementation; only the behavior and the header
 * color change with props. The page behind stays inert and scroll-locked, focus is trapped and
 * returned, and Escape closes unless `dismissible` is false.
 *
 * @example
 * <Modal role="alertdialog" color="critical" description="This permanently removes the project and its data.">
 *   <ModalTrigger variant="danger">Delete project</ModalTrigger>
 *   <ModalContent
 *     title="Delete project?"
 *     actions={
 *       <>
 *         <ModalClose>Cancel</ModalClose>
 *         <ModalClose variant="danger">Delete</ModalClose>
 *       </>
 *     }
 *   >
 *     The project and all of its data will be gone.
 *   </ModalContent>
 * </Modal>
 */
export function Modal({
  open,
  defaultOpen = false,
  onOpenChange,
  size = "md",
  color = "neutral",
  dismissible = true,
  onBeforeClose,
  returnFocusTo,
  description,
  role = "dialog",
  children,
}: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const controlled = open !== undefined;

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (color === "critical" && role !== "alertdialog") {
      console.warn(
        "Modal color=critical usually needs role=alertdialog. Ignore this if the modal is a form.",
      );
    }
  }, [color, role]);

  const commitOpenChange = (next: boolean) => {
    if (!controlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const handleOpenChange = (
    next: boolean,
    details: { reason: string; cancel: () => void },
  ) => {
    if (next) {
      commitOpenChange(true);
      return;
    }

    if (
      !dismissible &&
      (details.reason === "escapeKey" || details.reason === "outsidePress")
    ) {
      details.cancel();
      return;
    }

    if (!onBeforeClose) {
      commitOpenChange(false);
      return;
    }

    details.cancel();
    void Promise.resolve(onBeforeClose())
      .then((allowed) => {
        if (allowed) commitOpenChange(false);
      })
      .catch((error: unknown) => {
        console.error("Modal onBeforeClose failed; the modal stays open.", error);
      });
  };

  const context: ModalContextValue = {
    role,
    size,
    color,
    dismissible,
    description,
    returnFocusTo,
  };

  const shared = {
    open: controlled ? open : uncontrolledOpen,
    onOpenChange: handleOpenChange,
  };

  return (
    <ModalContext.Provider value={context}>
      {role === "alertdialog" ? (
        <BaseAlertDialog.Root {...shared}>{children}</BaseAlertDialog.Root>
      ) : (
        <BaseDialog.Root
          {...shared}
          modal
          disablePointerDismissal={!dismissible}
        >
          {children}
        </BaseDialog.Root>
      )}
    </ModalContext.Provider>
  );
}

export type ModalTriggerProps = {
  /** Button style of the trigger. @default "primary" */
  variant?: ButtonVariant;
  /** Button size of the trigger. @default "md" */
  size?: ButtonSize;
} & Omit<BaseDialog.Trigger.Props, "render" | "className" | "color">;

/**
 * The button that opens the modal. It renders a `Button` and inherits the behavior of the root.
 *
 * @example
 * <ModalTrigger variant="secondary">Open settings</ModalTrigger>
 */
export function ModalTrigger({
  variant = "primary",
  size = "md",
  children,
  ...rest
}: ModalTriggerProps) {
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

export type ModalContentProps = {
  /** Modal title. Required: it is the accessible name of the modal. */
  title: ReactNode;
  /** Explanation announced as the accessible description. Falls back to the `description` on `Modal`. */
  description?: ReactNode;
  /** Optional short label above the title, such as a category or a state. */
  tagline?: ReactNode;
  /** Replaces the default icon for the color. Pass a generated icon without `size`. */
  icon?: ReactNode;
  /** Body content: text, custom content or a form. It scrolls when it exceeds the available height. */
  children: ReactNode;
  /** Footer actions: one to three. Put the safe action first and the primary action last. */
  actions?: ReactNode;
  /** Accessible name of the close button. @default "Close" */
  closeLabel?: string;
  className?: string;
};

/**
 * The modal panel: header, scrollable body and footer. It reads the role and description from
 * `Modal`. The footer stacks on mobile with the primary action on top, and sits in one row from
 * the `md` breakpoint.
 *
 * @example
 * <ModalContent
 *   title="Invite a teammate"
 *   tagline="Workspace"
 *   actions={<><ModalClose>Cancel</ModalClose><ModalClose>Send invite</ModalClose></>}
 * >
 *   <Field label="Email"><Input type="email" /></Field>
 * </ModalContent>
 */
export function ModalContent({
  title,
  description: contentDescription,
  tagline,
  icon,
  children,
  actions,
  closeLabel = "Close",
  className,
}: ModalContentProps) {
  const { role, size, color, dismissible, description: rootDescription, returnFocusTo } = useModalContext();
  const description = contentDescription ?? rootDescription;
  const popupRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!dismissible && !actions) {
      console.warn(
        "Modal dismissible=false needs at least one footer action so the user can leave.",
      );
    }
  }, [dismissible, actions]);

  const initialFocus = () => {
    if (role === "alertdialog") {
      const footer = footerRef.current;
      return (
        footer?.querySelector<HTMLElement>("[data-modal-initial-focus]") ??
        footer?.querySelector<HTMLElement>('[data-modal-variant="secondary"]') ??
        footer?.querySelector<HTMLElement>("button") ??
        true
      );
    }

    const form = bodyRef.current?.querySelector("form");
    const field =
      (form ?? bodyRef.current)?.querySelector<HTMLElement>(
        'input:not([type="hidden"]), textarea, select, [contenteditable="true"]',
      );
    return field ?? true;
  };

  const finalFocus =
    typeof returnFocusTo === "string"
      ? () => document.getElementById(returnFocusTo)
      : returnFocusTo ?? undefined;

  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={styles.backdrop} />
      <BaseDialog.Popup
        ref={popupRef}
        className={cx(styles.popup, className)}
        data-size={size}
        data-color={color}
        data-role={role}
        initialFocus={initialFocus}
        finalFocus={finalFocus}
      >
        <div className={styles.header}>
          <span className={styles.icon} aria-hidden="true">
            {icon ??
              (color === "critical" ? (
                <XCircleIcon />
              ) : color === "warning" ? (
                <WarningIcon />
              ) : (
                <InfoIcon />
              ))}
          </span>
          <div className={styles.heading}>
            {tagline ? <p className={styles.tagline}>{tagline}</p> : null}
            <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
            {description ? (
              <BaseDialog.Description className={styles.description}>
                {description}
              </BaseDialog.Description>
            ) : null}
          </div>
          {dismissible ? (
            <BaseDialog.Close
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={closeLabel}
                  startIcon={<XIcon />}
                  className={styles.close}
                />
              }
            />
          ) : null}
        </div>
        <div ref={bodyRef} className={styles.body}>
          {children}
        </div>
        {actions ? (
          <div ref={footerRef} className={styles.footer}>
            {actions}
          </div>
        ) : null}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export type ModalCloseProps = {
  /** Button style. Use `danger` for a destructive action. @default "secondary" */
  variant?: ButtonVariant;
  /** Button size. @default "md" */
  size?: ButtonSize;
  /** Marks the safe action that receives initial focus in `role="alertdialog"`. */
  initialFocus?: boolean;
} & Omit<BaseDialog.Close.Props, "render" | "className" | "color">;

/**
 * A button that closes the modal. It renders a `Button`. In an alert dialog, mark the safe action
 * with `initialFocus`; otherwise the first secondary action receives focus.
 *
 * @example
 * <ModalClose>Cancel</ModalClose>
 * <ModalClose variant="danger">Delete</ModalClose>
 */
export function ModalClose({
  variant = "secondary",
  size = "md",
  initialFocus = false,
  children,
  ...rest
}: ModalCloseProps) {
  return (
    <BaseDialog.Close
      render={
        <Button variant={variant} size={size}>
          {children}
        </Button>
      }
      data-modal-variant={variant}
      data-modal-initial-focus={initialFocus ? "" : undefined}
      {...rest}
    />
  );
}
