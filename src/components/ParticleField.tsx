import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

interface Node {
  x: number;
  y: number;
  pulse: number;
  pulseDir: number;
}

interface Trace {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  pulse: number;
  pulseDir: number;
}

interface Glyph {
  x: number;
  y: number;
  char: string;
  fontSize: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Gradient {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
}

/**
 * EngineeringBackground
 *
 * Subtle, canvas-animated background inspired by computer engineering and
 * software development. Draws slowly moving circuit traces, glowing connection
 * nodes, drifting particles, floating binary digits and code symbols, plus a
 * soft animated gradient glow.
 *
 * - GPU-friendly: transform/opacity-only painting on a single canvas layer
 * - Reduced motion: returns null (static CSS grid handles the fallback)
 * - Tab visibility: pauses animation when hidden, resumes on return
 * - Responsive: resizes with the window, capped device pixel ratio
 * - No external dependencies
 */
export function ParticleField(): React.JSX.Element | null {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion immediately and listen for changes.
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles: Particle[] = [];
    let nodes: Node[] = [];
    let traces: Trace[] = [];
    const glyphs: Glyph[] = [];
    let gradients: Gradient[] = [];
    let visibilityPaused = false;
    let frameCount = 0;

    const NODE_COUNT = 12;
    const TRACE_COUNT = 8;
    const PARTICLE_COUNT = 40;
    const GLYPH_COUNT = 6;
    const GRADIENT_COUNT = 3;

    const BINARY_CHARS = ['0', '1'];
    const CODE_CHARS = ['{', '}', '(', ')', ';', '<', '>', '=', '+', '-', '*', '/'];

    const resize = (): void => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${String(width)}px`;
      canvas.style.height = `${String(height)}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const init = (): void => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        pulse: Math.random(),
        pulseDir: Math.random() > 0.5 ? 1 : -1,
      }));

      traces = Array.from({ length: TRACE_COUNT }, () => {
        const from = nodes[Math.floor(Math.random() * nodes.length)];
        const to = nodes[Math.floor(Math.random() * nodes.length)];
        return {
          fromX: from.x,
          fromY: from.y,
          toX: to.x,
          toY: to.y,
          pulse: Math.random(),
          pulseDir: Math.random() > 0.5 ? 1 : -1,
        };
      });

      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }));

      gradients = Array.from({ length: GRADIENT_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 300 + Math.random() * 400,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.5 ? '56, 189, 248' : '99, 102, 241',
      }));
    };

    const frame = (): void => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      const c = getComputedStyle(document.documentElement);
      const isDark = c.getPropertyValue('--color-page').trim() === '#0b0f14';
      const accentR = isDark ? '56' : '19';
      const accentG = isDark ? '189' : '173';
      const accentB = isDark ? '248' : '199';

      // 1. Animated gradient lighting (soft, drifting glows)
      gradients.forEach((g) => {
        g.x += g.vx;
        g.y += g.vy;
        if (g.x < -g.r) g.x = width + g.r;
        if (g.x > width + g.r) g.x = -g.r;
        if (g.y < -g.r) g.y = height + g.r;
        if (g.y > height + g.r) g.y = -g.r;

        const gradient = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        gradient.addColorStop(0, `rgba(${g.color}, 0.04)`);
        gradient.addColorStop(0.45, `rgba(${g.color}, 0.01)`);
        gradient.addColorStop(1, `rgba(${g.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // 2. Subtle digital grid overlay
      ctx.strokeStyle = isDark
        ? 'rgba(56, 189, 248, 0.03)'
        : 'rgba(19, 173, 199, 0.02)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      const gridSize = 64;
      const offset = (frameCount * 0.15) % gridSize;
      for (let i = -gridSize; i < width + gridSize; i += gridSize) {
        ctx.moveTo(i - offset, 0);
        ctx.lineTo(i - offset, height);
      }
      for (let i = -gridSize; i < height + gridSize; i += gridSize) {
        ctx.moveTo(0, i - offset);
        ctx.lineTo(width, i - offset);
      }
      ctx.stroke();

      // 3. Circuit traces with pulsing connection dots
      traces.forEach((trace) => {
        trace.pulse += trace.pulseDir * 0.02;
        if (trace.pulse > 1 || trace.pulse < 0) trace.pulseDir *= -1;

        const t = trace.pulse;
        const pulseX = trace.fromX + (trace.toX - trace.fromX) * t;
        const pulseY = trace.fromY + (trace.toY - trace.fromY) * t;

        ctx.beginPath();
        ctx.moveTo(trace.fromX, trace.fromY);
        ctx.lineTo(trace.toX, trace.toY);
        ctx.strokeStyle = `rgba(${accentR}, ${accentG}, ${accentB}, 0.05)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, 0.8)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, 0.12)`;
        ctx.fill();
      });

      // 4. Glowing connection nodes
      nodes.forEach((node) => {
        node.pulse += node.pulseDir * 0.015;
        if (node.pulse > 1 || node.pulse < 0) node.pulseDir *= -1;

        const glow = 4 + Math.sin(node.pulse * Math.PI) * 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, 0.06)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, 0.9)`;
        ctx.fill();
      });

      // 5. Drifting particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, ${String(p.opacity)})`;
        ctx.fill();
      });

      // 6. Floating binary digits and code symbols
      if (frameCount % 55 === 0 && glyphs.length < GLYPH_COUNT) {
        const isBinary = Math.random() > 0.5;
        const char = isBinary
          ? BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)]
          : CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        glyphs.push({
          x: Math.random() * width,
          y: height + 25,
          char,
          fontSize: Math.random() * 14 + 10,
          opacity: 0,
          life: 0,
          maxLife: Math.random() * 90 + 90,
        });
      }

      glyphs.forEach((g, i) => {
        g.y -= 0.35;
        g.life++;
        g.opacity =
          Math.min(g.life / 25, 1) * Math.max(0, 1 - g.life / g.maxLife);

        ctx.save();
        ctx.globalAlpha = g.opacity;
        ctx.font = `${String(g.fontSize)}px 'Space Grotesk', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, 0.55)`;
        ctx.fillText(g.char, g.x, g.y);
        ctx.restore();

        if (g.life > g.maxLife) {
          glyphs.splice(i, 1);
        }
      });

      rafRef.current = window.requestAnimationFrame(frame);
    };

    const onVisibilityChange = (): void => {
      if (document.hidden) {
        visibilityPaused = true;
        window.cancelAnimationFrame(rafRef.current);
      } else if (visibilityPaused) {
        visibilityPaused = false;
        rafRef.current = window.requestAnimationFrame(frame);
      }
    };

    resize();
    rafRef.current = window.requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    window.addEventListener('visibilitychange', onVisibilityChange);
    media.addEventListener('change', () => {
      if (media.matches) {
        window.cancelAnimationFrame(rafRef.current);
      } else if (!visibilityPaused) {
        rafRef.current = window.requestAnimationFrame(frame);
      }
    });

    return () => {
      window.cancelAnimationFrame(rafRef.current);
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
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
