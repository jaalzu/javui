"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonLink,
  Card,
  Checkbox,
  CodeBlock,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Divider,
  Field,
  Heading,
  Icon,
  Input,
  Kbd,
  Link,
  Menu,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  Table,
  Tabs,
  Text,
  Textarea,
} from "@/ui";
import styles from "./Blocks.module.css";
import shell from "../../_shell/shell.module.css";

const ico = (d: string) => (
  <Icon size="sm">
    <path d={d} />
  </Icon>
);
const tick = ico("M5 12.5l4.5 4.5L19 7.5");
const dot = (
  <Icon size="sm">
    <circle cx="12" cy="12" r="4" />
  </Icon>
);
const sendIcon = ico("M5 12h14M13 6l6 6-6 6");
const up = ico("M7 11l5-6 5 6M12 5v14");
const down = ico("M7 13l5 6 5-6M12 19V5");

function Person({ name, email }: { name: string; email: string }) {
  return (
    <span className={styles.person}>
      <Avatar name={name} size="sm" />
      <span className={styles.personText}>
        <span className={styles.personName}>{name}</span>
        <span className={styles.personMail}>{email}</span>
      </span>
    </span>
  );
}

/** Shared shell for every block: a surface card with a title, optional description and action. */
function Block({
  id,
  title,
  description,
  action,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card
      as="section"
      variant="surface"
      padding="5"
      className={styles.block}
      aria-labelledby={id}
    >
      <Stack gap="4">
        <div className={styles.blockHead}>
          <Stack gap="1">
            <Heading as="h3" size="h3" id={id}>
              {title}
            </Heading>
            {description && <Text tone="muted">{description}</Text>}
          </Stack>
          {action}
        </div>
        {children}
      </Stack>
    </Card>
  );
}

/* ---------- Navigation ---------- */

