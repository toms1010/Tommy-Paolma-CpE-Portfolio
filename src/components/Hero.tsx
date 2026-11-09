import { ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS, TYPING_ROLES } from '../data/portfolio';
import { asset } from '../lib/asset';
import { useTyping } from '../hooks/useTyping';
import { CircuitBackdrop } from './CircuitBackdrop';
import { CpuVisual } from './CpuVisual';
import { Reveal } from './Reveal';
import { SocialGlyph } from './icons';

const TECH_BADGES = [
  'C',
  'C++',
  'C#',
  'Java',
  'Python',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'React',
];

export function Hero(): React.JSX.Element {
  const typed = useTyping(TYPING_ROLES);
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[85vh] items-center overflow-clip py-12"
    >
      <CircuitBackdrop />
      <Reveal className="grid w-full items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          {/* Availability indicator */}
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            <span
              aria-hidden="true"
              className="relative flex h-2 w-2 rounded-full"
            >
              <span
                className="absolute inset-0 rounded-full bg-current animate-ping opacity-75"
              />
              <span className="relative block rounded-full bg-current w-full h-full" />
            </span>
            Open to OJT opportunities and collaborations
          </p>
          <h1
            id="hero-heading"
            className="gradient-text text-5xl font-extrabold tracking-tight sm:text-6xl"
          >
            Tommy Paolma
          </h1>
          <p className="mt-3 text-sm font-semibold tracking-wider text-muted uppercase tech-label">
            Computer Engineering Student · Software Engineer · Technical Writer
          </p>
          <p className="mt-6 max-w-xl text-lg text-muted">
            {typed}
            {typed && !prefersReducedMotion && (
              <span aria-hidden="true" className="typing-caret" />
            )}
          </p>
          <p className="mt-5 max-w-xl text-lg text-muted">
            I build practical software solutions across web, desktop, mobile, and embedded systems —
            turning engineering ideas into working products through programming, system design, and
            hardware-software integration.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              Explore My Projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={asset('Tommy-Paolma-CV.pdf')} download className="btn-outline">
              Download CV
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <a
              href="https://github.com/toms1010"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tommy Paolma on GitHub (opens in a new tab)"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-2 text-sm font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
            >
              <SocialGlyph icon="github" className="h-5 w-5" />
              <span className="text-sm font-semibold">github.com/toms1010</span>
            </a>
            <a
              href={SOCIAL_LINKS.find((s) => s.icon === 'linkedin')?.href ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tommy Paolma on LinkedIn (opens in a new tab)"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-2 text-sm font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
            >
              <SocialGlyph icon="linkedin" className="h-5 w-5" />
              <span className="text-sm font-semibold">LinkedIn</span>
            </a>
          </div>
          <ul
            aria-label="Technologies I work with"
            className="mt-10 flex flex-wrap gap-2"
          >
            {TECH_BADGES.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold text-ink uppercase tech-label"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <CpuVisual />
      </Reveal>
    </section>
  );
}
