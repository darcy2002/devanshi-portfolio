'use client';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export interface TermLine {
  delay: number;
  content: ReactNode;
}

interface Props {
  title: string;
  lines: TermLine[];
  minHeight?: number;
  fontSize?: number;
  padding?: number | string;
  restartDelay?: number;
}

export default function TerminalWindow({
  title,
  lines,
  minHeight = 340,
  fontSize = 12,
  padding = 24,
  restartDelay = 3000,
}: Props) {
  const [visible, setVisible] = useState<number[]>([]);
  const [cycle, setCycle] = useState(0);
  const linesRef = useRef(lines);
  const restartRef = useRef(restartDelay);

  useEffect(() => {
    let cancelled = false;
    setVisible([]);

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cum = 0;

    linesRef.current.forEach((line, i) => {
      cum += line.delay;
      const t = setTimeout(() => {
        if (!cancelled) setVisible((p) => [...p, i]);
      }, cum);
      timeouts.push(t);
    });

    const restart = setTimeout(() => {
      if (!cancelled) setCycle((c) => c + 1);
    }, cum + restartRef.current);
    timeouts.push(restart);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [cycle]);

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow:
          '0 40px 80px rgba(0,0,0,0.5), 0 0 60px var(--accent-dim)',
      }}
    >
      {/* Traffic lights bar */}
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
          <div
            key={c}
            style={{ width: 10, height: 10, borderRadius: '50%', background: c }}
          />
        ))}
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 11,
            color: 'var(--muted)',
            marginLeft: 8,
          }}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          padding,
          minHeight,
          fontFamily: 'var(--font-dm-mono)',
          fontSize,
          lineHeight: 1.8,
          overflow: 'hidden',
        }}
      >
        {lines.map((line, i) => (
          <div
            key={`${cycle}-${i}`}
            style={{
              opacity: visible.includes(i) ? 1 : 0,
              transition: 'opacity 0.15s ease',
              whiteSpace: 'pre',
            }}
          >
            {line.content}
          </div>
        ))}
      </div>
    </div>
  );
}
