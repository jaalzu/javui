## Validation policy

- By default do NOT run tests, typecheck, lint or Storybook; visual checks are done by a human.
- If you notice small errors (missing imports, unused vars, type mismatches), list them in your report under "Pending small fixes". Do not stop to fix them unless they block the task.
- Allowed generators when relevant: `bun run tokens`, `bun run icons`, `bun run agent-docs`.
- Cleanup pass (only when asked): run `bun run typecheck && bun run lint`, fix every error and warning with the smallest change, no refactors or visual changes. For lint false positives (e.g. a scrollable region with tabIndex) use a justified eslint-disable-next-line. Do not run tests or Storybook.
