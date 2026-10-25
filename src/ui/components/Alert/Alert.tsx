import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { iconPosition } from "../../utils/iconPosition";
import { IconSlot } from "../Icon/IconSlot";
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon } from "../../icons/icons.generated";
import styles from "./Alert.module.css";

export type AlertTone = "neutral" | "info" | "success" | "warning" | "error";

export type AlertProps = {
  /** Meaning of the message. It changes the icon shape as well as the color, so it never relies on color alone. @default "neutral" */
  tone?: AlertTone;
  /** Short heading of the message. */
  title?: ReactNode;
  /** Replaces the tone icon at the start. Pass a generated icon without `size`. */
  startIcon?: ReactNode;
  /** Icon at the end, for example a link arrow. Pass a generated icon without `size`. */
  endIcon?: ReactNode;
} & Omit<ComponentProps<"div">, "color" | "title">;

const glyph = {
  neutral: InfoIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: XCircleIcon,
} satisfies Record<AlertTone, typeof InfoIcon>;

/**
 * An inline message about the state of the page or a form. `neutral` is the default; `error` and
 * `warning` are announced immediately, the rest politely. Put optional actions in `children`;
 * for short-lived feedback use `useToast` instead.
 *
 * @example
 * <Alert title="New dashboard">Take a look at your updated reports.</Alert>
 *
 * @example
 * <Alert tone="error" title="Payment failed">Check your card details and try again.</Alert>
 *
 * Icons use the 20px medium size (the alert has no size variants).
 */
export function Alert({
  tone = "neutral",
  title,
  startIcon,
  endIcon,
  className,
  children,
  ...rest
}: AlertProps) {
  const role = tone === "error" || tone === "warning" ? "alert" : "status";
  const Glyph = glyph[tone];
  const position = iconPosition({ startIcon: startIcon ?? Glyph, endIcon });
  return (
    <div
      role={role}
      className={cx(styles.alert, styles[tone], className)}
      data-icon={position}
      {...rest}
    >
      <IconSlot className={styles.icon}>{startIcon ?? <Glyph />}</IconSlot>
      <div className={styles.body}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <div className={styles.text}>{children}</div> : null}
      </div>
      <IconSlot className={styles.endIcon}>{endIcon}</IconSlot>
    </div>
  );
}
