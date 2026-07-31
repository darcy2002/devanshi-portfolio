'use client';

const links = [
  { label: 'GitHub', href: 'https://github.com/darcy2002' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/devanshi-garg-881000203/' },
  { label: 'Email', href: 'mailto:devanshigarg2002@gmail.com' },
];

export default function Footer() {
  return (
    <section
      id="contact"
      className="footer-section"
      style={{
        padding: '100px 48px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Giant text */}
      <div
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(44px, 7vw, 88px)',
          letterSpacing: '-3px',
          lineHeight: 0.95,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            WebkitTextStroke: '1.5px var(--muted)',
            color: 'transparent',
          }}
        >
          Let&apos;s build
        </div>
        <div style={{ color: 'var(--text)' }}>something</div>
        <div style={{ color: 'var(--accent)' }}>real.</div>
      </div>

      {/* CTA button */}
      <a
        href="mailto:devanshigarg2002@gmail.com"
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          fontSize: 15,
          padding: '16px 36px',
          background: 'var(--accent)',
          color: '#fff',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(-2px,-2px)';
          e.currentTarget.style.boxShadow = '4px 4px 0 var(--accent-dim)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0,0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        devanshigarg2002@gmail.com →
      </a>

      {/* Links row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 28,
          marginTop: 40,
          flexWrap: 'wrap',
        }}
      >
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 11,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              paddingBottom: 2,
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Bottom note */}
      <p
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 10,
          color: 'var(--muted)',
          marginTop: 48,
          opacity: 0.5,
        }}
      >
        © 2026 Devanshi Garg. Built with Next.js + Tailwind + Framer Motion.
      </p>
    </section>
  );
}
