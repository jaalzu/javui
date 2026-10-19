import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-config-next already registers the jsx-a11y plugin with a few rules;
    // here we turn on the full recommended set (patterns that break accessibility in JSX).
    files: ["**/*.{jsx,tsx}"],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      // Scrollable live regions (role="log", like the chat transcript) must be
      // reachable with the keyboard so they can be scrolled; that is intentional.
      "jsx-a11y/no-noninteractive-tabindex": ["error", { roles: ["tabpanel", "log"] }],
    },
  },
  {
    // Icons are named components from the generated set (`bun run icons`).
    // Only `createIcon` may put a glyph inside `<Icon>`; everywhere else, import the icon.
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ignores: ["src/ui/icons/icons.generated.tsx", "src/ui/components/Icon/createIcon.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXElement[openingElement.name.name='Icon'] > JSXElement",
          message: "Do not nest a glyph inside <Icon>: import a named icon from @/ui (run `bun run icons`).",
        },
        {
          selector: "JSXElement[openingElement.name.name='Icon'] > JSXExpressionContainer",
          message: "Do not nest a glyph inside <Icon>: import a named icon from @/ui (run `bun run icons`).",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
