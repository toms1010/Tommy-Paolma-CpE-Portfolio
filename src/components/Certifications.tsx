import { CERTIFICATIONS } from '../data/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Certifications(): React.JSX.Element {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <SectionHeading id="certifications-heading" accent="Certifications">
          All
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          18 completed courses and workshops. Click any certificate to view the full image.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => {
            const src = asset(cert.image);
            return (
              <article
                key={cert.name}
                className="overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent"
              >
                <img
                  src={src}
                  alt={`${cert.name} certificate`}
                  loading="lazy"
                  width={400}
                  height={160}
                  className="h-40 w-full bg-white object-contain"
                />
                <div className="p-5 text-center">
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="mt-1 text-sm text-muted">{cert.description}</p>
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View full ${cert.name} certificate image (opens in a new tab)`}
                    className="mt-3 inline-block font-semibold text-accent hover:underline"
                  >
                    View Certificate →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
