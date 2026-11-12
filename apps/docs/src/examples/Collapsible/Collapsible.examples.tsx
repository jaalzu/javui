import {
  Button,
  Card,
  CardContent,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Stack,
  Text,
} from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import { CaretDownIcon, InfoIcon } from "@javui/ui";
import styles from "./Collapsible.examples.module.css";

const heroCode = `<Collapsible>
  <div className={styles.orderHeader}>
    <span>Order #323</span>
    <CollapsibleTrigger active><CaretDownIcon /></CollapsibleTrigger>
  </div>
  <div className={styles.status}><span>Status</span><span>Shipped</span></div>
  <CollapsibleContent className={styles.orderContent}>...</CollapsibleContent>
</Collapsible>`;

const heroNode = (
  <Collapsible className={styles.order}>
    <div className={styles.orderHeader}>
      <span>Order #323</span>
      <CollapsibleTrigger active>
        <CaretDownIcon />
      </CollapsibleTrigger>
    </div>
    <div className={styles.status}>
      <span>Status</span>
      <span>Shipped</span>
    </div>
  <CollapsibleContent className={styles.orderContent}>
      <Stack gap="2">
        <div className={styles.detail}>
          Shipping address
          <br />
          <span>100 Market St, San Francisco</span>
        </div>
        <div className={styles.detail}>
          Items
          <br />
          <span>1x Nike Air Max</span>
        </div>
      </Stack>
    </CollapsibleContent>
  </Collapsible>
);

export const hero = defineHero(heroCode, heroNode);

export const examples: Example[] = [
  ex(
    "Show more",
    `<Collapsible>\n  <CollapsibleTrigger render={<Button variant="primary" size="sm" className={styles.showMore}>Show more</Button>} />\n  <CollapsibleContent><Text>...</Text></CollapsibleContent>\n</Collapsible>`,
    <Collapsible className={styles.exampleWidth}>
      <CollapsibleTrigger
        render={
          <Button variant="primary" size="sm" className={styles.showMore}>
            Show more
          </Button>
        }
      />
      <CollapsibleContent>
        <Text>
          Advanced details can stay hidden until the reader asks for them. This
          paragraph is intentionally long enough to show that any element can be
          the trigger without changing the content layout.
        </Text>
      </CollapsibleContent>
    </Collapsible>,
    "Any element can be the trigger.",
  ),
  ex(
    "In a card",
    `<Card><CardContent><Collapsible>...</Collapsible></CardContent></Card>`,
    <Card className={styles.exampleWidth}>
      <CardContent>
        <Collapsible className={styles.cardCollapsible}>
          <CollapsibleTrigger>
            <span>Shipping details</span>
            <InfoIcon />
          </CollapsibleTrigger>
          <CollapsibleContent className={styles.cardContent}>
            <Stack gap="2">
              <Text>Arrives Tuesday via standard delivery.</Text>
            </Stack>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>,
    "Works inside a Card without clipping.",
  ),
];
