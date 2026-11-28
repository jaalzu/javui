import { createElement, forwardRef } from "react";
import type { Icon, IconProps } from "@phosphor-icons/react";

import { Archive as ArchiveIconGlyph } from "@phosphor-icons/react/ssr";
import { ArrowRight as ArrowRightIconGlyph } from "@phosphor-icons/react/ssr";
import { ArrowDown as ArrowDownIconGlyph } from "@phosphor-icons/react/ssr";
import { ArrowUp as ArrowUpIconGlyph } from "@phosphor-icons/react/ssr";
import { BookOpen as BookOpenIconGlyph } from "@phosphor-icons/react/ssr";
import { CaretDown as CaretDownIconGlyph } from "@phosphor-icons/react/ssr";
import { CaretLeft as CaretLeftIconGlyph } from "@phosphor-icons/react/ssr";
import { CaretRight as CaretRightIconGlyph } from "@phosphor-icons/react/ssr";
import { ChartBar as ChartBarIconGlyph } from "@phosphor-icons/react/ssr";
import { ChartLine as ChartLineIconGlyph } from "@phosphor-icons/react/ssr";
import { Check as CheckIconGlyph } from "@phosphor-icons/react/ssr";
import { Code as CodeIconGlyph } from "@phosphor-icons/react/ssr";
import { Copy as CopyIconGlyph } from "@phosphor-icons/react/ssr";
import { DotsThree as DotsThreeIconGlyph } from "@phosphor-icons/react/ssr";
import { Export as ExportIconGlyph } from "@phosphor-icons/react/ssr";
import { Eye as EyeIconGlyph } from "@phosphor-icons/react/ssr";
import { FacebookLogo as FacebookLogoIconGlyph } from "@phosphor-icons/react/ssr";
import { FileCsv as FileCsvIconGlyph } from "@phosphor-icons/react/ssr";
import { FilePdf as FilePdfIconGlyph } from "@phosphor-icons/react/ssr";
import { FileText as FileTextIconGlyph } from "@phosphor-icons/react/ssr";
import { FloppyDisk as FloppyDiskIconGlyph } from "@phosphor-icons/react/ssr";
import { Gear as GearIconGlyph } from "@phosphor-icons/react/ssr";
import { GithubLogo as GithubLogoIconGlyph } from "@phosphor-icons/react/ssr";
import { House as HouseIconGlyph } from "@phosphor-icons/react/ssr";
import { Info as InfoIconGlyph } from "@phosphor-icons/react/ssr";
import { Layout as LayoutIconGlyph } from "@phosphor-icons/react/ssr";
import { Lifebuoy as LifebuoyIconGlyph } from "@phosphor-icons/react/ssr";
import { MagnifyingGlass as MagnifyingGlassIconGlyph } from "@phosphor-icons/react/ssr";
import { Minus as MinusIconGlyph } from "@phosphor-icons/react/ssr";
import { Moon as MoonIconGlyph } from "@phosphor-icons/react/ssr";
import { PaperPlaneTilt as PaperPlaneTiltIconGlyph } from "@phosphor-icons/react/ssr";
import { Plus as PlusIconGlyph } from "@phosphor-icons/react/ssr";
import { Prohibit as ProhibitIconGlyph } from "@phosphor-icons/react/ssr";
import { Pulse as PulseIconGlyph } from "@phosphor-icons/react/ssr";
import { PuzzlePiece as PuzzlePieceIconGlyph } from "@phosphor-icons/react/ssr";
import { Question as QuestionIconGlyph } from "@phosphor-icons/react/ssr";
import { ShieldCheck as ShieldCheckIconGlyph } from "@phosphor-icons/react/ssr";
import { Sidebar as SidebarIconGlyph } from "@phosphor-icons/react/ssr";
import { SkipForward as SkipForwardIconGlyph } from "@phosphor-icons/react/ssr";
import { Sliders as SlidersIconGlyph } from "@phosphor-icons/react/ssr";
import { Sparkle as SparkleIconGlyph } from "@phosphor-icons/react/ssr";
import { Star as StarIconGlyph } from "@phosphor-icons/react/ssr";
import { Sun as SunIconGlyph } from "@phosphor-icons/react/ssr";
import { TextB as TextBIconGlyph } from "@phosphor-icons/react/ssr";
import { TextItalic as TextItalicIconGlyph } from "@phosphor-icons/react/ssr";
import { TextUnderline as TextUnderlineIconGlyph } from "@phosphor-icons/react/ssr";
import { Warning as WarningIconGlyph } from "@phosphor-icons/react/ssr";
import { Trash as TrashIconGlyph } from "@phosphor-icons/react/ssr";
import { UserCircle as UserCircleIconGlyph } from "@phosphor-icons/react/ssr";
import { X as XIconGlyph } from "@phosphor-icons/react/ssr";

const sizes = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32 } as const;

type IconSize = keyof typeof sizes;

/** Accepts the design-system size names in addition to Phosphor's numeric size. */
type SizedIconProps = Omit<IconProps, "size"> & { size?: IconSize | number | string };

