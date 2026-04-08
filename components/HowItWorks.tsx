import React from 'react';
import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="22" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 23h12M14 20v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 11l4 3 4-4 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Send your prompt',
    desc: 'Type normally in ChatGPT or Claude and hit send. Nothing changes about your workflow.',
  },
  {
    number: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14h-3M24 14h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: 'Kayf activates',
    desc: "You're automatically taken to your chosen break tab. No clicks needed. Go play, watch, or browse — Kayf is watching the AI.",
  },
  {
    number: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M5 14h18M17 8l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 8v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: 'Return to your answer',
    desc: 'When the response is ready, Kayf brings you back. Answer waiting. Reading position preserved. Videos paused.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>How it works</h2>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <React.Fragment key={step.number}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
