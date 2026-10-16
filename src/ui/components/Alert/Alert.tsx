import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon";
import styles from "./Alert.module.css";

export type AlertTone = "info" | "success" | "warning" | "danger";

export type AlertProps = {
  /** Meaning of the message. It changes the icon shape as well as the color, so it never relies on color alone. @default "info" */
  tone?: AlertTone;
  /** Short heading of the message. */
  title?: ReactNode;
} & Omit<ComponentProps<"div">, "color" | "title">;

const glyph: Record<AlertTone, ReactNode> = {
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  success: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4l9.5 16h-19z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  danger: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </>
  ),
};

/**
 * An inline message about the state of the page or a form. `danger` and `warning` use `role="alert"`
 * (announced immediately); `info` and `success` use `role="status"` (announced politely).
 * For short-lived feedback after an action, use `useToast` instead.
 *
 * @example
 * <Alert tone="danger" title="Payment failed">Check your card details and try again.</Alert>
 */
export function Alert({ tone = "info", title, className, children, ...rest }: AlertProps) {
  const role = tone === "danger" || tone === "warning" ? "alert" : "status";
  return (
    <div role={role} className={cx(styles.alert, styles[tone], className)} {...rest}>
      <Icon className={styles.icon}>{glyph[tone]}</Icon>
      <div className={styles.body}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <div className={styles.text}>{children}</div> : null}
      </div>
    </div>
  );
}
