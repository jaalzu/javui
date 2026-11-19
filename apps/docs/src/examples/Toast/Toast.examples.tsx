import { defineHero, ex, type Example } from "@/docs/example";
import { ToastAction, ToastDemo, ToastPromise, ToastTypes } from "./ToastDemo";

export const hero = defineHero(
  `const { show } = useToast();

<Button onClick={() => show({ title: "Saved", description: "Your changes are safe.", type: "success" })}>
  Show a toast
</Button>`,
  <ToastDemo />,
);

export const examples: Example[] = [
  ex(
    "Types",
    `const { show } = useToast();

<Button onClick={() => show({ title: "Saved", type: "success" })}>Success</Button>
<Button onClick={() => show({ title: "Storage almost full", type: "warning" })}>Warning</Button>
<Button onClick={() => show({ title: "Uploading…", type: "loading" })}>Loading</Button>`,
    <ToastTypes />,
    "`type` renders a status icon for `success`, `info`, `warning`, `danger` and `loading`, and writes the meaning in the title as well. Loading stays until it is dismissed or updated.",
  ),
  ex(
    "Action",
    `const { show, close } = useToast();

<Button
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
</Button>`,
    <ToastAction />,
    "`actionProps` renders a button at the end of the toast. It receives the same props as a native button.",
  ),
  ex(
    "Promise",
    `const { promise } = useToast();

<Button
  onClick={() =>
    promise(saveChanges(), {
      loading: "Saving changes…",
      success: "Changes saved",
      error: "Could not save",
    })
  }
>
  Save successfully
</Button>`,
    <ToastPromise />,
    "`promise` keeps one toast in sync with an asynchronous task: it starts in the loading state and becomes the success or error toast when the promise settles.",
  ),
];
