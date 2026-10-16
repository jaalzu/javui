import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cx } from "../../utils/cx";
import styles from "./Avatar.module.css";

export type AvatarProps = {
  /** Full name of the person or entity. It is the accessible name and the source of the initials. Required. */
  name: string;
  /** Image URL. If it is missing or fails to load, the initials are shown. */
  src?: string;
  /** Diameter: `sm` 2rem, `md` 2.5rem, `lg` 3.5rem. @default "md" */
  size?: "sm" | "md" | "lg";
  className?: string;
};

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? [words[0], words[words.length - 1]] : [words[0] ?? ""];
  return letters.map((w) => Array.from(w)[0] ?? "").join("").toUpperCase();
}

/**
 * A round image of a person with an initials fallback, built on Base UI Avatar.
 * The whole avatar is one image with the person's name as its label.
 *
 * @example
 * <Avatar name="Ada Lovelace" src="/ada.png" />
 */
export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  return (
    <BaseAvatar.Root role="img" aria-label={name} className={cx(styles.avatar, styles[size], className)}>
      {src ? <BaseAvatar.Image src={src} alt="" className={styles.image} /> : null}
      <BaseAvatar.Fallback aria-hidden="true" className={styles.fallback}>
        {initials(name)}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
