'use client';
import { Fragment, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import TerminalWindow from './TerminalWindow';
import type { TermLine } from './TerminalWindow';

/* ── Pinged flagship terminal ── */
const mut = (t: string) => <span style={{ color: 'var(--muted)' }}>{t}</span>;
const pingedLines: TermLine[] = [
  { delay: 300, content: <span style={{ color: 'var(--accent)' }}>$ pinged --generate</span> },
  { delay: 80, content: <span>&nbsp;</span> },
  { delay: 140, content: <span>{mut('offering ... ')}<span style={{ color: 'var(--green)' }}>loaded</span></span> },
  { delay: 140, content: <span>{mut('prompt ..... ')}<span style={{ color: 'var(--green)' }}>loaded</span></span> },
  { delay: 140, content: <span>{mut('prospect ... ')}<span style={{ color: 'var(--green)' }}>3 sources enriched</span></span> },
  { delay: 80, content: <span>&nbsp;</span> },
  { delay: 160, content: <span style={{ color: '#ff9f43' }}>{'→ generate(offering, prompt, prospect, history)'}</span> },
  { delay: 160, content: <span style={{ color: 'var(--green)' }}>✓ message ready · in your voice</span> },
];

/* ── SwigZy terminal ── */
const swigzyLines: TermLine[] = [
  {
    delay: 400,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>user → </span>
        <span style={{ color: 'var(--accent)' }}>salad under 300 cal</span>
      </span>
    ),
  },
  { delay: 500, content: <span style={{ color: 'var(--muted)' }}>claude → searching...</span> },
  {
    delay: 500,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>tool → </span>
        <span style={{ color: '#ff9f43' }}>{'search_restaurants()'}</span>
      </span>
    ),
  },
  {
    delay: 450,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>tool → </span>
        <span style={{ color: '#ff9f43' }}>{'add_to_cart()'}</span>
      </span>
    ),
  },
  {
    delay: 450,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>tool → </span>
        <span style={{ color: '#ff9f43' }}>{'place_order()'}</span>
      </span>
    ),
  },
  { delay: 300, content: <span style={{ color: 'var(--green)' }}>done → ✓ 1.8s · 280 cal</span> },
];

/* ── Reusable sub-components ── */
function CardNumber({ n }: { n: string }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 800,
        fontSize: 56,
        color: 'rgba(255,255,255,0.04)',
        letterSpacing: '-3px',
        marginBottom: 16,
        lineHeight: 1,
      }}
    >
      {n}
    </div>
  );
}

function CardTag({ children, color = 'var(--accent)' }: { children: string; color?: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-dm-mono)',
        fontSize: 10,
        color,
        border: `1px solid ${color}`,
        padding: '3px 10px',
        display: 'inline-block',
        marginBottom: 18,
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </span>
  );
}

function CardTitle({ children, size = 24 }: { children: string; size?: number }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-0.8px',
        marginBottom: 12,
        color: 'var(--text)',
      }}
    >
      {children}
    </h3>
  );
}

function CardDesc({ children }: { children: string }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-bricolage)',
        fontSize: 13,
        color: 'var(--muted)',
        lineHeight: 1.7,
        marginBottom: 24,
      }}
    >
      {children}
    </p>
  );
}

function Metric({ val, label }: { val: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 26,
          color: 'var(--accent)',
          letterSpacing: '-1px',
          lineHeight: 1,
        }}
      >
        {val}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 9,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function CardButton({ href, children, variant }: { href: string; children: string; variant: 'live' | 'github' }) {
  const [hovered, setHovered] = useState(false);
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-dm-mono)',
    fontSize: 10,
    padding: '4px 10px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    opacity: hovered ? 0.8 : 1,
    transition: 'opacity 0.2s',
    borderRadius: 0,
  };
  const live: React.CSSProperties = { background: 'var(--accent)', color: '#000', border: 'none' };
  const github: React.CSSProperties = { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)' };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...base, ...(variant === 'live' ? live : github) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

function StackTag({ children }: { children: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-dm-mono)',
        fontSize: 9,
        padding: '3px 8px',
        background: 'rgba(255,255,255,0.04)',
        color: 'var(--muted)',
      }}
    >
      {children}
    </span>
  );
}

