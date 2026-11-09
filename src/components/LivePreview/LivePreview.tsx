import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ExternalLink,
  Maximize,
  Minimize,
  RefreshCw,
  X,
} from 'lucide-react';

/**
 * LiveWebsitePreview
 *
 * A reusable, browser-style live website preview dialog that embeds a project's
 * real deployed URL inside a responsive iframe with Desktop / Tablet / Mobile
 * device modes, fullscreen, refresh, and "open in new tab" controls.
 *
 * It gracefully handles sites that block iframe embedding (X-Frame-Options /
 * CSP frame-ancestors) by falling back to a clear neutral state with a prominent
 * "Open in New Tab" button so visitors can still reach the live site.
 */

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

interface DeviceConfig {
  mode: DeviceMode;
  label: string;
  width: number;
  height: number;
}

const DEVICE_MODES: DeviceConfig[] = [
  { mode: 'desktop', label: 'Desktop', width: 1024, height: 768 },
  { mode: 'tablet', label: 'Tablet', width: 768, height: 1024 },
  { mode: 'mobile', label: 'Mobile', width: 375, height: 667 },
];

const DEFAULT_MODE: DeviceMode = 'desktop';

const DEVICE_LABELS: Record<DeviceMode, string> = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
};

function deviceIcon(mode: DeviceMode): React.ReactNode {
  switch (mode) {
    case 'desktop':
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20h4v-8h-4v8zM3 6h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2z"
          />
        </svg>
      );
    case 'tablet':
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V20a2 2 0 01-2 2 2 2 0 01-2-2v-6.586a1 1 0 01.293-.707z"
          />
        </svg>
      );
    case 'mobile':
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2zM6 4h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
          />
        </svg>
      );
  }
}

/** Minimal typing for the vendor-prefixed fullscreen API (avoids `any`). */
type FullscreenElement = {
  requestFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
};

type FullscreenDocument = {
  exitFullscreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  fullscreenElement: Element | null;
};

function requestFullscreenOn(el: HTMLElement): void {
  const target = el as unknown as FullscreenElement;
  if (target.requestFullscreen) {
    void target.requestFullscreen().catch(() => {
      /* Fullscreen not permitted; CSS fallback still applies. */
    });
  } else if (target.webkitRequestFullscreen) {
    void target.webkitRequestFullscreen().catch(() => {
      /* Fullscreen not permitted; CSS fallback still applies. */
    });
  } else if (target.msRequestFullscreen) {
    void target.msRequestFullscreen().catch(() => {
      /* Fullscreen not permitted; CSS fallback still applies. */
    });
  }
}

function exitFullscreenIfActive(): void {
  const doc = document as unknown as FullscreenDocument;
  if (doc.exitFullscreen) {
    void doc.exitFullscreen().catch(() => {
      /* ignore */
    });
  } else if (doc.webkitExitFullscreen) {
    void doc.webkitExitFullscreen().catch(() => {
      /* ignore */
    });
  } else if (doc.msExitFullscreen) {
    void doc.msExitFullscreen().catch(() => {
      /* ignore */
    });
  }
}

interface PreviewPaneProps {
  url: string;
  title: string;
  onClose: () => void;
}

/**
 * The stateful preview pane. Remounted (via `key` in LivePreview) whenever the
 * dialog opens/closes so its loading state resets cleanly.
 */
