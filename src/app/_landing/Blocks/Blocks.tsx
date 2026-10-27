"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Alert,
  ArrowsLeftRightIcon,
  Avatar,
  Badge,
  Button,
  Card,
  ChartBarIcon,
  ChartLineIcon,
  ChartLineUpIcon,
  ChartPieSliceIcon,
  Checkbox,
  Field,
  GearIcon,
  Heading,
  Input,
  Link,
  Modal,
  ModalClose,
  ModalContent,
  Select,
  Stack,
  Switch,
  Text,
  WalletIcon,
} from "@/ui";
import styles from "./Blocks.module.css";

const cardPadding = {
  paddingInline: "calc(var(--space-4) + var(--space-1) / 2)",
  paddingBlock: "calc(var(--space-4) + var(--space-1) / 2)",
} satisfies CSSProperties;

/** Shared shell for every block: a surface card with a title, optional description and action. */
function Block({
  id,
  title,
  description,
  action,
  titleClassName,
  descriptionClassName,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  action?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  children: ReactNode;
}) {
  return (
    <Card
      as="section"
      variant="surface"
      className={styles.block}
      style={cardPadding}
      aria-labelledby={id}
    >
      <Stack gap="4">
        <div className={styles.blockHead}>
          <Stack gap="1">
            <Heading as="h3" size={6} id={id} className={titleClassName}>
              {title}
            </Heading>
            {description && (
              <Text
                variant="caption"
                size="lg"
                tone="muted"
                className={descriptionClassName}
              >
                {description}
              </Text>
            )}
          </Stack>
          {action}
        </div>
        {children}
      </Stack>
    </Card>
  );
}

/* ---------- Navigation ---------- */

const navItems = [
  {
    label: "Analytics",
    description: "Traffic, revenue and conversion at a glance.",
    icon: <ChartLineIcon />,
  },
  {
    label: "Transactions",
    description: "Every deposit, withdrawal and transfer.",
    icon: <ArrowsLeftRightIcon />,
  },
  {
    label: "Investments",
    description: "Holdings, performance and allocation.",
    icon: <ChartLineUpIcon />,
  },
  {
    label: "Accounts",
    description: "Connected accounts and balances.",
    icon: <WalletIcon />,
  },
  {
    label: "Spending",
    description: "Where the money goes, by category.",
    icon: <ChartPieSliceIcon />,
  },
];

function Sidebar() {
  const [active, setActive] = useState<(typeof navItems)[number] | null>(null);
  return (
    <Card
      as="section"
      variant="surface"
      className={styles.block}
      style={cardPadding}
      aria-label="Sidebar example"
    >
      <Stack gap="3">
        <nav aria-label="Main" className={styles.sidebar}>
          <span className={styles.navTitle}>Overview</span>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.label}>
                <Button
                  variant="ghost"
                  size="md"
                  className={styles.navLink}
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </Stack>
      <Modal
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        {active && (
          <ModalContent
            title={active.label}
            description={active.description}
            actions={<ModalClose>Close</ModalClose>}
          >
            {null}
          </ModalContent>
        )}
      </Modal>
    </Card>
  );
}

/* ---------- Finance ---------- */

const goals = [
  { name: "Retirement", target: "$420,000", pct: 65, got: "$273,000" },
  { name: "Real Estate", target: "$85,000", pct: 32, got: "$27,200" },
];

function SavingsTargets() {
  return (
    <Block
      id="blk-targets"
      title="Savings Targets"
      description="Active milestones for 2024."
      titleClassName={styles.targetsTitle}
      descriptionClassName={styles.targetsDescription}
    >
      <Stack gap="3">
        {goals.map((g) => (
          <div key={g.name} className={`${styles.goal} ${styles.highlight}`}>
            <Text as="span" tone="muted">
              {g.name}
            </Text>
            <span className={styles.goalTotal}>{g.target}</span>
            <div className={styles.goalHead}>
              <Text variant="caption" size="lg" tone="muted">
                {g.pct}% achieved
              </Text>
              <span className={styles.amount}>{g.got}</span>
            </div>
          </div>
        ))}
        <Alert tone="warning" title="Off track">
          You have not met your targets for this year.
        </Alert>
      </Stack>
    </Block>
  );
}

const history: [string, number, string][] = [
  ["Dec", 55, "$1,100"],
  ["Jan", 72, "$1,440"],
  ["Feb", 48, "$960"],
  ["Mar", 90, "$1,800"],
  ["Apr", 68, "$1,360"],
];

function Contributions() {
  const summary = `Contributions: ${history.map(([m, , v]) => `${m} ${v}`).join(", ")}. May scheduled.`;
  return (
    <Block
      id="blk-history"
      title="Contribution History"
      description="Last 6 months"
    >
      <div className={styles.bars} role="img" aria-label={summary}>
        {history.map(([m, v, label]) => (
          <div key={m} className={styles.barCol} aria-hidden="true">
            <span className={styles.barValue}>{label}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ "--h": `${v}%` } as CSSProperties}
              />
            </div>
            <span className={styles.barLabel}>{m}</span>
          </div>
        ))}
        <div className={styles.barCol} aria-hidden="true">
          <span className={styles.barValue}>$1,500</span>
          <div className={styles.barTrack}>
            <div
              className={`${styles.barFill} ${styles.barUpcoming}`}
              style={{ "--h": "75%" } as CSSProperties}
            />
          </div>
          <span className={styles.barLabel}>May</span>
        </div>
      </div>
      <div className={styles.blockHead}>
        <Text tone="muted">Upcoming · May 2024</Text>
        <Badge variant="brand">Scheduled</Badge>
      </div>
    </Block>
  );
}