const nav: { title: string; items: [string, string][] }[] = [
  {
    title: "Overview",
    items: [
      ["Analytics", "M4 19V5M4 19h16M8 15v-4M12 15V8M16 15v-6"],
      ["Transactions", "M7 8h12M7 8l3-3M17 16H5m12 0l-3-3"],
      ["Investments", "M4 16l5-5 4 4 7-8"],
      [
        "Accounts",
        "M4 8h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4zM4 8V7a2 2 0 0 1 2-2h10",
      ],
      ["Spending", "M12 3v9h9a9 9 0 1 1-9-9z"],
    ],
  },
  {
    title: "Planning",
    items: [
      ["Documents", "M7 3h7l4 4v14H7zM14 3v4h4"],
      ["Budget", "M4 7h16M4 12h16M4 17h10"],
      ["Reports", "M5 4h14v16H5zM9 9h6M9 13h6"],
      [
        "Goals",
        "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
      ],
      ["Calendar", "M5 6h14v14H5zM5 10h14M9 3v4M15 3v4"],
    ],
  },
  {
    title: "Support",
    items: [
      [
        "Help Center",
        "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 17v.5M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7",
      ],
      ["Docs", "M6 4h10l3 3v13H6zM9 11h7M9 15h7"],
      ["Contact Us", "M4 6h16v12H4zM4 7l8 6 8-6"],
      ["Status", "M3 12h4l3-7 4 14 3-7h4"],
      [
        "Community",
        "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M17 14a5 5 0 0 1 4 6",
      ],
    ],
  },
  {
    title: "Account",
    items: [
      ["Profile", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0"],
      ["Billing", "M3 6h18v12H3zM3 10h18"],
      ["Notifications", "M6 17V11a6 6 0 1 1 12 0v6l2 2H4zM10 21h4"],
      ["Security", "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"],
      [
        "Appearance",
        "M12 4v2M12 18v2M4 12h2M18 12h2M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
      ],
    ],
  },
];

function Sidebar() {
  const [active, setActive] = useState("Analytics");
  return (
    <Card
      as="section"
      variant="surface"
      padding="4"
      className={styles.block}
      aria-label="Sidebar example"
    >
      <Stack gap="4">
        <div className={styles.blockHead}>
          <span className={styles.person}>
            <Avatar name="Northwind" size="sm" />
            <span className={styles.personName}>Northwind</span>
          </span>
          <Badge variant="subtle">Secondary</Badge>
        </div>
        <nav aria-label="Main" className={styles.sidebar}>
          {nav.map((g) => (
            <div key={g.title} className={styles.navGroup}>
              <span className={styles.navTitle}>{g.title}</span>
              <ul className={styles.navList}>
                {g.items.map(([label, d]) => (
                  <li key={label}>
                    <button
                      type="button"
                      className={styles.navLink}
                      aria-current={active === label ? "page" : undefined}
                      onClick={() => setActive(label)}
                    >
                      {ico(d)}
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <Divider />
        <Person name="shadcn" email="m@example.com" />
      </Stack>
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
      description="Active milestones for 2024 across your portfolio. Monitor how close you are to each savings goal."
    >
      <Stack gap="4">
        {goals.map((g) => (
          <div key={g.name} className={styles.goal}>
            <div className={styles.goalHead}>
              <Text variant="emphasis">{g.name}</Text>
              <span className={styles.amount}>{g.target}</span>
            </div>
            <Progress label={`${g.name} progress`} value={g.pct} />
            <div className={styles.goalHead}>
              <Text variant="caption" tone="muted">
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
      description="Last 6 months of activity"
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
        <Badge tone="info">Scheduled</Badge>
      </div>
    </Block>
  );
}

function SavingsPlan() {
  return (
    <Block
      id="blk-plan2"
      title="Savings Plan"
      action={
        <Stack direction="row" gap="1">
          <Badge tone="accent">Accelerated</Badge>
          <Badge variant="outline">Recurring</Badge>
        </Stack>
      }
    >
      <Slider label="Monthly contribution" defaultValue={40} />
      <Select
        label="Frequency"
        defaultValue="monthly"
        items={[
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
        ]}
      />
      <Switch label="Increase 1% every year" defaultChecked />
      <Switch label="Round up purchases" />
      <Button>Update plan</Button>
    </Block>
  );
}

function Claimable() {
  return (
    <Block
      id="blk-claim"
      title="Claimable Balance"
      action={<Badge tone="warning">Pending Setup</Badge>}
    >
      <span className={styles.bigNumber}>$1,211.29</span>
      <dl className={styles.ledger}>
        <div className={styles.ledgerRow}>
          <dt>Net Royalties</dt>
          <dd>$1,248.75</dd>
        </div>
        <div className={styles.ledgerRow}>
          <dt>Processing Fee</dt>
          <dd className={styles.negative}>-$37.46</dd>
        </div>
        <Divider />
        <div className={`${styles.ledgerRow} ${styles.ledgerTotal}`}>
          <dt>Total Ready to Claim</dt>
          <dd>$1,211.29 USD</dd>
        </div>
      </dl>
      <Text variant="caption" tone="muted">
        Once your bank is connected, balances over $10.00 are automatically
        eligible for monthly distribution on the 15th of each month.
      </Text>
      <Button>Connect bank</Button>
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
      description="Quarterly dividend payouts across your portfolio holdings."
    >
      <ul className={styles.holdings}>
        {holdings.map(([name, shares, amount]) => (
          <li key={name} className={styles.holding}>
            <Avatar name={name} size="sm" />
            <span className={styles.holdingText}>
              <span className={styles.personName}>{name}</span>
              <Text variant="caption" tone="muted">
                {shares}
              </Text>
            </span>
            <span className={styles.amount}>{amount}</span>
          </li>
        ))}
      </ul>
      <div className={`${styles.ledgerRow} ${styles.ledgerTotal}`}>
        <span>Total</span>
        <span>$1,073.60</span>
      </div>
    </Block>
  );
}

/* A deterministic fake QR so it renders the same every time. */
const QR_N = 25;
const qrCells = (() => {
  const out: [number, number][] = [];
  let s = 7;
  const corner = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= QR_N - 8 && y < 8) || (x < 8 && y >= QR_N - 8);
  for (let y = 0; y < QR_N; y++)
    for (let x = 0; x < QR_N; x++) {
      if (corner(x, y)) continue;
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      if ((s >> 16) % 2) out.push([x, y]);
    }
  return out;
})();

function ConnectDevice() {
  const finders: [number, number][] = [
    [0, 0],
    [QR_N - 7, 0],
    [0, QR_N - 7],
  ];
  return (
    <Block
      id="blk-qr"
      title="Scan to connect your mobile device"
      description="Open the Ledger mobile app and scan this code to link your device."
    >
      <div className={styles.qr}>
        <svg
          viewBox={`0 0 ${QR_N} ${QR_N}`}
          role="img"
          aria-label="Sample QR code"
          shapeRendering="crispEdges"
          fill="currentColor"
        >
          {qrCells.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
          ))}
          {finders.map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect
                x={x + 0.5}
                y={y + 0.5}
                width="6"
                height="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <rect x={x + 2} y={y + 2} width="3" height="3" />
            </g>
          ))}
        </svg>
      </div>
      <Button variant="secondary">Enter code manually</Button>
    </Block>
  );
}

/* ---------- Chat ---------- */

type Msg = { from: "user" | "agent"; body: ReactNode; tool?: string };
const starter =
  "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.";
const suggestions = [
  "Summarize this week's runs",
  "Why did run #468 fail?",
  "Draft a changelog entry",
];

function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState(starter);
  const [pending, setPending] = useState(false);
  const submit = () => {
    if (!draft.trim() || pending) return;
    setMsgs((m) => [...m, { from: "user", body: draft }]);
    setDraft("");
    setPending(true);
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "agent",
          tool: "search_docs",
          body: (
            <>
              <span>
                That jump usually comes from re-measuring the list while it
                grows. Three fixes:
              </span>
              <ol className={styles.list}>
                <li>
                  Keep the scroll container at a fixed height and let only its
                  content grow.
                </li>
                <li>
                  Auto-scroll only when the reader is already near the bottom.
                </li>
                <li>
                  Reserve space for the streaming message to avoid layout
                  shifts.
                </li>
              </ol>
            </>
          ),
        },
      ]);
      setPending(false);
    }, 900);
  };
  return (
    <Block
      id="blk-chat"
      title="New Chat"
      description="How can I help you today?"
      action={
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setMsgs([]);
            setDraft(starter);
            setPending(false);
          }}
        >
          New chat
        </Button>
      }
    >
      <div
        className={styles.chatScroll}
        role="log"
        aria-label="Conversation"
        tabIndex={0}
      >
        {msgs.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.lead}>Morning, shadcn!</p>
            <Text tone="muted">
              What are we working on today? Press send to start a new
              conversation.
            </Text>
            <div className={styles.chips}>
              {suggestions.map((s) => (
                <Button
                  key={s}
                  variant="secondary"
                  size="sm"
                  onClick={() => setDraft(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`${styles.msg} ${m.from === "user" ? styles.msgUser : ""}`}
              >
                <Avatar
                  name={m.from === "user" ? "shadcn" : "Agent"}
                  size="sm"
                />
                <div
                  className={`${styles.bubble} ${m.from === "user" ? styles.bubbleUser : ""}`}
                >
                  {m.tool && <Badge variant="outline">{m.tool}</Badge>}
                  {m.body}
                </div>
              </div>
            ))}
            {pending && <Text tone="muted">Agent is replying…</Text>}
          </>
        )}
      </div>
      <Field label="Message">
        <Textarea
          rows={3}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </Field>
      <div className={styles.blockHead}>
        <Select
          aria-label="Model"
          defaultValue="balanced"
          items={[
            { value: "fast", label: "Fast" },
            { value: "balanced", label: "Balanced" },
            { value: "deep", label: "Deep reasoning" },
          ]}
        />
        <Button onClick={submit} disabled={pending || !draft.trim()}>
          {sendIcon}Send
        </Button>
      </div>
    </Block>
  );
}

