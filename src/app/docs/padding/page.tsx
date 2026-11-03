import type { Metadata } from "next";
import { Text } from "@/ui";
import { UtilityGuide } from "@/app/docs/_page/UtilityGuide";
export const metadata: Metadata = { title: "Padding" };
export default function Padding() { return <UtilityGuide href="/docs/padding" title="Padding" description="Manage internal space inside an element." rule="Use token-based padding to give an external composition breathing room. Component internals belong in the component CSS Module." code={`<div className="ui-p-4">\n  <Text>Content with inset space</Text>\n</div>`} example={<div className="ui-p-4"><Text>Content with inset space</Text></div>} />; }
