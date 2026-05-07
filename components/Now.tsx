'use client';
import { motion } from 'framer-motion';
import TerminalWindow from './TerminalWindow';
import type { TermLine } from './TerminalWindow';

const nowLines: TermLine[] = [
  {
    delay: 0,
    content: <span style={{ color: 'var(--accent)' }}>$ status --current</span>,
  },
  {
    delay: 120,
    content: <span>&nbsp;</span>,
  },
  {
    delay: 120,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>{'  building .................. '}</span>
        <span style={{ color: 'var(--green)' }}>Sketchd</span>
      </span>
    ),
  },
  {
    delay: 100,
    content: (
      <span style={{ color: 'var(--muted)' }}>
        {'  └─ sketch-to-code tool, split-screen,'}
      </span>
    ),
  },
  {
    delay: 100,
    content: (
      <span style={{ color: 'var(--muted)' }}>
        {'     pencil drawing → live React/Tailwind'}
      </span>
    ),
  },
  {
    delay: 120,
    content: <span>&nbsp;</span>,
  },
  {
    delay: 120,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>{'  learning .................. '}</span>
        <span style={{ color: 'var(--green)' }}>MFEs · Agentic Workflows</span>
      </span>
    ),
  },
  {
    delay: 100,
    content: (
      <span style={{ color: 'var(--muted)' }}>
        {'                              System Design'}
      </span>
    ),
  },
  {
    delay: 120,
    content: <span>&nbsp;</span>,
  },
  {
    delay: 120,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>{'  at work ................... '}</span>
        <span style={{ color: 'var(--green)' }}>Retention MFE (EXC)</span>
      </span>
    ),
  },
  {
    delay: 100,
    content: (
      <span style={{ color: 'var(--muted)' }}>
        {'                              └─ early warning system'}
      </span>
    ),
  },
  {
    delay: 120,
    content: <span>&nbsp;</span>,
  },
  {
    delay: 120,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>{'  open to ................... '}</span>
        <span style={{ color: 'var(--green)' }}>Full-time · Freelance</span>
      </span>
    ),
  },
  {
    delay: 120,
    content: <span>&nbsp;</span>,
  },
  {
    delay: 120,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>{'  last updated .............. '}</span>
        <span style={{ color: 'var(--green)' }}>May 2026</span>
      </span>
    ),
  },
  {
    delay: 120,
    content: <span>&nbsp;</span>,
  },
  {
    delay: 200,
    content: (
      <span style={{ color: 'var(--accent)' }}>
        {'$ '}<span style={{ background: 'var(--accent)', color: 'var(--bg)' }}>&nbsp;</span>
      </span>
    ),
  },
];

export default function Now() {
  return (
    <section
      id="now"
      style={{
        padding: '80px 48px',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 11,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: 12,
            }}
          >
            // current
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4vw, 52px)',
              letterSpacing: '-2px',
              color: 'var(--text)',
            }}
          >
            What I&apos;m building.
          </h2>
        </div>

        <div style={{ maxWidth: 640 }}>
          <TerminalWindow
            title="devanshi.sh — now"
            lines={nowLines}
            minHeight={320}
            fontSize={12}
            padding={24}
            restartDelay={99999}
          />
        </div>
      </motion.div>
    </section>
  );
}
