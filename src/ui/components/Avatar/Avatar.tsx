import type { ReactNode } from "react";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cx } from "../../utils/cx";
import { IconSlot } from "../Icon/IconSlot";
import styles from "./Avatar.module.css";

/** Avatar diameter. */
export type AvatarSize = "sm" | "md" | "lg";

/** Presence shown by a small shape at the bottom end of the avatar. */
export type AvatarStatus = "online" | "away" | "busy" | "offline";

type AvatarBaseProps = {
  /** Full name of the person or entity. It is the accessible name and the source of the initials. Required. */
  name: string;
  /** Image URL. If it is missing or fails to load, the initials are shown. */
  src?: string;
  /** Diameter: `sm` 2rem, `md` 2.5rem, `lg` 3.5rem. @default "md" */
  size?: AvatarSize;
  /** Replaces the initials fallback with an icon, for bots or organizations. Pass a generated icon without `size`. */
  icon?: ReactNode;
  className?: string;
};

export type AvatarProps = AvatarBaseProps &
  (
    | {
        /** Presence state. Appended to the accessible name, such as "Ada Lovelace, online". Cannot be combined with `badge`. */
        status?: AvatarStatus;
        badge?: never;
        badgeLabel?: never;
      }
    | {
        /** Custom badge icon at the bottom end. Pass a generated icon without `size`. Cannot be combined with `status`. */
        badge: ReactNode;
        /** Accessible label for the badge. Required with `badge`; appended to the accessible name. */
        badgeLabel: string;
        status?: never;
      }
    | {
        status?: never;
        badge?: never;
        badgeLabel?: never;
      }
  );

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? [words[0], words[words.length - 1]] : [words[0] ?? ""];
  return letters.map((w) => Array.from(w)[0] ?? "").join("").toUpperCase();
}

const statusClass: Record<AvatarStatus, string> = {
  online: styles.statusOnline,
  away: styles.statusAway,
  busy: styles.statusBusy,
  offline: styles.statusOffline,
};

/**
 * A round image of a person with an initials fallback, built on Base UI Avatar.
 * The whole avatar is one image with the person's name as its label. Add a status, badge or icon
 * fallback when needed; without them the markup and accessible name stay just the name.
 *
 * @example
 * <Avatar name="Ada Lovelace" src="/ada.png" />
 * <Avatar name="Ada Lovelace" status="online" />
 * <Avatar name="Ada Lovelace" badge={<CheckIcon />} badgeLabel="Verified" />
 * <Avatar name="Build bot" icon={<TerminalWindowIcon />} />
 */
export function Avatar({
  name,
  src,
  size = "md",
  icon,
  status,
  badge,
  badgeLabel,
  className,
}: AvatarProps) {
  const activeBadge = status ? null : badge;
  const label = status ? `${name}, ${status}` : activeBadge ? `${name}, ${badgeLabel}` : name;

  return (
    <BaseAvatar.Root role="img" aria-label={label} className={cx(styles.avatar, styles[size], className)}>
      {src ? <BaseAvatar.Image src={src} alt="" className={styles.image} /> : null}
      <BaseAvatar.Fallback aria-hidden="true" className={styles.fallback}>
        {icon ? <IconSlot className={styles.icon}>{icon}</IconSlot> : initials(name)}
      </BaseAvatar.Fallback>
      {status ? (
        <span
          className={cx(styles.status, statusClass[status])}
          data-avatar-status={status}
          aria-hidden="true"
        />
      ) : null}
      {activeBadge ? (
        <span className={styles.badge} data-avatar-badge="" aria-hidden="true">
          <IconSlot>{activeBadge}</IconSlot>
        </span>
      ) : null}
    </BaseAvatar.Root>
  );
}