/* ---------- Agents ---------- */

function AgentRun() {
  const steps = [
    ["Read the brief", "done"],
    ["Search 12 sources", "done"],
    ["Draft the summary", "running"],
    ["Review and cite", "queued"],
  ];
  return (
    <Block
      id="blk-run"
      title="Run #482"
      description="Research agent"
      action={<Badge tone="info">Running</Badge>}
    >
      <Progress label="Task progress" value={2} max={4} />
      <ul className={styles.steps}>
        {steps.map(([label, state]) => (
          <li
            key={label}
            className={`${styles.step} ${state === "done" ? styles.stepDone : state === "queued" ? styles.stepQueued : ""}`}
          >
            {state === "done" ? tick : dot}
            <span>{label}</span>
            {state === "running" && <Badge variant="subtle">Now</Badge>}
          </li>
        ))}
      </ul>
      <Stack direction="row" gap="2">
        <Button variant="secondary" size="sm">
          Pause
        </Button>
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
      </Stack>
    </Block>
  );
}

function Usage() {
  return (
    <Block id="blk-usage" title="Usage" description="October">
      <div className={styles.metrics}>
        {[
          ["Runs", "1,284"],
          ["Success", "94%"],
          ["Cost", "$38"],
        ].map(([k, v]) => (
          <div key={k} className={styles.metric}>
            <Text variant="caption" tone="muted">
              {k}
            </Text>
            <span className={styles.metricValue}>{v}</span>
          </div>
        ))}
      </div>
      <Progress label="Budget used ($38 of $50)" value={38} max={50} />
      <Alert tone="warning" title="76% of your budget">
        Runs pause at $50 unless you raise the limit.
      </Alert>
    </Block>
  );
}

