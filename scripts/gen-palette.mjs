// One-off helper: converts the source hex colors to OKLCH, derives the light-theme
// counterparts and the neutral scale, checks WCAG contrast, and prints the primitive
// palette as DTCG JSON. Run: bun scripts/gen-palette.mjs > src/ui/tokens/primitive.json
import { parse, converter, formatCss, wcagContrast, blend, clampChroma } from "culori";

const oklch = converter("oklch");
const fmt = (c) => {
  const o = typeof c === "string" ? oklch(parse(c)) : c;
  const l = +o.l.toFixed(4);
  const ch = +(o.c ?? 0).toFixed(4);
  const h = +(o.h ?? 0).toFixed(2);
  return `oklch(${l} ${ch} ${h})`;
};

// --- Source colors (the user's dark theme) ---
const src = {
  bg: "#141313",
  fg: "#e9e7d9",
  button: "#d1cfc0",
  accent: "#0677d7",
  accentText: "#1a82da",
  success: "#5fbf8a",
  warning: "#e0a64a",
  info: "#7ab0e8",
  danger: "#ec7a68",
};

// Neutral scale: hue/chroma taken from fg, lightness interpolated between anchors.
const fg = oklch(parse(src.fg));
const bg = oklch(parse(src.bg));
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const neutral = {};
const lTop = 0.985;
const lBottom = bg.l;
steps.forEach((s, i) => {
  const t = i / (steps.length - 1);
  const l = lTop + (lBottom - lTop) * t;
  neutral[s] = { mode: "oklch", l, c: fg.c * (1 - t * 0.6) + bg.c * (t * 0.6), h: fg.h };
});
// Pin the user's exact colors as anchors.
neutral[100] = fg;
neutral[200] = oklch(parse(src.button));
neutral[950] = bg;

// Light-theme versions of status colors: same hue/chroma, darker so text passes 4.5:1 on light bg.
// Per-status chroma boost (1 = unchanged). Danger is pushed a little so it reads at a glance.
const CHROMA_BOOST = { danger: 1.3 };
const vivid = (hex, key) => {
  const o = oklch(parse(hex));
  return { ...o, c: o.c * (CHROMA_BOOST[key] ?? 1) };
};
const darker = (hex, targetL, key) => {
  const o = vivid(hex, key);
  return clampChroma({ ...o, l: targetL }, "oklch");
};
const lightBg = neutral[50];
const lightFgHex = formatCss(neutral[950]);
const status = {};
const report = [];
for (const k of ["success", "warning", "info", "danger"]) {
  let l = 0.6;
  let c = darker(src[k], l, k);
  while (wcagContrast(formatCss(c), formatCss(lightBg)) < 4.5 && l > 0.2) {
    l -= 0.01;
    c = darker(src[k], l, k);
  }
  status[k] = { 400: clampChroma(vivid(src[k], k), "oklch"), 700: c };
  report.push(`${k}: dark ${wcagContrast(src[k], src.bg).toFixed(2)}:1 | light ${wcagContrast(formatCss(c), formatCss(lightBg)).toFixed(2)}:1`);
}
// accent text on light
let al = 0.55;
let accentLight = darker(src.accentText, al);
while (wcagContrast(formatCss(accentLight), formatCss(lightBg)) < 4.5 && al > 0.2) {
  al -= 0.01;
  accentLight = darker(src.accentText, al);
}
report.push(`accent-text: dark ${wcagContrast(src.accentText, src.bg).toFixed(2)}:1 | light ${wcagContrast(formatCss(accentLight), formatCss(lightBg)).toFixed(2)}:1`);
report.push(`accent bg + white text: ${wcagContrast(src.accent, "#ffffff").toFixed(2)}:1`);

// Muted / subtle contrast (fg mixed over bg at 70% / 50%).
const mixDark70 = blend([parse(src.bg), { ...parse(src.fg), alpha: 0.7 }], "normal");
const mixDark50 = blend([parse(src.bg), { ...parse(src.fg), alpha: 0.5 }], "normal");
const lightFg = parse(lightFgHex);
const mixLight70 = blend([formatCss(lightBg) && parse(formatCss(lightBg)), { ...lightFg, alpha: 0.7 }], "normal");
const mixLight50 = blend([parse(formatCss(lightBg)), { ...lightFg, alpha: 0.5 }], "normal");
report.push(`fg-muted(70%): dark ${wcagContrast(mixDark70, src.bg).toFixed(2)}:1 | light ${wcagContrast(mixLight70, formatCss(lightBg)).toFixed(2)}:1`);
report.push(`fg-subtle(50%): dark ${wcagContrast(mixDark50, src.bg).toFixed(2)}:1 | light ${wcagContrast(mixLight50, formatCss(lightBg)).toFixed(2)}:1`);

console.error(report.join("\n"));

const tok = (c) => ({ $value: fmt(c), $type: "color" });
const out = {
  color: {
    $description: "Primitive palette. Components never use these directly; use semantic tokens (color.bg, color.fg, ...).",
    neutral: Object.fromEntries(steps.map((s) => [s, tok(neutral[s])])),
    accent: {
      400: tok(oklch(parse(src.accentText))),
      500: tok(oklch(parse(src.accent))),
      700: tok(accentLight),
    },
    success: { 400: tok(status.success[400]), 700: tok(status.success[700]) },
    warning: { 400: tok(status.warning[400]), 700: tok(status.warning[700]) },
    info: { 400: tok(status.info[400]), 700: tok(status.info[700]) },
    danger: { 400: tok(status.danger[400]), 700: tok(status.danger[700]) },
    white: tok({ mode: "oklch", l: 1, c: 0, h: 0 }),
    black: tok({ mode: "oklch", l: 0, c: 0, h: 0 }),
  },
};
console.log(JSON.stringify({ primitive: out }, null, 2));
