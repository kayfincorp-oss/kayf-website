import styles from './Footer.module.css';

const CHROME_URL =
  'https://chromewebstore.google.com/detail/kayf/npeikeenbibceplhpjponnolapbogjbn';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>kayf</span>
            <p className={styles.tagline}>Turn wait time into flow time.</p>
          </div>

          <nav className={styles.links} aria-label="Footer navigation">
            <a
              href={CHROME_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome Extension
            </a>
            <a href="/blog">Blog</a>
            <a href="mailto:kayfincorp@gmail.com">Contact</a>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span>© 2025 Kayf. All rights reserved.</span>
          <span className={styles.made}>No account needed.</span>
        </div>
      </div>
    </footer>
  );
}