type Approval = "pending" | "approved" | "denied";
function ApprovalBlock() {
  const [state, setState] = useState<Approval>("pending");
  return (
    <Block
      id="blk-approval"
      title="Approval needed"
      description="Support agent · Run #479"
      action={
        <Badge
          tone={
            state === "pending"
              ? "warning"
              : state === "approved"
                ? "success"
                : "danger"
          }
        >
          {state === "pending"
            ? "Waiting"
            : state === "approved"
              ? "Approved"
              : "Denied"}
        </Badge>
      }
    >
      <Text>
        The agent wants to run this command in{" "}
        <Text as="span" variant="code">
          /drafts
        </Text>
        :
      </Text>
      <CodeBlock language="bash" code="rm -f drafts/*.md  # 14 files" />
      {state === "pending" ? (
        <Stack direction="row" gap="2">
          <Dialog>
            <DialogTrigger>Review and approve</DialogTrigger>
            <DialogContent
              title="Approve this step?"
              description="14 files will be deleted. This cannot be undone."
            >
              <DialogClose variant="secondary">Cancel</DialogClose>
              <DialogClose
                variant="danger"
                onClick={() => setState("approved")}
              >
                Approve
              </DialogClose>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" onClick={() => setState("denied")}>
            Deny
          </Button>
        </Stack>
      ) : (
        <>
          <Alert
            tone={state === "approved" ? "success" : "info"}
            title={state === "approved" ? "Step approved" : "Step denied"}
          >
            {state === "approved"
              ? "The agent is continuing."
              : "The agent will look for another way."}
          </Alert>
          <Button variant="ghost" size="sm" onClick={() => setState("pending")}>
            Reset demo
          </Button>
        </>
      )}
    </Block>
  );
}

