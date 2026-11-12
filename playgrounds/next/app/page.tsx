import { Heading, Stack, Text } from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import ClientShowcase from "./client-showcase";

export default function Home() {
  return <main><Stack gap="6"><Heading as="h1">JavUI consumer</Heading><Text>Server Components can import the public package.</Text><CodeBlock language="tsx" code={'import { Stack, Text } from "@javui/ui";'} /><ClientShowcase /></Stack></main>;
}
