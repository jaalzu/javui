"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { Button, Icon, Link } from "@/ui";
import { Mark } from "@/app/_shell/Logo/Logo";
import styles from "./MobileNav.module.css";

type NavLink = { href: string; label: string };
type Group = { title: string; links: NavLink[] };

/**
 * Menu for small screens: a button that opens a full-screen, slightly translucent panel with every link,
 * split in groups and aligned to the left. It is a native `dialog`, so focus stays inside, Escape closes it
 * and the page behind is inert.
 */
export function MobileNav({ groups }: { groups: Group[] }) {
  const ref = useRef<HTMLDialogElement>(null);

  // If the window grows past the mobile layout while the menu is open, close it.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    const onChange = () => query.matches && ref.current?.close();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function onNavClick(event: MouseEvent) {
    if ((event.target as HTMLElement).closest("a")) ref.current?.close();
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={styles.menuOpen}
        onClick={() => ref.current?.showModal()}
      >
        <Icon size="lg"><path d="M4 8h16M4 16h16" /></Icon>
        Menu
      </Button>
      <dialog ref={ref} aria-label="Menu" className={styles.menuDialog}>
        <div className={styles.menuTop}>
          <Button variant="ghost" size="sm" aria-label="Close menu" className={styles.menuButton} onClick={() => ref.current?.close()}>
            <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>
          </Button>
          <span className={styles.menuBrand}><Mark /></span>
          <span className={styles.menuSpacer} />
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
        <nav aria-label="Site and documentation" className={styles.menuNav} onClick={onNavClick}>
          {groups.map((g) => (
            <div key={g.title} className={styles.menuGroup}>
              <p className={styles.menuTitle}>{g.title}</p>
              <ul className={styles.menuList}>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} tone="inherit" className={styles.menuLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </dialog>
    </>
  );
}
