import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Table.module.css";

export type TableColumn = {
  /** Key of the value to read from each row. @deprecated Use TableHead and TableCell. */
  key: string;
  /** Column header text. @deprecated Use TableHead. */
  header: ReactNode;
  /** Text alignment. Use `end` for numbers. @default "start" */
  align?: "start" | "end";
};

type LegacyTableProps = {
  /** @deprecated Use TableCaption. */
  caption: string;
  /** @deprecated Use TableCaption with `hidden`. */
  hideCaption?: boolean;
  /** @deprecated Compose TableHead and TableCell instead. */
  columns: TableColumn[];
  /** @deprecated Compose TableRow and TableCell instead. */
  rows: Array<Record<string, ReactNode>>;
  /** @deprecated Use explicit row keys on composed rows. */
  rowKey?: string;
  children?: never;
};

export type TableProps = Omit<ComponentProps<"table">, "children" | "className"> & {
  /** Table content, composed from TableCaption, TableHeader, TableBody, TableFooter and their parts. */
  children?: ReactNode;
  /** Accessible name for the scroll region. The caption names the table itself. */
  "aria-label"?: string;
  /** Extra class for the scroll region. */
  className?: string;
} & (LegacyTableProps | { caption?: never; columns?: never; rows?: never; rowKey?: never });

/**
 * A responsive semantic table. Compose it with `TableCaption`, `TableHeader`, `TableBody`,
 * `TableFooter`, `TableRow`, `TableHead` and `TableCell`; the wrapper stays horizontally scrollable
 * and focusable on small screens.
 *
 * @example
 * <Table aria-label="Recent invoices">
 *   <TableCaption>A list of your recent invoices.</TableCaption>
 *   <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
 *   <TableBody><TableRow><TableCell>INV001</TableCell><TableCell>Paid</TableCell></TableRow></TableBody>
 * </Table>
 */
export function Table(props: TableProps) {
  const { className, children, "aria-label": ariaLabel, caption, columns, rows, rowKey, hideCaption, ...tableProps } = props as TableProps & LegacyTableProps;
  const legacy = columns && rows;
  const content = legacy ? (
    <>
      <TableCaption hidden={hideCaption}>{caption}</TableCaption>
      <TableHeader><TableRow>{columns.map((column) => <TableHead key={column.key} align={column.align}>{column.header}</TableHead>)}</TableRow></TableHeader>
      <TableBody>{rows.map((row, index) => <TableRow key={rowKey ? String(row[rowKey]) : index}>{columns.map((column, columnIndex) => columnIndex === 0 ? <TableHead key={column.key} scope="row" align={column.align}>{row[column.key]}</TableHead> : <TableCell key={column.key} align={column.align}>{row[column.key]}</TableCell>)}</TableRow>)}</TableBody>
    </>
  ) : children;

  return (
    // A scrollable region must be focusable so keyboard users can scroll it.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={cx(styles.wrapper, className)} role="region" aria-label={ariaLabel ?? (legacy ? caption : undefined)} tabIndex={0}>
      <table {...tableProps} aria-label={ariaLabel} className={styles.table}>{content}</table>
    </div>
  );
}

export type TableCaptionProps = ComponentProps<"caption"> & { hidden?: boolean };
/** The accessible caption for a Table. */
export function TableCaption({ className, hidden = false, ...props }: TableCaptionProps) {
  return <caption {...props} className={cx(styles.caption, hidden && styles.hidden, className)} />;
}

/** The column-heading section of a Table. */
export function TableHeader(props: ComponentProps<"thead">) { return <thead {...props} />; }
/** The main data section of a Table. */
export function TableBody({ className, ...props }: ComponentProps<"tbody">) { return <tbody {...props} className={cx(styles.body, className)} />; }
/** The summary section of a Table, rendered with a highlighted surface. */
export function TableFooter({ className, ...props }: ComponentProps<"tfoot">) { return <tfoot {...props} className={cx(styles.footer, className)} />; }
/** A row inside a Table section. */
export function TableRow({ className, ...props }: ComponentProps<"tr">) { return <tr {...props} className={cx(styles.row, className)} />; }

export type TableHeadProps = Omit<ComponentProps<"th">, "align"> & { align?: "start" | "end" };
/** A column or row header cell. */
export function TableHead({ className, align, scope = "col", ...props }: TableHeadProps) {
  return <th {...props} scope={scope} className={cx(styles.cell, scope === "row" ? styles.rowHead : styles.head, align === "end" && styles.end, className)} />;
}

export type TableCellProps = Omit<ComponentProps<"td">, "align"> & { align?: "start" | "end" };
/** A data cell inside a TableRow. */
export function TableCell({ className, align, ...props }: TableCellProps) {
  return <td {...props} className={cx(styles.cell, align === "end" && styles.end, className)} />;
}
