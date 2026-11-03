"use client";

import { useId, useState } from "react";
import { usePathname } from "next/navigation";
import { CaretDownIcon, Link } from "@/ui";
import layout from "./DocsLayout.module.css";
import {
  componentLinks,
  componentsIndex,
  foundationSections,
  generalSections,
  generalSectionsEnd,
  layoutComponentLinks,
  layoutSections,
  providerLinks,
  type NavLink,
} from "./nav";

function Group({ title, links, pathname, spaced = false }: { title: string; links: NavLink[]; pathname: string; spaced?: boolean }) {
  return (
    <div className={layout.sideGroup}>
      <p className={`${layout.sideTitle} ${spaced ? layout.sideTitleSpaced : ""}`}>{title}</p>
      <ul className={layout.sideList}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              tone="inherit"
              className={layout.sideLink}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DisclosureGroup({ title, href, links, pathname }: { title: string; href: string; links: NavLink[]; pathname: string }) {
  const active = pathname === href || links.some((link) => pathname === link.href);
  const [open, setOpen] = useState(active);
  const contentId = useId();

  return (
    <div className={layout.sideGroup}>
      <Link
        href={href}
        tone="inherit"
        endIcon={<CaretDownIcon />}
        className={`${layout.sideLink} ${layout.sideDisclosureTrigger}`}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={(event) => {
          if (pathname === href) {
            event.preventDefault();
            setOpen((value) => !value);
          } else {
            setOpen(true);
          }
        }}
      >{title}</Link>
      {open && (
        <ul id={contentId} className={`${layout.sideList} ${layout.sideDisclosureList}`}>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                tone="inherit"
                className={layout.sideLink}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** The documentation index: sections, components, then providers and hooks. */
export function DocsNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation">
      <Group title="Getting started" links={generalSections} pathname={pathname} />
      <DisclosureGroup title="Foundations" href="/docs/foundations" links={foundationSections} pathname={pathname} />
      <DisclosureGroup title="Layout & Utilities" href="/docs/layout-utilities" links={[...layoutSections, ...layoutComponentLinks]} pathname={pathname} />
      <Group title="Components" links={[{ ...componentsIndex, label: "All components" }, ...componentLinks]} pathname={pathname} spaced />
      <Group title="Providers and hooks" links={providerLinks} pathname={pathname} spaced />
      <Group title="More" links={generalSectionsEnd} pathname={pathname} spaced />
    </nav>
  );
}
