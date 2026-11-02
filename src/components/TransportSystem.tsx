import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Database,
  ExternalLink,
  FolderOpen,
  Gauge,
  Layers,
  LayoutGrid,
  ListChecks,
  Lock,
  Monitor,
  MonitorSmartphone,
  Server,
  ShieldCheck,
  Star,
  Terminal,
  Users,
} from 'lucide-react';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const LIVE = 'https://tommy-paolma-cpe-portfolio.vercel.app';
const PROJECT = 'https://github.com/toms1010/Transport_System_Cpp';

const BADGES = ['Featured Project', 'C++ Desktop App', 'Console App'];

const STATS: { value: string; label: string }[] = [
  { value: '2', label: 'Front ends (Qt Widgets + console)' },
  { value: '1', label: 'Shared domain layer' },
  { value: '6', label: 'Service modules' },
  { value: '69', label: 'Automated tests' },
];

const GALLERY: { src: string; alt: string; caption: string; href: string; linkLabel: string }[] = [
  {
    src: 'images/transport-system/01-login.png',
    alt: 'Transport System login screen with seeded administrator link',
    caption: 'Login — first run',
    href: `${LIVE}/#project-transport-system`,
    linkLabel: 'View the login screen',
  },
  {
    src: 'images/transport-system/02-registration-wizard.png',
    alt: 'Transport System registration wizard four steps',
    caption: 'Registration wizard',
    href: `${LIVE}/#project-transport-system`,
    linkLabel: 'View the registration wizard',
  },
  {
    src: 'images/transport-system/dark-01-login.png',
    alt: 'Transport System login screen (dark mode)',
    caption: 'Login — dark mode',
    href: `${LIVE}/#project-transport-system`,
    linkLabel: 'View the dark login',
  },
  {
    src: 'images/transport-system/10-admin-dashboard.png',
    alt: 'Transport System admin dashboard with students routes complaints occupancy available seats and pending dues',
    caption: 'Admin — dashboard',
    href: `${LIVE}/#project-transport-system`,
    linkLabel: 'View the admin dashboard',
  },
  {
    src: 'images/transport-system/13-admin-seat-map.png',
    alt: 'Transport System admin seat map with allot auto-assign and release actions',
    caption: 'Admin — seat map',
    href: `${LIVE}/#project-transport-system`,
    linkLabel: 'View the seat map',
  },
  {
    src: 'images/transport-system/30-student-dashboard.png',
    alt: 'Transport System student dashboard with route seat and payment cards',
    caption: 'Student — dashboard',
    href: `${LIVE}/#project-transport-system`,
    linkLabel: 'View the student dashboard',
  },
  {
    src: 'images/transport-system/40-dark-dashboard.png',
    alt: 'Transport System dashboard in dark mode',
    caption: 'Dashboard — dark mode',
    href: `${LIVE}/#project-transport-system`,
    linkLabel: 'View the dark dashboard',
  },
];

const HIGHLIGHTS: { icon: React.ReactNode; title: string; body: string; points: string[] }[] = [
  {
    icon: <Monitor className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Two front ends, one domain',
    body: 'A Qt Widgets desktop application and a console application share a single domain layer of services and repositories.',
    points: [
      'Qt Widgets desktop app (transport_gui) — native widget pages',
      'Console app (transport_system) — terminal UI',
      'Both front ends read and write the same CSV files',
    ],
  },
  {
    icon: <Layers className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Layered architecture',
    body: 'A domain layer with no console code and no Qt is reused by both front ends. Widgets depend on controllers; no page includes a service header.',
    points: [
      'transport_domain — models, repositories, services, utils (no console, no Qt)',
      'transport_core — domain + src/ui (the console front end)',
      'transport_gui — domain + controllers + Qt Widgets (no transport_core)',
    ],
  },
  {
    icon: <Server className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Feature modules',
    body: 'Separate services handle auth, routes, seats, payments, complaints, and notices, backed by CSV repositories.',
    points: [
      'AuthService and UserService — sign in, sign up, password reset',
      'RouteService and SeatService — fare, capacity, allot, auto-assign, release',
      'PaymentService — per-bucket statements, record, settle, receipt history, CSV export',
      'ComplaintService and NoticeService — filter, resolve, publish, archive',
    ],
  },
  {
    icon: <Gauge className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Business rules enforced in code',
    body: 'One student per seat, outstanding dues derived from an immutable payment journal rather than stored.',
    points: [
      'Outstanding is computed once in PaymentController — the dashboard, fee summary, roster and reports all read it',
      'Partial payment and payment history are possible because every money movement is appended to a journal',
      'Seats are one-to-one: one student, one seat; one seat, at most one student',
    ],
  },
  {
    icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Security',
    body: 'Salted, iterated password digests — never plaintext. Passwords are never stored in the repository.',
    points: [
      'Salted, iterated password digest in users.csv',
      'First run seeds an administrator account (admin / admin123) the user is told to change',
      'Legacy migration guard on pre-refactor files, recorded in data/migration.log',
    ],
  },
  {
    icon: <Users className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Admin & staff workflow',
    body: 'Staff can be created, assigned a route, activated or deactivated, and have passwords reset.',
    points: [
      'Staff accounts — create, assign a route, activate/deactivate, reset passwords',
      'Profile — view and edit own details, change password',
      'Reports — financial summary, per-route utilisation, collections by route, ledger export',
    ],
  },
  {
    icon: <Terminal className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Developer experience',
    body: 'CMake 3.16+ with a single configure, build, and test path; Qt is optional so the console build still works without it.',
    points: [
      'cmake -S . -B build && cmake --build build',
      '69 tests via ctest, split across 6 suites',
      'Optional gui_capture tool regenerates the screenshots',
    ],
  },
];

