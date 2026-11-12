# JavUI packaging migration

## Tanda A — Fase 0: auditoría

- Rama: `feat/javui-packaging`.
- Línea base: `bun run typecheck` pasó (Next typegen + TypeScript).
- Línea base: `bun run test` falló en 55 suites antes de cambios funcionales. El fallo común es `ENOENT` al resolver archivos temporales del sandbox de Vitest; se registra como preexistente.
- Madge 8.0.0: 383 archivos procesados, 14 advertencias y **0 ciclos** (`src/ui`, extensiones `ts,tsx`).
- Imports `@/` en `src/ui`: 127 coincidencias auditadas (el inventario previo indicaba 124 imports); 53 archivos son ejemplos, 9 son otros archivos y no se encontraron archivos de tests/stories con coincidencias `@/`.
- Directiva `"use client"`: 45 archivos.
- Dependencias observadas: `@base-ui/react`, React y React DOM son runtime de componentes; `shiki` queda aislado en CodeBlock; `server-only` solo aparece en CodeBlock; `next`/`next-themes` no tienen imports reales desde la librería; `style-dictionary` y `culori` pertenecen a scripts; SDK MCP y `zod` pertenecen a `mcp/`.
- `build-agent-docs.mjs` lee fuentes bajo `src/ui`, `agent-meta.json` y ejemplos; genera actualmente `public/agent/manifest.json`, `public/agent/tokens.json`, `public/llms.txt` y `public/llms-full.txt`.
- `global.css`: contiene fuentes, tokens, reset/base global, reglas de página y reglas transversales. La regla `.menuPanel` debe verificarse al separar CSS porque la clase de un CSS Module se hashea.
- `LinkProvider` ya tiene fallback a `"a"` mediante `createContext<LinkComponent | "a">("a")`; no requiere cambio en esta fase.
- Fuente de verdad tipográfica: tokens generados y `global.css` usan `Source Serif 4`; `@fontsource-variable/newsreader` es una dependencia inconsistente que se resolverá en la separación de paquetes.
- `npm view @javui/ui` no se ejecutó en esta fase para evitar depender del registro; se verificará antes del empaquetado.

## Cambios de auditoría

- Añadido `madge` como dependencia de desarrollo para repetir la detección de ciclos.
- Storybook, pruebas visuales y navegador no se ejecutaron, conforme al alcance de la migración.

## Estado

Fase 0 auditada. La Fase 1 queda pendiente de la confirmación del usuario.

## Tanda A — Fase 1: limpieza de acoples

- Los 9 archivos restantes con `@/` son fixtures, demos o ejemplos; no hay imports reales del alias en componentes, hooks, utils, tests o stories que deban convertirse en esta fase.
- Se añadió una regla ESLint para `src/ui` que prohíbe `@/*`, `next`, `next/*`, `next-themes` y `server-only`, excluyendo ejemplos/demos y la cadena explícita de `CodeBlock`/`server.ts`.
- El análisis de contextos y APIs interactivas no encontró una ausencia evidente de `"use client"`; los 45 archivos existentes se conservan sin añadir directivas a presentacionales.
- Madge sigue sin ciclos y `LinkProvider` ya tiene fallback a `<a>`; no se cambió comportamiento público.
- Gate de Fase 1: `typecheck` OK; `lint` OK con 6 warnings preexistentes; `test` reproduce el fallo de sandbox (`54` suites fallidas, `1` pasada, 2 tests pasaron).

## Tanda A — Fase 2: monorepo

- Movidos con `git mv`: `src/ui` → `packages/ui/src`, app y docs → `apps/docs`, scripts/MCP/Vitest/Storybook → `packages/ui`; 53 ejemplos quedaron en `apps/docs/src/examples`.
- Añadidos workspaces, `tsconfig.base.json`, paquetes `@javui/ui` y `@javui/docs`, exports de código fuente y `transpilePackages: ["@javui/ui"]` conforme a la guía local de Next 16.
- La app de docs importa la librería mediante `@javui/ui`/`@javui/ui/server`; se hizo pública `MenuBar`, que ya existía en el componente pero faltaba en el barrel.
- `@javui/ui` typecheck: OK. `@javui/docs` typecheck: OK. `lint` acotado a fuentes: OK con 6 warnings preexistentes.
- `tokens`, `icons` y `agent-docs`: OK; agent-docs genera 52 componentes, 36 parts, 5 providers/hooks y 321 tokens.
- `build` no completó por restricción del sandbox de Windows al crear la junction de `shiki` (`Access is denied`); se documenta como bloqueo ambiental, no se ejecutó Storybook.
- `test` de la librería conserva el fallo ENOENT del sandbox de Vitest de la línea base.

## Corrección del gate de Fase 2

