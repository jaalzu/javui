import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Table.module.css";

export type TableColumn = {
  /** Key of the value to read from each row. */
  key: string;
  /** Column header text. */
  header: ReactNode;
  /** Text alignment. Use `end` for numbers. @default "start" */
  align?: "start" | "end";
};

export type TableProps = {
  /** Describes the table. Required: it is the accessible name and the visible caption. */
  caption: string;
  /** Visually hide the caption (it stays available to screen readers). @default false */
  hideCaption?: boolean;
  /** Column definitions, in order. */
  columns: TableColumn[];
  /** One object per row, keyed by `columns[].key`. */
  rows: Array<Record<string, ReactNode>>;
  /** Key of the row value that is unique per row. Falls back to the row index. */
  rowKey?: string;
  className?: string;
};

/**
 * Data table with a real `table`, `caption`, `th scope="col"` and a first-column row header. The wrapper
 * scrolls horizontally on small screens and is focusable so keyboard users can scroll it.
 * For layout, use `Grid` or `Stack`, never a table.
 *
 * @example
 * <Table caption="Plans" columns={[{ key: "name", header: "Plan" }, { key: "price", header: "Price", align: "end" }]}
 *   rows={[{ name: "Free", price: "$0" }, { name: "Pro", price: "$12" }]} />
 */
export function Table({ caption, hideCaption = false, columns, rows, rowKey, className }: TableProps) {
  return (
    // A scrollable region must be focusable so keyboard users can scroll it (axe: scrollable-region-focusable).
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={cx(styles.wrapper, className)} role="region" aria-label={caption} tabIndex={0}>
      <table className={styles.table}>
        <caption className={cx(styles.caption, hideCaption && styles.hidden)}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cx(styles.cell, styles.head, c.align === "end" && styles.end)}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey ? String(row[rowKey]) : i}>
              {columns.map((c, ci) =>
                ci === 0 ? (
                  <th key={c.key} scope="row" className={cx(styles.cell, styles.rowHead, c.align === "end" && styles.end)}>
                    {row[c.key]}
                  </th>
                ) : (
                  <td key={c.key} className={cx(styles.cell, c.align === "end" && styles.end)}>
                    {row[c.key]}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
