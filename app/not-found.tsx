import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        textAlign: 'center',
        background: 'var(--color-bg)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '11px',
          color: 'var(--color-amber)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        404
      </span>
      <h1
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: 'clamp(40px, 7vw, 72px)',
          fontWeight: 300,
          lineHeight: 1.1,
          color: 'var(--color-text)',
        }}
      >
        Nothing here<br />
        <em style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>
          but silence.
        </em>
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-outfit)',
          fontSize: '16px',
          color: 'var(--color-text-muted)',
          maxWidth: '360px',
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        That page doesn&apos;t exist. Maybe it never did.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: 'var(--color-coral)',
          color: '#fff',
          borderRadius: '10px',
          fontFamily: 'var(--font-outfit)',
          fontSize: '15px',
          fontWeight: 500,
          transition: 'background 0.2s',
          marginTop: '8px',
        }}
      >
        ← Back home
      </Link>
    </main>
  );
}
