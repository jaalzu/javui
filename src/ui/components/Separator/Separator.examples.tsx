import { Separator, Stack, Text } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(`<Stack gap="4"><Text>Before</Text><Separator /><Text>After</Text></Stack>`, <Stack gap="4"><Text>Before</Text><Separator /><Text>After</Text></Stack>);

export const examples: Example[] = [
  ex("Vertical", `<Stack direction="row" gap="4" style={{ minHeight: "4rem" }}><Text>Before</Text><Separator orientation="vertical" /><Text>After</Text></Stack>`, <Stack direction="row" gap="4" style={{ minHeight: "4rem" }}><Text>Before</Text><Separator orientation="vertical" /><Text>After</Text></Stack>),
  ex("Non-decorative", `<Separator decorative={false} />`, <Separator decorative={false} />),
];
