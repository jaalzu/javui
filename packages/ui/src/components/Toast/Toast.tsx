"use client";

import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { iconPosition } from "../../utils/iconPosition";
import { IconSlot } from "../Icon/IconSlot";
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
  XIcon,
} from "../../icons/icons.generated";
import { Spinner } from "../Spinner";
import styles from "./Toast.module.css";

export type ToastTone =
  | "neutral"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "loading";

export type ToastOptions = {
  /** Short message. Required. */
  title: ReactNode;
  /** Optional detail under the title. */
  description?: ReactNode;
  /**
   * Meaning of the toast. It also selects the status icon and changes the accent, so it never
   * relies on color alone. `tone` is kept as an alias.
   * @default "neutral"
   */
  type?: ToastTone;
  /** Alias of `type`, kept for the original API. */
  tone?: ToastTone;
  /** Milliseconds before it closes by itself. `0` keeps it until dismissed. @default 5000 */
  timeout?: number;
  /** Announce urgently (`high`) or politely (`low`). @default "low" */
  priority?: "low" | "high";
  /** Icon before the text. Replaces the automatic status icon: pass a generated icon without `size`. */
  startIcon?: ReactNode;
  /** Icon after the text, before the action and dismiss button. Pass a generated icon without `size`. */
  endIcon?: ReactNode;
  /** Renders an action button at the end of the toast. */
  actionProps?: ComponentPropsWithoutRef<"button">;
};

export type ToastPromiseOptions<Value> = {
  /** Shown while the promise is pending. */
  loading: ToastOptions | string;
  /** Shown when it resolves. A string or options, or a function that receives the result. */
  success: ToastOptions | string | ((value: Value) => ToastOptions | string);
  /** Shown when it rejects. A string or options, or a function that receives the error. */
  error: ToastOptions | string | ((error: unknown) => ToastOptions | string);
};

export type ToastProps = ComponentProps<typeof BaseToast.Provider>;

type ToastData = {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const toneGlyph = {
  success: CheckCircleIcon,
  info: InfoIcon,
  warning: WarningIcon,
  danger: XCircleIcon,
} as const;

function managerOptions(options: ToastOptions, fallbackTone: ToastTone = "neutral") {
  const tone = options.type ?? options.tone ?? fallbackTone;
  return {
    title: options.title,
    description: options.description,
    type: tone,
    timeout: options.timeout ?? (tone === "loading" ? 0 : undefined),
    priority: options.priority,
    actionProps: options.actionProps,
    data: { startIcon: options.startIcon, endIcon: options.endIcon },
  };
}

function promiseOptions(value: ToastOptions | string, fallbackTone: ToastTone) {
  if (typeof value === "string") {
    return managerOptions({ title: value, type: fallbackTone }, fallbackTone);
  }
  return managerOptions(
    { ...value, type: value.type ?? value.tone ?? fallbackTone },
    fallbackTone,
  );
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager<ToastData>();
  return toasts.map((toast) => {
    const type = toast.type as ToastTone | undefined;
    const Glyph =
      type === "success" || type === "info" || type === "warning" || type === "danger"
        ? toneGlyph[type]
        : undefined;
    const statusIcon =
      type === "loading" ? (
        <Spinner size="sm" label="" />
      ) : Glyph ? (
        <Glyph />
      ) : undefined;
    const startIcon = toast.data?.startIcon ?? statusIcon;
    const endIcon = toast.data?.endIcon;
    return (
      <BaseToast.Root key={toast.id} toast={toast} className={styles.toast}>
        <BaseToast.Content
          className={styles.content}
          data-icon={iconPosition({ startIcon, endIcon })}
        >
          <IconSlot className={styles.icon}>{startIcon}</IconSlot>
          <div className={styles.text}>
            <BaseToast.Title className={styles.title} />
            <BaseToast.Description className={styles.description} />
          </div>
          {toast.actionProps ? (
            <BaseToast.Action className={styles.action} />
          ) : null}
          <IconSlot className={styles.icon}>{endIcon}</IconSlot>
          <BaseToast.Close className={styles.close} aria-label="Dismiss">
            <XIcon />
          </BaseToast.Close>
        </BaseToast.Content>
      </BaseToast.Root>
    );
  });
}

/**
 * A succinct message that is displayed temporarily.
 *
 * The toast feature in one place: place `<Toast>` once near the root of the app (inside `Providers`)
 * and call `useToast()` anywhere below it. Mounting the component renders the stack of toasts and
 * provides the manager, so there is no separate provider to install.
 *
 * Built on [Base UI Toast](https://base-ui.com/react/components/toast): live-region announcements,
 * F6 to reach the toasts, swipe to dismiss, and pause on hover and focus come from there.
 *
 * @example
 * <Toast>{children}</Toast>
 *
 * function SaveButton() {
 *   const { show } = useToast();
 *   return <Button variant="secondary" onClick={() => show({ title: "Saved", type: "success" })}>Save</Button>;
 * }
 */
export function Toast({ children, ...rest }: ToastProps) {
  return (
    <BaseToast.Provider {...rest}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className={styles.viewport}>
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

/**
 * Show short-lived feedback after an action (saved, copied, failed). Returns the toast manager:
 * `show`/`add`, `close`, `update` and `promise`. It must be called below `<Toast>`. For messages
 * that must stay on the page, use `Alert`.
 *
 * `type` (or its alias `tone`) renders a status icon for `success`, `info`, `warning`, `danger`
 * and `loading`. Pass `actionProps` for an inline action, and use `promise` to move one toast
 * through loading, success and error states.
 *
 * @example
 * const { show, promise } = useToast();
 * show({ title: "Saved", type: "success" });
 * show({
 *   title: "Event created",
 *   description: "Sunday, December 3 at 9:00 AM",
 *   actionProps: { children: "Undo", onClick: () => undo() },
 * });
 * promise(save(), {
 *   loading: "Saving…",
 *   success: "Saved",
 *   error: "Could not save",
 * });
 */
export function useToast() {
  const manager = BaseToast.useToastManager<ToastData>();
  return {
    /** Shows a toast and returns its id. */
    show: (options: ToastOptions) => manager.add(managerOptions(options)),
    /** Alias of `show`, matching Base UI's manager API. */
    add: (options: ToastOptions) => manager.add(managerOptions(options)),
    /** Updates a toast in place. */
    update: (id: string, options: ToastOptions) =>
      manager.update(id, managerOptions(options)),
    /** Closes one toast by id, or all of them when no id is given. */
    close: (id?: string) => manager.close(id),
    /**
     * Tracks one promise with a single toast: it starts in the loading state and becomes the
     * success or error toast when the promise settles.
     */
    promise: <Value,>(
      value: Promise<Value>,
      options: ToastPromiseOptions<Value>,
    ) =>
      manager.promise(value, {
        loading: promiseOptions(options.loading, "loading"),
        success: (result) =>
          promiseOptions(
            typeof options.success === "function"
              ? options.success(result)
              : options.success,
            "success",
          ),
        error: (error) =>
          promiseOptions(
            typeof options.error === "function"
              ? options.error(error)
              : options.error,
            "danger",
          ),
      }),
  };
}
