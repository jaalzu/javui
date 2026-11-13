"use client";

import { useRef, type ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { cx } from "../../utils/cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import styles from "./Popover.module.css";

/**
 * Root of a popover: a small panel anchored to a button, for extra controls or details the user asked for.
 * Use Popover for about 22rem of content and up to 3–4 fields; use Tooltip for supplementary hints,
 * Menu for a list of actions, Modal for decisions, and Sheet for longer content.
 * Built on Base UI Popover (focus management, Escape to close, outside click and positioning come from there).
 *
 * @example
 * <Popover>
 *   <PopoverTrigger variant="secondary">Filters</PopoverTrigger>
 *   <PopoverContent title="Filters" description="Narrow the results.">...</PopoverContent>
 * </Popover>
 */
export const Popover = BasePopover.Root;

export type PopoverTriggerProps = {
  /** Button style of the trigger. @default "secondary" */
  variant?: ButtonVariant;
  /** Button size of the trigger. @default "md" */
  size?: ButtonSize;
  /** Icon before the label, or the icon for an icon-only trigger. Pass a generated icon without `size`. */
  startIcon?: ReactNode;
  /** Icon after the label. Pass a generated icon without `size`. */
  endIcon?: ReactNode;
  /** Fully rounded trigger. @default false */
  pill?: boolean;
} & Omit<BasePopover.Trigger.Props, "render" | "className" | "color">;

/**
 * The button that opens the popover. It is rendered as a `Button`.
 *
 * @example
 * <PopoverTrigger variant="secondary">Filters</PopoverTrigger>
 */
export function PopoverTrigger({
  variant = "secondary",
  size,
  startIcon,
  endIcon,
  pill,
  children,
  ...rest
}: PopoverTriggerProps) {
  return (
    <BasePopover.Trigger
      render={
        <Button
          variant={variant}
          size={size}
          startIcon={startIcon}
          endIcon={endIcon}
          pill={pill}
          {...(rest as { "aria-label"?: string; "aria-labelledby"?: string })}
        >
          {children}
        </Button>
      }
      {...rest}
    />
  );
}

export type PopoverContentProps = {
  /** Heading of the panel. Required: it is the accessible name of the popover. */
  title: ReactNode;
  /** Short explanation, announced as the accessible description. */
  description?: ReactNode;
  /** The content: text, a form, or `PopoverClose` buttons. */
  children?: ReactNode;
  /** Preferred side of the trigger. @default "bottom" */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment against the trigger. @default "center" */
  align?: "start" | "center" | "end";
  className?: string;
};

/**
 * The popover panel with its title and description. Place it inside `Popover`.
 *
 * @example
 * <PopoverContent title="Filters" description="Narrow the results.">
 *   <PopoverClose>Done</PopoverClose>
 * </PopoverContent>
 */
export function PopoverContent({ title, description, children, side = "bottom", align = "center", className }: PopoverContentProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={4} className={styles.positioner}>
        <BasePopover.Popup
          ref={popupRef}
          className={cx(styles.popup, className)}
          initialFocus={() =>
            popupRef.current?.querySelector<HTMLElement>(
              'input:not([type="hidden"]), textarea, select, [contenteditable="true"]',
            ) ?? true
          }
        >
          <BasePopover.Title className={styles.title}>{title}</BasePopover.Title>
          {description ? <BasePopover.Description className={styles.description}>{description}</BasePopover.Description> : null}
          {children ? <div className={styles.body}>{children}</div> : null}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export type PopoverCloseProps = {
  /** Button style. @default "secondary" */
  variant?: ButtonVariant;
  /** Button size. @default "sm" */
  size?: ButtonSize;
} & Omit<BasePopover.Close.Props, "render" | "className" | "color">;

/**
 * A button that closes the popover. It is rendered as a `Button`.
 *
 * @example
 * <PopoverClose>Done</PopoverClose>
 */
export function PopoverClose({ variant = "secondary", size = "sm", children, ...rest }: PopoverCloseProps) {
  return (
    <BasePopover.Close
      render={
        <Button variant={variant} size={size}>
          {children}
        </Button>
      }
      {...rest}
    />
  );
}
