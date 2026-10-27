import { AspectRatio } from "@/ui";
import { ex, type Example } from "@/docs/example";

export const examples: Example[] = [
    ex(
      "Landscape (16 / 9)",
      `<AspectRatio ratio={16 / 9}>
  <img src="/window.svg" alt="A window" width={640} height={360} />
</AspectRatio>`,
      <AspectRatio ratio={16 / 9}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Local fixture for the example. */}
        <img src="/window.svg" alt="A window" width={640} height={360} />
      </AspectRatio>,
      "The box keeps its 16:9 area before the image loads.",
    ),
    ex(
      "Square",
      `<AspectRatio ratio={1}>
  <img src="/window.svg" alt="A window" width={480} height={480} />
</AspectRatio>`,
      <AspectRatio ratio={1}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Local fixture for the example. */}
        <img src="/window.svg" alt="A window" width={480} height={480} />
      </AspectRatio>,
    ),
    ex(
      "Portrait",
      `<AspectRatio ratio={3 / 4}>
  <img src="/window.svg" alt="A window" width={480} height={640} />
</AspectRatio>`,
      <AspectRatio ratio={3 / 4}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Local fixture for the example. */}
        <img src="/window.svg" alt="A window" width={480} height={640} />
      </AspectRatio>,
    ),
];