function Runs() {
  const actions = (n: number) => (
    <Menu
      label={`Actions for run ${n}`}
      variant="ghost"
      size="sm"
      align="end"
      items={[
        { label: "View trace", onSelect: () => {} },
        { label: "Retry", onSelect: () => {} },
        { type: "separator" },
        { label: "Delete", destructive: true, onSelect: () => {} },
      ]}
    />
  );
  return (
    <Block
      id="blk-runs"
      title="Recent runs"
      description="Status, tokens and cost of each run."
      action={<Button size="sm">New run</Button>}
    >
      <Table
        caption="Recent agent runs"
        hideCaption
        columns={[
          { key: "run", header: "Run" },
          { key: "status", header: "Status" },
          { key: "tokens", header: "Tokens", align: "end" },
          { key: "cost", header: "Cost", align: "end" },
          {
            key: "actions",
            header: <span className={shell.srOnly}>Actions</span>,
            align: "end",
          },
        ]}
        rows={[
          {
            run: <Person name="Research agent" email="#482 · 4 min ago" />,
            status: <Badge tone="info">Running</Badge>,
            tokens: "3,210",
            cost: "$0.01",
            actions: actions(482),
          },
          {
            run: <Person name="Support agent" email="#479 · 12 min ago" />,
            status: <Badge tone="warning">Needs approval</Badge>,
            tokens: "5,870",
            cost: "$0.02",
            actions: actions(479),
          },
          {
            run: <Person name="Research agent" email="#471 · 1 h ago" />,
            status: <Badge tone="success">Done</Badge>,
            tokens: "12,430",
            cost: "$0.04",
            actions: actions(471),
          },
          {
            run: <Person name="Code reviewer" email="#468 · 2 h ago" />,
            status: <Badge tone="danger">Failed</Badge>,
            tokens: "8,905",
            cost: "$0.03",
            actions: actions(468),
          },
          {
            run: <Person name="Support agent" email="#463 · 3 h ago" />,
            status: <Badge tone="success">Done</Badge>,
            tokens: "6,140",
            cost: "$0.02",
            actions: actions(463),
          },
        ]}
      />
    </Block>
  );
}

function AgentSettings() {
  return (
    <Block
      id="blk-config"
      title="Agent settings"
      description="How the agent thinks and acts."
    >
      <Select
        label="Model"
        defaultValue="balanced"
        items={[
          { value: "fast", label: "Fast" },
          { value: "balanced", label: "Balanced" },
          { value: "deep", label: "Deep reasoning" },
        ]}
      />
      <Slider label="Creativity" defaultValue={30} />
      <RadioGroup legend="Autonomy" defaultValue="plan">
        <Radio value="ask" label="Ask before every action" />
        <Radio value="plan" label="Show a plan first" />
        <Radio value="auto" label="Act on its own" />
      </RadioGroup>
      <Switch label="Web search" defaultChecked />
      <Switch label="Save run history" defaultChecked />
      <Button>Save settings</Button>
    </Block>
  );
}

function Trace() {
  return (
    <Block
      id="blk-trace"
      title="Run trace"
      description="Every tool call, in order."
      action={<Badge tone="success">4.1 s</Badge>}
    >
      <Accordion
        multiple
        items={[
          {
            value: "t1",
            title: "1 · search_docs · 1.2 s",
            content: (
              <CodeBlock
                language="json"
                code={'{\n  "query": "pricing changes",\n  "limit": 5\n}'}
              />
            ),
          },
          {
            value: "t2",
            title: "2 · read_page · 0.8 s",
            content: (
              <CodeBlock language="json" code={'{ "url": "/pricing" }'} />
            ),
          },
          {
            value: "t3",
            title: "3 · write_summary · 2.1 s",
            content: (
              <Text tone="muted">Wrote 3 findings with 3 citations.</Text>
            ),
          },
        ]}
      />
    </Block>
  );
}

function Prompt() {
  return (
    <Block
      id="blk-prompt"
      title="Instructions"
      description="What the agent knows and can use."
    >
      <Tabs
        aria-label="Agent instructions"
        items={[
          {
            value: "prompt",
            label: "Prompt",
            content: (
              <Field
                label="System prompt"
                description="Be specific about what to cite."
              >
                <Textarea
                  rows={5}
                  defaultValue="You are a research assistant. Answer briefly and cite every source."
                />
              </Field>
            ),
          },
          {
            value: "tools",
            label: "Tools",
            content: (
              <Stack gap="2">
                <Checkbox label="search_docs" defaultChecked />
                <Checkbox label="read_page" defaultChecked />
                <Checkbox label="write_file" />
              </Stack>
            ),
          },
          {
            value: "schema",
            label: "Schema",
            content: (
              <CodeBlock
                language="json"
                code={
                  '{\n  "name": "search_docs",\n  "parameters": { "query": "string" }\n}'
                }
              />
            ),
          },
        ]}
      />
      <Stack direction="row" gap="2">
        <Button>Save</Button>
        <Button variant="secondary">Test run</Button>
      </Stack>
    </Block>
  );
}

