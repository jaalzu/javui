import type { Metadata } from "next";
import { Text } from "@/ui";
import { UtilityGuide } from "@/app/docs/_page/UtilityGuide";
export const metadata: Metadata = { title: "Alignment" };
export default function Alignment() { return <UtilityGuide href="/docs/alignment" title="Alignment" description="Align content inside flex and grid compositions." rule="Use alignment utilities for a local adjustment. Use Stack or Grid props when alignment is part of the component's reusable layout contract." code={`<div className="ui-flex ui-items-center ui-justify-between">\n  <Text>Label</Text>\n  <Text>Value</Text>\n</div>`} example={<div className="ui-flex ui-items-center ui-justify-between"><Text>Label</Text><Text>Value</Text></div>} />; }
