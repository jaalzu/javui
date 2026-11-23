"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@javui/ui";
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

function Group({
  title,
  links,
  pathname,
  spaced = false,
}: {
  title: string;
  links: NavLink[];
  pathname: string;
  spaced?: boolean;
}) {
  return (
    <div className={layout.sideGroup}>
      <p
        className={`${layout.sideTitle} ${spaced ? layout.sideTitleSpaced : ""}`}
      >
        {title}
      </p>
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

type DisclosureSection = { title: string; href: string; links: NavLink[] };

const disclosureSections: DisclosureSection[] = [
  {
    title: "Foundations",
    href: "/docs/foundations",
    links: foundationSections,
  },
  {
    title: "Layout & Utilities",
    href: "/docs/layout-utilities",
    links: [...layoutSections, ...layoutComponentLinks],
  },
];

function DisclosureGroup({
  title,
  href,
  links,
  pathname,
  open,
  onOpen,
}: DisclosureSection & {
  pathname: string;
  open: boolean;
  onOpen: () => void;
}) {
  const contentId = useId();

  return (
    <div className={layout.sideGroup}>
      <Link
        href={href}
        tone="inherit"
        className={layout.sideLink}
        aria-expanded={open}
        aria-current={pathname === href ? "page" : undefined}
        aria-controls={contentId}
        onClick={(event) => {
          // A second click on the current group does nothing: it never collapses.
          if (pathname === href) event.preventDefault();
          if (!open) onOpen();
        }}
      >
        {title}
      </Link>
      {/* Kept mounted so both opening and closing can animate smoothly. */}
      <div
        className={layout.sideDisclosurePanel}
        data-open={open ? "" : undefined}
        inert={!open}
      >
        <div className={layout.sideDisclosureClip}>
          <ul
            id={contentId}
            className={`${layout.sideList} ${layout.sideDisclosureList}`}
          >
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
      </div>
    </div>
  );
}

/** The documentation index: sections, components, then providers and hooks. */
export function DocsNav() {
  const pathname = usePathname();
  const activeDisclosureHref = disclosureSections.find(
    (section) =>
      pathname === section.href ||
      section.links.some((link) => pathname === link.href),
  )?.href;

  // Only one group is open at a time: opening one closes the other.
  const [openHref, setOpenHref] = useState<string | null>(
    activeDisclosureHref ?? null,
  );
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Follow the route: when the page changes, open the group that owns it
  // (or close everything). Adjusting state during render avoids an extra
  // effect pass.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenHref(activeDisclosureHref ?? null);
  }

  return (
    <nav aria-label="Documentation">
      <Group
        title="Getting started"
        links={generalSections}
        pathname={pathname}
      />
      {disclosureSections.map((section) => (
        <DisclosureGroup
          key={section.href}
          {...section}
          pathname={pathname}
          open={openHref === section.href}
          onOpen={() => setOpenHref(section.href)}
        />
      ))}
      <Group
        title="Components"
        links={[
          { ...componentsIndex, label: "All components" },
          ...componentLinks,
        ]}
        pathname={pathname}
        spaced
      />
      <Group
        title="Providers and hooks"
        links={providerLinks}
        pathname={pathname}
        spaced
      />
      <Group
        title="More"
        links={generalSectionsEnd}
        pathname={pathname}
        spaced
      />
    </nav>
  );
}