function ApiAccess() {
  const [shown, setShown] = useState(false);
  return (
    <Block
      id="blk-api"
      title="API access"
      description="Use the agent from your own code."
    >
      <Field
        label="API key"
        description="Keep it secret. Rotate it if it leaks."
      >
        <Input
          type={shown ? "text" : "password"}
          autoComplete="off"
          readOnly
          defaultValue="sk-live-8f2a91c4d7e0"
        />
      </Field>
      <Stack direction="row" gap="2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShown((s) => !s)}
        >
          {shown ? "Hide" : "Show"}
        </Button>
        <Button variant="secondary" size="sm">
          Copy
        </Button>
        <Button variant="ghost" size="sm">
          Rotate
        </Button>
      </Stack>
      <CodeBlock
        tabs={[
          {
            label: "curl",
            code: 'curl https://api.example.com/v1/runs \\\n  -H "Authorization: Bearer $KEY"',
          },
          {
            label: "node",
            code: 'const run = await client.runs.create({\n  agent: "research",\n});',
          },
        ]}
      />
      <Text variant="caption" tone="muted">
        Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search the docs.
      </Text>
    </Block>
  );
}

function Answer() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  return (
    <Block
      id="blk-answer"
      title="Answer"
      action={<Badge variant="outline">3 sources</Badge>}
    >
      <p className={styles.lead}>
        Pro now costs $12 a month, and the free plan lost its API access.
      </p>
      <Text tone="muted">
        The change took effect on May 2. Existing customers keep the old price
        until their next renewal.
      </Text>
      <div className={styles.chips}>
        <Badge variant="subtle">pricing page</Badge>
        <Badge variant="subtle">changelog</Badge>
        <Badge variant="subtle">help center</Badge>
      </div>
      <Stack direction="row" gap="2" align="center">
        <Button
          variant={vote === "up" ? "primary" : "secondary"}
          size="sm"
          aria-pressed={vote === "up"}
          aria-label="Good answer"
          onClick={() => setVote("up")}
        >
          {up}
        </Button>
        <Button
          variant={vote === "down" ? "primary" : "secondary"}
          size="sm"
          aria-pressed={vote === "down"}
          aria-label="Bad answer"
          onClick={() => setVote("down")}
        >
          {down}
        </Button>
        <Text variant="caption" tone="muted">
          {vote ? "Thanks for the feedback." : "Was this useful?"}
        </Text>
      </Stack>
    </Block>
  );
}

/* ---------- Account and team ---------- */

function Team() {
  const menu = (who: string, first: string) => (
    <Menu
      label={`Actions for ${who}`}
      variant="ghost"
      size="sm"
      align="end"
      items={[
        { label: first, onSelect: () => {} },
        { type: "separator" },
        { label: "Remove", destructive: true, onSelect: () => {} },
      ]}
    />
  );
  return (
    <Block
      id="blk-team"
      title="Team members"
      description="People with access to this project."
      action={<Button size="sm">Invite</Button>}
    >
      <Table
        caption="Members and roles"
        hideCaption
        columns={[
          { key: "person", header: "Member" },
          { key: "role", header: "Role" },
          { key: "status", header: "Status" },
          {
            key: "actions",
            header: <span className={shell.srOnly}>Actions</span>,
            align: "end",
          },
        ]}
        rows={[
          {
            person: <Person name="Ada Lovelace" email="ada@example.com" />,
            role: "Admin",
            status: <Badge tone="success">Active</Badge>,
            actions: menu("Ada", "Edit role"),
          },
          {
            person: <Person name="Grace Hopper" email="grace@example.com" />,
            role: "Editor",
            status: <Badge tone="success">Active</Badge>,
            actions: menu("Grace", "Edit role"),
          },
          {
            person: <Person name="Alan Turing" email="alan@example.com" />,
            role: "Viewer",
            status: <Badge tone="warning">Invited</Badge>,
            actions: menu("Alan", "Resend invite"),
          },
        ]}
      />
    </Block>
  );
}

