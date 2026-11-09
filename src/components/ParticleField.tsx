import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/** Lightweight canvas particle field (no external library). Disabled under reduced motion. */
export function ParticleField(): React.JSX.Element | null {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion immediately and listen for changes.
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COUNT = 70;

    // Read theme colors from CSS custom properties so the field matches light/dark.
    const getStyles = (): { particle: string; line: string } => {
      const c = getComputedStyle(document.documentElement);
      const page = c.getPropertyValue('--color-page').trim() || '#f4f6f9';
      const isDark = page === '#0b0f14';
      return {
        particle: isDark ? 'rgba(56, 189, 248, 0.55)' : 'rgba(19, 173, 199, 0.45)',
        line: isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(19, 173, 199, 0.10)',
      };
    };

    const seed = (): void => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
      }));
    };

    const resize = (): void => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${String(width)}px`;
      canvas.style.height = `${String(height)}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let styles = getStyles();

    const frame = (): void => {
      ctx.clearRect(0, 0, width, height);
      styles = getStyles();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      ctx.strokeStyle = styles.line;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < 150 * 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = styles.particle;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = window.requestAnimationFrame(frame);
    };

    let visible = true;

    const onVisibilityChange = (): void => {
      if (document.hidden) {
        visible = false;
        window.cancelAnimationFrame(raf);
      } else if (!visible) {
        visible = true;
        raf = window.requestAnimationFrame(frame);
      }
    };

    resize();
    raf = window.requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    window.addEventListener('visibilitychange', onVisibilityChange);
    media.addEventListener('change', () => {
      if (media.matches) {
        window.cancelAnimationFrame(raf);
      } else if (!visible) {
        visible = true;
        raf = window.requestAnimationFrame(frame);
      }
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('visibilitychange', onVisibilityChange);
      media.removeEventListener('change', () => {});
    };
  }, []);

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
    />
  );
}
