'use client';
import { useEffect, useState } from 'react';

const links = ['Work', 'About', 'Now', 'Contact'];

export default function Nav() {
  const [time, setTime] = useState('00:00:00');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <nav
        className="nav-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 48px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(8,8,16,0.5)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 18,
            textDecoration: 'none',
            color: 'var(--text)',
            letterSpacing: '-0.5px',
          }}
        >
          DG<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div
            className="nav-links"
            style={{ display: 'flex', gap: 28, alignItems: 'center' }}
          >
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--accent)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--muted)')
                }
              >
                {l}
              </a>
            ))}
          </div>

          <div
            style={{
              paddingLeft: 24,
              borderLeft: '1px solid var(--border)',
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 11,
              display: 'flex',
              gap: 6,
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'var(--muted)' }}>IST</span>
            <span style={{ color: 'var(--accent)' }}>{time}</span>
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              padding: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 22,
                  height: 1.5,
                  background: 'var(--accent)',
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(8,8,16,0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              fontSize: 24,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: 32,
                color: 'var(--text)',
                textDecoration: 'none',
                letterSpacing: '-1px',
              }}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
