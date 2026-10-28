"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Popover } from "@base-ui/react/popover";
import { Link } from "@/ui";
import touchTarget from "@/ui/styles/touchTarget.module.css";
import layout from "../_layout/DocsLayout.module.css";
import styles from "./OnThisPage.module.css";

type Item = { id: string; label: string; level: 2 | 3 };

/** Index of the headings in the page that is being read. */
export function OnThisPage() {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string>();
  const [open, setOpen] = useState(false);
  const suppressFocusOpen = useRef(false);

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;

    let latest: Item[] = [];
    let frame = 0;

    const update = () => {
      let current = latest[0]?.id;
      for (const item of latest) {
        const heading = document.getElementById(item.id);
        if (heading && heading.getBoundingClientRect().top <= 120) {
          current = item.id;
        }
      }
      setActive(current);
    };

    const scan = () => {
      const article = main.querySelector("article");
      if (!article) return;

      const headings = Array.from(
        article.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
      ).filter(
        (h) =>
          !h.closest("[data-doc-example]") && !h.closest("[data-doc-skip]"),
      );

      const next = headings.map<Item>((heading) => ({
        id: heading.id,
        label: heading.textContent?.trim() ?? heading.id,
        level: heading.tagName === "H3" ? 3 : 2,
      }));

      const same =
        next.length === latest.length &&
        next.every(
          (item, i) =>
            item.id === latest[i].id && item.label === latest[i].label,
        );
      // An empty page must still clear the index: the effect starts with `latest = []`,
      // so without this a page without headings would keep the previous page's items.
      if (same && next.length > 0) return;

      latest = next;
      setItems(next);
      update();
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(main, { childList: true, subtree: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className={layout.toc}>
      <Popover.Root
        open={open}
        onOpenChange={(next, details) => {
          if (!next && details.reason === "escape-key") {
            suppressFocusOpen.current = true;
          }
          setOpen(next);
        }}
      >
        <Popover.Trigger
          className={`${styles.trigger} ${touchTarget.touchTarget}`}
          aria-label="On this page"
          openOnHover
          delay={0}
          onClickCapture={(event) => {
            // The rail opens on hover and keyboard focus; pointer clicks do not toggle it.
            if (event.detail > 0) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onFocus={(event) => {
            if (
              !suppressFocusOpen.current &&
              event.currentTarget.matches(":focus-visible")
            ) {
              setOpen(true);
            }
          }}
          onBlur={() => {
            suppressFocusOpen.current = false;
          }}
        >
          {items.map((item, i) => (
            <span
              key={`${item.id}-${i}`}
              aria-hidden="true"
              className={styles.line}
              data-level={item.level}
              data-active={active === item.id ? "" : undefined}
            />
          ))}
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner
            side="left"
            align="start"
            sideOffset={8}
            className={styles.positioner}
          >
            <Popover.Popup className={styles.popup}>
              <Popover.Title className={styles.title}>
                On this page
              </Popover.Title>
              <ul className={styles.list}>
                {items.map((item, i) => (
                  <li key={`${item.id}-${i}`}>
                    <Link
                      href={`#${item.id}`}
                      tone="inherit"
                      data-level={item.level}
                      aria-current={
                        active === item.id ? "location" : undefined
                      }
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </nav>
  );
}
