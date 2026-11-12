import {
  ArchiveIcon,
  BookOpenIcon,
  DotsThreeIcon,
  ExportIcon,
  FileCsvIcon,
  FilePdfIcon,
  FileTextIcon,
  GearIcon,
  HouseIcon,
  Kbd,
  LifebuoyIcon,
  Menu,
  QuestionIcon,
  ShieldCheckIcon,
  SlidersIcon,
  PulseIcon,
  TrashIcon,
  UserCircleIcon,
  type MenuEntry,
} from "@javui/ui";
import { MenuBar } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./Menu.examples.module.css";

const accountItems: MenuEntry[] = [
  { label: "Dashboard", startIcon: <HouseIcon /> },
  { label: "Profile", startIcon: <UserCircleIcon /> },
  { type: "submenu", label: "More options", startIcon: <DotsThreeIcon />, items: [{ label: "Activity", startIcon: <PulseIcon /> }, { label: "Security", startIcon: <ShieldCheckIcon /> }] },
  { type: "separator" },
  { label: "Delete account", destructive: true, startIcon: <TrashIcon /> },
];

const profileItems: MenuEntry[] = [
  { label: "Personal details", startIcon: <UserCircleIcon /> },
  { label: "Preferences", startIcon: <SlidersIcon /> },
  { type: "submenu", label: "Profile tools", startIcon: <DotsThreeIcon />, items: [{ label: "Activity", startIcon: <PulseIcon /> }, { label: "Security", startIcon: <ShieldCheckIcon /> }] },
  { type: "separator" },
  { label: "Delete profile", destructive: true, startIcon: <TrashIcon /> },
];

const settingsItems: MenuEntry[] = [
  { label: "General", startIcon: <GearIcon /> },
  { label: "About", startIcon: <QuestionIcon /> },
  { type: "submenu", label: "Advanced", startIcon: <SlidersIcon />, items: [{ label: "Activity", startIcon: <PulseIcon /> }, { label: "Security", startIcon: <ShieldCheckIcon /> }] },
  { type: "separator" },
  { label: "Delete settings", destructive: true, startIcon: <TrashIcon /> },
];

const iconItems: MenuEntry[] = [
  { label: "Overview", startIcon: <HouseIcon /> },
  { label: "Preferences", startIcon: <SlidersIcon />, status: <><Kbd size="md" className={styles.systemKey}>⌘</Kbd><Kbd size="md">Alt</Kbd></> },
  { type: "submenu", label: "Help center", startIcon: <QuestionIcon />, items: [{ label: "Documentation", startIcon: <BookOpenIcon /> }, { label: "Contact support", startIcon: <LifebuoyIcon /> }] },
];

const dangerItems: MenuEntry[] = [
  { label: "Archive", startIcon: <ArchiveIcon /> },
  { label: "Remove draft", startIcon: <TrashIcon /> },
  { type: "separator" },
  { label: "Delete", destructive: true, startIcon: <TrashIcon /> },
];

const multiItems: MenuEntry[] = [
  { type: "checkbox", label: "Show sidebar", defaultChecked: true },
  { type: "checkbox", label: "Show toolbar" },
  { type: "checkbox", label: "Show status bar" },
];

const singleItems: MenuEntry[] = [
  { type: "radio", value: "system", label: "System" },
  { type: "radio", value: "light", label: "Light" },
  { type: "radio", value: "dark", label: "Dark" },
];

const submenuItems: MenuEntry[] = [
  { type: "submenu", label: "Export", startIcon: <ExportIcon />, items: [{ type: "submenu", label: "Documents", startIcon: <FileTextIcon />, items: [{ label: "PDF", startIcon: <FilePdfIcon /> }, { label: "CSV", startIcon: <FileCsvIcon /> }] }] },
];

export const hero = defineHero(
  `<MenuBar menus={[
  { label: "Account", triggerVariant: "tab", items: accountItems },
  { label: "Profile", triggerVariant: "tab", items: profileItems },
  { label: "Settings", triggerVariant: "tab", items: settingsItems },
]} />`,
  <MenuBar className={styles.exampleBar} menus={[{ label: "Account", triggerVariant: "tab", items: accountItems }, { label: "Profile", triggerVariant: "tab", items: profileItems }, { label: "Settings", triggerVariant: "tab", items: settingsItems }]} />,
);

export const examples: Example[] = [
  ex(
    "Menu with icons",
    `<MenuBar menus={[
  { label: "Workspace", triggerVariant: "tab", items: iconItems },
  { label: "Resources", triggerVariant: "tab", items: iconItems },
  { label: "Support", triggerVariant: "tab", items: iconItems },
]} />`,
    <MenuBar className={styles.exampleBar} menus={[{ label: "Workspace", triggerVariant: "tab", items: iconItems }, { label: "Resources", triggerVariant: "tab", items: iconItems }, { label: "Support", triggerVariant: "tab", items: iconItems }]} />,
  ),
  ex(
    "Selection menus",
    `<MenuBar menus={[
  { label: "View", triggerVariant: "tab", placement: "bottom-start", items: multiItems },
  { label: "Theme", triggerVariant: "tab", placement: "top-start", singleSelection: { defaultValue: "system" }, items: singleItems },
]} />`,
    <MenuBar className={styles.exampleBar} menus={[{ label: "View", triggerVariant: "tab", placement: "bottom-start", items: multiItems }, { label: "Theme", triggerVariant: "tab", placement: "top-start", singleSelection: { defaultValue: "system" }, items: singleItems }]} />,
    "View opens downward with three toggles, a separator and two actions; Theme opens upward with one selected option.",
  ),
  ex(
    "Submenu",
    `<MenuBar menus={[
  { label: "More", triggerVariant: "tab", items: submenuItems },
  { label: "Export", triggerVariant: "tab", items: submenuItems },
]} />`,
    <MenuBar className={styles.exampleBar} menus={[{ label: "More", triggerVariant: "tab", items: submenuItems }, { label: "Export", triggerVariant: "tab", items: submenuItems }]} />,
  ),
];
