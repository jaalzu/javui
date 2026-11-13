import type { Metadata } from "next";
import { Text, Stack } from "@javui/ui";
import { UtilityGuide } from "@/app/docs/_page/UtilityGuide";
export const metadata: Metadata = { title: "Visibility" };
export default function Visibility() { return <UtilityGuide href="/docs/visibility" title="Visibility" description="Show, hide or visually remove an element from a composition." rule="Choose display:none when the element must leave layout, visibility:hidden when it must keep its space, and visually-empty only for an intentional zero-width region." code={`<div className="ui-is-invisible">\n  <Text>The space remains reserved.</Text>\n</div>`} example={<Stack gap="3"><Text>Visible</Text><Text className="ui-is-invisible">Invisible but space remains</Text><Text>After the invisible item</Text></Stack>} />; }
