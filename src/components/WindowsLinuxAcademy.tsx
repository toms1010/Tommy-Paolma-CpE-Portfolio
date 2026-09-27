import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Cpu,
  ExternalLink,
  FlaskConical,
  Gauge,
  GraduationCap,
  Layers,
  LayoutGrid,
  ListChecks,
  Lock,
  Map,
  Monitor,
  MonitorSmartphone,
  Scale,
  Server,
  Star,
  Terminal,
} from 'lucide-react';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const LIVE = 'https://windows-linux-academy.vercel.app';

const BADGES = ['Featured Project', 'Interactive Web App', 'Education Platform'];

const STATS: { value: string; label: string }[] = [
  { value: '25+', label: 'Learning pages & routes' },
  { value: '5', label: 'Interactive labs' },
  { value: '3', label: 'Operating systems covered' },
  { value: '30', label: 'Quiz questions' },
];

const GALLERY: { src: string; alt: string; caption: string; href: string; linkLabel: string }[] = [
  {
    src: 'images/wla-comparison.jpg',
    alt: 'Windows vs Linux comparison page of the academy',
    caption: 'Windows vs Linux comparison',
    href: `${LIVE}/comparison`,
    linkLabel: 'Open the live comparison page',
  },
  {
    src: 'images/wla-cpu-scheduling.jpg',
    alt: 'CPU scheduling simulator with algorithm tabs, process table, Gantt chart, ready queue, and results metrics',
    caption: 'CPU scheduling simulator — FCFS, SJF, SRTF, Round Robin',
    href: `${LIVE}/cpu-scheduling`,
    linkLabel: 'Open the live CPU scheduling simulator',
  },
  {
    src: 'images/wla-terminal.jpg',
    alt: 'Linux terminal simulator with command prompt, quick commands, command reference, and guided debugging scenarios',
    caption: 'Terminal simulator with guided debugging scenarios',
    href: `${LIVE}/terminal-simulator`,
    linkLabel: 'Open the live terminal simulator',
  },
  {
    src: 'images/wla-quiz.jpg',
    alt: 'Interactive quiz page showing a multiple-choice operating-systems question with score tracking',
    caption: 'Interactive quiz with score tracking',
    href: `${LIVE}/quiz`,
    linkLabel: 'Open the live quiz page',
  },
  {
    src: 'images/wla-roadmap.jpg',
    alt: 'Backend learning roadmap page of the academy',
    caption: 'Backend learning roadmap',
    href: `${LIVE}/roadmap`,
    linkLabel: 'Open the live roadmap page',
  },
];

const HIGHLIGHTS: { icon: React.ReactNode; title: string; body: string; points: string[] }[] = [
  {
    icon: <Monitor className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Operating System Learning',
    body: 'Interactive lessons covering the core of every major desktop and server OS.',
    points: [
      'Windows, macOS, and Linux overviews',
      'OS architecture and kernel concepts',
      'Filesystems, system calls, virtual memory, permissions',
    ],
  },
  {
    icon: <FlaskConical className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Interactive Labs',
    body: 'Hands-on modules that turn abstract OS theory into things you can touch.',
    points: ['Permissions Lab', 'CPU Scheduling, Virtual Memory, Filesystem Explorer, System Calls'],
  },
  {
    icon: <Terminal className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Terminal Simulator',
    body: 'Practice Linux command concepts in a safe in-browser terminal with quick commands, a command reference, and guided debugging scenarios.',
    points: ['ls, cd, pwd, mkdir, chmod workflows', 'Guided permission-debugging challenges'],
  },
  {
    icon: <GraduationCap className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Interactive Quiz',
    body: 'A 30-question assessment system with hints, instant answer checking, and live score tracking.',
    points: ['Multiple-choice OS questions', 'Hints and instant feedback'],
  },
  {
    icon: <Scale className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'OS Comparison',
    body: 'Side-by-side comparisons of Windows vs Linux and Windows vs macOS vs Linux.',
    points: ['Use-case guidance: gaming, creatives, dev & servers'],
  },
  {
    icon: <Map className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Backend Learning Roadmap',
    body: 'A staged progression from fundamentals to cloud deployment.',
    points: [
      'Programming Fundamentals → JavaScript & Node.js → Express & REST API → PostgreSQL & JWT → Linux & Docker → NGINX & Cloud',
    ],
  },
  {
    icon: <Lock className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Accounts',
    body: 'Dedicated sign-in, sign-up, and profile pages for a personal learning-account experience.',
    points: ['Sign In, Sign Up, Profile pages'],
  },
];

