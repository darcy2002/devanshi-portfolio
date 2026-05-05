export default function Background() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          width: 600,
          height: 600,
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          borderRadius: '50%',
          opacity: 0.4,
          zIndex: 0,
          pointerEvents: 'none',
          animation: 'pulse-glow 4s ease-in-out infinite',
        }}
      />
    </>
  );
}
