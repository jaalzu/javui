const BLOCK_TAGS = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "details",
  "div",
  "dl",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "table",
  "ul",
]);

const SKIPPED_TAGS = new Set([
  "button",
  "input",
  "noscript",
  "script",
  "select",
  "style",
  "summary",
  "svg",
  "textarea",
]);

function shouldSkip(element: HTMLElement): boolean {
  if (element.getAttribute("aria-hidden") === "true") return true;
  if (element.hasAttribute("data-doc-skip")) return true;
  return SKIPPED_TAGS.has(element.tagName.toLowerCase());
}

/** Collapses the whitespace that JSX and CSS introduce between elements. */
function squish(text: string): string {
  return text.replace(/\s+/g, " ");
}

function escapeInline(text: string): string {
  return text.replace(/([\\`*])/g, "\\$1");
}

function codeSpan(text: string): string {
  const value = text.replace(/\n/g, " ").trim();
  if (!value) return "";
  const fence = value.includes("`") ? "``" : "`";
  return `${fence}${value}${fence}`;
}

/** Inline content of an element, already serialized as Markdown. */
function inlineChildren(element: Node): string {
  return Array.from(element.childNodes).map(inline).join("");
}

function cleanInline(text: string): string {
  return text
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .trim();
}

function inline(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeInline(squish(node.textContent ?? ""));
  }
  if (!(node instanceof HTMLElement) || shouldSkip(node)) return "";

  const children = () => cleanInline(inlineChildren(node));

  switch (node.tagName.toLowerCase()) {
    case "br":
      return "  \n";
    case "strong":
    case "b": {
      const text = children();
      return text ? `**${text}**` : "";
    }
    case "em":
    case "i": {
      const text = children();
      return text ? `*${text}*` : "";
    }
    case "del":
    case "s": {
      const text = children();
      return text ? `~~${text}~~` : "";
    }
    case "code":
    case "kbd":
      return codeSpan(node.textContent ?? "");
    case "a": {
      const href = node.getAttribute("href");
      const label = children();
      if (!href) return label;
      return label ? `[${label}](${href})` : href;
    }
    case "img": {
      const src = node.getAttribute("src");
      const alt = node.getAttribute("alt") ?? "";
      return src ? `![${alt}](${src})` : "";
    }
    default:
      return children();
  }
}

function renderList(list: HTMLElement): string {
  const ordered = list.tagName.toLowerCase() === "ol";
  const start = Number(list.getAttribute("start") ?? "1") || 1;
  const items = Array.from(list.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.tagName.toLowerCase() === "li",
  );

  return items
    .map((item, index) => {
      const marker = ordered ? `${start + index}. ` : "- ";
      const indent = " ".repeat(marker.length);
      const blocks = renderBlocks(item);
      const [first = "", ...rest] = blocks;
      const restText = rest
        .map((block) =>
          block
            .split("\n")
            .map((line) => (line ? indent + line : ""))
            .join("\n"),
        )
        .join("\n\n");
      return `${marker}${first}${restText ? `\n\n${restText}` : ""}`;
    })
    .join("\n");
}

function renderPre(pre: HTMLElement): string {
  const code = pre.querySelector("code") ?? pre;
  const text = (code.textContent ?? "").replace(/\n$/, "");
  const language =
    code.className.match(/language-([\w-]+)/)?.[1] ??
    pre.className.match(/language-([\w-]+)/)?.[1] ??
    "";
  const fence = text.includes("```") ? "````" : "```";
  return `${fence}${language}\n${text}\n${fence}`;
}

function renderTable(table: HTMLElement): string {
  const rows = Array.from(table.querySelectorAll("tr"));
  if (!rows.length) return "";

  const cells = rows.map((row) =>
    Array.from(row.children).map((cell) =>
      cleanInline(inlineChildren(cell))
        .replace(/\n+/g, " ")
        .replace(/\|/g, "\\|"),
    ),
  );
  const width = Math.max(...cells.map((row) => row.length));
  const padded = cells.map((row) => [
    ...row,
    ...Array.from({ length: width - row.length }, () => ""),
  ]);
  const [header, ...body] = padded;

  return [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...body.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function renderBlock(element: HTMLElement): string[] {
  const tag = element.tagName.toLowerCase();
  const heading = /^h([1-6])$/.exec(tag);

  if (heading) {
    const text = cleanInline(inlineChildren(element));
    return text ? [`${"#".repeat(Number(heading[1]))} ${text}`] : [];
  }

  switch (tag) {
    case "p": {
      const text = cleanInline(inlineChildren(element));
      return text ? [text] : [];
    }
    case "ul":
    case "ol":
      return [renderList(element)];
    case "pre":
      return [renderPre(element)];
    case "blockquote": {
      const body = renderBlocks(element).join("\n\n");
      return body
        ? [body.split("\n").map((line) => (line ? `> ${line}` : ">")).join("\n")]
        : [];
    }
    case "hr":
      return ["---"];
    case "table":
      return [renderTable(element)];
    default:
      return renderBlocks(element);
  }
}

function renderBlocks(parent: ParentNode): string[] {
  const blocks: string[] = [];
  let buffer = "";

  const flush = () => {
    const text = cleanInline(buffer).replace(/\n{3,}/g, "\n\n");
    if (text) blocks.push(text);
    buffer = "";
  };

  for (const child of Array.from(parent.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      buffer += inline(child);
      continue;
    }
    if (!(child instanceof HTMLElement) || shouldSkip(child)) continue;

    // A live example has a rendered stage and a "View code" disclosure. Only the code
    // is useful as Markdown; the stage is a preview, not authored content.
    if (child.hasAttribute("data-doc-example")) {
      flush();
      for (const details of Array.from(child.querySelectorAll("details"))) {
        blocks.push(...renderBlocks(details));
      }
      continue;
    }

    const tag = child.tagName.toLowerCase();
    if (BLOCK_TAGS.has(tag)) {
      flush();
      blocks.push(...renderBlock(child));
    } else {
      buffer += inline(child);
    }
  }

  flush();
  return blocks;
}

/** Serializes the docs article into plain Markdown, ready to paste into an editor or an agent. */
export function articleToMarkdown(article: HTMLElement): string {
  const body = renderBlocks(article)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return body ? `${body}\n` : "";
}
