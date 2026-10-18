Aplicá el ajuste de padding de los botones con ícono. Ya tenés los 4 archivos nuevos en el proyecto:

- src/ui/utils/iconPosition.ts (nuevo)
- src/ui/components/Button/Button.tsx
- src/ui/components/Button/Button.module.css
- src/ui/components/ButtonLink/ButtonLink.tsx

Qué hacen: Button y ButtonLink marcan `data-icon="start|end|both|only"` según dónde está el ícono (un `Icon` o un `svg`). El CSS le da al lado del ícono 0.75 del padding normal. Si es solo ícono, el botón queda cuadrado con padding lateral 0. El spinner de `loading` cuenta como ícono al inicio.

Después hacé esto:

1. Revisá todos los lugares donde hay botones o links con ícono: el header, el menú mobile, el ThemeSwitcher, el buscador, los ejemplos de `Examples.tsx` y los componentes que usan Button por dentro. Buscá los que tienen una clase propia con `padding` o `width` para el ícono (por ejemplo `iconButton`). Si chocan con `aspect-ratio: 1` o con `padding-inline: 0`, ajustalos para que no queden dobles. No cambies cómo se ven.
2. Agregá a `Button.stories.tsx` una story "WithIcon" con: ícono al inicio, al final, en los dos lados, solo ícono y `loading`, en los tamaños sm, md y lg, para primary y secondary.
3. Agregá a la doc del botón (la que lee `public/agent`) un ejemplo de `<Button><Icon>…</Icon>Label</Button>` y otro de solo ícono con `aria-label`. Anotá que el ícono tiene que ser hijo directo y primero o último, no envuelto en otro componente.
4. Corré `bun run typecheck`, `bun run lint` y el build de `public/agent`. No toques valores de colores ni de tipografía.
