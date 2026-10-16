import type { ComponentProps, CSSProperties } from "react";
import { cx } from "../../utils/cx";
import styles from "./Skeleton.module.css";

export type SkeletonProps = {
  /** Shape of the placeholder. `text` matches one line of body text. @default "text" */
  shape?: "text" | "rect" | "circle";
  /** CSS width, for example `"12rem"` or `"100%"`. */
  width?: string;
  /** CSS height. Defaults depend on `shape`. */
  height?: string;
} & Omit<ComponentProps<"span">, "color" | "children">;

/**
 * Placeholder for content that is loading. Purely decorative: it is hidden from assistive technology.
 * Mark the region that is loading with `aria-busy="true"` on its container and announce completion yourself.
 *
 * @example
 * <section aria-busy="true"><Skeleton width="60%" /><Skeleton shape="rect" height="8rem" /></section>
 */
export function Skeleton({ shape = "text", width, height, className, style, ...rest }: SkeletonProps) {
  const computed: CSSProperties = {
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...style,
  };
  return <span aria-hidden="true" className={cx(styles.skeleton, styles[shape], className)} style={computed} {...rest} />;
}