const BUILT: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <LayoutGrid className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Qt Widgets desktop front end',
    body: 'transport_gui — native widget pages for the admin and student roles, with a role-aware sidebar navigation, themed palettes, and CSV persistence.',
  },
  {
    icon: <Cpu className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Console front end',
    body: 'transport_system — a terminal UI over the same domain layer, built with src/ui so the domain stays free of console code.',
  },
  {
    icon: <Database className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'CSV persistence',
    body: 'One file per aggregate: users, routes, payments, complaints, notices, config. No external database dependency.',
  },
  {
    icon: <FolderOpen className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Feature pages',
    body: 'Dashboard, routes, seat map, payments, roster, complaints, notices, profile, staff accounts, reports, settings, help, and allotment.',
  },
  {
    icon: <Gauge className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Test suite',
    body: 'transport_core-based test suites covering auth, routes, seats, payments, complaints, and notices.',
  },
  {
    icon: <Lock className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Legacy migration',
    body: 'Pre-refactor files are imported exactly once, guarded by a marker file, with every run recorded in data/migration.log.',
  },
];

const ARCHITECTURE: { title: string; body: string }[] = [
  { title: 'Admin / Staff', body: 'Registered staff with assigned routes' },
  { title: 'Student', body: 'Authenticated learners with their own seats and dues' },
  { title: 'Public window', body: 'Routes, notice board, and about — readable before sign-in' },
  { title: 'Domain layer', body: 'Models, repositories, services, utils — no console code, no Qt' },
  { title: 'Front ends', body: 'transport_gui (Qt Widgets) and transport_system (console)' },
  { title: 'Storage', body: 'Plain CSV files — one aggregate per file' },
];

const FEATURES = [
  'Login with seeded administrator',
  'Registration wizard — four steps; account written only on the final step',
  'Route picker — cards showing fare, capacity, and free seats',
  'Seat picker — a real grid; occupied seats disabled and greyed',
  'Public routes, notices, and about before sign-in',
  'Admin — students, routes, seat map, payments, complaints, notices, reports, staff accounts, settings, help',
  'Student — dashboard, seat map, payments, complaints, notices, allotment card, profile',
  'Dark theme — one stylesheet, two palettes, entire UI rethemed together',
  'Outstanding dues derived from an immutable payment journal',
  'CSV persistence with no external database',
];

const CHALLENGES: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <MonitorSmartphone className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Two front ends over one domain',
    body: 'transport_gui deliberately does not link transport_core so the desktop app does not carry console code it never uses.',
  },
  {
    icon: <Users className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Logged-in roles without duplicating logic',
    body: 'A single AppContext wires every service; construction stays explicit and avoids a service locator spread across pages.',
  },
  {
    icon: <Gauge className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Derived outstanding dues',
    body: 'Outstanding is computed once in PaymentController so the dashboard card, fee summary, roster column, and reports financial block cannot drift apart.',
  },
  {
    icon: <ListChecks className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Feature-complete screens from day one',
    body: 'Admin has 12 screens and the student has 7, all driven by the same service layer and tested together.',
  },
  {
    icon: <Server className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Qt-optional build',
    body: 'Without Qt, CMake skips transport_gui with a note, so the console build still works on machines without Qt installed.',
  },
];

const OUTCOMES = [
  'C++17 layered architecture',
  'Qt 6 Widgets desktop application',
  'Terminal / console application',
  'Domain modelling with repositories and services',
  'CSV persistence for multiple aggregates',
  'Derived state computed once, read everywhere',
  'Salted, iterated password digests',
  'Legacy one-time migration with an audit log',
  'Configurable build with optional Qt',
  '69 automated tests across 6 suites',
];