function SignIn() {
  return (
    <Block id="blk-signin" title="Sign in" description="Welcome back.">
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack gap="3">
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
      <Text variant="caption" tone="muted">
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
      action={<Badge tone="accent">Popular</Badge>}
    >
      <p className={styles.price}>
        <span className={styles.priceNumber}>$12</span>{" "}
        <span className={styles.priceUnit}>per month</span>
      </p>
      <Text tone="muted">Everything to ship with a small team.</Text>
      <ul className={styles.features}>
        <li>{tick}Unlimited projects</li>
        <li>{tick}Ten team members</li>
        <li>{tick}Priority support</li>
      </ul>
      <ButtonLink href="/docs/installation">Choose Pro</ButtonLink>
    </Block>
  );
}

function Notifications() {
  return (
    <Block
      id="blk-notify"
      title="Notifications"
      description="Choose what we send you."
    >
      <Switch label="Email updates" defaultChecked />
      <Switch label="Push notifications" />
      <Switch label="Weekly digest" defaultChecked />
      <Field label="Language">
        <Select
          items={[
            { value: "en", label: "English" },
            { value: "es", label: "Español" },
          ]}
          defaultValue="en"
        />
      </Field>
      <Button variant="secondary">Save changes</Button>
    </Block>
  );
}

function Onboarding() {
  return (
    <Block
      id="blk-onboard"
      title="Get started"
      description="2 of 5 steps done."
    >
      <Progress label="Setup" value={2} max={5} />
      <Stack gap="2">
        <Checkbox label="Create your first agent" defaultChecked />
        <Checkbox label="Connect a data source" defaultChecked />
        <Checkbox label="Run a test" />
        <Checkbox label="Invite your team" />
        <Checkbox label="Set a monthly budget" />
      </Stack>
      <Button variant="secondary">Continue setup</Button>
    </Block>
  );
}

function Invite() {
  return (
    <Block
      id="blk-invite"
      title="Invite a teammate"
      description="They will get an email with a link."
    >
      <Field label="Email" description="You can add more later.">
        <Input type="email" autoComplete="off" placeholder="name@company.com" />
      </Field>
      <Field label="Role">
        <Select
          items={[
            { value: "viewer", label: "Viewer" },
            { value: "editor", label: "Editor" },
            { value: "admin", label: "Admin" },
          ]}
          defaultValue="editor"
        />
      </Field>
      <Stack direction="row" gap="3">
        <Button>Send invite</Button>
        <Button variant="ghost">Cancel</Button>
      </Stack>
    </Block>
  );
}

/** Complete, composed examples built only from library components. They are real and interactive. */
export function Blocks() {
  return (
    <div className={styles.blocks}>
      {/* Each column stacks cards at their natural height. Column widths differ on purpose. */}
      <div className={`${styles.col} ${styles.colSide}`}>
        <Sidebar />
        <SignIn />
        <Plan />
        <Notifications />
        <Invite />
      </div>
      <div className={styles.col}>
        <SavingsTargets />
        <Contributions />
        <Claimable />
        <Dividends />
        <ConnectDevice />
        <Usage />
      </div>
      <div className={`${styles.col} ${styles.colWide}`}>
        <Chat />
        <Runs />
        <Team />
        <Prompt />
        <Trace />
        <Answer />
      </div>
      <div className={styles.col}>
        <SavingsPlan />
        <ApprovalBlock />
        <AgentRun />
        <AgentSettings />
        <ApiAccess />
        <Onboarding />
      </div>
    </div>
  );
}
