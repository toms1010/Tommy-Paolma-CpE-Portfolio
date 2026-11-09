import { SOCIAL_LINKS } from '../data/portfolio';
import { SocialGlyph, UiIcon } from './icons';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Computer Engineering', href: '#computer-engineering' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-line py-8 text-center print:hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Availability message */}
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent mx-auto">
          Open to OJT opportunities, internships, and technical collaborations
        </p>

        {/* Quick navigation */}
        <nav aria-label="Footer navigation" className="mb-6">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={`Go to ${link.label} section`}
                  className="text-muted hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links */}
        <div className="mb-6 flex justify-center gap-3">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-xl text-ink transition-all hover:-translate-y-0.5 hover:text-accent"
            >
              <SocialGlyph icon={s.icon} className="h-6 w-6" />
            </a>
          ))}
        </div>

        <div className="border-t border-line pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-muted">
            © {year} Tommy Paolma · Computer Engineering Student
          </p>
          <p className="text-sm text-muted">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>

        {/* Back to top */}
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-8 inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <UiIcon name="arrowUp" className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
}
