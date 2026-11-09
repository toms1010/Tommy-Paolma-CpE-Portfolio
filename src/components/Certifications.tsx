import { CERTIFICATIONS } from '../data/portfolio';
import type { Certification } from '../types/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { ProjectImage } from './common/ProjectImage';
import { GalleryModal } from './common/GalleryModal';
import { ChevronRight, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';

const CERT_CATEGORIES: Certification['category'][] = [
  'Programming & Software Development',
  'Web Development',
  'Databases & Data Science',
  'Cybersecurity',
  'Cloud Computing',
  'Hardware & System Configuration',
  'Workshops & Technical Training',
];

const CATEGORY_LABELS: Record<Certification['category'], string> = {
  'Programming & Software Development': 'Programming & Software Development',
  'Web Development': 'Web Development',
  'Databases & Data Science': 'Databases & Data Science',
  Cybersecurity: 'Cybersecurity',
  'Cloud Computing': 'Cloud Computing',
  'Hardware & System Configuration': 'Hardware & System Configuration',
  'Workshops & Technical Training': 'Workshops & Technical Training',
};

export function Certifications(): React.JSX.Element {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Certification['category'] | 'all'>(
    'all',
  );

  const openCert = (cert: Certification): void => {
    setPreviewCert(cert);
    setPreviewOpen(true);
  };

  const filtered = useMemo(() => {
    return CERTIFICATIONS.filter((cert) => {
      const matchesCategory =
        selectedCategory === 'all' || cert.category === selectedCategory;
      const matchesSearch =
        cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cert.issuer?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <SectionHeading id="certifications-heading" accent="Certifications">
          Certifications
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          {CERTIFICATIONS.length} completed certificates, grouped by subject. Issuing organization
          and completion date are shown only where verified — never fabricated. Click
          “View Certificate” to open the certificate image.
        </p>

        {/* Search + category filter controls */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:justify-start">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search certificates…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="pl-9 pr-4 py-2 rounded-xl border border-line bg-card text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              aria-label="Search certificates by name or description"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
              }}
              aria-pressed={selectedCategory === 'all'}
              className={`min-w-[88px] rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-line bg-card text-ink hover:border-accent'
              }`}
            >
              All
            </button>
            {CERT_CATEGORIES.map((category) => {
              const certs = CERTIFICATIONS.filter((c) => c.category === category);
              if (certs.length === 0) return null;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
                  aria-pressed={selectedCategory === category}
                  className={`min-w-[88px] rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    selectedCategory === category
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-line bg-card text-ink hover:border-accent'
                  }`}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-center text-xs font-bold tracking-wider text-muted">
          {filtered.length} of {CERTIFICATIONS.length} certificates
        </p>

        {/* Category-filtered grids */}
        <div className="mt-8 flex flex-col gap-8">
          {CERT_CATEGORIES.map((category) => {
            const certs = filtered.filter((c) => c.category === category);
            if (certs.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-accent">
                  <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
                  {CATEGORY_LABELS[category]}
                  <span className="ml-auto rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
                    {certs.length}
                  </span>
                </h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {certs.map((cert) => {
                    const src = asset(cert.image);
                    return (
                      <article
                        key={cert.name}
                        className="overflow-hidden rounded-3xl border border-line bg-card group"
                        onClick={() => {
                          openCert(cert);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openCert(cert);
                          }
                        }}
                        aria-label={`View ${cert.name} certificate`}
                      >
                        <ProjectImage
                          src={src}
                          alt={`${cert.name} certificate`}
                          width={400}
                          height={200}
                          className="h-44 w-full bg-white object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            View certificate <ChevronRight className="h-4 w-4 ml-1" />
                          </span>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-ink">{cert.name}</h3>
                          <p className="mt-1 text-sm text-muted">{cert.description}</p>
                          {cert.issuer || cert.date ? (
                            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted tech-label">
                              {cert.issuer ? <span>Issuer: {cert.issuer}</span> : null}
                              {cert.issuer && cert.date ? <span>·</span> : null}
                              {cert.date ? <span>Date: {cert.date}</span> : null}
                            </p>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="mt-8 rounded-3xl border border-line border-dashed bg-card p-12 text-center">
              <p className="text-muted">No certificates match your filters.</p>
            </div>
          )}
        </div>

        <GalleryModal
          images={previewCert ? [{ src: previewCert.image, alt: `${previewCert.name} certificate`, caption: `${previewCert.name} — ${previewCert.description}` }] : []}
          open={previewOpen}
          onClose={() => {
            setPreviewOpen(false);
            setPreviewCert(null);
          }}
          title={previewCert ? `Certificate: ${previewCert.name}` : 'Certificate'}
        />
      </Reveal>
    </section>
  );
}
