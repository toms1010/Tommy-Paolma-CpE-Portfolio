import { CircuitBoard, Cpu, CodeXml, Microchip, ShieldCheck, Terminal } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

type DisciplineArea = {
  title: string;
  icon: React.JSX.Element;
  items: string[];
  note: string;
};

const HARDWARE: DisciplineArea = {
  title: 'Hardware Engineering',
  icon: (
    <Microchip aria-hidden="true" focusable="false" className="h-5 w-5 text-accent" />
  ),
  items: ['Microcontrollers', 'Digital logic & circuits', 'Sensors & instrumentation', 'Computer architecture'],
  note: 'Studied through coursework and Arduino activities — not yet professional experience.',
};

const SOFTWARE: DisciplineArea = {
  title: 'Software Engineering',
  icon: (
    <CodeXml aria-hidden="true" focusable="false" className="h-5 w-5 text-accent" />
  ),
  items: ['Programming & algorithms', 'Web & application development', 'Desktop & mobile applications', 'Database systems'],
  note: 'Applied in completed projects and certifications.',
};

const EMBEDDED: DisciplineArea = {
  title: 'Embedded & Connected Systems',
  icon: (
    <Terminal aria-hidden="true" focusable="false" className="h-5 w-5 text-accent" />
  ),
  items: ['Embedded systems', 'Firmware development', 'IoT concepts', 'Robotics & automation basics'],
  note: 'Explored through Arduino workshops and mentoring.',
};

const SYSTEMS: DisciplineArea = {
  title: 'Computer Systems',
  icon: (
    <ShieldCheck aria-hidden="true" focusable="false" className="h-5 w-5 text-accent" />
  ),
  items: ['Computer networks', 'System design', 'Systems integration'],
  note: 'Learning through the degree curriculum.',
};

const APPLIED_PROJECTS = [
  {
    title: 'WIT Barcode Student Information System',
    connection: 'Desktop software + database + barcode scanning',
  },
  {
    title: 'Student Transport Management System',
    connection: 'C++ desktop app + shared domain layer',
  },
  {
    title: 'Arduino Workshops & Mentoring',
    connection: 'Embedded systems + hardware-software basics',
  },
];

export function ComputerEngineering(): React.JSX.Element {
  return (
    <section
      id="computer-engineering"
      aria-labelledby="computer-engineering-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <p className="mb-3 text-center text-xs font-bold tracking-[0.25em] text-muted">
          SYS.01 / DISCIPLINE
        </p>
        <SectionHeading id="computer-engineering-heading" accent="Engineering">
          Computer
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Computer Engineering sits at the intersection of hardware and software — designing
          computing systems, embedded devices, and the software that interacts with the physical
          world. As a student, I build primarily on the software side while learning how the
          hardware underneath works.
        </p>
        {/* Interdisciplinary diagram: four discipline areas around a central CpE node */}
        <div className="mt-12 rounded-3xl border border-line bg-card p-6 sm:p-8">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-center">
            {/* Left column: Hardware + Software */}
            <div className="flex flex-col gap-6 w-full max-w-md sm:w-auto">
              <article className="rounded-2xl border border-line bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  {HARDWARE.icon}
                  <h3 className="font-bold text-ink">{HARDWARE.title}</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-muted">
                  {HARDWARE.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">{HARDWARE.note}</p>
              </article>
              <article className="rounded-2xl border border-line bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  {SOFTWARE.icon}
                  <h3 className="font-bold text-ink">{SOFTWARE.title}</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-muted">
                  {SOFTWARE.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">{SOFTWARE.note}</p>
              </article>
            </div>

            {/* Center: CpE connecting node */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="relative flex items-center justify-center rounded-full border border-accent/40 bg-accent/10 px-6 py-4 font-bold text-accent shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                  <Cpu aria-hidden="true" focusable="false" className="h-6 w-6" />
                  <span className="ml-1 text-sm font-bold">CpE</span>
                </div>
                <div className="absolute -inset-1 rounded-full border border-accent/20 animate-ping" />
              </div>
              <p className="mt-2 text-xs font-medium text-muted uppercase tracking-wider tech-label">
                Central connecting discipline
              </p>
            </div>

            {/* Right column: Embedded + Systems */}
            <div className="flex flex-col gap-6 w-full max-w-md sm:w-auto">
              <article className="rounded-2xl border border-line bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  {EMBEDDED.icon}
                  <h3 className="font-bold text-ink">{EMBEDDED.title}</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-muted">
                  {EMBEDDED.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">{EMBEDDED.note}</p>
              </article>
              <article className="rounded-2xl border border-line bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  {SYSTEMS.icon}
                  <h3 className="font-bold text-ink">{SYSTEMS.title}</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-muted">
                  {SYSTEMS.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">{SYSTEMS.note}</p>
              </article>
            </div>
          </div>

          {/* Systems integration bar */}
          <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3 text-center text-sm font-semibold">
            <CircuitBoard
              aria-hidden="true"
              focusable="false"
              className="h-5 w-5 shrink-0 text-accent"
            />
            Systems Integration — hardware + software working together
          </div>
        </div>

        {/* Applied through my projects */}
        <div className="mt-12">
          <h3 className="mb-6 text-center font-bold text-ink">Applied Through My Projects</h3>
          <ul className="grid gap-4 sm:grid-cols-3 max-w-5xl mx-auto">
            {APPLIED_PROJECTS.map((p) => (
              <li
                key={p.title}
                className="rounded-2xl border border-line bg-card p-5 text-center"
              >
                <h4 className="font-bold text-ink">{p.title}</h4>
                <p className="mt-1 text-xs text-muted">{p.connection}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
