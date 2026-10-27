"use client";

import { Button, useToast } from "@/ui";

/** Hero showcase for the toast API: it needs the provider context, so it runs on the client. */
export function ToastDemo() {
  const { show } = useToast();
  return (
    <Button
      variant="secondary"
      onClick={() =>
        show({
          title: "Saved",
          description: "Your changes are safe.",
          tone: "success",
        })
      }
    >
      Show a toast
    </Button>
  );
}
