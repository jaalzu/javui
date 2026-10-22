import "server-only";

import { highlightCode } from "./highlight";
import { CodeBlockView } from "./CodeBlockView";
import type { CodeBlockProps } from "./types";

/**
 * Preformatted code with syntax highlighting, an icon-only copy button and optional tabs for
 * alternatives such as bun, pnpm and npm. Colors come from semantic `--syntax-*` tokens, so light
 * and dark work without extra code. Unknown languages are shown as plain text.
 *
 * @example
 * <CodeBlock language="tsx" label="Example" code={'<Button>Save</Button>'} />
 * <CodeBlock language="bash" label="Install" tabs={[
 *   { label: "bun", code: "bun add @base-ui/react" },
 *   { label: "npm", code: "npm install @base-ui/react" },
 * ]} />
 */
export async function CodeBlock({
  code = "",
  tabs,
  language,
  label = "Code",
  className,
  tone = "default",
  highlight = true,
  highlightLines,
}: CodeBlockProps) {
  const html = highlight ? await highlightCode(code, language) : null;
  const tabHtml = tabs && highlight
    ? Object.fromEntries(
        await Promise.all(
          tabs.map(async (tab) => [tab.label, await highlightCode(tab.code, language)] as const),
        ),
      )
    : undefined;

  return (
    <CodeBlockView
      code={code}
      tabs={tabs}
      language={language}
      label={label}
      className={className}
      tone={tone}
      html={html}
      tabHtml={tabHtml}
      highlightLines={highlightLines}
    />
  );
}
