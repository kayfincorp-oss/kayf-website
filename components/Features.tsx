import styles from './Features.module.css';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    ),
    title: 'Runs silently',
    desc: 'No notifications, no popups. You only notice it when it switches you back.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: 'No data, no servers',
    desc: 'Everything runs locally in your browser. No account, no tracking, nothing phoning home.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="6" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M18 8l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Videos pause and resume',
    desc: 'YouTube pauses when Kayf switches you away and picks back up when you return.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 14h18M17 8l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 8v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: 'Scroll position saved',
    desc: 'Returns you to the exact spot you left on your break tab.',
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className="container">
        <div style={{ marginBottom: '36px' }}>
          <h2 className={styles.heading}>What it does</h2>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
