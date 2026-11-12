import type { Metadata } from "next";
import { Text } from "@javui/ui";
import { UtilityGuide } from "@/app/docs/_page/UtilityGuide";
export const metadata: Metadata = { title: "Position" };
export default function Position() { return <UtilityGuide href="/docs/position" title="Position" description="Control how an element is positioned relative to its container or viewport." rule="An absolute element needs a deliberate relative ancestor. Use fixed only for viewport-level UI and static to reset positioning." code={`<div className="ui-is-relative ui-p-6">\n  <Text className="ui-is-absolute ui-inset-0">Overlay</Text>\n</div>`} example={<div className="ui-is-relative ui-p-6"><Text>Relative containing block</Text><Text className="ui-is-absolute ui-inset-0">Overlay</Text></div>} />; }
