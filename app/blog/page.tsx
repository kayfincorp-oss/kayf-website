import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { getAllPosts } from '../../lib/posts';

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const metadata = {
  title: 'Blog — Kayf',
  description: 'Updates, notes, and ideas from the team building Kayf.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main>
        <div style={{ paddingTop: '64px' }} />
        <section style={{ padding: '80px 24px' }}>
          <div className="container">
            <div style={{ marginBottom: '64px' }}>
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '12px',
                  color: 'var(--color-text-faint)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  marginBottom: '32px',
                  transition: 'color 0.2s',
                }}
              >
                ← Home
              </a>

              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '11px',
                  color: 'var(--color-amber)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Blog
              </span>

              <h1
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 'clamp(40px, 6vw, 64px)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                  marginBottom: '16px',
                }}
              >
                Updates &amp; notes
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '16px',
                  color: 'var(--color-text-muted)',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  maxWidth: '480px',
                }}
              >
                Updates, notes, and ideas from the team building Kayf.
              </p>
            </div>

            {posts.length === 0 && (
              <p
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '16px',
                  color: 'var(--color-text-muted)',
                  fontWeight: 300,
                }}
              >
                No posts yet. Check back soon.
              </p>
            )}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '28px 32px',
                    background: 'var(--color-bg-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                >
                  <time
                    dateTime={post.date}
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: '11px',
                      color: 'var(--color-text-faint)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2
                    style={{
                      fontFamily: 'var(--font-fraunces)',
                      fontSize: '22px',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: '15px',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: '13px',
                      color: 'var(--color-amber)',
                      marginTop: '4px',
                    }}
                  >
                    Read more →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
