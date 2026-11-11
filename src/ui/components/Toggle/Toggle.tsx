"use client";

import { useEffect, type ComponentProps, type ReactNode } from "react";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cx } from "../../utils/cx";
import { iconPosition } from "../../utils/iconPosition";
import type { ButtonSize } from "../Button";
import { IconSlot } from "../Icon/IconSlot";
import { useToggleGroupContext } from "./ToggleContext";
import styles from "./Toggle.module.css";

type BaseToggleProps = ComponentProps<typeof BaseToggle>;

export type ToggleProps = Omit<BaseToggleProps, "children" | "className"> & {
  /** Visible label. Omit it for an icon-only toggle and provide `aria-label`. */
  children?: ReactNode;
  /** Icon before the label, or the icon for an icon-only toggle. */
  startIcon?: ReactNode;
  /** Icon after the label. */
  endIcon?: ReactNode;
  /** Control height and icon size, following `Button`. @default "md" */
  size?: ButtonSize;
  /** Visual treatment. `default` has no border; `outline` draws the control border. @default "default" */
  variant?: ToggleVariant;
  className?: string;
};

export type ToggleVariant = "default" | "outline";

/**
 * A button with an on/off state (`aria-pressed`), built on Base UI Toggle. Use it for a state the
 * person flips on the spot: bold, a filter, mute. For a setting that applies immediately and is
 * read as a setting (dark mode, notifications), use `Switch`. To pick among related options, use
 * `ToggleGroup`.
 *
 * Uncontrolled with `defaultPressed`, controlled with `pressed` and `onPressedChange`. Icon-only
 * toggles need `aria-label` or `aria-labelledby`. Sizes follow `Button`.
 *
 * @example
 * <Toggle>Bold</Toggle>
 * <Toggle defaultPressed startIcon={<ListIcon />}>List</Toggle>
 * <Toggle aria-label="Bold" startIcon={<BoldIcon />} />
 */
export function Toggle({
  children,
  startIcon,
  endIcon,
  size,
  variant,
  className,
  ...rest
}: ToggleProps) {
  const group = useToggleGroupContext();
  const resolvedSize = size ?? group?.size ?? "md";
  const resolvedVariant = variant ?? group?.variant ?? "default";
  const hasLabel = children !== undefined && children !== null && children !== false;
  const position = iconPosition({ startIcon, endIcon, hasLabel });
  const ariaLabel = rest["aria-label"];
  const ariaLabelledBy = rest["aria-labelledby"];

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!hasLabel && !ariaLabel && !ariaLabelledBy) {
      console.warn(
        "Toggle: icon-only toggles need an accessible name. Pass aria-label or aria-labelledby.",
      );
    }
  }, [ariaLabel, ariaLabelledBy, hasLabel]);

  return (
    <BaseToggle
      {...rest}
      className={cx(styles.toggle, styles[resolvedSize], className)}
      data-icon={position}
      data-variant={resolvedVariant}
    >
      <IconSlot>{startIcon}</IconSlot>
      {children}
      <IconSlot>{endIcon}</IconSlot>
    </BaseToggle>
  );
}