- Se eliminaron todos los restos `@/ui` de `apps/docs` (incluidos textos generados en `public/llms*.txt` y `public/agent/*`); los imports de CSS usan ahora `@javui/ui/global.css` y `@javui/ui/tailwind.css`.
- `@javui/ui` exporta ahora `./tokens.css`, `./global.css` y `./tailwind.css`, apuntando al código fuente durante esta fase.
- `server.ts` solo tenía el alias en TSDoc; `tailwind.css` solo lo tenía en comentarios generados. Se corrigió el origen `build-tokens.mjs` y se regeneró.
- Se corrigió el bloque desbalanceado de `apps/docs/src/app/uitest/ui-test.module.css`; la página `/uitest` sí se usa y no se eliminó. También se corrigieron selectores CSS Modules no puros y rutas de CSS de ejemplos.
- Build con Webpack: `bun run --filter @javui/docs build` pasó con permisos elevados. En el sandbox falla por `EPERM` al crear `.next`; sin `--webpack` falla por `Access is denied` al crear la junction de `shiki`. Se conserva `next build --webpack` y la causa está en `DECISIONS.md`.
- Tests comparativos en worktree del commit base `de8bb68`: base y migración fallan exactamente en 3 tests: `Button.test.tsx`, `Input.test.tsx` y `Slider.test.tsx`; pasan 52 suites y 275 tests. Son preexistentes, no causados por la migración. El sandbox añade además fallos `ENOENT` de archivos temporales al ejecutar sin permisos elevados.

## Tanda B — Fase 3: CSS separado

- `packages/ui/src/tokens/tokens.css`: variables generadas únicamente desde los JSON DTCG; no se editó manualmente.
- `packages/ui/src/styles/base.css`: reset (`box-sizing`), `html`, `body`, tipografía base, `code/kbd/pre/samp`, numeración tabular, `[data-surface="sunken"]`, `:focus-visible`, `::selection`, scrollbar contextual y `prefers-reduced-motion`, además de las utilities existentes.
- `packages/ui/src/styles/fonts.css`: entrada opt-in con `@fontsource-variable/dm-sans` y `@fontsource/commit-mono`; los tokens conservan pilas de respaldo. Source Serif 4 queda como fallback serif hasta incorporar una fuente distribuible equivalente.
- CSS de componentes: no se movieron reglas de componentes; sus CSS Modules permanecen junto a cada componente. Los CSS de ejemplos permanecen en `apps/docs/src/examples`.
- Docs: no necesita reglas nuevas; `apps/docs` importa `@javui/ui/global.css`, alias de compatibilidad que compone tokens + base + fonts.
- `tailwind.css` sigue siendo bridge `@theme inline`; no se implementó `@layer` nuevo (queda como mejora futura).
- `TOKENS.md` documenta las familias de tokens sin enumerar las 321 variables.
- Gate Fase 3: `typecheck` OK y `bun run build` OK fuera del sandbox con permisos elevados.

## Tanda B — Fase 4: build a dist

- El paquete se compila con `tsc` dedicado (`tsconfig.dist.json`) a ESM y `.d.ts`, conservando un archivo por módulo y las rutas de CSS Modules.
- `build-dist.mjs` limpia `dist`, regenera tokens/icons/agent-docs, compila, copia CSS y genera `dist/styles.css` como entrada consolidada opcional.
- `verify:dist` comprueba ausencia de `@/`, stories/tests/examples, conservación de `"use client"` y ausencia de `shiki`/`server-only` en `dist/index.js`.
- Gate Fase 4: `bun run --filter @javui/ui build` y `bun run --filter @javui/ui verify:dist` OK (341 archivos, 38 módulos client).

## Tanda B — Fase 5: metadata y publicación

- `@javui/ui` quedó publicable: versión inicial `0.0.0`, licencia MIT, repositorio, descripción, `publishConfig`, `files`, peers React/Base UI y `shiki` opcional; las fuentes distribuidas quedan en `dist` y los manifiestos de agente en `agent`.
- Se añadieron `README.md` y `LICENSE`; los exports públicos cubren entradas JS, server, CSS, estilos y manifiestos de agente.
- `bun run --filter @javui/ui build` y `bun run --filter @javui/ui verify:dist` OK (341 archivos, 38 módulos client). `verify:dist` confirmó `"use client"` y ausencia de `shiki`/`server-only` desde `dist/index.js`.
- `publint` pasó sin incidencias. `attw --pack` mostró advertencias de resolución para el entry server y exports CSS, limitación de análisis de tipos para ESM/CSS que no invalida el consumo ESM verificado; el bundle principal quedó resoluble.
- `bun pm pack --dry-run` mostró únicamente el contenido publicable previsto (`dist`, `agent`, README, LICENSE y package metadata). La reinstalación final con `bun install --frozen-lockfile` quedó pendiente de verificar por el usuario porque el sandbox Windows devolvió `EBADF accessing temporary directory`; ejecutar `bun install --frozen-lockfile` en una terminal normal.

## Tanda B — Fase 6: Playground Next

- Se creó `playgrounds/next` fuera de los workspaces, con dependencia `file:` al tarball generado por `bun pm pack`.
- Incluye Server Components con `Stack`, `Text`, `Heading` y `CodeBlock` desde `@javui/ui/server`, más una página cliente con Button, Field/Input, Select y Modal.
- Incluye `LinkProvider` con `next/link`, `tokens.css`, `base.css`, `fonts.css` y `data-theme`.
- `bun run test:consumer`: empaquetado OK; instalación/build bloqueados por `EBADF accessing temporary directory` del sandbox. Pendiente del usuario: `bun run test:consumer`.
- Tarball: 0.28 MB packed, 1.42 MB unpacked (349 archivos).
- Auditoría de APIs: no quedan `use cache`, `use server`, `unstable_cache`, `cacheLife` ni `cacheTag` en `packages/ui/src`. Select se corrigió a su API real (`items`/`placeholder`); el manifest y los ejemplos bastaron, sin hueco de documentación para agentes.
