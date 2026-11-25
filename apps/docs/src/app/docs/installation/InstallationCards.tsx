import { Link } from "@javui/ui";
import styles from "./InstallationCards.module.css";

const paths = [
  {
    href: "#new-project",
    title: "New project",
    text: "Start from zero with create-next-app.",
  },
  {
    href: "#existing-project",
    title: "Existing project",
    text: "Add JavUI to an app you already have.",
  },
];

/** Jump links to the two installation routes, shown above the README. */
export function InstallationCards() {
  return (
    <nav aria-label="Installation paths" className={styles.cards}>
      {paths.map((path) => (
        <Link key={path.href} href={path.href} className={styles.card}>
          <span className={styles.title}>{path.title}</span>
          <span className={styles.text}>{path.text}</span>
        </Link>
      ))}
    </nav>
  );
}
