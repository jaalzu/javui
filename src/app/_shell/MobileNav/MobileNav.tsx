"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Button, Link } from "@/ui";
import styles from "./MobileNav.module.css";

type NavLink = { href: string; label: string };
type Group = { title: string; links: NavLink[] };

/**
 * Menu for small screens. The sticky header stays exactly where it is; only the
 * menu icon morphs into an X, and the links slide in as a translucent overlay
 * anchored below the header. Built on Base UI Dialog (non-modal), so Escape and
 * outside presses close it.
 */
export function MobileNav({ groups }: { groups: Group[] }) {
  const [open, setOpen] = useState(false);

  // If the window grows past the mobile layout while the menu is open, close it.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function onNavClick(event: MouseEvent) {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  }

  return (
    <BaseDialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <BaseDialog.Trigger
        render={
          <Button variant="ghost" size="sm" className={styles.menuButton}>
            <span className={styles.menuIcon} aria-hidden="true" />
            <span className={styles.menuLabel}>Menu</span>
          </Button>
        }
      />
      <BaseDialog.Portal>
        <BaseDialog.Popup className={styles.menuPanel}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
          <nav
            aria-label="Site and documentation"
            className={styles.menuNav}
            onClick={onNavClick}
          >
            {groups.map((group) => (
              <div key={group.title} className={styles.menuGroup}>
                <p className={styles.menuTitle}>{group.title}</p>
                <ul className={styles.menuList}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        tone="inherit"
                        className={styles.menuLink}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
