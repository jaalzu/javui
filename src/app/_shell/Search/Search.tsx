"use client";
/* Options and the backdrop are mouse conveniences: the keyboard path is the combobox input (arrows, Enter, Escape). */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/click-events-have-key-events */

import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Button, Kbd, MagnifyingGlassIcon, XIcon } from "@/ui";
import styles from "./Search.module.css";

export type SearchItem = {
  href: string;
  label: string;
  group: string;
};

const noSubscribe = () => () => {};
const modifierKey = () =>
  /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl";

function score(item: SearchItem, q: string): number {
  const label = item.label.toLowerCase();
  if (label === q) return 100;
  if (label.startsWith(q)) return 80;
  if (label.includes(q)) return 60;
  return 0;
}

/**
 * Site search. A button in the header opens a native modal dialog with a combobox: type to filter docs pages and
 * components, move with the arrow keys, Enter opens the result. Opens with Ctrl/⌘ + K or "/".
 */
export function Search({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const mod = useSyncExternalStore(noSubscribe, modifierKey, () => "Ctrl");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items
      .map((item) => ({ item, s: score(item, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.item.label.localeCompare(b.item.label))
      .map((r) => r.item);
  }, [items, query]);

  function open() {
    setQuery("");
    setActive(0);
    dialog.current?.showModal();
    input.current?.focus();
  }

  function go(item: SearchItem | undefined) {
    if (!item) return;
    dialog.current?.close();
    router.push(item.href);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing = target.closest(
        "input, textarea, select, [contenteditable='true']",
      );
      if (
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !typing)
      ) {
        event.preventDefault();
        open();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onInputKey(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active]);
    }
  }

  useEffect(() => {
    document
      .getElementById(`${listId}-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  return (
    <>
      <button type="button" className={styles.searchButton} onClick={open}>
        <MagnifyingGlassIcon size="md" className={styles.searchIcon} />
        <span className={styles.searchText}>Search documentation</span>
        <span className={styles.searchKeys} aria-hidden="true">
          <Kbd>{mod}</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>
      <dialog
        ref={dialog}
        aria-label="Search"
        className={styles.searchDialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        <div className={styles.searchBox}>
          <MagnifyingGlassIcon size="sm" className={styles.searchGlyph} />
          <input
            ref={input}
            type="search"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={
              results.length ? `${listId}-${active}` : undefined
            }
            aria-autocomplete="list"
            aria-label="Search the documentation"
            placeholder="Search components and docs…"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            className={styles.searchInput}
          />
          <Button
            variant="ghost"
            size="sm"
            aria-label="Close search"
            className={styles.closeButton}
            startIcon={<XIcon />}
            onClick={() => dialog.current?.close()}
          />
        </div>
        <ul
          id={listId}
          role="listbox"
          aria-label="Results"
          className={styles.searchList}
        >
          {results.map((item, i) => (
            <li
              key={item.href}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              data-active={i === active ? "" : undefined}
              className={styles.searchItem}
              onMouseMove={() => setActive(i)}
              onClick={() => go(item)}
            >
              <span className={styles.searchLabel}>{item.label}</span>
              <span className={styles.searchGroup}>{item.group}</span>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p className={styles.searchEmpty}>No results for “{query}”.</p>
        )}
        <p className={styles.searchStatus} role="status">
          {results.length} {results.length === 1 ? "result" : "results"}
        </p>
      </dialog>
    </>
  );
}