/* ── MFE Diagram ── */
function MfeBox({ children, span2 }: { children: string; span2?: boolean }) {
  return (
    <div
      style={{
        gridColumn: span2 ? 'span 2' : undefined,
        background: 'var(--accent-dim)',
        border: '1px solid rgba(123,97,255,0.3)',
        padding: '8px 10px',
        fontFamily: 'var(--font-dm-mono)',
        fontSize: 9,
        color: 'var(--accent)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
}

function MfeDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, margin: '16px 0' }}>
      <MfeBox span2>Shell App — 24 MFEs</MfeBox>
      <MfeBox>RBAC Manager</MfeBox>
      <MfeBox>Communities</MfeBox>
      <MfeBox>Analytics</MfeBox>
      <MfeBox>Retention ✦</MfeBox>
    </div>
  );
}

/* ── Waveform ── */
const waveHeights = [8, 14, 24, 36, 48, 56, 48, 40, 52, 44, 32, 24, 36, 48, 40, 28, 20, 32, 44, 36, 24, 16, 28, 40, 32];
function Waveform() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 60, gap: 3, margin: '20px 0' }}>
      {waveHeights.map((h, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: h,
            background: 'var(--accent)',
            borderRadius: 1.5,
            transformOrigin: 'center',
            animation: `bar-wave ${0.8 + (i % 7) * 0.09}s ease-in-out ${(i * 0.065).toFixed(2)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Sketchd split-view mock: sketch (left) → generated code (right) ── */
const sketchdGenCode = `function SearchList() {
  const [q, setQ] = useState("");
  const items = ["Apples", "Bananas", "Cherries"];

  // controlled input filters the list
  const shown = items.filter((i) =>
    i.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {shown.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}`;

function SketchdMock() {
  const lines = sketchdGenCode.split('\n');
  const label: React.CSSProperties = {
    fontFamily: 'var(--font-dm-mono)',
    fontSize: 9,
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 14,
  };
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 60px var(--accent-dim)',
        margin: '4px 0 8px',
      }}
    >
      {/* chrome bar */}
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {(['#ff5f57', '#febc2e', '#28c840'] as const).map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>
          sketchd — split view
        </span>
      </div>

      {/* split */}
      <div className="sketchd-mock" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* LEFT — hand-drawn sketch */}
        <div style={{ borderRight: '1px solid var(--border)', padding: 18, minHeight: 250, display: 'flex', flexDirection: 'column' }}>
          <div style={label}>✎ canvas</div>
          <svg viewBox="0 0 260 200" style={{ width: '100%', height: 'auto', flex: 1 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="sk-rough">
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
              </filter>
            </defs>
            <g fill="none" stroke="rgba(240,240,240,0.5)" strokeWidth="2" strokeLinecap="round" filter="url(#sk-rough)">
              {/* search box */}
              <rect x="16" y="30" width="196" height="34" rx="9" />
              <circle cx="196" cy="47" r="7" />
              <line x1="201" y1="52" x2="209" y2="60" />
              {/* list rows */}
              <rect x="16" y="88" width="210" height="20" rx="6" />
              <rect x="16" y="118" width="210" height="20" rx="6" />
              <rect x="16" y="148" width="210" height="20" rx="6" />
            </g>
            <text x="18" y="24" fontFamily="var(--font-dm-mono)" fontSize="11" fill="var(--accent)" fontStyle="italic">search</text>
            <text x="18" y="84" fontFamily="var(--font-dm-mono)" fontSize="11" fill="var(--accent)" fontStyle="italic">list</text>
          </svg>
        </div>

        {/* RIGHT — generated code */}
        <div style={{ padding: 18, minHeight: 250 }}>
          <div style={label}>output.jsx</div>
          <pre style={{ margin: 0, fontFamily: 'var(--font-dm-mono)', fontSize: 11, lineHeight: 1.65, overflowX: 'auto' }}>
            <code>
              {lines.map((l, i) => (
                <div
                  key={i}
                  style={{ color: l.trimStart().startsWith('//') ? 'var(--muted)' : 'var(--text)', whiteSpace: 'pre' }}
                >
                  {l || ' '}
                </div>
              ))}
              <span
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 13,
                  background: 'var(--accent)',
                  animation: 'cursor-blink 1s step-end infinite',
                  verticalAlign: 'middle',
                }}
              />
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

/* ── Dossi research-graph mock ── */
const dossiNodes: [string, string, boolean][] = [
  ['planner', 'objective → plan', false],
  ['research', 'Tavily + scrape', false],
  ['analysis', 'synthesise', false],
  ['quality', 'coverage check', true],
  ['report', '9-section brief', false],
];

function GNode({ title, sub, highlight }: { title: string; sub: string; highlight: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        background: highlight ? 'var(--accent-dim)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${highlight ? 'var(--accent)' : 'var(--border)'}`,
        padding: '10px 12px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 11,
          color: highlight ? 'var(--accent)' : 'var(--text)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, color: 'var(--muted)', marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function DossiGraph() {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 60px var(--accent-dim)',
        margin: '4px 0 8px',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {(['#ff5f57', '#febc2e', '#28c840'] as const).map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>
          dossi — research graph
        </span>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {dossiNodes.map(([t, s, hl], i) => (
            <Fragment key={t}>
              <GNode title={t} sub={s} highlight={hl} />
              {i < dossiNodes.length - 1 && (
                <span style={{ textAlign: 'center', color: 'var(--accent)', fontFamily: 'var(--font-dm-mono)', fontSize: 12, lineHeight: 1 }}>↓</span>
              )}
            </Fragment>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: 'var(--muted)', lineHeight: 1.8, marginTop: 16 }}>
          <span style={{ color: 'var(--accent)' }}>↺ verdict = retry</span> → back to research · max 2 passes
          <br />
          checkpointed to Postgres — a crashed run resumes
        </div>
      </div>
    </div>
  );
}

/* ── Dossi grounded-chat mock (ChatGPT-style) ── */
function DossiChat() {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 60px var(--accent-dim)',
        margin: '4px 0 8px',
      }}
    >
      {/* chrome */}
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {(['#ff5f57', '#febc2e', '#28c840'] as const).map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>
          dossi — chat
        </span>
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 9,
            color: 'var(--accent)',
            border: '1px solid rgba(123,97,255,0.3)',
            padding: '2px 8px',
            marginLeft: 'auto',
          }}
        >
          grounded in briefing
        </span>
      </div>

      {/* messages */}
      <div style={{ padding: 20 }}>
        {/* user */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <div
            style={{
              maxWidth: '80%',
              background: 'var(--accent)',
              color: '#fff',
              padding: '10px 14px',
              borderRadius: '12px 12px 2px 12px',
              fontFamily: 'var(--font-bricolage)',
              fontSize: 13.5,
              lineHeight: 1.6,
            }}
          >
            Draft an opener for my call with their Head of Sales.
          </div>
        </div>

        {/* assistant */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ maxWidth: '88%' }}>
            <div
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: 9,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 6,
              }}
            >
              dossi
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                padding: '12px 14px',
                borderRadius: '12px 12px 12px 2px',
                fontFamily: 'var(--font-bricolage)',
                fontSize: 13.5,
                lineHeight: 1.65,
                color: 'var(--text)',
              }}
            >
              From the briefing — they shipped{' '}
              <span style={{ color: 'var(--accent)' }}>enterprise SSO last quarter</span> (business signal)
              and target mid-market SaaS (customers). Try:
              <br />
              <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                &ldquo;Congrats on the SSO launch — as you push upmarket, provisioning at scale usually gets
                noisy. That&apos;s exactly where we help.&rdquo;
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 13,
                  background: 'var(--accent)',
                  animation: 'cursor-blink 1s step-end infinite',
                  verticalAlign: 'middle',
                  marginLeft: 3,
                }}
              />
            </div>
          </div>
        </div>

        {/* input bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '10px 12px',
            marginTop: 18,
            background: 'var(--bg)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-bricolage)', fontSize: 13, color: 'var(--muted)', flex: 1 }}>
            Ask about the briefing…
          </span>
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: 'var(--accent)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            ↑
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Animation variants ── */
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardStyle: React.CSSProperties = {
  background: 'var(--bg)',
  padding: 40,
  overflow: 'hidden',
  transition: 'background 0.3s ease',
};

const hoverOn = (e: React.MouseEvent<HTMLDivElement>) => {
  (e.currentTarget as HTMLDivElement).style.background = 'var(--surface)';
};
const hoverOff = (e: React.MouseEvent<HTMLDivElement>) => {
  (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)';
};

/* ── Projects ── */
export default function Projects() {
  return (
    <section id="work" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 11,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: 12,
            }}
          >
            // selected work
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
            Things I&apos;ve shipped.
          </h2>
        </div>
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: 'var(--muted)' }}>06 projects</span>
      </div>

      {/* ── FLAGSHIP: Pinged ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="project-card flagship-card"
        style={{
          background: 'var(--surface)',
          border: '1px solid rgba(123,97,255,0.3)',
          boxShadow: '0 0 80px var(--accent-dim)',
          padding: 48,
          marginBottom: 32,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: 10,
                color: 'var(--bg)',
                background: 'var(--accent)',
                padding: '3px 10px',
                letterSpacing: '0.1em',
                fontWeight: 500,
              }}
            >
              ★ FLAGSHIP
            </span>
            <CardTag>LLM · Full-Stack · Provider Gateway</CardTag>
          </div>
          <CardTitle size={34}>Pinged</CardTitle>
          <CardDesc>
            Cold outreach that reads like you actually did your homework. Drop in a prospect — a URL
            or a LinkedIn screenshot — and Pinged writes in your voice, referencing what&apos;s
            actually true about them. A context-assembly pipeline, not a CRUD app.
          </CardDesc>

          {/* generate() signature */}
          <div
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 12,
              color: 'var(--accent)',
              background: 'var(--accent-dim)',
              border: '1px solid rgba(123,97,255,0.25)',
              padding: '10px 12px',
              marginBottom: 6,
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            generate(offering, prompt, prospect, history) → message
          </div>
          <div
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 10,
              color: 'var(--muted)',
              marginBottom: 24,
            }}
          >
            One call does the work — the whole product exists to make it good.
          </div>

          {/* Engineering highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              ['Two-phase AI', 'Enrich each source once, stitch at generation — never re-scrape.'],
              ['Provider gateway', 'Retry + automatic fallback (Claude → Gemini); swap a model in one line.'],
              ['Handler-level auth', 'Every query scoped to the session user, checked inside each action.'],
            ].map(([label, desc]) => (
              <div key={label} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-mono)', fontSize: 11, flexShrink: 0 }}>▸</span>
                <span
                  style={{
                    fontFamily: 'var(--font-bricolage)',
                    fontSize: 13,
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>{label}</span> — {desc}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
            {['Next.js', 'TypeScript', 'Drizzle / Neon', 'Better Auth', 'shadcn/ui'].map((t) => (
              <StackTag key={t}>{t}</StackTag>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <CardButton href="https://ping-ed.vercel.app/" variant="live">Live →</CardButton>
            <CardButton href="https://www.loom.com/share/ba04d0e2919744c2a42245e780521c67" variant="github">Walkthrough ↗</CardButton>
            <CardButton href="https://github.com/darcy2002/Ping-ed" variant="github">GitHub ↗</CardButton>
          </div>
        </div>

        <div>
          <TerminalWindow
            title="pinged.sh — generate"
            lines={pingedLines}
            minHeight={220}
            fontSize={11}
            padding={16}
            restartDelay={3200}
          />
        </div>
      </motion.div>

      {/* ── Grid: SwigZy · Student Platform · Agent ── */}
      <motion.div
        className="projects-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}
      >
        {/* Sketchd — featured full width */}
        <motion.div
          variants={card}
          className="project-card featured-card"
          style={{ ...cardStyle, gridColumn: 'span 2' }}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
        >
          <CardNumber n="02" />
          <CardTag>Vision AI · tldraw · SSE</CardTag>
          <CardTitle>Sketchd — Sketches into working React</CardTitle>
          <CardDesc>
            Turn hand-drawn wireframes into working React components — not just markup, components that
            actually do things. Sketch a search box and a list, get a controlled input that filters the
            items below it. Real useState, real behavior — wired in one shot.
          </CardDesc>

          <SketchdMock />

          <div style={{ display: 'flex', gap: 24, margin: '24px 0 14px' }}>
            <Metric val="8" label="Interaction patterns" />
            <Metric val="1-shot" label="No second pass" />
            <Metric val="SSE" label="Token streaming" />
          </div>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 20 }}>
            canvas → JPEG → Claude Sonnet 4 → SSE stream → live iframe{' '}
            <span style={{ color: 'var(--accent)' }}>· one shot, no extra call</span>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {['React 18', 'Vite', 'tldraw', 'Claude Sonnet 4', 'Express', 'SSE'].map((t) => (
              <StackTag key={t}>{t}</StackTag>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <CardButton href="https://sketch-d.vercel.app/" variant="live">Live →</CardButton>
            <CardButton href="https://github.com/darcy2002/SketchD/raw/main/docs/demo.mp4" variant="github">Watch demo ↗</CardButton>
            <CardButton href="https://github.com/darcy2002/SketchD" variant="github">GitHub ↗</CardButton>
          </div>
        </motion.div>

        {/* Dossi — featured full width */}
        <motion.div
          variants={card}
          className="project-card featured-card"
          style={{ ...cardStyle, gridColumn: 'span 2' }}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
        >
          <CardNumber n="03" />
          <CardTag>AI Agent · LangGraph · SSE</CardTag>
          <CardTitle>Dossi — Meeting-prep research agent</CardTitle>
          <CardDesc>
            Drop in a company, website, and meeting objective. Dossi runs a five-node research graph and
            comes back with a nine-section briefing — then you chat with it, grounded entirely in what it
            found. A research pipeline, not a form.
          </CardDesc>

          <div
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 12,
              color: 'var(--accent)',
              background: 'var(--accent-dim)',
              border: '1px solid rgba(123,97,255,0.25)',
              padding: '10px 12px',
              marginBottom: 20,
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            research(company, website, objective) → briefing + chat
          </div>

          <div
            className="dossi-split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}
          >
            <DossiGraph />
            <DossiChat />
          </div>

          <div style={{ display: 'flex', gap: 24, margin: '24px 0 14px' }}>
            <Metric val="9" label="Briefing sections" />
            <Metric val="5-node" label="LangGraph" />
            <Metric val="×2" label="Auto-retry" />
          </div>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.7 }}>
            Hardened — SSRF guards · input sanitisation · DOMPurify · JWT re-checked in every handler
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {['FastAPI', 'LangGraph', 'Tavily', 'Postgres', 'React', 'SSE'].map((t) => (
              <StackTag key={t}>{t}</StackTag>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <CardButton href="https://dossi-frontend.onrender.com/" variant="live">Live →</CardButton>
          </div>
        </motion.div>

        {/* SwigZy */}
        <motion.div variants={card} className="project-card" style={cardStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
          <CardNumber n="04" />
          <CardTag>LLM · MCP · Telegram</CardTag>
          <CardTitle>SwigZy — AI Food Ordering Bot</CardTitle>
          <CardDesc>
            Order food by typing &quot;I want something under 300 calories.&quot; Claude understands
            intent, chains 4 MCP tools (search → menu → cart → order), and completes end-to-end in ~2s.
          </CardDesc>
          <TerminalWindow title="swigzy — live demo" lines={swigzyLines} minHeight={150} fontSize={11} padding={14} restartDelay={3000} />
          <div style={{ display: 'flex', gap: 24, margin: '20px 0' }}>
            <Metric val="<2s" label="Response time" />
            <Metric val="4" label="Tool stages" />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {['Node.js', 'Claude API', 'MCP', 'Telegram Bot API'].map((t) => (
              <StackTag key={t}>{t}</StackTag>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <CardButton href="https://github.com/darcy2002/swigzy" variant="github">GitHub ↗</CardButton>
          </div>
        </motion.div>

        {/* Student Platform */}
        <motion.div variants={card} className="project-card" style={cardStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
          <CardNumber n="05" />
          <CardTag>24 MFEs · RBAC · Production</CardTag>
          <CardTitle>Unified Student Management Platform</CardTitle>
          <CardDesc>
            A unified student and admin portal on 24 Micro Frontends under a single shell, powered by
            a centralised RBAC permission manager — granular module- and action-level access granted
            per user via a checkbox-driven roles UI.
          </CardDesc>
          <MfeDiagram />
          <div style={{ display: 'flex', gap: 24, margin: '20px 0' }}>
            <Metric val="24" label="Micro frontends" />
            <Metric val="38%" label="Fewer false positives" />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {['React', 'Webpack MF', 'Node.js', 'PostgreSQL'].map((t) => (
              <StackTag key={t}>{t}</StackTag>
            ))}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 9,
              color: 'var(--green)',
              border: '1px solid var(--green)',
              padding: '3px 10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              opacity: 0.75,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'var(--green)',
                animation: 'dot-blink 1.5s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            Production · EXC Managed Services
          </span>
        </motion.div>

        {/* Devanshi's Agent — featured full width */}
        <motion.div
          variants={card}
          className="project-card featured-card"
          style={{ ...cardStyle, gridColumn: 'span 2' }}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
        >
          <CardNumber n="06" />
          <CardTag>Voice AI · ElevenLabs</CardTag>
          <CardTitle>{"Devanshi's Agent"}</CardTitle>
          <CardDesc>
            A voice AI that attends calls in my voice when I&apos;m unavailable. Transcribes live and
            delivers summaries in 30 seconds.
          </CardDesc>
          <Waveform />
          <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
            <Metric val="<800ms" label="Voice latency" />
            <Metric val="30s" label="Summary delivery" />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {['ElevenLabs', 'React', 'Node.js', 'SSE'].map((t) => (
              <StackTag key={t}>{t}</StackTag>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <CardButton href="https://github.com/darcy2002/devanshi-support-agent" variant="github">GitHub ↗</CardButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
