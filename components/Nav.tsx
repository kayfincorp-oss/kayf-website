'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

const CHROME_URL =
  'https://chromewebstore.google.com/detail/kayf/npeikeenbibceplhpjponnolapbogjbn';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${mounted ? styles.visible : ''}`}>
      <Link href="/" className={styles.logo}>
        kayf
      </Link>

      <div className={styles.links}>
        <Link href="/blog" className={styles.blogLink}>
          Blog
        </Link>
        <a
          href={CHROME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          Add to Chrome
        </a>
      </div>
    </nav>
  );
}
