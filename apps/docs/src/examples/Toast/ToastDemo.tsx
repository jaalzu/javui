"use client";

import { Button, Stack, useToast } from "@javui/ui";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
          type: "success",
        })
      }
    >
      Show a toast
    </Button>
  );
}

/** One trigger per type, so the status icon and accent can be compared side by side. */
export function ToastTypes() {
  const { show } = useToast();
  return (
    <Stack direction="row" gap="3" wrap>
      <Button variant="secondary" onClick={() => show({ title: "Copied to clipboard" })}>
        Neutral
      </Button>
      <Button
        variant="secondary"
        onClick={() => show({ title: "Saved", description: "Your changes are safe.", type: "success" })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() => show({ title: "Heads up", description: "Your trial ends in 3 days.", type: "info" })}
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() => show({ title: "Storage almost full", description: "You have used 90% of your plan.", type: "warning" })}
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() => show({ title: "Could not save", description: "Check your connection.", type: "danger" })}
      >
        Danger
      </Button>
      <Button
        variant="secondary"
        onClick={() => show({ title: "Uploading…", description: "This stays until it is dismissed.", type: "loading" })}
      >
        Loading
      </Button>
    </Stack>
  );
}

/** A toast with an inline action. The action closes that toast, not the whole stack. */
export function ToastAction() {
  const { show, close } = useToast();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        const id = show({
          title: "Event created",
          description: "Sunday, December 3 at 9:00 AM",
          actionProps: {
            children: "Undo",
            onClick: () => close(id),
          },
        });
      }}
    >
      Create event
    </Button>
  );
}

/** One toast follows an asynchronous task from loading to success or error. */
export function ToastPromise() {
  const { promise } = useToast();
  return (
    <Stack direction="row" gap="3" wrap>
      <Button
        variant="secondary"
        onClick={() =>
          promise(wait(1500), {
            loading: "Saving changes…",
            success: "Changes saved",
            error: "Could not save",
          })
        }
      >
        Save successfully
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          promise(
            wait(1500).then(() => {
              throw new Error("Network error");
            }),
            {
              loading: "Saving changes…",
              success: "Changes saved",
              error: "Could not save. Try again.",
            },
          )
        }
      >
        Save with an error
      </Button>
    </Stack>
  );
}