function PreviewPane({ url, title, onClose }: PreviewPaneProps): React.JSX.Element {
  const [mode, setMode] = useState<DeviceMode>(DEFAULT_MODE);
  const [fullscreen, setFullscreen] = useState(false);
  const [loadStatus, setLoadStatus] = useState<
    'idle' | 'loaded' | 'failed'
  >('idle');
  const prefersReducedMotion = useReducedMotion();

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadStatusRef = useRef(loadStatus);

  // Keep the ref in sync with the latest load status.
  useEffect(() => {
    loadStatusRef.current = loadStatus;
  }, [loadStatus]);

  const device = DEVICE_MODES.find((d) => d.mode === mode) ?? DEVICE_MODES[0];

  // Body scroll lock while the dialog is open.
  useEffect(() => {
    if (!fullscreen) {
      prevFocus.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      prevFocus.current?.focus();
    };
  }, [fullscreen]);

  // Safety timeout: neutral timeout state (not "blocked") so visitors aren't
  // stuck on a spinner forever. An iframe onLoad does not guarantee successful
  // cross-origin rendering, so we never claim the site "blocks embedding."
  useEffect(() => {
    loadTimeoutRef.current = setTimeout(() => {
      if (loadStatusRef.current === 'idle') {
        setLoadStatus('failed');
      }
    }, 15000);
    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [url, mode]);

  const handleIframeLoad = useCallback((): void => {
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setLoadStatus('loaded');
  }, []);

  const handleIframeError = useCallback((): void => {
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setLoadStatus('failed');
  }, []);

  // Synchronize React fullscreen state with the browser's actual fullscreen state.
  // Only exit fullscreen if this container currently owns it.
  useEffect(() => {
    const handler = (): void => {
      const doc = document as unknown as FullscreenDocument;
      const ownsFullscreen =
        !!containerRef.current &&
        doc.fullscreenElement === containerRef.current;
      setFullscreen(ownsFullscreen);
    };
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
    return () => {
      document.removeEventListener('fullscreenchange', handler);
      document.removeEventListener('webkitfullscreenchange', handler);
    };
  }, []);

  const close = useCallback((): void => {
    // Only exit fullscreen if this container owns it.
    const doc = document as unknown as FullscreenDocument;
    if (doc.fullscreenElement === containerRef.current) {
      void doc.exitFullscreen?.().catch(() => {
        /* ignore */
      });
    }
    setFullscreen(false);
    onClose();
  }, [onClose]);

  const openInNewTab = useCallback((): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [url]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
      // Trap Tab / Shift+Tab inside the dialog.
      if (e.key === 'Tab') {
        const dialog = containerRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [close]
  );

  const handleModeChange = useCallback((next: DeviceMode): void => {
    setMode(next);
    setFullscreen(false);
  }, []);

  const failed = loadStatus === 'failed';
  const isLoading = loadStatus === 'idle';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="live-preview-title"
        onKeyDown={handleKeyDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.22,
          ease: 'easeOut',
        }}
      >
        {/* Backdrop — tap empty area to close. */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          aria-hidden="true"
        />

        {/* Dialog panel — responsive flex-column layout. */}
        <motion.div
          ref={containerRef}
          className={`
            relative mx-auto w-full max-w-full max-h-[90vh] rounded-3xl border border-line bg-card shadow-2xl overflow-hidden flex flex-col
            ${fullscreen ? 'fixed inset-0 z-[71] max-w-none h-screen w-screen rounded-none p-0' : ''}
            ${prefersReducedMotion ? 'duration-0' : ''}
          `}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{
            type: 'spring',
            damping: 22,
            stiffness: 300,
            duration: prefersReducedMotion ? 0 : undefined,
          }}
        >
          {/* Header: title, close, fullscreen. */}
          <header className="flex items-center justify-between border-b border-line bg-page/50 px-5 py-3.5 z-20 shrink-0">
            <div className="flex items-center gap-2">
              <h2 id="live-preview-title" className="text-sm font-semibold text-ink">
                Live Preview — {title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {/* Fullscreen button — desktop only. */}
              <div className="hidden lg:flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    const next = !fullscreen;
                    setFullscreen(next);
                    if (next && containerRef.current) {
                      requestFullscreenOn(containerRef.current);
                    } else if (!next) {
                      exitFullscreenIfActive();
                    }
                  }}
                  aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="min-h-10 min-w-10 flex items-center justify-center rounded-xl border border-line bg-card text-ink transition-colors hover:bg-accent/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {fullscreen ? (
                    <Minimize className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Maximize className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close preview"
                className="min-h-10 min-w-10 flex items-center justify-center rounded-xl border border-line bg-card text-ink transition-colors hover:bg-accent/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </header>

          {/* Browser chrome: address bar + device controls + refresh. */}
          <div className="flex items-center justify-between border-b border-line bg-page/50 px-5 py-3 z-20 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-line bg-card/60 text-xs font-mono text-muted">
                <span className="text-accent/70">🔒</span>
                <span className="truncate max-w-xs" title={url}>
                  {url}
                </span>
              </div>
              <button
                type="button"
                onClick={openInNewTab}
                aria-label={`Open ${title} in a new tab`}
                className="flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-line bg-card text-muted transition-colors hover:bg-accent/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              {/* Device mode segmented control. */}
              <div className="inline-flex items-center rounded-xl border border-line bg-card text-sm font-medium p-0.5">
                {DEVICE_MODES.map((d) => {
                  const active = mode === d.mode;
                  return (
                    <button
                      key={d.mode}
                      type="button"
                      onClick={() => {
                        handleModeChange(d.mode);
                      }}
                      aria-pressed={active}
                      aria-label={`Preview ${title} on ${DEVICE_LABELS[d.mode]}`}
                      className={`
                        flex min-h-9 items-center justify-center gap-2 rounded-lg px-2.5 py-1 text-xs transition-colors
                        ${active
                          ? 'bg-accent text-white shadow-sm'
                          : 'text-muted hover:bg-accent/5 hover:text-accent'}
                      `}
                    >
                      {deviceIcon(d.mode)}
                      <span className="hidden sm:inline">{d.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoadStatus('idle');
                    loadTimeoutRef.current = setTimeout(() => {
                      if (loadStatusRef.current === 'idle') {
                        setLoadStatus('failed');
                      }
                    }, 15000);
                    const iframe = iframeRef.current;
                    if (!iframe) return;
                    const src = iframe.src;
                    iframe.src = src;
                  }}
                  aria-label="Refresh preview"
                  disabled={isLoading}
                  className="min-h-9 min-w-9 flex items-center justify-center rounded-lg border border-line bg-card text-muted transition-colors hover:bg-accent/5 hover:text-accent disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Main preview area: device-sized iframe. */}
          <section
            className={`relative w-full flex-1 bg-black overflow-hidden ${
              fullscreen ? 'h-full' : ''
            }`}
          >
            <div
              className="relative mx-auto w-full"
              style={{
                width: device.width,
                height: device.height,
                maxWidth: '100%',
                maxHeight: '100%',
                margin: '0 auto',
              }}
            >
              <iframe
                ref={iframeRef}
                src={url}
                title={`Live preview of ${title}`}
                width={device.width}
                height={device.height}
                referrerPolicy="no-referrer"
                loading="eager"
                allowFullScreen
                className="block w-full h-full rounded-xl border border-line shadow-inner"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            </div>
          </section>

          {/* Animated loading indicator. */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-card/90 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-10 w-10">
                  <svg
                    className="animate-spin h-full w-full text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="absolute -inset-0.5 rounded-full bg-accent blur opacity-30 animate-pulse" />
                </div>
                <p className="text-sm text-muted">Loading live site…</p>
              </div>
            </motion.div>
          )}

          {/* Load-failed fallback — neutral message, no false "blocked" claim. */}
          {failed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-30 p-8 text-center bg-card/95 backdrop-blur-sm border border-line/50"
            >
              <div className="w-full max-w-md">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent mb-4">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">
                  Unable to load preview
                </h3>
                <p className="text-sm text-muted mb-6">
                  The preview could not be loaded. The site may be offline or
                  may block embedding in iframes.
                </p>
                <button
                  type="button"
                  onClick={openInNewTab}
                  className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-accent/90"
                >
                  Open {title} in New Tab{' '}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoadStatus('idle');
                    loadTimeoutRef.current = setTimeout(() => {
                      if (loadStatusRef.current === 'idle') {
                        setLoadStatus('failed');
                      }
                    }, 15000);
                    const iframe = iframeRef.current;
                    if (!iframe) return;
                    const src = iframe.src;
                    iframe.src = src;
                  }}
                  disabled={isLoading}
                  className="mt-3 w-full inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-line bg-card text-sm font-semibold text-muted transition-colors hover:bg-accent/5 hover:text-accent disabled:opacity-50"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Try Again
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface LivePreviewProps {
  /** The real deployed URL of the project (e.g. https://toms1010.github.io/JDAJNSH/). */
  url: string;
  /** Project title used in the address bar and aria labels. */
  title: string;
  /** Whether the preview dialog is open. */
  open: boolean;
  /** Called when the user closes the dialog. */
  onClose: () => void;
}

export default function LivePreview({
  url,
  title,
  open,
  onClose,
}: LivePreviewProps): React.JSX.Element {
  return (
    <AnimatePresence>
      {open && (
        <PreviewPane key={url} url={url} title={title} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}
