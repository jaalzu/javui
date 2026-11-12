import { Button, Kbd, Stack, Text, Tooltip, TooltipProvider } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Text>Press <Kbd>Enter</Kbd> to continue.</Text>`,
  <Text>Press <Kbd>Enter</Kbd> to continue.</Text>,
);

export const examples: Example[] = [
  ex("Combination", `<Stack direction="row" gap="2" align="center"><Kbd>Shift</Kbd><Kbd>Enter</Kbd><Kbd>Spacebar</Kbd></Stack>`, <Stack direction="row" gap="2" align="center" justify="center"><Kbd>Shift</Kbd><Kbd>Enter</Kbd><Kbd>Spacebar</Kbd></Stack>),
  ex("Sizes", `<Stack direction="row" gap="2" align="center"><Kbd size="sm">K</Kbd><Kbd size="md">K</Kbd><Kbd size="lg">K</Kbd></Stack>`, <Stack direction="row" gap="2" align="center" justify="center"><Kbd size="sm">K</Kbd><Kbd size="md">K</Kbd><Kbd size="lg">K</Kbd></Stack>),
  ex("System keys and icons", `<Stack direction="row" gap="2" align="center"><Kbd size="lg">⌘</Kbd><Kbd size="lg">↵</Kbd><Kbd size="lg">↑</Kbd><Kbd size="lg">↓</Kbd></Stack>`, <Stack direction="row" gap="2" align="center" justify="center"><Kbd size="lg">⌘</Kbd><Kbd size="lg">↵</Kbd><Kbd size="lg">↑</Kbd><Kbd size="lg">↓</Kbd></Stack>),
  ex("Tooltip", `<TooltipProvider><Tooltip content={<><span>Search</span> <Kbd variant="inverted">Ctrl</Kbd> <Kbd variant="inverted">K</Kbd>}><Button variant="secondary">Search</Button></Tooltip></TooltipProvider>`, <TooltipProvider delay={0}><Tooltip content={<Stack direction="row" align="center" style={{ gap: "calc(var(--space-1) + var(--border-width-thin))" }}><span>Search</span><Stack direction="row" align="center" style={{ gap: "calc(var(--space-1) - var(--border-width-thin))" }}><Kbd size="md" variant="inverted">Ctrl</Kbd><Kbd size="md" variant="inverted">K</Kbd></Stack></Stack>}><Button variant="secondary">Search</Button></Tooltip></TooltipProvider>),
  ex("Disabled", `<Stack direction="row" gap="2" align="center"><Kbd size="lg" aria-disabled="true">Enter</Kbd><Kbd size="lg" aria-disabled="true">⌘</Kbd></Stack>`, <Stack direction="row" gap="2" align="center" justify="center"><Kbd size="lg" aria-disabled="true">Enter</Kbd><Kbd size="lg" aria-disabled="true">⌘</Kbd></Stack>),
];
