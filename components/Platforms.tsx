import styles from './Platforms.module.css';

const platforms = [
  { name: 'Claude', color: '#c07c5e' },
  { name: 'ChatGPT', color: '#7da882' },
];

export default function Platforms() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.label}>Works with the tools you already use</p>
        <div className={styles.platforms}>
          {platforms.map((p) => (
            <div key={p.name} className={styles.pill}>
              <span
                className={styles.platformDot}
                style={{ background: p.color, boxShadow: `0 0 8px ${p.color}55` }}
                aria-hidden="true"
              />
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
