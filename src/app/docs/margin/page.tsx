import type { Metadata } from "next";
import { Text } from "@/ui";
import { UtilityGuide } from "@/app/docs/_page/UtilityGuide";
export const metadata: Metadata = { title: "Margin" };
export default function Margin() { return <UtilityGuide href="/docs/margin" title="Margin" description="Manage space outside an isolated element." rule="Use margin utilities for one-off placement or centering. For repeated sibling rhythm, prefer Stack, Grid gap or Container gutters." code={`<div className="ui-mx-auto ui-max-w-md ui-mt-4">\n  <Text>Centered region</Text>\n</div>`} example={<div className="ui-mx-auto ui-max-w-md ui-mt-4"><Text>Centered region</Text></div>} />; }
