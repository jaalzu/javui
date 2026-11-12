# Decisiones de migración

## Fase 0

- **Nombre del paquete:** `@javui/ui`, centralizado para la futura configuración del workspace.
- **Fuente tipográfica:** los tokens y las declaraciones `@font-face` efectivas indican `Source Serif 4`; se conservará esa API y se corregirá la dependencia `newsreader` durante la separación.
- **LinkProvider:** el contexto ya cae a `<a>` cuando no hay provider; no se cambia la API.
- **Ciclos:** Madge no detectó ciclos, por lo que no se requiere extracción preventiva.
- **Registro npm:** no se asume que el scope exista; la comprobación queda para la fase de empaquetado.
