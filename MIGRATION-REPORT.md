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
