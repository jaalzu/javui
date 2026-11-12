# Token families

Public semantic token families are preserved without renaming:

- `--color-*`: surfaces, foregrounds, component states, brand, status and borders.
- `--font-*`, `--text-*`: font families, sizes, line heights, weights and tracking.
- `--space-*`: spacing scale.
- `--radius-*`: shape scale.
- `--shadow-*`: elevation and focus ring.
- `--motion-*`: duration, easing and scale.
- `--size-*`: control, icon, target and layout sizes.
- `--container-*`, `--breakpoint-*`, `--header-height`: layout foundations.
- `--border-*`, `--focus-*`, `--icon-*`, `--drawer-*`, `--transform-origin-*`: component contracts and interaction geometry.

Theme values are generated from `src/tokens/theme.light.json` and `theme.dark.json`; generated CSS remains derived output.
