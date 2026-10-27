import { Button, Heading, Link } from "@/ui";
import { Blocks } from "@/app/_landing/Blocks/Blocks";
import landing from "./_landing/landing.module.css";
import shell from "./_shell/shell.module.css";

export default function Home() {
  return (
    <>
      <div className={shell.wrap}>
        <section className={landing.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className={landing.heroTitle}>
            Ready-to-use foundations for your design system.
          </h1>
          <p className={landing.heroLead}>
            Composable and accessible. Create your own library, your way. Made
            for humans and <span className={landing.heroMuted}>agents.</span>
          </p>
          <div className={landing.heroActions}>
            <Button href="/docs/installation">Get started</Button>
            <Button href="/docs/components" variant="secondary">
              View components
            </Button>
          </div>
        </section>
      </div>

      <div className={shell.wrap}>
        <section className={landing.showcase} aria-labelledby="showcase-title">
          <Heading as="h2" id="showcase-title" className={shell.srOnly}>
            Examples
          </Heading>
          <Blocks />
          <div className={landing.showcaseFade} aria-hidden="true" />
          <div className={landing.showcaseCta}>
            <Link href="/docs/installation">Install</Link>
            <Link href="/docs/components">View components</Link>
          </div>
        </section>
      </div>
    </>
  );
}
