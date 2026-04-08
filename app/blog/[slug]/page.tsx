import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: `${post.title} — Kayf Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main>
        <div style={{ paddingTop: '64px' }} />
        <article
          style={{
            padding: '80px 24px',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          <a
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '12px',
              color: 'var(--color-text-faint)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              marginBottom: '40px',
              transition: 'color 0.2s',
            }}
          >
            ← All posts
          </a>

          <time
            dateTime={post.date}
            style={{
              display: 'block',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '11px',
              color: 'var(--color-text-faint)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            {formatDate(post.date)}
          </time>

          <h1
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              marginBottom: '48px',
            }}
          >
            {post.title}
          </h1>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content! }}
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'var(--color-text-muted)',
            }}
          />
        </article>
      </main>
      <Footer />

      <style>{`
        .prose h1,
        .prose h2,
        .prose h3 {
          font-family: var(--font-fraunces-var, serif);
          color: var(--color-text);
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin-top: 48px;
          margin-bottom: 16px;
        }
        .prose h1 { font-size: 2rem; }
        .prose h2 { font-size: 1.5rem; }
        .prose h3 { font-size: 1.2rem; }

        .prose p {
          margin-bottom: 20px;
          font-weight: 300;
        }

        .prose ul,
        .prose ol {
          padding-left: 24px;
          margin-bottom: 20px;
        }

        .prose li {
          margin-bottom: 8px;
          font-weight: 300;
          line-height: 1.75;
        }

        .prose code {
          font-family: var(--font-jetbrains-var, monospace);
          font-size: 13px;
          background: rgba(240, 152, 32, 0.08);
          padding: 2px 7px;
          border-radius: 4px;
          color: var(--color-amber);
        }

        .prose pre {
          background: var(--color-bg-subtle);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 20px 24px;
          overflow-x: auto;
          margin-bottom: 24px;
          margin-top: 8px;
        }

        .prose pre code {
          background: none;
          padding: 0;
          font-size: 13px;
          color: var(--color-text);
          border-radius: 0;
        }

        .prose a {
          color: var(--color-amber);
          text-decoration: underline;
          text-decoration-color: rgba(240, 152, 32, 0.3);
          transition: text-decoration-color 0.2s;
        }

        .prose a:hover {
          text-decoration-color: var(--color-amber);
        }

        .prose blockquote {
          border-left: 2px solid var(--color-amber);
          padding: 4px 0 4px 20px;
          margin: 24px 0;
          color: var(--color-text-muted);
          font-style: italic;
        }

        .prose hr {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 40px 0;
        }
      `}</style>
    </>
  );
}
