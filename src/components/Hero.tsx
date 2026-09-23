import { TYPING_ROLES } from '../data/portfolio';
import { useTyping } from '../hooks/useTyping';
import { CircuitBackdrop } from './CircuitBackdrop';
import { CpuVisual } from './CpuVisual';
import { Reveal } from './Reveal';
import { UiIcon } from './icons';

const TECH_BADGES = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'C',
  'C++',
  'C#',
  'Java',
  'SQL',
  'Arduino',
  'Git & GitHub',
];

export function Hero(): React.JSX.Element {
  const typed = useTyping(TYPING_ROLES);
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[85vh] items-center overflow-clip py-12"
    >
      <CircuitBackdrop />
      <Reveal className="grid w-full items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-6 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Software Engineer · Computer Engineering Student
          </p>
          <h1
            id="hero-heading"
            className="gradient-text text-5xl font-extrabold tracking-tight sm:text-6xl"
          >
            Tommy Paolma
          </h1>
          <p className="mt-4 text-xl font-medium sm:text-2xl" aria-live="off">
            <span className="text-muted">I am a&nbsp;</span>
            <span className="font-semibold text-accent relative">
              {typed}
              {typed && !prefersReducedMotion && (
                <span aria-hidden="true" className="typing-caret" />
              )}
            </span>
          </p>
          <p className="mt-5 max-w-xl text-lg text-muted">
            I build software, applications, and computer-based systems —
            spanning web, mobile, desktop, and embedded domains.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View Projects <UiIcon name="arrowRight" className="h-4 w-4" />
            </a>
            <a href="#resume" className="btn-outline">
              Resume
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
            <a
              href="https://github.com/toms1010"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              GitHub
            </a>
          </div>
          <ul aria-label="Technologies I work with" className="mt-8 flex flex-wrap gap-2">
            {TECH_BADGES.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-card px-4 py-1.5 text-sm text-ink"
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
