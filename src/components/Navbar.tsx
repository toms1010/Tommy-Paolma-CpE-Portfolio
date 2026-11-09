import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Download, Sun, Moon, X, House, FolderKanban, User } from 'lucide-react';
import { EMAIL, GITHUB_PROFILE } from '../data/portfolio';
import { asset } from '../lib/asset';
import { useTheme } from '../theme/useTheme';
import { GitHubIcon, MailIcon } from './icons';

const CV_FILE = 'Tommy-Paolma-CV.pdf';
const CV_DOWNLOAD_NAME = 'Tommy_Paolma_Resume.pdf';

/**
 * Desktop header: exactly one horizontal row.
 *
 *   TOMMY PAOLMA | HOME | PROJECTS | EXPLORE ▼ | GITHUB | DOWNLOAD CV | THEME
 *
 * Brand on the left, navigation on the right. The Explore dropdown carries every
 * section link beyond the primary nav so the header never grows past the required items.
 */
const NAV_SECTIONS: {
  label: string;
  href: string;
  icon: React.ReactNode;
  dropdown?: { label: string; href: string; isDownload?: boolean }[];
}[] = [
  { label: 'HOME', href: '#home', icon: <House className="h-4 w-4" /> },
  { label: 'PROJECTS', href: '#projects', icon: <FolderKanban className="h-4 w-4" /> },
  {
    label: 'EXPLORE',
    href: '#about',
    icon: <User className="h-4 w-4" />,
    dropdown: [
      { label: 'About', href: '#about' },
      { label: 'Computer Engineering', href: '#computer-engineering' },
      { label: 'Skills', href: '#skills' },
      { label: 'Experience', href: '#experience' },
      { label: 'Education', href: '#education' },
      { label: 'Certifications', href: '#certifications' },
      { label: 'Resume', href: '#resume', isDownload: true },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

/** Section ids in document order (matches the sections rendered on the page). */
const OBSERVED_IDS = [
  'home',
  'about',
  'computer-engineering',
  'projects',
  'skills',
  'experience',
  'education',
  'certifications',
  'resume',
  'contact',
];

function useActiveHref(): string {
  const [active, setActive] = useState('#home');

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]): void => {
    // Only consider entries that are meaningfully intersecting (avoid flicker
    // when multiple sections barely cross the threshold at the same time).
    const intersecting = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (intersecting.length > 0) {
      const id = intersecting[0].target.id;
      const next = `#${id}`;
      setActive((current) => (current === next ? current : next));
    }
  }, []);

  useEffect(() => {
    const elements = OBSERVED_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    });

    elements.forEach((el) => {
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return active;
}

function isSectionActive(href: string, activeHref: string): boolean {
  return href === activeHref;
}

function triggerDownload(): void {
  const link = document.createElement('a');
  link.href = asset(CV_FILE);
  link.download = CV_DOWNLOAD_NAME;
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

/** A single desktop nav link (underline via the shared .nav-link CSS). */
function DesktopNavLink({
  href,
  label,
  icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}): React.JSX.Element {
  const linkClass = `nav-link inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-accent/10 text-accent' : 'text-ink hover:bg-accent/5 hover:text-accent'
  }`;

  return (
    <a
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={linkClass}
      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon}
      {label}
    </a>
  );
}

/** The Explore dropdown: clicking EXPLORE toggles the functional section menu. */
function ExploreDropdown({ isActive }: { isActive: boolean }): React.JSX.Element {
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

  const triggerClass = `inline-flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-accent/10 text-accent' : 'text-ink hover:bg-accent/5 hover:text-accent'
  }`;

  const linkClass = `inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-accent/10 text-accent' : 'text-ink hover:bg-accent/5 hover:text-accent'
  }`;

  const handleDownload = (): void => {
    setIsOpen(false);
    triggerDownload();
  };

  const section = NAV_SECTIONS[2];
  const dropdownId = 'explore-dropdown';

  return (
    <div ref={wrapRef} className="relative">
      <span className="inline-flex items-center">
        <a
          href={section.href}
          onClick={() => {
            setIsOpen(true);
          }}
          aria-current={isActive ? 'page' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={isOpen ? dropdownId : undefined}
          className={`nav-link ${linkClass} rounded-r-none pr-1.5`}
        >
          {section.icon}
          {section.label}
        </a>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setIsOpen((v) => !v);
          }}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={`${section.label} submenu`}
          aria-controls={dropdownId}
          className={`${triggerClass} rounded-l-none pl-1.5`}
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </span>

      {isOpen && (
        <nav
          aria-label={`${section.label} submenu`}
          className="absolute top-full left-1/2 z-50 mt-2 min-w-[420px] -translate-x-1/2 rounded-xl border border-line bg-card p-2 shadow-xl"
          id={dropdownId}
        >
          <ul className="flex flex-col gap-0.5">
            {section.dropdown?.map((item) =>
              item.isDownload ? (
                <li key={item.label}>
                  <button
                    key={item.label}
                    type="button"
                    onClick={handleDownload}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    {item.label}
                  </button>
                </li>
              ) : (
                <li key={item.label}>
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}

/** Far-right desktop download button and the matching mobile download button. */
function DownloadCvButton({ className }: { className?: string }): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={triggerDownload}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-4 font-semibold text-white transition-colors hover:bg-accent/90 ${className ?? ''}`}
    >
      <Download className="h-5 w-5" aria-hidden="true" />
      <span>DOWNLOAD CV</span>
    </button>
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of NAV_SECTIONS) {
      if (section.dropdown) {
        initial[section.label] = isSectionActive(section.href, activeHref);
      }
    }
    return initial;
  });

  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus management: trap focus inside drawer, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    // Prevent body scroll while drawer is open.
    document.body.style.overflow = 'hidden';

    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Cycle focus within drawer.
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the hamburger button.
      const trigger = document.querySelector<HTMLElement>(
        '[aria-label="Open navigation menu"], [aria-label="Close navigation menu"]'
      );
      trigger?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const toggle = (label: string): void => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleDownload = (): void => {
    triggerDownload();
    onClose();
  };

  const handleNavClick = (): void => {
    onClose();
  };

  return (
    <div
      ref={drawerRef}
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop — tap empty dark space to close. */}
      <div
        aria-hidden="true"
        onClick={handleNavClick}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer panel */}
      <div className="absolute top-0 right-0 flex h-full w-[86%] max-w-[380px] flex-col bg-page shadow-2xl">
        {/* Fixed top bar */}
        <div className="flex items-center justify-between border-b border-line p-4">
          <a
            href="#home"
            onClick={handleNavClick}
            aria-label="Tommy Paolma — home"
            className="gradient-text text-2xl font-extrabold"
          >
            TOMMY PAOLMA
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={handleNavClick}
              aria-label="Close"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-card text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto p-4" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {NAV_SECTIONS.map((section) => {
              const subItems = section.dropdown ?? [];
              const parentActive = isSectionActive(section.href, activeHref);
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
                      onClick={handleNavClick}
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
                  <div className={`rounded-xl ${parentActive ? 'bg-accent/[0.04]' : ''}`}>
                    <div className="flex items-center gap-1">
                      <a
                        href={section.href}
                        onClick={handleNavClick}
                        aria-current={parentActive ? 'page' : undefined}
                        className={parentLinkClass}
                      >
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
                      hidden={!isExpanded}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="mt-1 ml-11 flex flex-col gap-1 border-l border-line pl-3">
                          {subItems.map((item) => (
                            <li key={item.label}>
                              {item.isDownload ? (
                                <button
                                  type="button"
                                  onClick={handleDownload}
                                  className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-[15px] font-medium text-left text-muted hover:bg-accent/5 hover:text-accent"
                                >
                                  {item.label}
                                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                              ) : (
                                <a
                                  href={item.href}
                                  onClick={handleNavClick}
                                  aria-current={
                                    isSectionActive(item.href, activeHref) ? 'page' : undefined
                                  }
                                  className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-[15px] font-medium text-ink hover:bg-accent/5 hover:text-accent"
                                >
                                  {item.label}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            {/* GITHUB as a top-level mobile nav item (opens the profile in a new tab). */}
            <li>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tommy Paolma on GitHub (opens in a new tab)"
                className={`
                  relative flex min-h-11 flex-1 items-center gap-3 rounded-xl px-4 text-lg font-medium transition-colors
                  text-ink hover:bg-accent/5 hover:text-accent
                `}
              >
                <GitHubIcon className="h-5 w-5 shrink-0" />
                GITHUB
              </a>
            </li>
          </ul>

          <div className="mt-6 border-t border-line pt-5">
            <DownloadCvButton className="w-full px-5 justify-center" />
          </div>

          {/* Bottom footer row: Email */}
          <div className="mt-5 border-t border-line pt-5 pb-2">
            <p className="mb-3 text-sm font-semibold tracking-wider text-muted uppercase">
              Connect
            </p>
            <div className="flex gap-3">
              <a
                href={`mailto:${EMAIL}`}
                aria-label={`Email Tommy Paolma at ${EMAIL}`}
                className="inline-flex min-h-11 min-w-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-card px-3 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <MailIcon className="h-5 w-5" />
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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-page/80 backdrop-blur-md print:hidden">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
        >
          {/* Left: TOMMY PAOLMA */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#home"
              aria-label="Tommy Paolma — home"
              className="flex shrink-0 items-baseline gap-2"
            >
              <span className="gradient-text text-2xl font-extrabold">TOMMY PAOLMA</span>
            </a>
          </div>

          {/* Right: desktop nav row (lg+) plus hamburger (below lg). */}
          <div className="flex shrink-0 items-center gap-4">
            {/* Desktop navigation — one horizontal row, hidden below lg. */}
            <ul className="hidden lg:flex items-center gap-1 lg:gap-4">
              <li>
                <DesktopNavLink
                  href={NAV_SECTIONS[0].href}
                  label={NAV_SECTIONS[0].label}
                  icon={NAV_SECTIONS[0].icon}
                  isActive={isSectionActive(NAV_SECTIONS[0].href, activeHref)}
                />
              </li>
              <li>
                <DesktopNavLink
                  href={NAV_SECTIONS[1].href}
                  label={NAV_SECTIONS[1].label}
                  icon={NAV_SECTIONS[1].icon}
                  isActive={isSectionActive(NAV_SECTIONS[1].href, activeHref)}
                />
              </li>
              <li>
                <ExploreDropdown isActive={isSectionActive(NAV_SECTIONS[2].href, activeHref)} />
              </li>
              <li>
                <a
                  href={GITHUB_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tommy Paolma on GitHub (opens in a new tab)"
                  className="nav-link inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-card px-3 text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <GitHubIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">GITHUB</span>
                </a>
              </li>
              <li>
                <DownloadCvButton />
              </li>
            </ul>

            {/* Theme toggle — desktop utility control (not a navigation link). */}
            <ThemeToggle />

            {/* Hamburger menu — mobile and tablet (below lg). */}
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
