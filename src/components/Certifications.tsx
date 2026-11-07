import { CERTIFICATIONS } from '../data/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { useState } from 'react';
import { GalleryModal } from './common/GalleryModal';
import { ProjectImage } from './common/ProjectImage';

export function Certifications(): React.JSX.Element {
  const [previewOpen, setPreviewOpen] = useState(false);

  const certImages = CERTIFICATIONS.map((cert) => ({
    src: cert.image,
    alt: `${cert.name} certificate`,
    caption: `${cert.name} — ${cert.description}`,
  }));

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <SectionHeading id="certifications-heading">Certifications</SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          18 completed courses and workshops. Click any certificate to view it full-size.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => {
            const src = asset(cert.image);
            return (
              <article
                key={cert.name}
                className="overflow-hidden rounded-3xl border border-line bg-card group cursor-pointer"
                onClick={() => {
                  setPreviewOpen(true);
                }}
              >
                <ProjectImage
                  src={src}
                  alt={`${cert.name} certificate`}
                  width={400}
                  height={160}
                  className="h-40 w-full bg-white object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">View</span>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="mt-1 text-sm text-muted">{cert.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <GalleryModal
          images={certImages}
          open={previewOpen}
          onClose={() => {
            setPreviewOpen(false);
          }}
          title="Certificates"
        />
      </Reveal>
    </section>
  );
}
