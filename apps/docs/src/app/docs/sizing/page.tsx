import type { Metadata } from "next";
import { Text } from "@javui/ui";
import { UtilityGuide } from "@/app/docs/_page/UtilityGuide";
export const metadata: Metadata = { title: "Sizing" };
export default function Sizing() { return <UtilityGuide href="/docs/sizing" title="Sizing" description="Control width, height and overflow-safe minimums." rule="Use max-width to keep reading content comfortable and min-width: 0 to let flex and grid children shrink without overflow." code={`<div className="ui-w-full ui-max-w-md ui-min-w-0">\n  <Text>Readable width</Text>\n</div>`} example={<div className="ui-w-full ui-max-w-md ui-min-w-0"><Text>Readable width</Text></div>} />; }
