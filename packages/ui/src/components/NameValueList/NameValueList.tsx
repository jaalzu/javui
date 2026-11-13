import type { ComponentProps, Key, ReactNode } from "react";
import {
  DescriptionList,
  DescriptionListDetails,
  DescriptionListTerm,
  type DescriptionListLayout,
} from "../DescriptionList";

export type NameValueItem = {
  /** Visible name/term. */
  label: ReactNode;
  /** Corresponding value/description. */
  value: ReactNode;
  /** Stable key when the list is generated dynamically. */
  key?: Key;
};

export type NameValueListProps = {
  /** Data pairs to render as `dt`/`dd`. */
  items: readonly NameValueItem[];
  /** Visual arrangement of the pairs. @default "stacked" */
  layout?: DescriptionListLayout;
  /** Uses a narrower label column in `horizontal` layout. @default false */
  narrow?: boolean;
} & Omit<ComponentProps<typeof DescriptionList>, "children" | "layout" | "narrow">;

/** Data-driven name/value presentation built on native description-list semantics. */
export function NameValueList({ items, layout = "stacked", narrow = false, ...rest }: NameValueListProps) {
  return (
    <DescriptionList layout={layout} narrow={narrow} {...rest}>
      {items.map((item, index) => (
        <NameValuePair key={item.key ?? index} label={item.label} value={item.value} />
      ))}
    </DescriptionList>
  );
}

function NameValuePair({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <>
      <DescriptionListTerm>{label}</DescriptionListTerm>
      <DescriptionListDetails>{value}</DescriptionListDetails>
    </>
  );
}
