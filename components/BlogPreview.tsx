import type { Post } from '../lib/posts';
import styles from './BlogPreview.module.css';

interface BlogPreviewProps {
  posts: Post[];
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="section-label">From the blog</span>
            <h2 className={styles.heading}>Updates &amp; notes</h2>
          </div>
          <a href="/blog" className={styles.viewAll}>
            View all →
          </a>
        </div>

        <div className={styles.posts}>
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.post}
            >
              <span className={styles.date}>{formatDate(post.date)}</span>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <span className={styles.readMore}>Read more →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