const BUILT: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <LayoutGrid className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Frontend Engineering',
    body: 'Multi-page Next.js application with a sidebar + top-navigation layout, in-site search, grouped learning modules, and account pages — statically exported for fast loads.',
  },
  {
    icon: <Layers className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Interactive Learning Systems',
    body: 'Educational concepts converted into interactive experiences: comparison views, an OS evolution timeline, architecture explainers, and a learning hub.',
  },
  {
    icon: <Cpu className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Simulation',
    body: 'A deterministic CPU scheduling simulator (FCFS, SJF, SRTF, Round Robin) with presets, step/play controls, Gantt chart, ready queue, process control blocks, and turnaround/waiting/response metrics.',
  },
  {
    icon: <Terminal className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Developer Tools',
    body: 'A command reference plus an in-browser Linux terminal emulator with command history and scenario-based debugging challenges.',
  },
  {
    icon: <Lock className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Accounts',
    body: 'Sign-in, sign-up, and profile pages give learners a personal account experience within the academy.',
  },
  {
    icon: <MonitorSmartphone className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Responsive Design',
    body: 'The full sidebar navigation collapses into a mobile menu, and multi-column cards, timelines, and labs reflow into single-column layouts verified at 390px width.',
  },
];

const STACK: { title: string; items: string[]; note?: string }[] = [
  { title: 'Frontend', items: ['Next.js (Pages Router, static export)', 'React', 'JavaScript', 'CSS'] },
  { title: 'Deployment', items: ['Vercel'] },
  { title: 'Development', items: ['Git', 'GitHub'] },
  {
    title: 'Backend / Database',
    items: ['None detected — runs client-side'],
    note: 'The public site is a statically exported Next.js app: simulators, terminal, and quiz run in the browser with no external backend detected.',
  },
];

const ARCHITECTURE: { title: string; body: string }[] = [
  { title: 'Visitor', body: 'Desktop, tablet, or mobile browser' },
  {
    title: 'Responsive web interface',
    body: 'Next.js pages — sidebar + top nav on desktop, hamburger menu on mobile',
  },
  {
    title: 'Learning modules',
    body: 'OS concepts · Comparisons · Interactive labs · Quiz · Terminal · Roadmap',
  },
  {
    title: 'Client-side application logic',
    body: 'Scheduling engine · Terminal emulator · Quiz engine',
  },
  { title: 'Browser runtime', body: 'No external backend detected — everything runs on the client' },
];

const FEATURES = [
  'Windows learning',
  'Linux learning',
  'macOS learning',
  'Windows vs Linux comparison',
  'Triple OS comparison',
  'Kernel concepts',
  'OS architecture lessons',
  'Evolution timeline',
  'Permissions lab',
  'CPU scheduling simulator',
  'Virtual memory lab',
  'Filesystem explorer',
  'System calls lab',
  'Command reference',
  'Terminal simulator',
  'Interactive quiz',
  'Backend roadmap',
  'Ubuntu server guide',
  'Resources library',
  'Learning hub',
  'Site search',
  'Sign in / Sign up / Profile pages',
  'Contact page',
  'Dark / light theme toggle',
  'Responsive mobile interface',
];

const CHALLENGES: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <MonitorSmartphone className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Responsive Navigation',
    body: 'A dense desktop IA — sidebar groups plus top nav plus search — had to collapse into a usable mobile menu and single-column layouts without losing any of the ~29 routes.',
  },
  {
    icon: <BookOpen className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Interactive Learning',
    body: 'Technical OS concepts (kernels, syscalls, virtual memory) were translated into visual, explorable modules instead of static documentation walls.',
  },
  {
    icon: <Gauge className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Simulation',
    body: 'The CPU scheduler needed a deterministic engine driving a Gantt chart, ready queue, PCB states, and correct turnaround / waiting / response metrics across four algorithms.',
  },
  {
    icon: <ListChecks className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Information Architecture',
    body: 'Eight content groups — Getting Started, Comparisons, Operating Systems, Core Concepts, Labs, Development, Tools, Account — organize dozens of pages without overwhelming learners.',
  },
  {
    icon: <Server className="h-5 w-5" aria-hidden="true" focusable="false" />,
    title: 'Performance',
    body: 'Static export keeps every interactive page — simulators included — loading fast with no server round-trips.',
  },
];

