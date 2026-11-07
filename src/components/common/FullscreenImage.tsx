import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

/**
 * FullscreenImage
 *
 * Opens a project's image in a fullscreen overlay. Clicking the backdrop or
 * the X button closes it. Tapping the image toggles the UI chrome. Uses the
 * browser Fullscreen API when available, with a CSS-based fullscreen overlay
 * fallback.
 */
interface FullscreenImageProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export function FullscreenImage({
  src,
  alt,
  open,
  onClose,
}: FullscreenImageProps): React.JSX.Element | null {
  const [fullscreen, setFullscreen] = useState(false);
  const [showChrome, setShowChrome] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const exitFullscreen = useCallback((): void => {
    void document.exitFullscreen().catch(() => {
      /* ignore */
    });
    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
    };
    void doc.webkitExitFullscreen?.().catch(() => {
      /* ignore */
    });
    void doc.msExitFullscreen?.().catch(() => {
      /* ignore */
    });
    setFullscreen(false);
  }, []);

  const toggleFullscreen = useCallback((): void => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      exitFullscreen();
      return;
    }
    void el.requestFullscreen().catch(() => {
      /* Fullscreen not permitted; CSS overlay still shows full image. */
    });
    const target = el as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };
    void target.webkitRequestFullscreen?.().catch(() => {
      /* ignore */
    });
    void target.msRequestFullscreen?.().catch(() => {
      /* ignore */
    });
    setFullscreen(true);
  }, [exitFullscreen]);

  useEffect(() => {
    const handler = (): void => {
      setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
    return () => {
      document.removeEventListener('fullscreenchange', handler);
      document.removeEventListener('webkitfullscreenchange', handler);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setShowChrome(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  const close = useCallback((): void => {
    exitFullscreen();
    setFullscreen(false);
    onClose();
  }, [exitFullscreen, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === 'Escape') {
        close();
      }
    },
    [close]
  );

  const handleClick = useCallback((): void => {
    setShowChrome((prev) => !prev);
  }, []);

  const handleMouseMove = useCallback((): void => {
    setShowChrome(true);
  }, []);

  const handleMouseLeave = useCallback((): void => {
    setShowChrome(false);
  }, []);

  const handleImgClick = useCallback(
    (e: React.MouseEvent): void => {
      e.stopPropagation();
      setShowChrome(true);
    },
    []
  );

  const handleImgLoad = useCallback((): void => {
    setShowChrome(true);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen picture"
      onKeyDown={handleKeyDown}
      onClick={close}
    >
      {/* Backdrop tap to close. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        onClick={close}
      />

      {/* Fullscreen panel. */}
      <div
        ref={containerRef}
        className={`
          relative mx-auto w-full max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center rounded-2xl border border-white/10 p-4 bg-black/80 shadow-2xl overflow-hidden
          ${showChrome ? 'opacity-100 transition-opacity duration-300' : 'opacity-70 transition-opacity duration-300'}
        `}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Chrome: close + fullscreen toggle (top-right). */}
        {showChrome && (
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="min-h-10 min-w-10 flex items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              {fullscreen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 3v5a2 2 0 002 2h3M5 3h8l5 5v8a2 2 0 01-2 2H5a2 2 0 01-2-2V3z"
                  />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close picture"
              className="min-h-10 min-w-10 flex items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}

        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="max-w-full max-h-[75vh] object-contain block rounded-lg shadow-2xl"
          onClick={handleImgClick}
          onLoad={handleImgLoad}
        />
      </div>
    </div>
  );
}
