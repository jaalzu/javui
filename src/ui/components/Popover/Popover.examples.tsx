import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/ui";
import { defineHero, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Popover>
  <PopoverTrigger variant="secondary">Share</PopoverTrigger>
  <PopoverContent title="Share this page" description="Anyone with the link can read it.">
    <PopoverClose variant="secondary">Done</PopoverClose>
  </PopoverContent>
</Popover>`,
  <Popover>
    <PopoverTrigger variant="secondary">Share</PopoverTrigger>
    <PopoverContent title="Share this page" description="Anyone with the link can read it.">
      <PopoverClose variant="secondary">Done</PopoverClose>
    </PopoverContent>
  </Popover>,
);

export const examples: Example[] = [];
