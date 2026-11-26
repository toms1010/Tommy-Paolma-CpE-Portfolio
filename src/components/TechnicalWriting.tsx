import { FileText, Code, Microchip, Terminal, Gamepad2, Database, LayoutGrid, ShieldCheck, ExternalLink } from 'lucide-react';
import { CONTRIBUTION_AREAS } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const CATEGORY_ICONS: Record<string, React.JSX.Element> = {
  'Software Documentation': <FileText className="h-5 w-5" aria-hidden="true" />,
  'Programming Tutorials': <Code className="h-5 w-5" aria-hidden="true" />,
  'Computer Engineering': <Microchip className="h-5 w-5" aria-hidden="true" />,
  'Embedded Systems': <Terminal className="h-5 w-5" aria-hidden="true" />,
  Electronics: <Gamepad2 className="h-5 w-5" aria-hidden="true" />,
  'Database Documentation': <Database className="h-5 w-5" aria-hidden="true" />,
  'Development Notes': <LayoutGrid className="h-5 w-5" aria-hidden="true" />,
  'Troubleshooting Guides': <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
};

interface WritingCategory {
  title: string;
  description: string;
}

const CATEGORIES: WritingCategory[] = [
  {
    title: 'Software Documentation',
    description: 'Project READMEs, architecture notes, and API references.',
  },
  {
    title: 'Programming Tutorials',
    description: 'Guides for C, Python, Java, and JavaScript fundamentals.',
  },
  {
    title: 'Computer Engineering',
    description: 'Hardware-software integration and embedded systems notes.',
  },
  {
    title: 'Embedded Systems',
    description: 'Arduino and microcontroller development guides.',
  },
  {
    title: 'Electronics',
    description: 'Circuits, components, and electronics fundamentals.',
  },
  {
    title: 'Database Documentation',
    description: 'MySQL, MongoDB, and schema design notes.',
  },
  {
    title: 'Development Notes',
    description: 'Day-to-day engineering lessons and troubleshooting.',
  },
  {
    title: 'Troubleshooting Guides',
    description: 'Common issues and their solutions across the stack.',
  },
];

export function TechnicalWriting(): React.JSX.Element {
  return (
    <section
      id="technical-writing"
      aria-labelledby="technical-writing-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <SectionHeading id="technical-writing-heading" accent="Writing">
          Technical Writing &amp;
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Engineering documentation and notes that explain technical concepts clearly. Articles are
          linked to GitHub documentation or other published sources. This section is being prepared
          — published pieces will appear here as they are written.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <article
              key={cat.title}
              className="rounded-3xl border border-line bg-card p-6 sm:p-8"
            >
              <div className="mb-4 flex items-center gap-2">
                {CATEGORY_ICONS[cat.title]}
                <h3 className="font-bold text-ink">{cat.title}</h3>
              </div>
              <p className="text-sm text-muted">{cat.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-line border-dashed bg-card p-10 text-center">
          <LayoutGrid className="mx-auto mb-4 h-10 w-10 text-muted" aria-hidden="true" />
          <h3 className="text-lg font-bold text-ink">No published articles yet</h3>
          <p className="mt-2 max-w-xl mx-auto text-muted">
            Technical articles, project documentation, and engineering notes are being prepared.
            Check back here for published writing, or explore the source documentation linked from
            each project on GitHub.
          </p>
          <a
            href="https://github.com/toms1010"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 btn-outline"
          >
            View GitHub repositories <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function WhatICanContribute(): React.JSX.Element {
  return (
    <section
      id="contributions"
      aria-labelledby="contributions-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <SectionHeading id="contributions-heading" accent="Contribute">
          What I Can Contribute
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Areas where I can contribute and continue developing my skills
          during OJT and beyond.
        </p>
        <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTRIBUTION_AREAS.map((area) => (
            <article
              key={area.title}
              className="rounded-3xl border border-line bg-card p-6 sm:p-8 hover:border-accent/50 transition-colors duration-200"
            >
              <h3 className="mb-3 text-lg font-bold text-ink">
                {area.title}
              </h3>
              <p className="text-sm text-muted">{area.description}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
