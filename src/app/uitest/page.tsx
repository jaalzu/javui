import type { Metadata } from "next";
import {
  Accordion,
  Avatar,
  Badge,
  CheckIcon,
  Grid,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
} from "@/ui";
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
