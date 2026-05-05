const items = [
  'React.js',
  'Node.js',
  'TypeScript',
  'PostgreSQL',
  'Claude API',
  'Micro Frontends',
  'ElevenLabs',
  'Webpack MF',
  'Docker',
  'Redis',
  'Next.js',
  'JWT Auth',
  'Express.js',
  'Socket.io',
  'Tailwind CSS',
];

const Sep = () => (
  <span
    style={{
      color: 'var(--accent)',
      opacity: 0.3,
      margin: '0 20px',
      fontFamily: 'var(--font-dm-mono)',
      fontSize: 11,
    }}
  >
    /
  </span>
);

function Strip() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 11,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
          <Sep />
        </span>
      ))}
    </>
  );
}

export default function StackStrip() {
  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '18px 0',
        background: 'rgba(123,97,255,0.02)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          animation: 'marquee-scroll 28s linear infinite',
          whiteSpace: 'nowrap',
        }}
      >
        <Strip />
        <Strip />
      </div>
    </div>
  );
}
