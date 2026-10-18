/* eslint-disable @next/next/no-img-element -- SVGs temáticos en public/: dos <img> con toggle CSS; next/image añade wrappers que lo rompen y no optimiza SVG. */
import type { ImgHTMLAttributes } from "react";
import styles from "./Logo.module.css";

type LogoImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "alt"
>;

/**
 * Isotipo para pantallas pequeñas (mobile + diálogo del menú móvil).
 * Alterna entre `/logo/logo-white.svg` (tinta oscura, para tema claro)
 * y `/logo/logo-dark.svg` (tinta blanca, para tema oscuro) solo con CSS,
 * así no hay flash ni desajuste de hidratación con `next-themes`.
 */
export function Mark({ className, ...props }: LogoImageProps) {
  const cls = [styles.mark, className].filter(Boolean).join(" ");
  return (
    <span className={cls} aria-hidden="true" data-testid="logo-mark">
      <img
        src="/logo/logo-white.svg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        draggable={false}
        className={styles.light}
        {...props}
      />
      <img
        src="/logo/logo-dark.svg"
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

/**
 * Logotipo completo para tablet/desktop (icono + texto).
 * Usa `wordmark-dark.svg` en tema claro y `wordmark-light.svg` en oscuro.
 * La visibilidad mobile/desktop la sigue controlando `SiteHeader.module.css`
 * (`brandMark` / `brandWord` con breakpoint `48rem`).
 */
export function Wordmark({ className, ...props }: LogoImageProps) {
  const cls = [styles.wordmark, className].filter(Boolean).join(" ");
  return (
    <span className={cls} aria-hidden="true" data-testid="logo-wordmark">
      <img
        src="/logo/bold1.svg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        draggable={false}
        className={styles.light}
        {...props}
      />
      <img
        src="/logo/bold.svg"
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
