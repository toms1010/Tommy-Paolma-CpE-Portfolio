import { ArrowDown, ArrowRight, CircuitBoard, Cpu, Microchip, CodeXml } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const HARDWARE = [
  'Microcontrollers',
  'Embedded systems',
  'Electronics',
  'Sensors',
  'Digital systems',
];
const SOFTWARE = [
  'Programming',
  'Web applications',
  'Mobile & desktop apps',
  'Databases',
  'Systems software',
];

const FLOW = [
  'Programming',
  'Software Development',
  'Systems',
  'Computer Engineering',
  'Hardware + Embedded + IoT',
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
          world. As a student, I build on the software side while learning how the hardware
          underneath works.
        </p>

        <div className="mt-10 rounded-3xl border border-line bg-card p-6 sm:p-8">
          <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="rounded-2xl border border-line bg-black/5 p-5 dark:bg-black/25">
              <h3 className="flex items-center gap-2 font-bold">
                <Microchip aria-hidden="true" focusable="false" className="h-5 w-5 text-accent" />
                Hardware
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {HARDWARE.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center gap-2 md:flex-col">
              <ArrowDown
                aria-hidden="true"
                focusable="false"
                className="h-5 w-5 text-accent md:hidden"
              />
              <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-accent to-highlight px-5 py-3 font-bold text-white">
                <Cpu aria-hidden="true" focusable="false" className="h-5 w-5" />
                CpE
              </div>
              <ArrowDown
                aria-hidden="true"
                focusable="false"
                className="h-5 w-5 text-accent md:hidden"
              />
            </div>
            <div className="rounded-2xl border border-line bg-black/5 p-5 dark:bg-black/25">
              <h3 className="flex items-center gap-2 font-bold">
                <CodeXml aria-hidden="true" focusable="false" className="h-5 w-5 text-accent" />
                Software
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {SOFTWARE.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3 text-center text-sm font-semibold">
            <CircuitBoard
              aria-hidden="true"
              focusable="false"
              className="h-5 w-5 shrink-0 text-accent"
            />
            Systems Integration — hardware + software working together
          </div>
        </div>

        <h3 className="mt-10 text-center font-bold">How my skills connect</h3>
        <ol className="mt-4 flex flex-col items-stretch gap-2 md:flex-row md:flex-wrap md:items-center md:justify-center">
          {FLOW.map((step, i) => (
            <li key={step} className="flex flex-col items-center gap-2 md:flex-row">
              <span
                className={`rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap ${
                  step === 'Computer Engineering'
                    ? 'border-accent bg-accent/15 text-accent'
                    : 'border-line bg-card'
                }`}
              >
                {step}
              </span>
              {i < FLOW.length - 1 ? (
                <>
                  <ArrowDown
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4 text-accent md:hidden"
                  />
                  <ArrowRight
                    aria-hidden="true"
                    focusable="false"
                    className="hidden h-4 w-4 shrink-0 text-accent md:block"
                  />
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
