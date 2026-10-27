"use client";

import {
  useEffect,
  type ComponentProps,
  type CSSProperties,
  type ElementType,
} from "react";
import { cx } from "../../utils/cx";
import styles from "./AspectRatio.module.css";

/** Elements an AspectRatio may render. */
export type AspectRatioElement = "div";

export type AspectRatioProps<T extends AspectRatioElement = "div"> = {
  /**
   * Element to render. Only `div` is supported: when the media needs a caption, wrap
   * the box in a `figure` yourself.
   * @default "div"
   */
  as?: T;
  /**
   * Width divided by height, such as `16 / 9`, `4 / 3` or `1`. The box reserves that area
   * before the media loads, which prevents layout shift.
   * @default 1
   */
  ratio?: number;
} & Omit<ComponentProps<T>, "as" | "color">;

/**
 * Reserves space for media with the CSS `asspect-ratio` property. An `img`, `video`, `iframe`,
 * `picture`, `canvas` or `svg` as a direct child fills the box; images and videos use
 * `object-fit: cover`. It only renders a `div`: when the media needs a caption, wrap the box
 * in a `figure` yourself.
 *
 * @example
 * <AspectRatio ratio={16 / 9}>
 *   <img src="/cover.jpg" alt="A field at dusk" />
 * </AspectRatio>
 * <AspectRatio ratio={16 / 9}>
 *   <Image src="/cover.jpg" alt="A field at dusk" fill />
 * </AspectRatio>
 * <figure>
 *   <AspectRatio ratio={4 / 3}>
 *     <img src="/chart.png" alt="Revenue by quarter" />
 *   </AspectRatio>
 *   <figcaption>Revenue by quarter</figcaption>
 * </figure>
 */
export function AspectRatio<T extends AspectRatioElement = "div">({
  as,
  ratio = 1,
  className,
  style,
  ...rest
}: AspectRatioProps<T>) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!Number.isFinite(ratio) || ratio <= 0) {
      console.warn(
        `AspectRatio: ratio must be a positive finite number. Received ${ratio}.`,
      );
    }
  }, [ratio]);

  const Component = (as ?? "div") as ElementType<{
    className?: string;
    style?: CSSProperties;
  }>;
  return (
    <Component
      className={cx(styles.aspectRatio, className)}
      style={
        {
          "--aspect-ratio": String(ratio),
          ...(style as CSSProperties | undefined),
        } as CSSProperties
      }
      {...(rest as Record<string, unknown>)}
    />
  );
}
