export type CodeTab = {
  /** Tab text, for example `bun`. */
  label: string;
  /** The code shown and copied when this tab is selected. */
  code: string;
};

/** Colors the frame of the block. Syntax highlighting stays a separate layer. */
export type CodeTone = "default" | "brand" | "success" | "danger";

export type CodeBlockProps = {
  /** The code to show, as plain text. Use `tabs` instead when there are alternatives (bun, npm, pnpm). */
  code?: string;
  /** Alternative versions of the same code, usually one command per package manager. The first tab is selected first. */
  tabs?: CodeTab[];
  /** Language name. `bash`, `sh` and `shell` show a small terminal icon instead of the word. */
  language?: string;
  /** Accessible name of the scrollable code region. @default "Code" */
  label?: string;
  className?: string;
  /** Color the frame for the kind of message: default, brand, success or danger. @default "default" */
  tone?: CodeTone;
  /** Highlight known languages on the server. Unknown languages fall back to plain text. @default true */
  highlight?: boolean;
  /**
   * 1-based line numbers to mark with a 2px left bar and a subtle background. No line numbers are
   * rendered. The same lines apply to every tab. @default undefined
   */
  highlightLines?: number[];
};
