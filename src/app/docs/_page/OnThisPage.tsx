"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/ui";
import layout from "../_layout/DocsLayout.module.css";

type Item = { id: string; label: string; level: 2 | 3 };

const slug = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "section";

/** Index of the headings in the page that is being read. */
export function OnThisPage() {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string>();

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

      const used = new Set(
        Array.from(article.querySelectorAll<HTMLElement>("[id]")).map(
          (el) => el.id,
        ),
      );
      const headings = Array.from(
        article.querySelectorAll<HTMLHeadingElement>("h2, h3"),
      ).filter(
        (h) =>
          !h.closest("[data-doc-example]") && !h.closest("[data-doc-skip]"),
      );

      const next = headings.map<Item>((heading) => {
        if (!heading.id) {
          const base = slug(heading.textContent ?? "");
          let id = base;
          let n = 2;
          while (used.has(id)) id = `${base}-${n++}`;
          heading.id = id;
          used.add(id);
        }
        return {
          id: heading.id,
          label: heading.textContent?.trim() ?? heading.id,
          level: heading.tagName === "H3" ? 3 : 2,
        };
      });

      const same =
        next.length === latest.length &&
        next.every(
          (item, i) =>
            item.id === latest[i].id && item.label === latest[i].label,
        );
      if (same) return;

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
      <div className={layout.tocScroll}>
        <p className={layout.tocTitle}>On this page</p>
        <ul className={layout.tocList}>
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                tone="inherit"
                className={layout.tocLink}
                data-level={item.level}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
