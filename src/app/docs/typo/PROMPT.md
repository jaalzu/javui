Migrá el uso de typography al sistema nuevo. Los archivos nuevos ya están en el proyecto: `typography.json`, `Heading`, `Text`, `global.css` y la página `docs/typography`. Cambiá solo nombres y props, sin tocar estilos de otros componentes.

**1. `Heading`: `size` ahora es un número del 1 al 6**
- `size="display"` pasa a `{1}`, `"h1"` a `{2}`, `"h2"` a `{3}`, `"h3"` a `{6}` y `"h4"` a `{6}`.
- Aplicalo también dentro de los strings de código de `Examples.tsx`.
- Sin `size`, el tamaño sigue a `as`: h1 = 1, h2 = 2, … h6 = 6. Revisá los títulos que antes dependían del default y decime si alguno quedó demasiado grande.

**2. `Text`**
- `variant="body-lg"` pasa a `size="lg"`, y `variant="body-sm"` a `size="sm"`.
- `variant="caption"` pasa a `variant="caption" size="lg"`, para conservar los 12px de antes. El caption base ahora es 11px.
- Nuevas props opcionales: `weight` ("regular", "medium" o "semibold"), `casing` ("uppercase") y `tone` con más valores (brand, warning, info).
- `variant="code"` acepta `size` base, sm o xs.

**3. CSS**
- `--font-size-sm|base|md|lg|xl|2xl|3xl|4xl` pasan a `--font-size-13|15|18|24|28|36|44|56`.
- `--text-caption-*` pasa a `--text-caption-lg-*`.
- `--text-h3-*` (por ejemplo en Dialog) pasa a `--text-heading-6-*`, sin `-style`.
- `--text-h4-*` (Popover) pasa a `--text-body-*` con `font-weight: var(--font-weight-semibold)`.
- `--text-display-*` y `--text-h1..h2-*` pasan a `--text-heading-1..3-*`.
- Ya no existen `--font-style-heading` ni `--font-weight-bold`.

**4. Stories y docs**
- Actualizá `Heading.stories`, `Text.stories` y `tokens/Typography.stories` + `Typography.module.css` a los nombres nuevos.
- Tailwind y la doc de agentes: corré `bun run tokens` y el build de `public/agent`.

Al final corré `bun run tokens`, `bun run typecheck` y `bun run lint`, y buscá que no quede ningún `--text-h`, `--text-display`, `--font-size-md` ni `size="h` sin migrar.
