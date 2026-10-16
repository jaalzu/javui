"use client";

import type { ReactNode } from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { Icon } from "../Icon";
import styles from "./Toast.module.css";

export type ToastTone = "neutral" | "success" | "info" | "warning" | "danger";

export type ToastOptions = {
  /** Short message. Required. */
  title: string;
  /** Optional detail under the title. */
  description?: string;
  /** Meaning of the toast. It is also written in the title, never conveyed by color alone. @default "neutral" */
  tone?: ToastTone;
  /** Milliseconds before it closes by itself. `0` keeps it until dismissed. @default 5000 */
  timeout?: number;
};

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return toasts.map((toast) => (
    <BaseToast.Root key={toast.id} toast={toast} className={styles.toast}>
      <BaseToast.Content className={styles.content}>
        <div className={styles.text}>
          <BaseToast.Title className={styles.title} />
          <BaseToast.Description className={styles.description} />
        </div>
        <BaseToast.Close className={styles.close} aria-label="Dismiss">
          <Icon size="sm">
            <path d="M6 6l12 12M18 6L6 18" />
          </Icon>
        </BaseToast.Close>
      </BaseToast.Content>
    </BaseToast.Root>
  ));
}

/**
 * Place once near the root of the app (inside `Providers`). It renders the stack of toasts and makes
 * `useToast` available. Built on Base UI Toast (live-region announcements, F6 to reach the toasts, swipe to
 * dismiss, pause on hover and focus come from there).
 *
 * @example
 * <ToastProvider>{children}</ToastProvider>
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <BaseToast.Provider>
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
 * Show short-lived feedback after an action (saved, copied, failed). Returns `show` and `close`.
 * For messages that must stay on the page, use `Alert`.
 *
 * @example
 * const { show } = useToast();
 * show({ title: "Saved", tone: "success" });
 */
export function useToast() {
  const manager = BaseToast.useToastManager();
  return {
    /** Shows a toast and returns its id. */
    show: ({ title, description, tone = "neutral", timeout }: ToastOptions) =>
      manager.add({ title, description, type: tone, timeout }),
    /** Closes one toast by id, or all of them when no id is given. */
    close: (id?: string) => manager.close(id),
  };
}
