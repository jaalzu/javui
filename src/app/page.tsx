import { ButtonLink, Heading, Link } from "@/ui";
import { Blocks } from "./Blocks";
import styles from "./site.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.wrap}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.heroTitle}>
            Ready-to-use foundations for your design system.
          </h1>
          <p className={styles.heroLead}>
            Composable and accessible. Create your own library, your way. Made for humans and{" "}
            <span className={styles.heroMuted}>agents.</span>
          </p>
          <div className={styles.heroActions}>
            <ButtonLink href="/docs/installation">Get started</ButtonLink>
            <ButtonLink href="/docs/components" variant="secondary">View components</ButtonLink>
          </div>
        </section>
      </div>

      <div className={styles.wrap}>
        <section className={styles.showcase} aria-labelledby="showcase-title">
          <Heading as="h2" id="showcase-title" className={styles.srOnly}>Examples</Heading>
          <Blocks />
          <div className={styles.showcaseFade} aria-hidden="true" />
          <div className={styles.showcaseCta}>
            <Link href="/docs/installation">Install</Link>
            <Link href="/docs/components">View components</Link>
          </div>
        </section>
      </div>
    </>
  );
}
