/* eslint-disable @next/next/no-img-element -- SVGs temáticos en public/: dos <img> con toggle CSS; next/image añade wrappers que lo rompen y no optimiza SVG. */
import type { ImgHTMLAttributes } from "react";
import styles from "./Logo.module.css";

type LogoImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "alt"
>;

/**
 * Isotipo de la marca. Es el único logotipo del header (sin el texto "JAVUI").
 */
export function Mark({ className, ...props }: LogoImageProps) {
  const cls = [styles.mark, className].filter(Boolean).join(" ");
  return (
    <span className={cls} aria-hidden="true" data-testid="logo-mark">
      <img
        src="/logo/logo.svg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        draggable={false}
        className={styles.light}
        {...props}
      />
      <img
        src="/logo/logo.svg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        draggable={false}
        className={styles.dark}
        {...props}
      />
    </span>
  );
}

