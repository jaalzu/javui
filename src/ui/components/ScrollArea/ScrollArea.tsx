"use client";

import type { ReactNode } from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cx } from "../../utils/cx";
import styles from "./ScrollArea.module.css";

export type ScrollAreaProps = {
  /** The scrollable content. */
  children: ReactNode;
  /** Accessible name of the scrollable region. */
  label?: string;
  /** Class for the outer frame. Use it to set the height. */
  className?: string;
  /** Class for the scrolling viewport. */
  viewportClassName?: string;
};

/**
 * A styled scroll container built on Base UI Scroll Area. Use it for a fixed-height panel, such as
 * a list or a code area, where the page itself should not scroll. The viewport is keyboard focusable.
 *
 * @example
 * <ScrollArea label="Activity" className="h-64">
 *   <Stack gap="3">{items}</Stack>
 * </ScrollArea>
 */
export function ScrollArea({ children, label, className, viewportClassName }: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root className={cx(styles.root, className)}>
      <BaseScrollArea.Viewport
        className={cx(styles.viewport, viewportClassName)}
        tabIndex={0}
        role={label ? "region" : undefined}
        aria-label={label}
      >
        <BaseScrollArea.Content className={styles.content}>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar className={styles.scrollbar} orientation="vertical">
        <BaseScrollArea.Thumb className={styles.thumb} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar className={cx(styles.scrollbar, styles.horizontal)} orientation="horizontal">
        <BaseScrollArea.Thumb className={styles.thumb} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Corner className={styles.corner} />
    </BaseScrollArea.Root>
  );
}
