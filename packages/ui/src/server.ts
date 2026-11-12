/**
 * Server-only entry point. `CodeBlock` highlights with Shiki at request time, so it must not be
 * imported from a client component. Import it from `@/ui/server` in Server Components.
 */
export { CodeBlock } from "./components/CodeBlock/CodeBlock";
export type { CodeBlockProps, CodeTab, CodeTone } from "./components/CodeBlock/types";
