"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@javui/ui";
import styles from "./SiteHeader.module.css";

type NavLink = { href: string; label: string };

export function MainNav({ links }: { links: NavLink[] }) {
  const list = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  const place = useCallback((li: Element | null | undefined) => {
    const el = list.current;
    const target = li as HTMLElement | null | undefined;
    if (!el) return;
    if (!target) {
      el.removeAttribute("data-glow");
      return;
    }
    // Primera aparición: se posiciona sin deslizarse desde el borde izquierdo.
    const first = !el.hasAttribute("data-glow");
    if (first) el.setAttribute("data-instant", "");
    el.style.setProperty("--glow-x", `${target.offsetLeft}px`);
    el.style.setProperty("--glow-w", `${target.offsetWidth}px`);
    if (first) {
      void el.offsetWidth; // fuerza reflow
      el.removeAttribute("data-instant");
    }
    el.setAttribute("data-glow", "");
  }, []);

  const rest = useCallback(() => {
    const current = list.current?.querySelector('a[aria-current="page"]');
    place(current?.closest("li"));
  }, [place]);

  // En mobile el nav está en display:none (offsetLeft/offsetWidth = 0); el observer vuelve a
  // medir al cruzar los 48rem y al redimensionar, para que el glow aparezca en la página activa.
  useEffect(() => {
    rest();
    const el = list.current;
    if (!el) return;
    const observer = new ResizeObserver(() => rest());
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname, rest]);

  const onOver = (e: React.SyntheticEvent) =>
    place((e.target as HTMLElement).closest("li"));

  return (
    <nav aria-label="Main" className={styles.mainNav}>
      <ul
        ref={list}
        className={styles.navList}
        onPointerOver={onOver}
        onFocus={onOver}
        onPointerLeave={rest}
        onBlur={rest}
      >
        {links.map((l) => (
          <li key={l.href}>
            <Button
              href={l.href}
              variant="ghost"
              size="md"
              className={styles.navLink}
              aria-current={l.href === pathname ? "page" : undefined}
            >
              {l.label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
