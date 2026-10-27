import type { ReactNode } from "react";

export type StageHeight = "sm" | "md" | "lg";
export type Example = { title: string; description?: string; node: ReactNode; code: string; stageHeight?: StageHeight };
export const ex = (title: string, code: string, node: ReactNode, description?: string, stageHeight?: StageHeight): Example => ({ title, description, code, node, stageHeight });
