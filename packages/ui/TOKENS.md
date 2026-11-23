# Token families

Public semantic token families are preserved without renaming:

- `--color-*`: surfaces, foregrounds, component states, brand, status and borders.
- `--font-*`, `--text-*`: font families, sizes, line heights, weights and tracking.
- `--space-*`: spacing scale.
- `--radius-*`: shape scale.
- `--shadow-*`: elevation and focus ring.
- `--motion-*`: duration, easing and scale.
- `--size-*`: control, icon, target and layout sizes.
- `--container-*`, `--breakpoint-*`: layout foundations.
- `--border-*`, `--focus-*`, `--icon-*`, `--drawer-*`, `--transform-origin-*`: component contracts and interaction geometry.

Theme values are generated from `src/tokens/theme.light.json` and `theme.dark.json`; generated CSS remains derived output.

## Fonts

The package ships no font files and no `@font-face` rules. The font families are plain variables that name the fonts first and fall back to the system stack:

- `--font-family-sans`: `'DM Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
- `--font-family-emphasis`: `'Source Serif 4', ui-serif, Georgia, 'Times New Roman', serif`
- `--font-family-mono`: `'Commit Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`

Every `--text-*-family` reads one of those three, so overriding them once restyles the whole type system:

```css
:root {
  --font-family-sans: var(--font-geist-sans), system-ui, sans-serif;
}
```

Load the font yourself in your app — `@font-face`, `next/font`, or a package like `@fontsource`. Until you do, the browser uses the next family in the stack, so the layout keeps working. See `docs/installation` for the imports this repository's docs app uses.
