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
import { EMAIL, SOCIAL_LINKS } from '../data/portfolio';
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

/** Section ids in document order (matches App.tsx). */
const OBSERVED_IDS = [
  'home',
  'about',
  'computer-engineering',
  'projects',
  'skills',
  'education',
  'experience',
  'certifications',
  'resume',
  'contact',
];

function useActiveHref(): string {
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const elements = OBSERVED_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return active;
}

function isSectionActive(section: NavSection, activeHref: string): boolean {
  if (section.href === activeHref) return true;
  return section.dropdown?.some((item) => !item.isDownload && item.href === activeHref) ?? false;
}

/** Sub-items shown in the mobile accordion (hide the redundant "Overview"/"View Resume" row). */
function mobileSubItems(section: NavSection): DropdownItem[] {
  return (section.dropdown ?? []).filter((item) => item.href !== section.href || item.isDownload);
}

function triggerDownload(onDone?: () => void): void {
  onDone?.();
  const link = document.createElement('a');
  link.href = asset(CV_PDF);
  link.download = CV_PDF;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

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
    triggerDownload();
  };

  if (!dropdown) {
    return (
      <a href={href} aria-current={isActive ? 'page' : undefined} className={`nav-link ${linkClass}`}>
        {icon}
        {label}
      </a>
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <span className="inline-flex items-center">
        <a
          href={href}
          aria-current={isActive ? 'page' : undefined}
          className={`nav-link ${linkClass} rounded-r-none pr-1.5`}
        >
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
  activeHref,
}: {
  open: boolean;
  onClose: () => void;
  activeHref: string;
}): React.JSX.Element | null {
  // Collapsed by default to save vertical space; the parent containing
  // the active section starts expanded. The parent remounts on every open
  // (via `key` in <Navbar/>) so this initializer re-runs with the latest
  // activeHref without needing a setState-in-effect sync.
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of NAV_SECTIONS) {
      if (section.dropdown) {
        initial[section.label] = isSectionActive(section, activeHref);
      }
    }
    return initial;
  });

  if (!open) return null;

  const toggle = (label: string): void => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleDownload = (): void => {
    triggerDownload(onClose);
  };

  const github = SOCIAL_LINKS.find((s) => s.icon === 'github');
  const linkedin = SOCIAL_LINKS.find((s) => s.icon === 'linkedin');

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop — tap empty dark space to close. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer panel */}
      <div className="absolute top-0 right-0 flex h-full w-[86%] max-w-[380px] flex-col bg-page shadow-2xl">
        {/* Fixed top bar */}
        <div className="flex items-center justify-between border-b border-line p-4">
          <a
            href="#home"
            onClick={onClose}
            aria-label="Tommy Paolma — home"
            className="gradient-text text-2xl font-extrabold"
          >
            TP
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-card text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav
          className="flex flex-1 flex-col overflow-y-auto p-4"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {NAV_SECTIONS.map((section) => {
              const subItems = mobileSubItems(section);
              const parentActive = isSectionActive(section, activeHref);
              const isExpanded = expanded[section.label] ?? false;
              const submenuId = `mobile-submenu-${section.label.toLowerCase()}`;

              const parentLinkClass = `relative flex min-h-11 flex-1 items-center gap-3 rounded-xl px-4 text-lg font-medium transition-colors ${
                parentActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-ink hover:bg-accent/5 hover:text-accent'
              }`;

              if (!section.dropdown) {
                return (
                  <li key={section.label}>
                    <a
                      href={section.href}
                      onClick={onClose}
                      aria-current={parentActive ? 'page' : undefined}
                      className={parentLinkClass}
                    >
                      {parentActive && (
                        <span
                          aria-hidden="true"
                          className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-full bg-accent"
                        />
                      )}
                      {section.icon}
                      {section.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={section.label}>
                  <div
                    className={`rounded-xl ${parentActive ? 'bg-accent/[0.04]' : ''}`}
                  >
                    <div className="flex items-center gap-1">
                      <a
                        href={section.href}
                        onClick={onClose}
                        aria-current={parentActive && activeHref === section.href ? 'page' : undefined}
                        className={parentLinkClass}
                      >
                        {parentActive && (
                          <span
                            aria-hidden="true"
                            className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-full bg-accent"
                          />
                        )}
                        {section.icon}
                        {section.label}
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          toggle(section.label);
                        }}
                        aria-expanded={isExpanded}
                        aria-controls={submenuId}
                        aria-label={`${section.label} submenu`}
                        className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          parentActive
                            ? 'text-accent hover:bg-accent/10'
                            : 'text-ink hover:bg-accent/5 hover:text-accent'
                        }`}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Smooth accordion collapsible */}
                    <div
                      id={submenuId}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="mt-1 ml-11 flex flex-col gap-1 border-l border-line pl-3">
                          {subItems.map((item) => {
                            const itemActive =
                              !item.isDownload && item.href === activeHref;
                            const subClass = `flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-[15px] font-medium transition-colors ${
                              itemActive
                                ? 'bg-accent/10 text-accent'
                                : 'text-muted hover:bg-accent/5 hover:text-accent'
                            }`;
                            return (
                              <li key={item.label}>
                                {item.isDownload ? (
                                  <button
                                    type="button"
                                    onClick={handleDownload}
                                    className={`${subClass} text-left`}
                                  >
                                    {item.label}
                                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                                  </button>
                                ) : (
                                  <a
                                    href={item.href}
                                    onClick={onClose}
                                    aria-current={itemActive ? 'page' : undefined}
                                    className={subClass}
                                  >
                                    {item.label}
                                  </a>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-t border-line pt-5">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-5 font-semibold text-white transition-colors hover:bg-highlight"
            >
              <Download className="h-5 w-5" />
              Download CV
            </button>
          </div>

          {/* Bottom footer row: GitHub / LinkedIn / Email */}
          <div className="mt-5 border-t border-line pt-5 pb-2">
            <p className="mb-3 text-sm font-semibold tracking-wider text-muted uppercase">
              Connect
            </p>
            <div className="flex gap-3">
              {github && (
                <a
                  key={github.href}
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={github.label}
                  className="inline-flex min-h-11 min-w-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-card px-3 text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              )}
              {linkedin && (
                <a
                  key={linkedin.href}
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={linkedin.label}
                  className="inline-flex min-h-11 min-w-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-card px-3 text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              )}
              <a
                href={`mailto:${EMAIL}`}
                aria-label={`Email Tommy Paolma at ${EMAIL}`}
                className="inline-flex min-h-11 min-w-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-card px-3 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Email</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const activeHref = useActiveHref();

  // Body scroll lock + Escape-to-close while the mobile overlay is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  // NOTE: MobileNav must be a sibling of <header>, not a child. The header uses
  // backdrop-blur (a filter), which would become the containing block for the
  // dialog's `fixed inset-0` and shrink it to header height on mobile.
  return (
    <>
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
              <span className="hidden text-sm font-semibold text-muted min-[320px]:inline lg:hidden xl:inline">
                Tommy Paolma
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_SECTIONS.map((section) => (
                <li key={section.label}>
                  <NavEntry
                    section={section}
                    isActive={isSectionActive(section, activeHref)}
                  />
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
      </header>

      <MobileNav
        key={open ? 'mobile-nav-open' : 'mobile-nav-closed'}
        open={open}
        activeHref={activeHref}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