const OUTCOMES = [
  'Operating Systems concepts',
  'Computer architecture',
  'Frontend development (Next.js / React)',
  'Interactive UI development',
  'Client-side simulation',
  'Responsive web design',
  'Technical documentation',
  'User experience design',
  'Deployment on Vercel',
  'Git version control',
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

export function WindowsLinuxAcademy(): React.JSX.Element {
  return (
    <section
      id="project-windows-linux-academy"
      aria-labelledby="wla-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <p className="mb-3 text-center text-xs font-bold tracking-[0.25em] text-muted">
          CASE STUDY / FEATURED PROJECT
        </p>
        <SectionHeading id="wla-heading" accent="Academy">
          Windows vs Linux
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Interactive learning platform for operating systems, kernels, backend engineering, and
          system concepts.
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
            href={LIVE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Windows vs Linux Academy live demo (opens in a new tab)"
            className="btn-primary min-h-11 px-6 py-2.5 text-sm"
          >
            Live Demo <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
          <a href="#projects" aria-label="Back to projects section" className="btn-outline min-h-11 px-6 py-2.5 text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
        </div>

        {/* Browser-style live preview */}
        <figure className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-line bg-card shadow-xl">
          <div className="flex items-center gap-2 border-b border-line bg-black/5 px-4 py-3 dark:bg-black/25">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </span>
            <span className="ml-2 min-w-0 flex-1 truncate rounded-lg bg-page px-3 py-1 font-mono text-xs text-muted">
              windows-linux-academy.vercel.app
            </span>
            <a
              href={LIVE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open live demo of Windows vs Linux Academy (opens in a new tab)"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-accent hover:underline"
            >
              Open Live Demo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
            </a>
          </div>
          <img
            src={asset('images/wla-home.jpg')}
            alt="Preview of the Windows vs Linux Academy home page with hero, featured OS topics, comparison cards, history timeline, and learning roadmap"
            loading="lazy"
            width={1280}
            height={800}
            className="h-auto w-full"
          />
          <figcaption className="border-t border-line px-4 py-3 text-center text-xs text-muted">
            Real screenshot of the deployed application — captured from {LIVE}
          </figcaption>
        </figure>

        {/* Stats */}
        <dl
          aria-label="Project statistics"
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-line bg-card p-5 text-center transition-colors hover:border-accent"
            >
              <dt className="order-2 mt-1 text-xs font-semibold text-muted">{stat.label}</dt>
              <dd className="gradient-text order-1 text-3xl font-extrabold">{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* Screenshot gallery */}
        <h3 className="mt-14 text-center text-2xl font-extrabold">Project Screenshots</h3>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted">
          Real screenshots captured from the deployed application — select any preview to open that
          page live.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mt-10 grid items-center gap-6 rounded-3xl border border-line bg-card p-6 sm:p-8 md:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 text-2xl font-extrabold">
              <MonitorSmartphone
                className="h-6 w-6 text-accent"
                aria-hidden="true"
                focusable="false"
              />
              Mobile Experience
            </h3>
            <p className="mt-3 text-sm text-muted">
              Captured at 390px on the real deployed site — not a resized desktop screenshot. The
              sidebar collapses into a mobile menu, and hero, topic cards, comparison cards, the
              history timeline, and the roadmap all reflow into single-column layouts.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {[
                'Header with search and mobile menu',
                'Stacked hero, cards, and comparison tables',
                'Single-column timeline and roadmap',
                'Touch-friendly buttons throughout',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line">
            <a
              href={LIVE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the live academy home page (opens in a new tab)"
            >
              <img
                src={asset('images/wla-mobile.jpg')}
                alt="Mobile layout of the Windows vs Linux Academy home page at 390 pixels wide, showing stacked hero, topic cards, comparison cards, timeline, and roadmap"
                loading="lazy"
                width={390}
                height={844}
                className="mx-auto h-auto w-full max-w-[320px]"
              />
            </a>
            <figcaption className="border-t border-line px-4 py-2 text-center text-xs text-muted">
              Real 390px capture of the deployed site
            </figcaption>
          </figure>
        </div>

        {/* Highlights */}
        <h3 className="mt-14 text-center text-2xl font-extrabold">Project Highlights</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((highlight) => (
            <article
              key={highlight.title}
              aria-label={highlight.title}
              className="rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <CardTitle icon={highlight.icon}>{highlight.title}</CardTitle>
              <p className="mt-3 text-sm text-muted">{highlight.body}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {highlight.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Why I built this */}
        <div className="mt-10">
          <Card label="Why I built this">
            <h3 className="text-center text-2xl font-extrabold">Why I Built This</h3>
            <blockquote className="mx-auto mt-4 max-w-3xl border-l-4 border-accent pl-5 text-muted italic">
              I built Windows vs Linux Academy to combine software development with
              computer-engineering education. Instead of presenting operating-system concepts as
              static documentation, the project turns them into an interactive learning experience
              through comparisons, simulations, quizzes, visual explanations, and hands-on labs.
            </blockquote>
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted">
              The project draws together my Computer Engineering coursework — operating systems,
              system architecture, and backend development — with software-engineering practice:
              building a responsive, interactive educational product that makes practical learning
              the default.
            </p>
          </Card>
        </div>

        {/* What I built */}
        <h3 className="mt-14 text-center text-2xl font-extrabold">What I Built</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUILT.map((item) => (
            <article
              key={item.title}
              aria-label={item.title}
              className="rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <CardTitle icon={item.icon}>{item.title}</CardTitle>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>

        {/* Tech stack */}
        <h3 className="mt-14 text-center text-2xl font-extrabold">Technology Stack</h3>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted">
          Detected from the deployed site&apos;s build output (Next.js static export) and hosting —
          only technologies actually in use are listed.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-line bg-card p-6 transition-colors hover:border-accent"
            >
              <h4 className="text-sm font-bold tracking-wider text-accent uppercase">
                {group.title}
              </h4>
              <ul className="mt-3 space-y-1.5 text-sm font-semibold">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {group.note ? <p className="mt-3 text-xs text-muted">{group.note}</p> : null}
            </div>
          ))}
        </div>

        {/* Architecture */}
        <div className="mt-10">
          <Card label="Architecture overview">
            <h3 className="flex items-center justify-center gap-2 text-center text-2xl font-extrabold">
              Architecture
            </h3>
            <ol aria-label="Application architecture, top to bottom" className="mx-auto mt-6 max-w-2xl">
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
        <h3 className="mt-14 text-center text-2xl font-extrabold">Features</h3>
        <ul
          aria-label="Implemented features"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {FEATURES.map((feature) => (
            <li
              key={feature}
              className="rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {feature}
            </li>
          ))}
        </ul>

        {/* Challenges */}
        <h3 className="mt-14 text-center text-2xl font-extrabold">Engineering Challenges</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((challenge) => (
            <article
              key={challenge.title}
              aria-label={challenge.title}
              className="rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <CardTitle icon={challenge.icon}>{challenge.title}</CardTitle>
              <p className="mt-3 text-sm text-muted">{challenge.body}</p>
            </article>
          ))}
        </div>

        {/* Outcomes */}
        <div className="mt-10">
          <Card label="Learning outcomes">
            <h3 className="text-center text-2xl font-extrabold">Learning Outcomes</h3>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted">
              Skills demonstrated by designing and shipping this project.
            </p>
            <ul aria-label="Skills demonstrated" className="mt-6 flex flex-wrap justify-center gap-2">
              {OUTCOMES.map((outcome) => (
                <li
                  key={outcome}
                  className="rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent"
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* CTA + navigation */}
        <div className="mt-10 rounded-3xl bg-gradient-to-br from-accent to-highlight p-6 text-center text-white sm:p-10">
          <h3 className="text-2xl font-extrabold">Explore the Academy Live</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/85">
            Run the CPU scheduling simulator, try the terminal, and take the quiz — everything runs
            in the browser at windows-linux-academy.vercel.app.
          </p>
          <a
            href={LIVE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live demo of Windows vs Linux Academy (opens in a new tab)"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 transition-transform hover:-translate-y-0.5"
          >
            Open Live Demo <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
        </div>

        <nav
          aria-label="Project navigation"
          className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            aria-label="Back to projects section"
            className="btn-outline min-h-11 w-full px-5 py-2.5 text-sm sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#project-jdajnsh"
              aria-label="Previous project: JDAJNSH"
              className="btn-outline min-h-11 px-5 py-2.5 text-sm"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Previous Project
            </a>
            <a
              href="#project-marpol-ocean-adventure"
              aria-label="Next project: MARPOL Ocean Adventure"
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
