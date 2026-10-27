import type { ReactNode } from "react";

export type StageHeight = "sm" | "md" | "lg";

/** A case shown under "Examples": its title, optional note, live preview and code. */
export type Example = { title: string; description?: string; node: ReactNode; code: string; stageHeight?: StageHeight };

/**
 * The hero showcase of a component page: the one preview shown right under the title and subtitle.
 * It lives in the component's own `*.examples.tsx`, next to its cases.
 */
export type Hero = {
  /** Live showcase. Pick whatever shows the component at its best. */
  node: ReactNode;
  /** Code that matches the showcase (used by "View code"). */
  code: string;
  /** Optional fixed stage height. */
  stageHeight?: StageHeight;
  /** Use a scrollable stage, for components that need more room (Accordion, Menu, ...). */
  fixed?: boolean;
};

export const ex = (title: string, code: string, node: ReactNode, description?: string, stageHeight?: StageHeight): Example => ({ title, description, code, node, stageHeight });

/** Builds the hero of a component page from the code and the showcase it renders. */
export const defineHero = (code: string, node: ReactNode, options: { stageHeight?: StageHeight; fixed?: boolean } = {}): Hero => ({ code, node, ...options });
