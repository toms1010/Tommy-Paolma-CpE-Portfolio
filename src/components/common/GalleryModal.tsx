import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { asset } from '../../lib/asset';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryModalProps {
  images: GalleryImage[];
  open: boolean;
  onClose: () => void;
  title?: string;
}

export function GalleryModal({
  images,
  open,
  onClose,
  title = 'Image preview',
}: GalleryModalProps): React.JSX.Element | null {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open || images.length === 0) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        setIndex((i) => (i + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        setIndex((i) => (i - 1 + images.length) % images.length);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, images, onClose]);

  if (!open || images.length === 0) return null;
  const current = images[index];

  const prev = (): void => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (): void => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };
  const goTo = (i: number): void => {
    setIndex(i);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop — tap to close. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal panel */}
      <div className="relative mx-auto mt-10 mb-10 w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/20 bg-black/90 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-20">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <div className="flex items-center gap-2">
            <span
              aria-label={`Image ${String(index + 1)} of ${String(images.length)}`}
              className="text-xs text-white/70"
            >
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" focusable="false" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center h-[60vh] sm:h-[75vh] p-6">
          <button
            type="button"
            onClick={() => {
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-4 h-12 w-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="text-2xl font-bold leading-none">‹</span>
          </button>
          <img
            src={asset(current.src)}
            alt={current.alt}
            loading="lazy"
            className="max-h-full max-w-full object-contain block"
            decoding="async"
          />
          <button
            type="button"
            onClick={() => {
              next();
            }}
            aria-label="Next image"
            className="absolute right-4 h-12 w-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="text-2xl font-bold leading-none">›</span>
          </button>
        </div>

        {/* Caption */}
        {current.caption && (
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/90 to-transparent">
            <p className="text-sm text-white">{current.caption}</p>
          </div>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 border-t border-white/10">
            <p className="mb-3 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
              Select image
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => {
                    goTo(i);
                  }}
                  aria-label={img.alt}
                  aria-pressed={i === index}
                  className={`shrink-0 h-12 w-16 rounded-lg border-2 p-1 object-cover transition-all ${
                    i === index
                      ? 'border-accent ring-2 ring-accent/50'
                      : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <img
                    src={asset(img.src)}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover rounded-md opacity-70 hover:opacity-100 transition-opacity"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard hint (screen reader only visually hidden hint via aria on root) */}
      </div>
    </div>
  );
}