function Card({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}): React.JSX.Element {
  return (
    <div
      aria-label={label}
      className="rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:border-accent hover:shadow-xl sm:p-8"
    >
      {children}
    </div>
  );
}

function CardTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <h4 className="flex items-center gap-2 text-lg font-bold">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </span>
      {children}
    </h4>
  );
}

export function TransportSystem(): React.JSX.Element {
  return (
    <section
      id="project-transport-system"
      aria-labelledby="ts-heading"
      className="scroll-mt-24 py-12 sm:py-16"
    >
      <Reveal>
        <p className="mb-3 text-center text-xs font-bold tracking-[0.25em] text-muted">
          CASE STUDY / FEATURED PROJECT
        </p>
        <SectionHeading id="ts-heading" accent="Transport">
          Student Transport Management System
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          A transport management application for a college transport cell, written in C++17 with a
          layered architecture and CSV persistence. Two front ends share one domain layer.
        </p>

        <ul
          aria-label="Project badges"
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          <li className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
            <Star className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
            Featured Project
          </li>
          {BADGES.slice(1).map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
            >
              {badge}
            </li>
          ))}
          <li className="rounded-full border border-line bg-card px-3 py-1 text-xs font-bold text-muted">
            Computer Engineering
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={PROJECT}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Student Transport Management System source code on GitHub (opens in a new tab)"
            className="btn-primary min-h-11 px-6 py-2.5 text-sm"
          >
            GitHub <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
          <a
            href="#projects"
            aria-label="Back to projects section"
            className="btn-outline min-h-11 px-6 py-2.5 text-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
        </div>

        {/* Browser-style live preview */}
        <figure className="mx-auto mt-8 sm:mt-10 max-w-4xl overflow-hidden rounded-3xl border border-line bg-card shadow-xl">
          <div className="flex items-center gap-2 border-b border-line bg-black/5 px-4 py-3 dark:bg-black/25">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </span>
            <span className="ml-2 min-w-0 flex-1 truncate rounded-lg bg-page px-3 py-1 font-mono text-xs text-muted">
              transport_system
            </span>
          </div>
          <img
            src={asset('images/transport-system/01-login.png')}
            alt="Login screen of the Transport System with the seeded administrator link"
            loading="lazy"
            width={1280}
            height={800}
            className="h-auto w-full max-w-[560px] sm:max-w-[720px] mx-auto"
          />
          <figcaption className="border-t border-line px-4 py-3 text-center text-xs text-muted">
            Real screenshot of the running application — captured from the login screen
          </figcaption>
        </figure>

        {/* Stats */}
        <dl
          aria-label="Project statistics"
          className="mx-auto mt-8 sm:mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-line bg-card p-4 sm:p-5 text-center transition-colors hover:border-accent"
            >
              <dt className="order-2 mt-1 text-xs font-semibold text-muted">{stat.label}</dt>
              <dd className="gradient-text order-1 text-2xl sm:text-3xl font-extrabold">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Screenshot gallery */}
        <h3 className="mt-10 text-center text-2xl font-extrabold">Project Screenshots</h3>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted">
          Real screenshots captured from the running application — select any preview to open that
          page.
        </p>
        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((shot) => (
            <figure
              key={shot.src}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <a
                href={shot.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${shot.linkLabel} (opens in a new tab)`}
                className="block overflow-hidden"
              >
                <img
                  src={asset(shot.src)}
                  alt={shot.alt}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="h-48 w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </a>
              <figcaption className="flex flex-1 flex-col gap-2 p-4 text-sm">
                <span className="font-semibold">{shot.caption}</span>
                <a
                  href={shot.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${shot.linkLabel} (opens in a new tab)`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                >
                  Open live page{' '}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Mobile experience */}
        <div className="mt-8 sm:mt-10 grid items-center gap-5 sm:gap-6 rounded-3xl border border-line bg-card p-5 sm:p-6 md:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 text-2xl font-extrabold">
              <MonitorSmartphone
                className="h-6 w-6 text-accent"
                aria-hidden="true"
                focusable="false"
              />
              Desktop & dark theme
            </h3>
            <p className="mt-3 text-sm text-muted">
              One stylesheet, two palettes. The seat grid, progress bars, tables, and inputs all
              retheme together for the Qt Widgets desktop app and the console app.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {[
                'Dark login at first run',
                'Dark dashboard, dark seat map, dark payments, dark settings',
                'Single stylesheet drives every screen',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line">
            <a
              href={`${LIVE}/#project-transport-system`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the login screen"
            >
              <img
                src={asset('images/transport-system/40-dark-dashboard.png')}
                alt="Transport System dashboard in dark mode"
                loading="lazy"
                width={390}
                height={844}
                className="mx-auto h-auto w-full max-w-[280px] sm:max-w-[320px]"
              />
            </a>
            <figcaption className="border-t border-line px-4 py-2 text-center text-xs text-muted">
              Dark desktop screenshot
            </figcaption>
          </figure>
        </div>

        {/* Highlights */}
        <h3 className="mt-10 text-center text-2xl font-extrabold">Project Highlights</h3>
        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((highlight) => (
            <article
              key={highlight.title}
              aria-label={highlight.title}
              className="rounded-3xl border border-line bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <CardTitle icon={highlight.icon}>{highlight.title}</CardTitle>
              <p className="mt-3 text-sm text-muted">{highlight.body}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {highlight.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* What I built */}
        <h3 className="mt-10 text-center text-2xl font-extrabold">What I Built</h3>
        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUILT.map((item) => (
            <article
              key={item.title}
              aria-label={item.title}
              className="rounded-3xl border border-line bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <CardTitle icon={item.icon}>{item.title}</CardTitle>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>

        {/* Architecture */}
        <div className="mt-8 sm:mt-10">
          <Card label="Architecture overview">
            <h3 className="flex items-center justify-center gap-2 text-center text-2xl font-extrabold">
              Architecture
            </h3>
            <ol
              aria-label="Application architecture, top to bottom"
              className="mx-auto mt-6 max-w-2xl"
            >
              {ARCHITECTURE.map((layer, index) => (
                <li key={layer.title} className="flex flex-col items-center">
                  <div className="w-full rounded-2xl border border-line bg-black/5 px-5 py-4 text-center dark:bg-black/25">
                    <p className="font-bold">{layer.title}</p>
                    <p className="mt-1 text-sm text-muted">{layer.body}</p>
                  </div>
                  {index < ARCHITECTURE.length - 1 ? (
                    <span aria-hidden="true" className="my-1 text-xl font-bold text-accent">
                      ↓
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* Features */}
        <h3 className="mt-10 text-center text-2xl font-extrabold">Features</h3>
        <ul
          aria-label="Implemented features"
          className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2"
        >
          {FEATURES.map((feature) => (
            <li
              key={feature}
              className="rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-ink sm:px-3.5 sm:py-1.5 sm:text-xs transition-colors hover:border-accent hover:text-accent"
            >
              {feature}
            </li>
          ))}
        </ul>

        {/* Challenges */}
        <h3 className="mt-10 text-center text-2xl font-extrabold">Engineering Challenges</h3>
        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((challenge) => (
            <article
              key={challenge.title}
              aria-label={challenge.title}
              className="rounded-3xl border border-line bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <CardTitle icon={challenge.icon}>{challenge.title}</CardTitle>
              <p className="mt-3 text-sm text-muted">{challenge.body}</p>
            </article>
          ))}
        </div>

        {/* Outcomes */}
        <div className="mt-8 sm:mt-10">
          <Card label="Learning outcomes">
            <h3 className="text-center text-2xl font-extrabold">Learning Outcomes</h3>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted">
              Skills demonstrated by designing and shipping this project.
            </p>
            <ul
              aria-label="Skills demonstrated"
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {OUTCOMES.map((outcome) => (
                <li
                  key={outcome}
                  className="rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-accent sm:px-3.5 sm:py-1.5 sm:text-xs"
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* CTA + navigation */}
        <div className="mt-8 sm:mt-10 rounded-3xl bg-gradient-to-br from-accent to-highlight p-5 sm:p-8 text-center text-white">
          <h3 className="text-2xl font-extrabold">Explore the source</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/85">
            Study the layered C++ architecture, the domain services, the CSV repositories, and the
            test suite on GitHub.
          </p>
          <a
            href={PROJECT}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the Student Transport Management System source code on GitHub (opens in a new tab)"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 transition-transform hover:-translate-y-0.5"
          >
            View on GitHub <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
        </div>

        <nav
          aria-label="Project navigation"
          className="mt-6 sm:mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            aria-label="Back to projects section"
            className="btn-outline min-h-11 w-full px-5 py-2.5 text-sm sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href="#project-jdajnsh"
              aria-label="Previous project: JDAJNSH"
              className="btn-outline min-h-11 px-5 py-2.5 text-sm"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Previous
              Project
            </a>
            <a
              href="#project-shadow-hunter"
              aria-label="Next project: Shadow Hunter"
              className="btn-outline min-h-11 px-5 py-2.5 text-sm"
            >
              Next Project <ArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
            </a>
          </div>
        </nav>
      </Reveal>
    </section>
  );
}
