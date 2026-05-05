'use client';
import { motion, type Variants } from 'framer-motion';
import TerminalWindow from './TerminalWindow';
import type { TermLine } from './TerminalWindow';

/* ── Swigzy terminal lines ── */
const swigzyLines: TermLine[] = [
  {
    delay: 400,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>user  → </span>
        <span style={{ color: 'var(--accent)' }}>
          I want a salad under 300 cal
        </span>
      </span>
    ),
  },
  {
    delay: 600,
    content: (
      <span style={{ color: 'var(--muted)' }}>
        claude → Understood. Searching...
      </span>
    ),
  },
  {
    delay: 500,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>tool  → </span>
        <span style={{ color: '#ff9f43' }}>
          {'search_restaurants("salad")'}
        </span>
      </span>
    ),
  },
  {
    delay: 400,
    content: (
      <span style={{ color: 'var(--muted)' }}>
        res   → Found 3 options nearby
      </span>
    ),
  },
  {
    delay: 500,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>tool  → </span>
        <span style={{ color: '#ff9f43' }}>{'get_menu(id: "r_281")'}</span>
      </span>
    ),
  },
  {
    delay: 400,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>tool  → </span>
        <span style={{ color: '#ff9f43' }}>{'add_to_cart("Garden Salad")'}</span>
      </span>
    ),
  },
  {
    delay: 500,
    content: (
      <span>
        <span style={{ color: 'var(--muted)' }}>tool  → </span>
        <span style={{ color: '#ff9f43' }}>
          {'place_order(cart: "c_9f2a")'}
        </span>
      </span>
    ),
  },
  {
    delay: 300,
    content: (
      <span style={{ color: 'var(--green)' }}>
        done  → ✓ Order placed in 1.8s · 280 cal
      </span>
    ),
  },
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

function CardTitle({ children }: { children: string }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 700,
        fontSize: 24,
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

/* ── Waveform bars ── */
const waveHeights = [8, 14, 24, 36, 48, 56, 48, 40, 52, 44, 32, 24, 36, 48, 40, 28, 20, 32, 44, 36, 24, 16, 28, 40, 32];

function Waveform() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 60,
        gap: 3,
        margin: '20px 0',
      }}
    >
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        margin: '16px 0',
      }}
    >
      <MfeBox span2>Shell App (React)</MfeBox>
      <MfeBox>Student Dashboard</MfeBox>
      <MfeBox>Admin Panel</MfeBox>
      <MfeBox>Course Tracker</MfeBox>
      <MfeBox>AI Alerts</MfeBox>
    </div>
  );
}

/* ── Animation variants ── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ── Card base style ── */
const cardStyle: React.CSSProperties = {
  background: 'var(--bg)',
  padding: 40,
  overflow: 'hidden',
  transition: 'background 0.3s ease',
};

/* ── Projects ── */
export default function Projects() {
  return (
    <section
      id="work"
      style={{
        padding: '100px 48px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 56,
        }}
      >
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
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 11,
            color: 'var(--muted)',
          }}
        >
          03 projects
        </span>
      </div>

      {/* Grid */}
      <motion.div
        className="projects-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 1,
          background: 'var(--border)',
        }}
      >
        {/* ── CARD 1: SwigZy ── */}
        <motion.div
          variants={card}
          className="project-card featured-card"
          style={{
            ...cardStyle,
            gridColumn: 'span 2',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = 'var(--surface)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)';
          }}
        >
          <div>
            <CardNumber n="01" />
            <CardTag>LLM · MCP · Telegram</CardTag>
            <CardTitle>SwigZy — AI Food Ordering Bot</CardTitle>
            <CardDesc>
              Order food by typing &quot;I want something under 300 calories.&quot; Claude
              understands intent, chains 4 MCP tools (search → menu → cart → order),
              and completes end-to-end in 2s.
            </CardDesc>
            <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
              <Metric val="60%" label="Faster ordering" />
              <Metric val="<2s" label="Response time" />
              <Metric val="4" label="Tool stages" />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Node.js', 'Claude API', 'MCP', 'Telegram Bot API'].map((t) => (
                <StackTag key={t}>{t}</StackTag>
              ))}
            </div>
          </div>
          <div>
            <TerminalWindow
              title="swigzy — live demo"
              lines={swigzyLines}
              minHeight={220}
              fontSize={11}
              padding={16}
              restartDelay={3000}
            />
          </div>
        </motion.div>

        {/* ── CARD 2: Devanshi's Agent ── */}
        <motion.div
          variants={card}
          className="project-card"
          style={cardStyle}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = 'var(--surface)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)';
          }}
        >
          <CardNumber n="02" />
          <CardTag>Voice AI · ElevenLabs</CardTag>
          <CardTitle>{"Devanshi's Agent"}</CardTitle>
          <CardDesc>
            A voice AI that attends calls in my voice when unavailable. Transcribes
            live, delivers summaries in 30 seconds.
          </CardDesc>
          <Waveform />
          <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
            <Metric val="<800ms" label="Voice latency" />
            <Metric val="30s" label="Summary delivery" />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['ElevenLabs', 'React', 'Node.js', 'SSE'].map((t) => (
              <StackTag key={t}>{t}</StackTag>
            ))}
          </div>
        </motion.div>

        {/* ── CARD 3: Student Retention Platform ── */}
        <motion.div
          variants={card}
          className="project-card"
          style={cardStyle}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = 'var(--surface)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)';
          }}
        >
          <CardNumber n="03" />
          <CardTag>MFE · AI · Production</CardTag>
          <CardTitle>Student Retention Platform</CardTitle>
          <CardDesc>
            Micro Frontend architecture with AI dropout prediction — flags at-risk
            students 4–6 weeks before dropout.
          </CardDesc>
          <MfeDiagram />
          <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
            <Metric val="38%" label="Fewer false positives" />
            <Metric val="4–6wk" label="Early warning" />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['React', 'Webpack MF', 'Node.js', 'PostgreSQL'].map((t) => (
              <StackTag key={t}>{t}</StackTag>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
