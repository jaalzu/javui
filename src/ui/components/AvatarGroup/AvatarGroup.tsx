import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { cx } from "../../utils/cx";
import type { AvatarProps, AvatarSize } from "../Avatar";
import avatarStyles from "../Avatar/Avatar.module.css";
import styles from "./AvatarGroup.module.css";

export type AvatarGroupProps = {
  /** Avatars in the group. They share the group's `size`. */
  children: ReactNode;
  /** How many avatars stay visible before the rest collapse into a "+N" item. @default 4 */
  max?: number;
  /** Diameter shared by every avatar in the group. @default "md" */
  size?: AvatarSize;
  className?: string;
} & Omit<ComponentProps<"div">, "color" | "children">;

/**
 * Overlapping avatars that share one size, with a page-colored ring so the overlaps stay clean.
 * When there are more than `max`, the extra avatars collapse into a "+N" item labelled "and N more".
 * Used outside a group, Avatar is unchanged.
 *
 * @example
 * <AvatarGroup max={3} aria-label="Project members">
 *   <Avatar name="Ada Lovelace" />
 *   <Avatar name="Grace Hopper" />
 *   <Avatar name="Alan Turing" />
 *   <Avatar name="Katherine Johnson" />
 * </AvatarGroup>
 */
export function AvatarGroup({
  children,
  max = 4,
  size = "md",
  className,
  ...rest
}: AvatarGroupProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];
  const visible = items.slice(0, Math.max(0, max));
  const remaining = items.length - visible.length;

  return (
    <div {...rest} role="group" className={cx(styles.group, className)}>
      {visible.map((child) => cloneElement(child, { size }))}
      {remaining > 0 ? (
        <span
          role="img"
          aria-label={`and ${remaining} more`}
          className={cx(avatarStyles.avatar, avatarStyles[size], styles.more)}
        >
          +{remaining}
        </span>
      ) : null}
    </div>
  );
}
