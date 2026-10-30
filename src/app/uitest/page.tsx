import type { Metadata } from "next";
import {
  Accordion,
  Alert,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CheckIcon,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  EmptyState,
  Field,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
} from "@/ui";
import { CodeBlock } from "@/ui/server";
import "./ui-test.module.css";

export const metadata: Metadata = {
  title: "Project overview",
  robots: { index: false, follow: false },
};

const accordionItems = [
  {
    value: "scope",
    title: "What's included in this release?",
    content: (
      <p>
        Refined form controls, consistent feedback patterns, and improved
        keyboard navigation across shared components.
      </p>
    ),
  },
  {
    value: "quality",
    title: "How was it validated?",
    content: (
      <p>
        Components were checked for responsive behavior, keyboard interaction,
        and regressions in existing screens.
      </p>
    ),
  },
];

const owners = [
  { value: "ada", label: "Ada Lovelace" },
  { value: "grace", label: "Grace Hopper" },
  { value: "alan", label: "Alan Turing" },
];

export default function UiTestPage() {
  return (
    <main className="workspace">
      <div className="page-width">
        <div className="project-page">
          <header className="project-header">
            <div className="breadcrumbs">
              <span>Workspace</span>
              <span className="breadcrumb-separator">/</span>
              <span>Projects</span>
            </div>

            <div className="project-heading">
              <div>
                <div className="eyebrow">
                  <span className="status-dot" />
                  PROJECT OVERVIEW
                </div>
                <h1>Component library</h1>
                <p className="project-description">
                  One place to review changes, track quality, and prepare the
                  next release.
                </p>
              </div>

              <Badge variant="success">On track</Badge>
            </div>
          </header>

          <section className="release-banner">
            <div className="release-icon">
              <CheckIcon />
            </div>
            <div className="release-copy">
              <p className="release-title">Ready for review</p>
              <p>
                All required checks have passed. The release is waiting for
                final approval.
              </p>
            </div>
            <span className="release-version">v1.4.0</span>
          </section>

          <Grid columns={{ base: 1, md: 2 }} gap="6">
            <section className="project-section">
              <div className="section-heading">
                <div>
                  <span className="section-index">01</span>
                  <h2>Release details</h2>
                </div>
                <span className="section-meta">2 topics</span>
              </div>

              <div className="accordion-panel">
                <Accordion items={accordionItems} />
              </div>
            </section>

            <section className="project-section">
              <div className="section-heading">
                <div>
                  <span className="section-index">02</span>
                  <h2>Release status</h2>
                </div>
              </div>

              <div className="status-panel">
                <div className="status-row">
                  <span>Build & checks</span>
                  <Badge variant="success">Passed</Badge>
                </div>
                <div className="status-row">
                  <span>Accessibility review</span>
                  <Badge variant="success">Passed</Badge>
                </div>
                <div className="status-row">
                  <span>Final approval</span>
                  <Badge>Pending</Badge>
                </div>

                <div className="panel-divider" />

                <div className="maintainer">
                  <Avatar
                    name="Ada Lovelace"
                    badge={<CheckIcon />}
                    badgeLabel="Verified contributor"
                  />
                  <div className="maintainer-info">
                    <span className="maintainer-name">Ada Lovelace</span>
                    <span className="maintainer-role">Release maintainer</span>
                  </div>

                  <span className="maintainer-indicator" />
                </div>

                <div className="release-actions">
                  <Modal>
                    <ModalTrigger variant="secondary">
                      View release notes
                    </ModalTrigger>

                    <ModalContent
                      title="Release notes · v1.4.0"
                      actions={<ModalClose>Close</ModalClose>}
                    >
                      <p>
                        This release refines shared form controls, improves
                        keyboard accessibility, and adds regression coverage for
                        core components.
                      </p>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </section>
          </Grid>

          <section className="component-lab" aria-labelledby="component-lab-title">
            <div className="section-heading">
              <div><span className="section-index">03</span><h2 id="component-lab-title">Component lab</h2></div>
              <span className="section-meta">Live combinations</span>
            </div>

            <Grid columns={{ base: 1, md: 2 }} gap="6">
              <Card as="article" variant="surface">
                <CardHeader>
                  <CardTitle>Accessible form field</CardTitle>
                  <CardDescription>Label, help text and control wiring in one composition.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Field label="Release owner" description="Choose the person responsible for approval.">
                    <Combobox items={owners} placeholder="Select an owner" />
                  </Field>
                  <div className="lab-gap" />
                  <Field label="Release name">
                    <Input placeholder="Spring release" />
                  </Field>
                </CardContent>
              </Card>

              <Card as="article" variant="surface">
                <CardHeader>
                  <CardTitle>Actions and feedback</CardTitle>
                  <CardDescription>Buttons, statuses and an alert working together.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert tone="info" title="Review requested">The release is ready for your approval.</Alert>
                  <div className="lab-gap" />
                  <ButtonGroup aria-label="Release actions">
                    <Button>Approve</Button>
                    <Button variant="secondary">Request changes</Button>
                  </ButtonGroup>
                </CardContent>
              </Card>

              <Card as="article" variant="surface">
                <CardHeader><CardTitle>Navigation and disclosure</CardTitle></CardHeader>
                <CardContent>
                  <Breadcrumb items={[{ label: "Workspace", href: "/" }, { label: "Projects", href: "/uitest" }, { label: "Component library" }]} />
                  <div className="lab-gap" />
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger>What is included?</CollapsibleTrigger>
                    <CollapsibleContent><p>Reusable controls, accessible states and responsive layout primitives.</p></CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              <Card as="article" variant="surface">
                <CardHeader><CardTitle>Media and identity</CardTitle></CardHeader>
                <CardContent>
                  <AspectRatio ratio={16 / 9} className="lab-media"><span>16:9 preview</span></AspectRatio>
                  <div className="lab-people"><Avatar name="Ada Lovelace" status="online" /><Badge variant="success">Verified</Badge><Checkbox label="Include in report" /></div>
                </CardContent>
              </Card>

              <Card as="article" variant="surface">
                <CardHeader><CardTitle>Empty and code states</CardTitle></CardHeader>
                <CardContent>
                  <EmptyState size="sm" title="No snapshots yet" description="Run a check to create your first snapshot." actions={<Button size="sm">Run check</Button>} />
                  <CodeBlock language="tsx" label="Example" code={'<Button>Run check</Button>'} />
                </CardContent>
              </Card>
            </Grid>
          </section>

          <footer className="project-footer">
            <span>Last updated today</span>
            <span>·</span>
            <span>Component library / v1.4.0</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
