import { SOCIAL_LINKS } from '../data/portfolio';
import { SocialGlyph } from './icons';

export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-line py-8 text-center text-muted print:hidden">
      <div className="mb-4 flex justify-center gap-1">
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-xl transition-all hover:-translate-y-0.5 hover:text-accent"
          >
            <SocialGlyph icon={s.icon} className="h-6 w-6" />
          </a>
        ))}
      </div>
      <p>© {year} Tommy Paolma · Computer Engineering Student</p>
    </footer>
  );
}
