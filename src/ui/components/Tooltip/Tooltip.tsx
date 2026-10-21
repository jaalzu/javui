import type { ComponentProps, ReactElement, ReactNode } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cx } from "../../utils/cx";
import styles from "./Tooltip.module.css";

export type TooltipProviderProps = ComponentProps<typeof BaseTooltip.Provider>;

/**
 * Shares the open delay between tooltips. The first tooltip waits `delay` ms; moving to the next
 * one opens instantly (`data-instant` skips the animation). Put it once near the app root.
 *
 * @default delay 600
 */
export function TooltipProvider({ delay = 600, ...rest }: TooltipProviderProps) {
  return <BaseTooltip.Provider delay={delay} {...rest} />;
}

export type TooltipProps = {
  /** Short supplementary text. Never put essential information only here. */
  content: ReactNode;
  /**
   * The element that triggers the tooltip. It must be focusable and already have its own
   * accessible name (visible text or `aria-label`).
   */
  children: ReactElement;
  /** Preferred side of the trigger. @default "top" */
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
};

/**
 * A small label that appears on hover or keyboard focus, built on Base UI Tooltip.
 * Tooltips do not appear on touch devices and are not a reliable way to describe a control, so use
 * them only to add clarity (for example the name of an icon button) and never for critical information.
 *
 * @example
 * <Tooltip content="Bold"><Button aria-label="Bold" variant="ghost">B</Button></Tooltip>
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={8} className={styles.positioner}>
          <BaseTooltip.Popup className={cx(styles.popup, className)}>{content}</BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
