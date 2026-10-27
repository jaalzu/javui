# Changelog

## Unreleased

### Breaking

- **Dialog and AlertDialog replaced by Modal.** Use one `Modal` and choose behavior with props: `role="dialog"` for content and forms, `role="alertdialog"` for a decision that interrupts. `color="neutral" | "warning" | "critical"` and `size="sm" | "md" | "lg"` replace the separate panels; `ModalTrigger`, `ModalContent` and `ModalClose` replace the old parts. `onBeforeClose` protects unsaved forms, and `dismissible` replaces the old close-disabling pattern. `/docs/components/Dialog` and `/docs/components/AlertDialog` redirect to `/docs/components/Modal`.

- **Box removed.** Use `Card` for bordered surfaces, `Stack`/`Grid` for layout, or a semantic element for a plain container. `Card` now covers the old Box cases: `as`, `variant`, `size` (default/sm) and the shared `--card-spacing` inset. It also gains `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` and a full-bleed first image.
- **Divider removed.** Use a semantic `<hr>` for a thematic break, or a border/sunken area to separate content inside a card. Nothing in the library depended on it.
