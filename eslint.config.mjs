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
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
