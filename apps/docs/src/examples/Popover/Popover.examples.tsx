import { FacebookLogoIcon, GithubLogoIcon, Link, Popover, PopoverContent, PopoverTrigger, Stack, XIcon } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import { FiltersExample, HelpExample, RenameTagExample } from "./PopoverExampleScenarios";

export const hero = defineHero(
  `<Popover>
  <PopoverTrigger variant="secondary">Share</PopoverTrigger>
  <PopoverContent title="Share this page" description="Share this page with your team.">
    <Stack direction="row" gap="2" align="center" justify="center">
      <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" standalone aria-label="Share on GitHub" startIcon={<GithubLogoIcon />} />
      <Link href="https://x.com/" target="_blank" rel="noopener noreferrer" standalone aria-label="Share on X" startIcon={<XIcon />} />
      <Link href="https://facebook.com/" target="_blank" rel="noopener noreferrer" standalone aria-label="Share on Facebook" startIcon={<FacebookLogoIcon />} />
    </Stack>
  </PopoverContent>
</Popover>`,
  <Stack align="center">
    <Popover>
      <PopoverTrigger variant="secondary" size="sm">Share</PopoverTrigger>
      <PopoverContent title="Share this page" description="Share this page with your team.">
        <Stack direction="row" gap="2" align="center" justify="center">
          <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" standalone aria-label="Share on GitHub" startIcon={<GithubLogoIcon />} />
          <Link href="https://x.com/" target="_blank" rel="noopener noreferrer" standalone aria-label="Share on X" startIcon={<XIcon />} />
          <Link href="https://facebook.com/" target="_blank" rel="noopener noreferrer" standalone aria-label="Share on Facebook" startIcon={<FacebookLogoIcon />} />
        </Stack>
      </PopoverContent>
    </Popover>
  </Stack>,
);

export const examples: Example[] = [
  ex(
    "Align and side",
    `<Popover>
  <PopoverTrigger variant="secondary" size="sm">Top</PopoverTrigger>
  <PopoverContent title="Popover on top" side="top" align="start" />
</Popover>
<Popover>
  <PopoverTrigger variant="secondary" size="sm">Right</PopoverTrigger>
  <PopoverContent title="Popover on top" side="right" align="center" />
</Popover>
<Popover>
  <PopoverTrigger variant="secondary" size="sm">Bottom</PopoverTrigger>
  <PopoverContent title="Popover on top" side="bottom" align="end" />
</Popover>
<Popover>
  <PopoverTrigger variant="secondary" size="sm">Left</PopoverTrigger>
  <PopoverContent title="Popover on top" side="left" align="center" />
</Popover>`,
    <Stack direction="row" gap="3" wrap align="center" justify="center">
      <Popover>
        <PopoverTrigger variant="secondary" size="sm">Top</PopoverTrigger>
        <PopoverContent title="Popover on top" side="top" align="start" />
      </Popover>
      <Popover>
        <PopoverTrigger variant="secondary" size="sm">Right</PopoverTrigger>
        <PopoverContent title="Popover on top" side="right" align="center" />
      </Popover>
      <Popover>
        <PopoverTrigger variant="secondary" size="sm">Bottom</PopoverTrigger>
        <PopoverContent title="Popover on top" side="bottom" align="end" />
      </Popover>
      <Popover>
        <PopoverTrigger variant="secondary" size="sm">Left</PopoverTrigger>
        <PopoverContent title="Popover on top" side="left" align="center" />
      </Popover>
    </Stack>,
    "Compare the four sides with one consistent popover label.",
  ),
  ex(
    "With form", `<RenameTagExample />`, <RenameTagExample />, "A short form focuses its first field and closes after Save or Cancel."),
  ex("Filters", `<FiltersExample />`, <FiltersExample />, "A filter list scrolls inside the popover while Apply and Clear stay in a button row."),
  ex(
    "Help icon",
    `<PopoverTrigger variant="ghost" size="sm" startIcon={<QuestionIcon />} aria-label="How tags work" />`,
    <HelpExample />,
    "A centered icon-only trigger opens short contextual help.",
  ),
];
