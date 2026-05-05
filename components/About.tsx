const stats = [
  { val: '2+', label: 'Years in production systems' },
  { val: '200+', label: 'P1/P2 incidents resolved' },
  { val: '20hr', label: 'Engineer-hours saved weekly' },
  { val: '10K+', label: 'Monthly appointments served' },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '80px 48px',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
      >
        {/* Left — statement */}
        <p
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 36px)',
            letterSpacing: '-1.5px',
            lineHeight: 1.2,
            color: 'var(--text)',
          }}
        >
          I build at the intersection of{' '}
          <span style={{ color: 'var(--accent)' }}>AI</span> and{' '}
          <span style={{ color: 'var(--accent)' }}>product</span> —{' '}
          shipping fast without cutting corners on architecture.
        </p>

        {/* Right — stats 2×2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 28,
          }}
        >
          {stats.map(({ val, label }) => (
            <div
              key={val}
              style={{
                borderLeft: '2px solid rgba(123,97,255,0.25)',
                paddingLeft: 16,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: 36,
                  color: 'var(--accent)',
                  letterSpacing: '-2px',
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: 9,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
