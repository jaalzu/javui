/* eslint-disable @next/next/no-img-element -- SVGs temáticos en public/: dos <img> con toggle CSS; next/image añade wrappers que lo rompen y no optimiza SVG. */
import type { ImgHTMLAttributes } from "react";
import styles from "./Logo.module.css";

type LogoImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "alt"
>;

/**
 * Isotipo visible en todas las pantallas por debajo de 90rem (1440px),
 * además del diálogo del menú móvil.
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
 * Logotipo completo (icono + texto) solo en pantallas muy anchas.
 * Usa `bold1.svg` en tema claro y `bold.svg` en oscuro.
 * La visibilidad la sigue controlando `SiteHeader.module.css`
 * (`brandMark` / `brandWord` con breakpoint `90rem` = 1440px); por debajo
 * solo se muestra el isotipo.
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
