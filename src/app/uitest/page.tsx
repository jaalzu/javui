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
  Container,
  Box,
  DescriptionList,
  DescriptionListDetails,
  DescriptionListTerm,
  EmptyState,
  Field,
  Grid,
  Heading,
  Input,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
  Stack,
  Text,
} from "@/ui";
import { CodeBlock } from "@/ui/server";
import styles from "./ui-test.module.css";

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
    <main className={styles.workspace}>
      <div className={styles.pageWidth}>
        <div className={styles.projectPage}>
          <header className={styles.projectHeader}>
            <div className={styles.breadcrumbs}>
              <span>Workspace</span>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span>Projects</span>
            </div>

            <div className={styles.projectHeading}>
              <div>
                <div className={styles.eyebrow}>
                  <span className={styles.statusDot} />
                  PROJECT OVERVIEW
                </div>
                <h1>Component library</h1>
                <p className={styles.projectDescription}>
                  One place to review changes, track quality, and prepare the
                  next release.
                </p>
              </div>

              <Badge variant="success">On track</Badge>
            </div>
          </header>

          <section className={styles.releaseBanner}>
            <div className={styles.releaseIcon}>
              <CheckIcon />
            </div>
            <div className={styles.releaseCopy}>
              <p className={styles.releaseTitle}>Ready for review</p>
              <p>
                All required checks have passed. The release is waiting for
                final approval.
              </p>
            </div>
            <span className={styles.releaseVersion}>v1.4.0</span>
          </section>

          <section className={styles.systemSection} aria-labelledby="system-snapshot-title">
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionIndex}>00</span>
                <Heading as="h2" size={6} id="system-snapshot-title">System snapshot</Heading>
              </div>
              <Text variant="caption" tone="muted">Foundations + layout</Text>
            </div>

            <Container size="xl" gutter="0">
              <Grid columns={{ base: 1, md: 3 }} gap="4">
                <Box surface="card" size="sm">
                  <Stack gap="2">
                    <Text variant="caption" tone="muted">Components</Text>
                    <Heading as="h3" size={5}>52</Heading>
                    <Text variant="body" size="sm" tone="muted">Documented building blocks available to the team.</Text>
                  </Stack>
                </Box>
                <Box surface="highlight" size="sm">
                  <Stack gap="2">
                    <Text variant="caption" tone="muted">Coverage</Text>
                    <Heading as="h3" size={5}>94%</Heading>
                    <Text variant="body" size="sm" tone="muted">Stories and accessibility checks passing.</Text>
                  </Stack>
                </Box>
                <Box surface="card" size="sm">
                  <DescriptionList layout="stacked">
                    <DescriptionListTerm>Current release</DescriptionListTerm>
                    <DescriptionListDetails>v1.4.0 · Ready for review</DescriptionListDetails>
                    <DescriptionListTerm>Next focus</DescriptionListTerm>
                    <DescriptionListDetails>Responsive utilities and patterns</DescriptionListDetails>
                  </DescriptionList>
                </Box>
              </Grid>
            </Container>
          </section>

          <Grid columns={{ base: 1, md: 2 }} gap="6">
            <section className={styles.projectSection}>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.sectionIndex}>01</span>
                  <h2>Release details</h2>
                </div>
                <span className={styles.sectionMeta}>2 topics</span>
              </div>

              <div className={styles.accordionPanel}>
                <Accordion items={accordionItems} />
              </div>
            </section>

            <section className={styles.projectSection}>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.sectionIndex}>02</span>
                  <h2>Release status</h2>
                </div>
              </div>

              <div className={styles.statusPanel}>
                <div className={styles.statusRow}>
                  <span>Build & checks</span>
                  <Badge variant="success">Passed</Badge>
                </div>
                <div className={styles.statusRow}>
                  <span>Accessibility review</span>
                  <Badge variant="success">Passed</Badge>
                </div>
                <div className={styles.statusRow}>
                  <span>Final approval</span>
                  <Badge>Pending</Badge>
                </div>

                <div className={styles.panelDivider} />

                <div className={styles.maintainer}>
                  <Avatar
                    name="Ada Lovelace"
                    badge={<CheckIcon />}
                    badgeLabel="Verified contributor"
                  />
                  <div className={styles.maintainerInfo}>
                    <span className={styles.maintainerName}>Ada Lovelace</span>
                    <span className={styles.maintainerRole}>Release maintainer</span>
                  </div>

                  <span className={styles.maintainerIndicator} />
                </div>

                <div className={styles.releaseActions}>
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

          <section className={styles.componentLab} aria-labelledby="component-lab-title">
            <div className={styles.sectionHeading}>
              <div><span className={styles.sectionIndex}>03</span><h2 id="component-lab-title">Component lab</h2></div>
              <span className={styles.sectionMeta}>Live combinations</span>
            </div>

            <Grid columns={{ base: 1, md: 2 }} gap="6" align="start">
              <Card as="article" variant="surface">
                <CardHeader>
                  <CardTitle>Accessible form field</CardTitle>
                  <CardDescription>Label, help text and control wiring in one composition.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Field label="Release owner" description="Choose the person responsible for approval.">
                    <Combobox items={owners} placeholder="Select an owner" />
                  </Field>
                  <div className={styles.labGap} />
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
                  <div className={styles.labGap} />
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
                  <div className={styles.labGap} />
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger>What is included?</CollapsibleTrigger>
                    <CollapsibleContent><p>Reusable controls, accessible states and responsive layout primitives.</p></CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              <Card as="article" variant="surface">
                <CardHeader><CardTitle>Media and identity</CardTitle></CardHeader>
                <CardContent>
                  <AspectRatio ratio={16 / 9} className={styles.labMedia}><span>16:9 preview</span></AspectRatio>
                  <div className={styles.labPeople}><Avatar name="Ada Lovelace" status="online" /><Badge variant="success">Verified</Badge><Checkbox label="Include in report" /></div>
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

          <footer className={styles.projectFooter}>
            <span>Last updated today</span>
            <span>·</span>
            <span>Component library / v1.4.0</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
