'use client';
import TerminalWindow from './TerminalWindow';
import type { TermLine } from './TerminalWindow';

const kv = (key: string, val: string, valColor: string) => (
  <span>
    <span
      style={{
        color: 'var(--muted)',
        display: 'inline-block',
        minWidth: 84,
      }}
    >
      {key}
    </span>
    <span style={{ color: valColor }}>{val}</span>
  </span>
);

const heroLines: TermLine[] = [
  {
    delay: 300,
    content: <span style={{ color: 'var(--accent)' }}>$ ./devanshi --profile</span>,
  },
  { delay: 80, content: <span>&nbsp;</span> },
  {
    delay: 120,
    content: (
      <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
        # initializing profile...
      </span>
    ),
  },
  { delay: 80, content: <span>&nbsp;</span> },
  { delay: 120, content: kv('name', 'Devanshi Garg', 'var(--green)') },
  { delay: 120, content: kv('role', 'Full Stack Engineer', 'var(--green)') },
  { delay: 120, content: kv('current', 'EXC Managed Services', 'var(--green)') },
  { delay: 120, content: kv('focus', 'AI/LLM · MFE · Node.js', 'var(--green)') },
  { delay: 120, content: kv('location', 'Gurugram, India', 'var(--green)') },
  { delay: 80, content: <span>&nbsp;</span> },
  {
    delay: 120,
    content: (
      <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
        # loading projects...
      </span>
    ),
  },
  {
    delay: 120,
    content: (
      <span style={{ color: 'var(--green)' }}>
        {'Pinged ............. [Full-Stack] ✓ ★'}
      </span>
    ),
  },
  {
    delay: 120,
    content: (
      <span style={{ color: 'var(--green)' }}>
        {'Sketchd ............ [Vision AI]  ✓'}
      </span>
    ),
  },
  {
    delay: 120,
    content: (
      <span style={{ color: 'var(--green)' }}>
        {'Dossi .............. [Research]   ✓'}
      </span>
    ),
  },
  {
    delay: 120,
    content: (
      <span style={{ color: 'var(--green)' }}>
        {'SwigZy ............. [LLM+MCP]    ✓'}
      </span>
    ),
  },
  {
    delay: 120,
    content: (
      <span style={{ color: 'var(--green)' }}>
        {'Student Platform ... [MFE+RBAC]  ✓'}
      </span>
    ),
  },
  {
    delay: 120,
    content: (
      <span style={{ color: 'var(--green)' }}>
        {"Devanshi's Agent ... [Voice AI]  ✓"}
      </span>
    ),
  },
  { delay: 80, content: <span>&nbsp;</span> },
  { delay: 120, content: kv('status', 'open to opportunities', 'var(--accent)') },
  { delay: 80, content: <span>&nbsp;</span> },
  {
    delay: 300,
    content: (
      <span style={{ color: 'var(--accent)' }}>
        ${' '}
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 14,
            background: 'var(--accent)',
            animation: 'cursor-blink 1s step-end infinite',
            verticalAlign: 'middle',
          }}
        />
      </span>
    ),
  },
];

export default function Hero() {
  return (
    <section
      className="hero-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        padding: '120px 48px 80px',
        minHeight: '100vh',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* ── LEFT ── */}
      <div>
        {/* Availability tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 28,
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 11,
            color: 'var(--green)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--green)',
              animation: 'dot-blink 1.5s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
          Available for opportunities
        </div>

        {/* Name */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(48px, 6vw, 88px)',
              letterSpacing: '-3px',
              lineHeight: 0.95,
            }}
          >
            <div
              style={{
                WebkitTextStroke: '1.5px rgba(240,240,240,0.35)',
                color: 'transparent',
              }}
            >
              Devanshi
            </div>
            <div style={{ color: 'var(--text)' }}>Garg</div>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: 'clamp(20px, 2.5vw, 32px)',
              color: 'var(--accent)',
              letterSpacing: '-1px',
              marginTop: 12,
            }}
          >
            Full Stack + AI
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: 15,
            color: 'var(--muted)',
            lineHeight: 1.75,
            maxWidth: 440,
            marginBottom: 40,
          }}
        >
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>
            React · Node.js · TypeScript · LLMs.
          </strong>{' '}
          Currently architecting AI-powered platforms at EXC Managed Services.
          I ship fast, think in systems, and make bots order your lunch.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a
            href="#work"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: 13,
              padding: '13px 26px',
              background: 'var(--accent)',
              color: '#fff',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px,-2px)';
              e.currentTarget.style.boxShadow =
                '4px 4px 0 var(--accent-dim)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0,0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View Work →
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: 13,
              padding: '13px 26px',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              textDecoration: 'none',
              display: 'inline-block',
              transition:
                'transform 0.2s ease, border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px,-2px)';
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0,0)';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text)';
            }}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* ── RIGHT — Terminal ── */}
      <div>
        <TerminalWindow
          title="devanshi.sh — profile"
          lines={heroLines}
          minHeight={340}
          fontSize={12}
          padding={24}
          restartDelay={3000}
        />
      </div>
    </section>
  );
}
