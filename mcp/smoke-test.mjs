// Starts the MCP server over stdio, calls every tool and checks the answers.
// Run: bun mcp/smoke-test.mjs
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const here = dirname(fileURLToPath(import.meta.url));
const client = new Client({ name: "smoke-test", version: "0.0.0" });
await client.connect(new StdioClientTransport({ command: "bun", args: [resolve(here, "server.mjs")] }));

let failures = 0;
const check = (label, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${ok ? "" : "  " + detail}`);
  if (!ok) failures++;
};
const call = async (name, args = {}) => {
  const r = await client.callTool({ name, arguments: args });
  return { error: !!r.isError, text: r.content?.[0]?.text ?? "" };
};

const tools = (await client.listTools()).tools.map((t) => t.name).sort();
check(
  "exposes 7 tools",
  tools.join() === ["get_component", "get_examples", "get_guidelines", "get_icon", "list_components", "search_icons", "search_tokens"].join(),
  tools.join(),
);

let r = await call("get_guidelines");
check("guidelines mention HTML first", /HTML first/.test(r.text));

r = await call("list_components");
check("lists 45 components", JSON.parse(r.text).length === 45, r.text.slice(0, 80));

r = await call("list_components", { category: "overlays" });
check("filters by category", JSON.parse(r.text).every((c) => c.category === "overlays") && JSON.parse(r.text).length === 5);

r = await call("list_components", { category: "nope" });
check("unknown category is an error", r.error);

r = await call("get_component", { name: "button" });
const btn = JSON.parse(r.text);
check("get_component is case-insensitive and has props", btn.name === "Button" && btn.props.some((p) => p.name === "variant" && p.type.includes('"danger"')), r.text.slice(0, 120));

r = await call("get_component", { name: "Moda" });
check("unknown component suggests a name", r.error && /Modal/.test(r.text), r.text);

r = await call("get_component", { name: "Modal" });
const modal = JSON.parse(r.text);
check("groups compound parts under their parent", modal.parts?.map((p) => p.name).join() === "ModalTrigger,ModalContent,ModalClose", r.text.slice(0, 120));

r = await call("get_component", { name: "ModalContent" });
check("gets a compound part by name", !r.error && JSON.parse(r.text).name === "ModalContent", r.text.slice(0, 120));

r = await call("get_component", { name: "useToast" });
check("gets providers and hooks by name", !r.error && JSON.parse(r.text).name === "useToast", r.text.slice(0, 120));

r = await call("get_examples", { name: "Heading" });
check("examples are returned as tsx", /```tsx/.test(r.text) && /Heading/.test(r.text));

r = await call("search_tokens", { query: "focus" });
check("search_tokens finds focus tokens", /--focus-ring-width/.test(r.text) && /--color-brand-border-focus/.test(r.text));

r = await call("search_tokens", { query: "danger" });
const dangerDefault = JSON.parse(r.text);
check(
  "primitives hidden by default",
  !r.error && Array.isArray(dangerDefault) && dangerDefault.length > 0 && dangerDefault.every((t) => !t.cssVar.startsWith("--primitive-")),
  r.text.slice(0, 200),
);

r = await call("search_tokens", { query: "danger", includePrimitives: true });
check("primitives available on request", !r.error && /--primitive-color-danger/.test(r.text));

r = await call("search_icons", { query: "arrow" });
check("search_icons finds icons", !r.error && /ArrowRightIcon/.test(r.text), r.text.slice(0, 120));

r = await call("get_icon", { name: "check" });
check("get_icon returns an import", !r.error && /import \{ CheckIcon \} from .*@\/ui/.test(r.text), r.text.slice(0, 120));

r = await call("get_icon", { name: "CheckIcon" });
check("get_icon accepts the component name", !r.error && /CheckIcon/.test(r.text));

await client.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed");
process.exit(failures ? 1 : 0);
