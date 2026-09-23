import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Download,
  Sun,
  Moon,
  X,
  House,
  User,
  Cpu,
  FolderKanban,
  Code2,
  FileText,
  Mail,
} from 'lucide-react';
import { SOCIAL_LINKS } from '../data/portfolio';
import { asset } from '../lib/asset';
import { useTheme } from '../theme/useTheme';

interface DropdownItem {
  label: string;
  href: string;
  isDownload?: boolean;
}

interface NavSection {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  icon?: React.ReactNode;
}

const CV_PDF = 'Tommy-Paolma-CV.pdf';

const NAV_SECTIONS: NavSection[] = [
  { label: 'Home', href: '#home', icon: <House className="h-4 w-4" /> },
  {
    label: 'About',
    href: '#about',
    icon: <User className="h-4 w-4" />,
    dropdown: [
      { label: 'Overview', href: '#about' },
      { label: 'Leadership & Activities', href: '#experience' },
      { label: 'Education', href: '#education' },
    ],
  },
  { label: 'CpE', href: '#computer-engineering', icon: <Cpu className="h-4 w-4" /> },
  { label: 'Projects', href: '#projects', icon: <FolderKanban className="h-4 w-4" /> },
  { label: 'Skills', href: '#skills', icon: <Code2 className="h-4 w-4" /> },
  {
    label: 'Resume',
    href: '#resume',
    icon: <FileText className="h-4 w-4" />,
    dropdown: [
      { label: 'View Resume', href: '#resume' },
      { label: 'Download CV', href: '#resume', isDownload: true },
      { label: 'Certifications', href: '#certifications' },
    ],
  },
  { label: 'Contact', href: '#contact', icon: <Mail className="h-4 w-4" /> },
];

function ThemeToggle(): React.JSX.Element {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={theme === 'light'}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-card text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

function DownloadCVButton(): React.JSX.Element {
  return (
    <a
      href={asset(CV_PDF)}
      download={CV_PDF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download CV (PDF, opens in a new tab)"
      className="hidden min-h-11 items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-5 font-semibold text-white transition-colors hover:bg-highlight xl:inline-flex"
    >
      <Download className="h-4 w-4" />
      Download CV
    </a>
  );
}

function NavEntry({
  section,
  isActive,
}: {
  section: NavSection;
  isActive: boolean;
}): React.JSX.Element {
  const { label, href, icon, dropdown } = section;
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const linkClass = `inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-accent/10 text-accent' : 'text-ink hover:bg-accent/5 hover:text-accent'
  }`;

  const handleDownload = (): void => {
    setIsOpen(false);
    const link = document.createElement('a');
    link.href = asset(CV_PDF);
    link.download = CV_PDF;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!dropdown) {
    return (
      <a href={href} className={`nav-link ${linkClass}`}>
        {icon}
        {label}
      </a>
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <span className="inline-flex items-center">
        <a href={href} className={`nav-link ${linkClass} rounded-r-none pr-1.5`}>
          {icon}
          {label}
        </a>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setIsOpen((v) => !v);
          }}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={`${label} submenu`}
          className={`${linkClass} rounded-l-none pl-1.5`}
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </span>

      {isOpen && (
        <div
          role="menu"
          className="absolute top-full left-1/2 z-50 mt-2 min-w-[180px] -translate-x-1/2 rounded-xl border border-line bg-card p-2 shadow-xl"
        >
          {dropdown.map((item) =>
            item.isDownload ? (
              <button
                key={item.label}
                role="menuitem"
                type="button"
                onClick={handleDownload}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink transition-colors hover:bg-accent/10 hover:text-accent"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.label}
                role="menuitem"
                href={item.href}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent/10 hover:text-accent"
              >
                {item.label}
              </a>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): React.JSX.Element | null {
  if (!open) return null;

  const handleDownload = (): void => {
    onClose();
    const link = document.createElement('a');
    link.href = asset(CV_PDF);
    link.download = CV_PDF;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-page/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="flex items-center justify-between border-b border-line p-4">
        <a
          href="#home"
          onClick={onClose}
          aria-label="Tommy Paolma — home"
          className="gradient-text text-2xl font-extrabold"
        >
          TP
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-card text-ink"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto p-6" aria-label="Mobile navigation">
        <ul className="flex flex-col gap-1">
          {NAV_SECTIONS.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium text-ink transition-colors hover:bg-accent/10 hover:text-accent"
              >
                {section.icon}
                {section.label}
              </a>
              {section.dropdown && (
                <ul className="ml-11 flex flex-col gap-1 border-l border-line pl-3">
                  {section.dropdown
                    .filter((item) => item.href !== section.href || item.isDownload)
                    .map((item) =>
                    item.isDownload ? (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={handleDownload}
                          className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-muted transition-colors hover:text-accent"
                        >
                          {item.label}
                        </button>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-accent"
                        >
                          {item.label}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-line pt-6">
          <p className="mb-4 text-sm font-semibold tracking-wider text-muted uppercase">
            Quick Actions
          </p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-5 font-semibold text-white"
            >
              <Download className="h-5 w-5" />
              Download CV
            </button>
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <p className="mb-3 text-sm font-semibold tracking-wider text-muted uppercase">Connect</p>
          <div className="flex gap-4">
            {SOCIAL_LINKS.slice(0, 3).map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-card text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {social.icon === 'x' && <span className="text-xl font-bold">X</span>}
                {social.icon === 'github' && (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                )}
                {social.icon === 'linkedin' && (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open ]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/80 backdrop-blur-md print:hidden">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <div className="flex items-center gap-8">
          <a
            href="#home"
            aria-label="Tommy Paolma — home"
            className="flex items-baseline gap-2"
          >
            <span className="gradient-text text-2xl font-extrabold">TP</span>
            <span className="hidden text-sm font-semibold text-muted min-[400px]:inline lg:hidden xl:inline">
              Tommy Paolma
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_SECTIONS.map((section) => (
              <li key={section.href}>
                <NavEntry section={section} isActive={false} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <DownloadCVButton />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
            }}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            className="inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-line px-2.5 text-ink lg:hidden"
          >
            <span
              aria-hidden="true"
              className={`h-0.5 w-6 bg-current transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              aria-hidden="true"
              className={`h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`}
            />
            <span
              aria-hidden="true"
              className={`h-0.5 w-6 bg-current transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      <MobileNav
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </header>
  );
}