function Claimable() {
  return (
    <Block
      id="blk-claim"
      title="Claimable Balance"
      titleClassName={styles.claimTitle}
      action={<Badge variant="danger">Pending Setup</Badge>}
    >
      <span className={`${styles.bigNumber} ${styles.bigNumberHero}`}>
        $1,211.29
      </span>
      <dl className={`${styles.ledger} ${styles.highlight}`}>
        <div className={styles.ledgerRow}>
          <dt>Net Royalties</dt>
          <dd>$1,248.75</dd>
        </div>
        <div className={styles.ledgerRow}>
          <dt>Processing Fee</dt>
          <dd className={styles.negative}>-$37.46</dd>
        </div>
        <hr className={styles.ledgerDivider} />
        <div className={`${styles.ledgerRow} ${styles.ledgerTotal}`}>
          <dt>Total Ready to Claim</dt>
          <dd>$1,211.29 USD</dd>
        </div>
      </dl>
      <Text variant="caption" size="lg" tone="muted">
        Balances over $10.00 are paid monthly once your bank is connected.
      </Text>
    </Block>
  );
}

const holdings: [string, string, string][] = [
  ["Vanguard", "450 Shares", "$612.00"],
  ["S&P 500 VOO", "112 Shares", "$184.20"],
  ["Apple AAPL", "85 Shares", "$21.40"],
  ["Realty Income", "320 Shares", "$256.00"],
];

function Dividends() {
  return (
    <Block
      id="blk-div"
      title="Q2 Dividend Income"
      description="Quarterly payouts across your holdings."
    >
      <ul className={styles.holdings}>
        {holdings.map(([name, shares, amount]) => (
          <li key={name} className={styles.holding}>
            <Avatar name={name} size="sm" />
            <span className={styles.holdingText}>
              <span className={styles.personName}>{name}</span>
              <Text variant="caption" size="lg" tone="muted">
                {shares}
              </Text>
            </span>
            <span className={styles.amount}>{amount}</span>
          </li>
        ))}
      </ul>
      <div
        className={`${styles.ledgerRow} ${styles.ledgerTotal} ${styles.highlight}`}
      >
        <span>Total</span>
        <span>$1,073.60</span>
      </div>
    </Block>
  );
}

const limits = [
  {
    label: "Session limit",
    pct: 1,
    reset: "Reset in 4hr 21min",
    tone: "session",
  },
  { label: "Weekly", pct: 86, reset: "Reset Wed 12:00am", tone: "weekly" },
] as const;

function Usage() {
  return (
    <Block
      id="blk-usage"
      title="Usage"
      titleClassName={styles.usageTitle}
      action={
        <div className={styles.usageActions}>
          <Button
            variant="ghost"
            size="md"
            aria-label="View usage chart"
            startIcon={<ChartBarIcon />}
          />
          <Button
            variant="ghost"
            size="md"
            aria-label="Usage settings"
            startIcon={<GearIcon />}
          />
        </div>
      }
    >
      <div className={styles.limits}>
        {limits.map((limit) => (
          <div key={limit.label} className={styles.limit}>
            <div className={styles.limitHead}>
              <Text variant="body" size="sm" weight="medium">
                {limit.label}
              </Text>
              <Text variant="caption" size="lg" tone="muted">
                {limit.pct}% used
              </Text>
            </div>
            <div
              className={styles.limitTrack}
              role="progressbar"
              aria-label={limit.label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={limit.pct}
            >
              <span
                className={`${styles.limitFill} ${styles[`limitFill-${limit.tone}`]}`}
                style={{ "--value": `${limit.pct}%` } as CSSProperties}
              />
            </div>
            <Text variant="caption" size="lg" tone="muted">
              {limit.reset}
            </Text>
          </div>
        ))}
      </div>
    </Block>
  );
}

/* ---------- Account and team ---------- */

function SignIn() {
  return (
    <Block id="blk-signin" title="Sign in" description="Welcome back.">
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack gap="2">
          <Field label="Email">
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Password">
            <Input type="password" autoComplete="current-password" />
          </Field>
          <Checkbox label="Remember me" defaultChecked />
          <Button type="submit">Sign in</Button>
        </Stack>
      </form>
      <Text variant="caption" size="lg" tone="muted">
        Forgot it? <Link href="/docs">Reset your password</Link>
      </Text>
    </Block>
  );
}

function Plan() {
  return (
    <Block
      id="blk-plan"
      title="Pro"
      action={<Badge variant="brand">Popular</Badge>}
    >
      <p className={`${styles.price} ${styles.highlight}`}>
        <span className={styles.priceNumber}>$12</span>{" "}
        <span className={styles.priceUnit}>per month</span>
      </p>
      <Text tone="muted">Everything to ship with a small team.</Text>
      <ul className={styles.features}>
        <li>Unlimited projects</li>
        <li>Ten team members</li>
        <li>Priority support</li>
      </ul>
      <Button href="/docs/installation">Choose Pro</Button>
    </Block>
  );
}

/** Complete, composed examples built only from library components. They are real and interactive. */
export function Blocks() {
  return (
    <div className={styles.blocks}>
      <div className={styles.col}>
        <Sidebar />
        <SignIn />
      </div>
      <div className={styles.col}>
        <SavingsTargets />
        <Contributions />
      </div>
      <div className={styles.col}>
        <Claimable />
        <Dividends />
      </div>
      <div className={styles.col}>
        <Usage />
        <Plan />
      </div>
    </div>
  );
}
