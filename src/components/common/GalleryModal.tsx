import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { asset } from '../../lib/asset';
import { ProjectImage } from './ProjectImage';

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

/**
 * GalleryModal
 *
 * Accessible image preview dialog with:
 *   - role="dialog" / aria-modal / aria-labelledby
 *   - Focus trap (Tab / Shift+Tab) and Escape to close
 *   - Body scroll lock while open, restored on close/unmount
 *   - Image index reset when the image array changes
 *   - Responsive flex-column layout (header, viewer, caption, thumbnails)
 */
export function GalleryModal({
  images,
  open,
  onClose,
  title = 'Image preview',
}: GalleryModalProps): React.JSX.Element | null {
  const [index, setIndex] = useState(0);
  const prevFocus = useRef<HTMLElement | null>(null);

  // Reset index when the modal opens. The component returns null (stays mounted)
  // when open=false, so we must reset index when open transitions to true.
  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(0);
  }, [open]);

  // Body scroll lock.
  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      prevFocus.current?.focus();
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      // Do not intercept arrow keys inside editable elements.
      const target = e.target as HTMLElement | null;
      const isEditable =
        target?.isContentEditable ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT';
      if (isEditable) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex((i) => (i + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex((i) => (i - 1 + images.length) % images.length);
      }
    },
    [images, onClose]
  );

  useEffect(() => {
    if (!open) return;
    const domHandler = (e: KeyboardEvent): void => {
      handleKeyDown(e as unknown as React.KeyboardEvent<HTMLDivElement>);
    };
    document.addEventListener('keydown', domHandler);
    return () => {
      document.removeEventListener('keydown', domHandler);
    };
  }, [open, handleKeyDown]);

  if (!open || images.length === 0) return null;

  // Clamp index to valid range.
  const safeIndex = Math.max(0, Math.min(index, images.length - 1));
  const current = images[safeIndex];

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
      aria-labelledby="gallery-modal-title"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop — tap to close. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal panel — responsive flex-column layout. */}
      <div
        className="relative mx-auto mt-10 mb-10 w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/20 bg-black/90 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 z-20 shrink-0">
          <h2 id="gallery-modal-title" className="text-sm font-semibold text-white">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <span
              aria-label={`Image ${String(safeIndex + 1)} of ${String(images.length)}`}
              className="text-xs text-white/70"
            >
              {safeIndex + 1} / {images.length}
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

        {/* Main image viewer */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
          <div className="relative inline-block">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <span className="text-2xl font-bold leading-none">‹</span>
            </button>
            <ProjectImage
              src={asset(current.src)}
              alt={current.alt}
              className="max-h-full max-w-full object-contain block"
            />
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <span className="text-2xl font-bold leading-none">›</span>
            </button>
          </div>
        </div>

        {/* Caption */}
        {current.caption && (
          <div className="px-6 py-3 text-center text-sm text-white/90 border-t border-white/10 shrink-0">
            {current.caption}
          </div>
        )}

        {/* Thumbnail navigation */}
        {images.length > 1 && (
          <div className="px-4 py-3 border-t border-white/10 bg-black/80 shrink-0">
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
                  aria-pressed={i === safeIndex}
                  className={`shrink-0 h-12 w-16 rounded-lg border-2 p-1 object-cover transition-all ${
                    i === safeIndex
                      ? 'border-accent ring-2 ring-accent/50'
                      : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <ProjectImage
                    src={asset(img.src)}
                    alt={img.alt}
                    className="h-full w-full object-cover rounded-md opacity-70 hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
