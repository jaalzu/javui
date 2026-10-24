/** Exports with nothing visual to show (providers and a hook). Kept apart from Demo.tsx so Server Components can import it. */
export const noDemo = new Set(["LinkProvider", "useLinkComponent", "ToastProvider", "TooltipProvider"]);

/** Parts of a composite (DialogTrigger, PopoverContent, ...). The landing shows them through their parent. */
export const compositeParts = new Set([
  "DialogTrigger", "DialogContent", "DialogClose",
  "AlertDialogTrigger", "AlertDialogContent", "AlertDialogClose",
  "PopoverTrigger", "PopoverContent", "PopoverClose",
  "Radio",
  "CardHeader", "CardTitle", "CardDescription", "CardAction", "CardContent", "CardFooter",
  "ButtonGroupSeparator",
  "AvatarGroup",
]);
