Unificá los @media del proyecto a los breakpoints nuevos (tokens --breakpoint-sm/md/lg/xl en layout.json: 40, 48, 64 y 80rem).
Estilo mobile first, con min-width. Los max-width usan el valor menos 0.01rem.
Cambios: (max-width: 30rem) y (max-width: 40rem) pasan a (max-width: 39.99rem); (min-width: 32rem) a (min-width: 40rem);
(min-width: 56rem) a (min-width: 64rem); (max-width: 55.99rem) a (max-width: 63.99rem); (min-width: 72rem) a (min-width: 80rem).
Los de 48rem y 64rem ya están bien. No cambies nada más. Corré typecheck, lint y fijate en la pantalla de 1024px que el sidebar de docs aparezca.
