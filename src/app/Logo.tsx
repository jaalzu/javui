import Image from "next/image";
import styles from "./logo.module.css";

/**
 * Brand artwork from `public/logo`.
 * - `Mark` (icon) is shown on small screens.
 * - `Wordmark` (icon + "Javui") is shown from tablet width up.
 * Each renders a light/dark pair and CSS picks the one matching
 * `data-theme` (set by next-themes), so there is no hydration mismatch.
 * The parent link already has `aria-label="Javui home"`, so images are decorative.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <span className={`${styles.logo} ${styles.mark} ${className}`}>
      <Image
        src="/logo/icon-light.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={482}
        priority
        className={styles.light}
      />
      <Image
        src="/logo/icon-dark.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={505}
        priority
        className={styles.dark}
      />
    </span>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`${styles.logo} ${styles.wordmark} ${className}`}>
      <Image
        src="/logo/wordmark-light.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={171}
        priority
        className={styles.light}
      />
      <Image
        src="/logo/wordmark-dark.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={171}
        priority
        className={styles.dark}
      />
    </span>
  );
}
