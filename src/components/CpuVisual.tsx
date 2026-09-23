import { CodeXml, Microchip } from 'lucide-react';
import { EMAIL } from '../data/portfolio';
import { asset } from '../lib/asset';

const PINS = 9;

/** CPU-chip styled portrait: SOFTWARE flows into the chip, HARDWARE flows out. Pure CSS. */
export function CpuVisual(): React.JSX.Element {
  return (
    <figure className="mx-auto w-full max-w-xs">
      <div className="mb-3 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.2em] text-muted uppercase">
        <CodeXml aria-hidden="true" focusable="false" className="h-4 w-4 text-accent" />
        Software
      </div>
      <div
        aria-hidden="true"
        className="relative mx-auto h-8 w-px bg-gradient-to-b from-accent to-accent/20"
      >
        <span className="trace-dot absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent" />
      </div>
      <div className="relative rounded-2xl border border-line bg-card p-5 shadow-xl">
        <div aria-hidden="true" className="absolute -top-3 right-6 left-6 flex justify-between">
          {Array.from({ length: PINS }, (_, i) => (
            <span key={i} className="h-3 w-1 rounded-b bg-muted/50" />
          ))}
        </div>
        <div aria-hidden="true" className="absolute -bottom-3 right-6 left-6 flex justify-between">
          {Array.from({ length: PINS }, (_, i) => (
            <span key={i} className="h-3 w-1 rounded-t bg-muted/50" />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="absolute top-6 bottom-6 -left-3 flex flex-col justify-between"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="h-1 w-3 rounded-r bg-muted/50" />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="absolute top-6 bottom-6 -right-3 flex flex-col justify-between"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="h-1 w-3 rounded-l bg-muted/50" />
          ))}
        </div>
        <div className="flex items-center justify-between text-[0.65rem] font-bold tracking-[0.2em] text-muted">
          <span>TP-01</span>
          <span>REV.A</span>
        </div>
        <img
          src={asset('images/tommy-paolma.jpg')}
          alt="Portrait of Tommy Paolma"
          width={320}
          height={320}
          fetchPriority="high"
          className="mx-auto mt-2 aspect-square w-52 rounded-xl border border-accent/40 object-cover sm:w-60"
        />
        <p className="mt-3 text-center text-sm font-bold tracking-wide">TOMMY PAOLMA</p>
        <p className="text-center text-[0.65rem] font-semibold tracking-[0.25em] text-accent">
          COMPUTER ENGINEERING
        </p>
      </div>
      <div
        aria-hidden="true"
        className="relative mx-auto h-8 w-px bg-gradient-to-t from-accent to-accent/20"
      >
        <span className="trace-dot absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent" />
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.2em] text-muted uppercase">
        <Microchip aria-hidden="true" focusable="false" className="h-4 w-4 text-accent" />
        Hardware
      </div>
      <figcaption className="mt-4 text-center text-sm text-muted">
        <a href={`mailto:${EMAIL}`} className="font-semibold text-accent hover:underline">
          {EMAIL}
        </a>
      </figcaption>
    </figure>
  );
}
