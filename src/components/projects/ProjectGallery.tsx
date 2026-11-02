import { useState, useMemo } from 'react';
import { Image, Filter, Maximize, Search } from 'lucide-react';
import { asset } from '../../lib/asset';
import { GalleryModal } from '../common/GalleryModal';

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  category: string;
}

interface CategoryFilter {
  value: string;
  label: string;
}

interface ProjectGalleryProps {
  title: string;
  items: GalleryItem[];
  featuredCount?: number;
  onViewAll?: () => void;
}

export function ProjectGallery({
  title,
  items,
  featuredCount = 4,
  onViewAll,
}: ProjectGalleryProps): React.JSX.Element {
  const [category, setCategory] = useState<string>('all');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<GalleryItem[]>([]);

  const categories: CategoryFilter[] = useMemo(() => {
    const values = ['all', ...new Set(items.map((item) => item.category))];
    return values.map((value) => ({
      value,
      label:
        value === 'all'
          ? 'All'
          : value
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
    }));
  }, [items]);

  const filtered = useMemo(() => {
    if (category === 'all') return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  const featured = items.slice(0, featuredCount);

  const openPreview = (galleryItems: GalleryItem[]): void => {
    setPreviewImages(galleryItems);
    setPreviewOpen(true);
  };

  return (
    <section aria-label={`${title} gallery`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
            <Image className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {filtered.length} of {items.length} screenshots
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted" aria-hidden="true" focusable="false" />
            <span className="text-muted">Filter by category</span>
          </div>
          <div className="flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => {
                  setCategory(cat.value);
                }}
                aria-pressed={category === cat.value}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  category === cat.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-line bg-card text-ink hover:border-accent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => (
          <figure
            key={item.src}
            className="overflow-hidden rounded-2xl border border-line bg-card group cursor-pointer"
            onClick={() => {
              openPreview(filtered);
            }}
          >
            <img
              src={asset(item.src)}
              alt={item.alt}
              loading="lazy"
              width={400}
              height={300}
              className="h-44 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <Maximize className="h-6 w-6 text-white" aria-hidden="true" focusable="false" />
            </div>
            <figcaption className="px-4 py-3 text-sm">
              <span className="font-semibold">{item.caption}</span>
            </figcaption>
          </figure>
        ))}
        {filtered.length > featuredCount && onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="mx-auto mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-2 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
          >
            <Filter className="h-4 w-4" aria-hidden="true" focusable="false" />
            View all {filtered.length} screenshots
          </button>
        )}
      </div>

      <GalleryModal
        images={previewImages}
        open={previewOpen}
        onClose={() => {
          setPreviewOpen(false);
        }}
        title={title}
      />
    </section>
  );
}