const wrap = (Glyph: Icon, displayName: string): Icon => {
  const SizedIcon = forwardRef<SVGSVGElement, SizedIconProps>(({ size, ...props }, ref) =>
    createElement(Glyph, {
      ...props,
      ref,
      size:
        typeof size === "string" && size in sizes ? sizes[size as IconSize] : size,
    }),
  );

  SizedIcon.displayName = displayName;

  return SizedIcon;
};

export const ArchiveIcon = wrap(ArchiveIconGlyph, "ArchiveIcon");
export const ArrowRightIcon = wrap(ArrowRightIconGlyph, "ArrowRightIcon");
export const ArrowDownIcon = wrap(ArrowDownIconGlyph, "ArrowDownIcon");
export const ArrowUpIcon = wrap(ArrowUpIconGlyph, "ArrowUpIcon");
export const BookOpenIcon = wrap(BookOpenIconGlyph, "BookOpenIcon");
export const CaretDownIcon = wrap(CaretDownIconGlyph, "CaretDownIcon");
export const CaretLeftIcon = wrap(CaretLeftIconGlyph, "CaretLeftIcon");
export const CaretRightIcon = wrap(CaretRightIconGlyph, "CaretRightIcon");
export const ChartBarIcon = wrap(ChartBarIconGlyph, "ChartBarIcon");
export const ChartLineIcon = wrap(ChartLineIconGlyph, "ChartLineIcon");
export const CheckIcon = wrap(CheckIconGlyph, "CheckIcon");
export const CodeIcon = wrap(CodeIconGlyph, "CodeIcon");
export const CopyIcon = wrap(CopyIconGlyph, "CopyIcon");
export const DotsThreeIcon = wrap(DotsThreeIconGlyph, "DotsThreeIcon");
export const ExportIcon = wrap(ExportIconGlyph, "ExportIcon");
export const EyeIcon = wrap(EyeIconGlyph, "EyeIcon");
export const FacebookLogoIcon = wrap(FacebookLogoIconGlyph, "FacebookLogoIcon");
export const FileCsvIcon = wrap(FileCsvIconGlyph, "FileCsvIcon");
export const FilePdfIcon = wrap(FilePdfIconGlyph, "FilePdfIcon");
export const FileTextIcon = wrap(FileTextIconGlyph, "FileTextIcon");
export const FloppyDiskIcon = wrap(FloppyDiskIconGlyph, "FloppyDiskIcon");
export const GearIcon = wrap(GearIconGlyph, "GearIcon");
export const GithubLogoIcon = wrap(GithubLogoIconGlyph, "GithubLogoIcon");
export const HouseIcon = wrap(HouseIconGlyph, "HouseIcon");
export const InfoIcon = wrap(InfoIconGlyph, "InfoIcon");
export const LayoutIcon = wrap(LayoutIconGlyph, "LayoutIcon");
export const LifebuoyIcon = wrap(LifebuoyIconGlyph, "LifebuoyIcon");
export const MagnifyingGlassIcon = wrap(MagnifyingGlassIconGlyph, "MagnifyingGlassIcon");
export const MinusIcon = wrap(MinusIconGlyph, "MinusIcon");
export const MoonIcon = wrap(MoonIconGlyph, "MoonIcon");
export const PaperPlaneTiltIcon = wrap(PaperPlaneTiltIconGlyph, "PaperPlaneTiltIcon");
export const PlusIcon = wrap(PlusIconGlyph, "PlusIcon");
export const ProhibitIcon = wrap(ProhibitIconGlyph, "ProhibitIcon");
export const PulseIcon = wrap(PulseIconGlyph, "PulseIcon");
export const PuzzlePieceIcon = wrap(PuzzlePieceIconGlyph, "PuzzlePieceIcon");
export const QuestionIcon = wrap(QuestionIconGlyph, "QuestionIcon");
export const ShieldCheckIcon = wrap(ShieldCheckIconGlyph, "ShieldCheckIcon");
export const SidebarIcon = wrap(SidebarIconGlyph, "SidebarIcon");
export const SkipForwardIcon = wrap(SkipForwardIconGlyph, "SkipForwardIcon");
export const SlidersIcon = wrap(SlidersIconGlyph, "SlidersIcon");
export const SparkleIcon = wrap(SparkleIconGlyph, "SparkleIcon");
export const StarIcon = wrap(StarIconGlyph, "StarIcon");
export const SunIcon = wrap(SunIconGlyph, "SunIcon");
export const TextBIcon = wrap(TextBIconGlyph, "TextBIcon");
export const TextItalicIcon = wrap(TextItalicIconGlyph, "TextItalicIcon");
export const TextUnderlineIcon = wrap(TextUnderlineIconGlyph, "TextUnderlineIcon");
export const WarningIcon = wrap(WarningIconGlyph, "WarningIcon");
export const TrashIcon = wrap(TrashIconGlyph, "TrashIcon");
export const UserCircleIcon = wrap(UserCircleIconGlyph, "UserCircleIcon");
export const XIcon = wrap(XIconGlyph, "XIcon");
