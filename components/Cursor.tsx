'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const animate = () => {
      const { x: mx, y: my } = mouse.current;
      const nx = ring.current.x + (mx - ring.current.x) * 0.1;
      const ny = ring.current.y + (my - ring.current.y) * 0.1;
      ring.current = { x: nx, y: ny };
      if (ringRef.current) {
        ringRef.current.style.left = nx + 'px';
        ringRef.current.style.top = ny + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, .project-card')) {
        dotRef.current?.classList.add('cursor-hover');
        ringRef.current?.classList.add('cursor-ring-hover');
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, .project-card')) {
        dotRef.current?.classList.remove('cursor-hover');
        ringRef.current?.classList.remove('cursor-ring-hover');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
