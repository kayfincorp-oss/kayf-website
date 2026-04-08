import styles from './Hero.module.css';

const CHROME_URL =
  'https://chromewebstore.google.com/detail/kayf/npeikeenbibceplhpjponnolapbogjbn';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background blobs */}
      <div className={styles.bg}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <h1 className={`${styles.heading} fade-up-1`}>
          Stop staring at<br />
          <em>the loading bar.</em>
        </h1>

        <p className={`${styles.sub} fade-up-2`}>
          Hit send on Claude or ChatGPT. Kayf jumps you to something else —
          YouTube, a game, whatever. When the answer's ready, it brings you back.
        </p>

        <div className={`${styles.actions} fade-up-3`}>
          <a
            href={CHROME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
          >
            Add to Chrome — free
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#demo" className={styles.secondary}>
            see it work ↓
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scroll} aria-hidden="true">↓</div>
    </section>
  );
}
