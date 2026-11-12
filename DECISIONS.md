# Decisiones de migración

## Fase 0

- **Nombre del paquete:** `@javui/ui`, centralizado para la futura configuración del workspace.
- **Fuente tipográfica:** los tokens y las declaraciones `@font-face` efectivas indican `Source Serif 4`; se conservará esa API y se corregirá la dependencia `newsreader` durante la separación.
- **LinkProvider:** el contexto ya cae a `<a>` cuando no hay provider; no se cambia la API.
- **Ciclos:** Madge no detectó ciclos, por lo que no se requiere extracción preventiva.
- **Registro npm:** no se asume que el scope exista; la comprobación queda para la fase de empaquetado.
- **Build de docs:** se conserva `next build --webpack`. Next 16 documenta Turbopack como predeterminado, pero en este entorno Windows el build sin la bandera falla antes de compilar porque no puede crear una junction para `shiki` (`Access is denied`). Webpack avanza hasta reportar errores reales de CSS; el comando exacto para validar fuera del sandbox es `bun run --filter @javui/docs build`.
- **`uitest`:** no se elimina: `apps/docs/src/app/uitest/page.tsx` lo importa directamente. Se corrigió su bloque CSS desbalanceado; la página sí tiene uso real.
